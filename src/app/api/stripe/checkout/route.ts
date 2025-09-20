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
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    let customerId = user.stripeCustomerId;

    // Verify customer exists in Stripe
    if (customerId) {
      try {
        await stripe.customers.retrieve(customerId);
      } catch {
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
    }


    const planKey = planType.toLowerCase() as keyof typeof STRIPE_CONFIG.plans;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer: customerId,
      line_items: [{ price: STRIPE_CONFIG.plans[planKey].priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscribe`,
      metadata: { id, planType },
    });


    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Checkout session error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
