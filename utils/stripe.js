import Stripe from 'stripe';
import dotenv from 'dotenv';
import { payementRouter } from '../api/payment';




const stripe = require('stripe')('sk_test_51NY6q2D8G4Qm0m3hOsriIZQ95DweofBM2mYWrA5Pczx7zzHr8xuBvIZjmaLo1XjtYGrxfNywwCWXh2KL3kvZjka000d9V8z9b4');

const paymentIntent = await stripe.paymentIntents.create({
  amount: 1099,
  currency: 'usd',
  automatic_payment_methods: {
    enabled: true,
  },
});