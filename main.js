import {app} from './core/init.js';
import {userRouter} from './api/user.js';
import { siteRouter } from './api/site.js';
import { employeeRouter } from './api/employee.js';
import {taskRouter} from './api/task.js';
import {siteManagerRouter} from './api/sitemanger.js';
import {uploadRouter} from './api/upload.js';
import { connectDB,query } from './config/db.js'
import dotenv from 'dotenv'
import { cardRouter } from './api/card.js';
import { dropRouter } from './api/drop.js';
import {labourLeaveRouter} from './api/labourleave.js'
import Stripe from 'stripe';
import { laborRouter } from './api/labor.js';

// const stripe = require("stripe")(
//     process.env.STRIPE_SECRET_KEY, {
//     apiVersion: "2022-08-01",
//   });

  const stripe = Stripe(process.env.STRIPE_SECRET_KEY,{
    apiVersion: "2022-08-01"
  })


dotenv.config()


// import { paymentRouter } from './api/payment.js';
dotenv.config()
connectDB(); 

//gineth
app.use('/api/user', userRouter);
app.use('/api/task', taskRouter);
app.use('/api/sitemanager', siteManagerRouter);
app.use('/api/upload', uploadRouter);
// app.use('/api/payment', paymentRouter);
app.use('/api/labourleave',labourLeaveRouter);
app.use('/api/labor',laborRouter);









//govindani

app.use('/api/card', cardRouter);
app.use('/api/drop', dropRouter);





//nilshan
app.use('/api/employee',employeeRouter)








//chamodi
app.use('/api/site',siteRouter);


app.get("/config", (req, res) => {
    res.send({
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  });
  
  app.post("/create-payment-intent", async (req, res) => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        currency: "EUR",
        amount: 1999,
        automatic_payment_methods: { enabled: true },
      });
  
      // Send publishable key and PaymentIntent details to client
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (e) {
      return res.status(400).send({
        error: {
          message: e.message,
        },
      });
    }
  });





//sadun









//rumindu









const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})


//axios use to get and post data