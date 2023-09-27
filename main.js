import { app } from "./core/init.js";
import http from "http";
import { Server as WebSocketServer } from "socket.io";
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



import { paymentRouter } from "./api/payment.js";
dotenv.config();
connectDB();

const server = http.createServer(app);
const io = new WebSocketServer(server, {
  cors: {
    origin: "http://localhost:3000", // Replace with the origin of your frontend application
    methods: ["GET", "POST"], // Specify the HTTP methods you want to allow
  },
});

//gineth
app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);
app.use("/api/sitemanager", siteManagerRouter);
app.use("/api/upload", uploadRouter);
// app.use('/api/payment', paymentRouter);
app.use('/api/labourleave',labourLeaveRouter)
app.use('/api/labor',laborRouter);








//govindani

app.use("/api/card", cardRouter);
app.use("/api/drop", dropRouter);

//nilshan
app.use("/api/employee", employeeRouter);
app.use("/api/payment", paymentRouter);

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

let onlineUsers = [];

const addNewUser = (employeeNo, socketId) => {
  console.log(employeeNo, socketId);
  !onlineUsers.some((user) => user.employeeNo === employeeNo) &&
    onlineUsers.push({ employeeNo, socketId });
  console.log(onlineUsers);
};


const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (employeeNo) => {
  console.log(employeeNo);
  return onlineUsers.find((user) => user.employeeNo === employeeNo);
};

// WebSocket server logic
io.on("connection", (socket) => {
  socket.on("newUser", async (employeeNo) => {
    console.log(socket.id);
    await addNewUser(employeeNo, socket.id);
  });

  socket.on("sendTaskNotification", ({ reciver, sender }) => {
    const toUser = getUser(reciver);
    console.log(reciver, sender);
    io.to(toUser.socketId).emit("getTaskNotification", {
      sender: sender,
      reciver: reciver,
      msg: "Task 01 added for you.",
    });
  });

  // io.emit("First event", "This a test")

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

const port = process.env.PORT;
server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

//axios use to get and post data
