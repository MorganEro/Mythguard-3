'use client';
import axios from 'axios';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
    EmbeddedCheckout,
    EmbeddedCheckoutProvider
} from '@stripe/react-stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)

function CheckoutContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');
    const cartId = searchParams.get('cartId');

    if (!orderId || !cartId) {
        throw new Error('Missing orderId or cartId');
    }

    const fetchClientSecret = useCallback(async () => {
        const response = await axios.post('/api/payment', {
            orderId,
            cartId
        });
        return response.data.clientSecret;
    }, [orderId, cartId]);

    const options = { fetchClientSecret };
    
    return (
        <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
            <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
    );
}

function CheckoutPage() {
    return (
        <div id="checkout">
            <Suspense fallback={<div>Loading checkout...</div>}>
                <CheckoutContent />
            </Suspense>
        </div>
    );
}

export default CheckoutPage
