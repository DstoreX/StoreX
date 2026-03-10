import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export const runtime = 'node';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-08-16' });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const items = body.items || [];
    const email = body.email;

    if (!items.length) {
      return NextResponse.json({ error: 'No items provided' }, { status: 400 });
    }

    const line_items = items.map((it: any) => ({
      price_data: {
        currency: process.env.DEFAULT_CURRENCY || 'usd',
        product_data: {
          name: it.name,
          metadata: { product_id: it.product_id, variant_id: it.variant_id }
        },
        unit_amount: it.unit_price
      },
      quantity: it.quantity
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      metadata: { items: JSON.stringify(items) },
      customer_email: email,
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/?canceled=true`
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('checkout error', err);
    return NextResponse.json({ error: err?.message || 'unknown' }, { status: 500 });
  }
}