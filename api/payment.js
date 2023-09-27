// import {router as paymentRouter} from "./index.js";
// import stripe from 'stripe';


// paymentRouter.get('/secret', async (req, res) => {
//     // set your secret key. Remember to switch to your live secret key in production.
//     // See your keys here: https://dashboard.stripe.com/apikeys

//     const stripe = new Stripe('sk_test_51NY6q2D8G4Qm0m3hOsriIZQ95DweofBM2mYWrA5Pczx7zzHr8xuBvIZjmaLo1XjtYGrxfNywwCWXh2KL3kvZjka000d9V8z9b4', {
//     const intent = await stripe.paymentIntents.create({
//       amount: 1099,
//       currency: 'usd',
//       automatic_payment_methods: {
//         enabled: true,
//       },
//     });

//     res.json({client_secret: intent.client_secret});
//   });
  
// export {paymentRouter}

import {router as paymentRouter} from "./index.js";
import { currentPayment } from "../controllers/paymentController.js";

paymentRouter.post('/currentPayment',currentPayment)


export {paymentRouter}