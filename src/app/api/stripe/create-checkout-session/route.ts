
// src/app/api/stripe/create-checkout-session/route.ts
import { NextResponse, type NextRequest } from 'next/server';
import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  const errorMessage = 'STRIPE_SECRET_KEY is not set in environment variables. This is a server-side configuration issue.';
  console.error(errorMessage);
  // It's better to throw an error or return immediately if the key is not set,
  // rather than letting Stripe() constructor potentially fail with a less clear message.
  // However, the structure of Next.js route handlers requires returning a NextResponse.
  // This error will be caught by the global error handler or result in a 500 if not handled by Stripe.
}

// It's okay for stripe to be potentially null if the key is missing,
// subsequent checks will handle this.
const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null;

export async function POST(request: NextRequest) {
  if (!stripe || !stripeSecretKey) { // Double check stripe instance and key
    console.error('Stripe secret key is missing or Stripe SDK not initialized. Check server logs and .env.local.');
    return NextResponse.json({ error: 'Payment processing is not configured correctly on the server.' }, { status: 500 });
  }

  if (stripeSecretKey.startsWith('pk_')) {
    console.error('STRIPE_SECRET_KEY in environment variables appears to be a publishable key (starts with pk_...). A secret key (starts with sk_...) is required for this operation.');
    return NextResponse.json({ error: 'Invalid Stripe API key configuration on the server. A secret key (sk_...) is required, but a publishable key (pk_...) was provided.' }, { status: 500 });
  }
  
  try {
    const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:9002'; // Fallback
    console.log('[Stripe Checkout] Determined origin:', origin); // Log origin

    if (!origin.startsWith('http')) {
        console.error('[Stripe Checkout] Invalid origin detected:', origin, 'Ensure NEXT_PUBLIC_APP_URL is correctly set with http/https.');
        return NextResponse.json({ error: 'Server configuration error: Invalid application URL for payment success/cancel.' }, { status: 500 });
    }

    const success_url = `${origin}/order-details?payment_success=true&session_id={CHECKOUT_SESSION_ID}`;
    const cancel_url = `${origin}/order-summary?payment_cancelled=true`;

    console.log('[Stripe Checkout] Success URL:', success_url); // Log success_url
    console.log('[Stripe Checkout] Cancel URL:', cancel_url);   // Log cancel_url

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'aud',
            product_data: {
              name: 'NutriPlan Service Fee',
              description: 'A one-time fee for accessing order details and personalized guides.',
            },
            unit_amount: 195, // 1.95 AUD in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: success_url,
      cancel_url: cancel_url,
    });

    if (session.id) {
      return NextResponse.json({ sessionId: session.id });
    } else {
      console.error('[Stripe Checkout] Stripe session was created but has no ID.');
      return NextResponse.json({ error: 'Failed to create Stripe session (no session ID returned).' }, { status: 500 });
    }
  } catch (error: any) {
    console.error('[Stripe Checkout] Error creating Stripe session:', error.message, error);
    return NextResponse.json({ error: 'There was an issue processing your payment. Please try again.' }, { status: 500 });
  }
}

