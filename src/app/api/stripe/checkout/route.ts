// /api/stripe/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { stripe, STRIPE_CONFIG } from "@/lib/stripe";
import prisma from "../../../../../prisma/client";

export async function POST(req: NextRequest) {
  try {
    const { planType, id } = await req.json();

    if (!planType || !id) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 🔍 Debug which Stripe environment is used
    console.log(
      "Using Stripe environment:",
      process.env.STRIPE_SECRET_KEY?.startsWith("sk_live_") ? "LIVE" : "TEST"
    );

    // ✅ Check for existing active subscription
    const activeSub = await prisma.subscription.findFirst({
      where: {
        userId: id,
        status: { in: ["ACTIVE", "TRIALING"] },
        stripeCurrentPeriodEnd: { gte: new Date() },
      },
    });

    if (activeSub) {
      return NextResponse.json(
        { error: "You already have an active subscription." },
        { status: 400 }
      );
    }

    // ✅ Handle customer retrieval
    let customerId = user.stripeCustomerId;

    if (customerId) {
      try {
        await stripe.customers.retrieve(customerId);
      } catch (err: any) {
        console.warn(
          `⚠️ Invalid Stripe customer ID (${customerId}) for user ${id}, resetting...`
        );
        await prisma.user.update({
          where: { id },
          data: { stripeCustomerId: null },
        });
        customerId = null;
      }
    }

    // ✅ Create customer if missing
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email!,
        metadata: { id: user.id },
      });

      await prisma.user.update({
        where: { id },
        data: { stripeCustomerId: customer.id },
      });

      customerId = customer.id;
      console.log(`✅ Created new Stripe customer for user ${id}: ${customerId}`);
    }

    // ✅ Normalize plan key and check existence
    const planKey = planType.toLowerCase() as keyof typeof STRIPE_CONFIG.plans;
    if (!STRIPE_CONFIG.plans[planKey]) {
      return NextResponse.json(
        { error: "Invalid subscription plan" },
        { status: 400 }
      );
    }

    // ✅ Create checkout session
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer: customerId,
      line_items: [
        {
          price: STRIPE_CONFIG.plans[planKey].priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscribe`,
      metadata: { id, planType },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("❌ Checkout session error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
