import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import prisma from "../../../../../prisma/client";
import type { SubscriptionPlan, SubscriptionStatus, PaymentStatus } from "@prisma/client";
import Stripe from "stripe";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");
    if (!sessionId)
      return NextResponse.json({ error: "Missing session_id" }, { status: 400 });


    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session.subscription)
      return NextResponse.json({ error: "No subscription found" }, { status: 400 });

    const userId = session.metadata?.id;
    const planTypeStr = session.metadata?.planType;

    if (!userId || !planTypeStr)
      return NextResponse.json({ error: "Missing metadata" }, { status: 400 });

    // Convert to enum values using Prisma-generated types
    const planType = planTypeStr.toUpperCase() as SubscriptionPlan;

  
    const subscriptionId =
      typeof session.subscription === "string"
        ? session.subscription
        : session.subscription?.id;

    if (!subscriptionId)
      return NextResponse.json({ error: "No subscription ID found" }, { status: 400 });


    const subscription = await stripe.subscriptions.retrieve(subscriptionId) as any;
    const subscriptionStatus = subscription.status.toUpperCase() as SubscriptionStatus;


    // Then use it normally:
    const currentPeriodEnd = subscription.current_period_end
      ? new Date(subscription.current_period_end * 1000)
      : new Date();

    // Upsert subscription in DB
    const dbSubscription = await prisma.subscription.upsert({
      where: { stripeSubscriptionId: subscription.id },
      update: {
        status: subscriptionStatus,
        stripeCurrentPeriodEnd: currentPeriodEnd,
        plan: planType,
      },
      create: {
        userId,
        stripeSubscriptionId: subscription.id,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: currentPeriodEnd,
        plan: planType,
        status: subscriptionStatus,
      },
    });

    // Handle payment intent
    if (session.payment_intent) {
      let paymentIntent: Stripe.PaymentIntent | undefined;
      const paymentIntentId =
        typeof session.payment_intent === "string"
          ? session.payment_intent
          : session.payment_intent.id;

      for (let i = 0; i < 5; i++) {
        paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        if (paymentIntent.status === "succeeded") break;
        await new Promise((res) => setTimeout(res, 1000));
      }

      if (paymentIntent) {
        const paymentStatus = paymentIntent.status.toUpperCase() as PaymentStatus;

        await prisma.payment.upsert({
          where: { stripePaymentId: paymentIntent.id },
          update: {
            status: paymentStatus,
            amount: paymentIntent.amount_received,
            currency: paymentIntent.currency,
          },
          create: {
            stripePaymentId: paymentIntent.id,
            userId,
            subscriptionId: dbSubscription.id,
            amount: paymentIntent.amount_received,
            currency: paymentIntent.currency,
            status: paymentStatus,
          },
        });
      }
    }


    return NextResponse.json({
      message: "Subscription and payment recorded",
      subscriptionId: dbSubscription.id,
      stripeSubscriptionId: dbSubscription.stripeSubscriptionId,
      plan: dbSubscription.plan,
      status: dbSubscription.status,
    });
  } catch (error: any) {
    console.error("Success route error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

