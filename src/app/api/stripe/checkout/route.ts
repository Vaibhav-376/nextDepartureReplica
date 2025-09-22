// /api/stripe/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { stripe, STRIPE_CONFIG } from "@/lib/stripe";
import prisma from "../../../../../prisma/client";

export async function POST(req: NextRequest) {
  try {
    const { planType, id } = await req.json();

    if (!planType || !id) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log(
      "Using Stripe environment:",
      process.env.STRIPE_SECRET_KEY?.startsWith("sk_live_") ? "LIVE" : "TEST"
    );

    // Check for active subscription
    const activeSub = await prisma.subscription.findFirst({
      where: {
        userId: id,
        status: { in: ["ACTIVE", "TRIALING"] },
        stripeCurrentPeriodEnd: { gte: new Date() },
      },
    });

    if (activeSub) {
      return NextResponse.json({ error: "You already have an active subscription." }, { status: 400 });
    }

    // Handle customer
    let customerId = user.stripeCustomerId;
    if (customerId) {
      try {
        await stripe.customers.retrieve(customerId);
      } catch {
        console.warn(`⚠️ Invalid Stripe customer ID (${customerId}) for user ${id}, resetting...`);
        await prisma.user.update({ where: { id }, data: { stripeCustomerId: null } });
        customerId = null;
      }
    }

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email!,
        metadata: { id: user.id },
      });
      await prisma.user.update({ where: { id }, data: { stripeCustomerId: customer.id } });
      customerId = customer.id;
      console.log(`✅ Created new Stripe customer for user ${id}: ${customerId}`);
    }

    const planKey = planType.toLowerCase() as keyof typeof STRIPE_CONFIG.plans;
    if (!STRIPE_CONFIG.plans[planKey]) {
      return NextResponse.json({ error: "Invalid subscription plan" }, { status: 400 });
    }

    // ✅ Use NEXT_PUBLIC_APP_URL or fallback for dev
    let appUrl = process.env.NEXT_PUBLIC_APP_URL;
    if (!appUrl || !/^https?:\/\//.test(appUrl)) {
      console.warn("⚠️ Invalid or missing NEXT_PUBLIC_APP_URL. Falling back to http://localhost:3000");
      appUrl = "http://localhost:3000";
    }
    appUrl = appUrl.replace(/\/$/, ""); // remove trailing slash

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer: customerId,
      line_items: [{ price: STRIPE_CONFIG.plans[planKey].priceId, quantity: 1 }],
      success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/subscribe`,
      metadata: { id, planType },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("❌ Checkout session error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
