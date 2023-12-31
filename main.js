import { app } from "./core/init.js";
import http from "http";
import { Server as WebSocketServer } from "socket.io";
import { userRouter } from "./api/user.js";
import { siteRouter } from "./api/site.js";
import { employeeRouter } from "./api/employee.js";
import { taskRouter } from "./api/task.js";
import { siteManagerRouter } from "./api/sitemanger.js";
import { uploadRouter } from "./api/upload.js";
import { connectDB, query } from "./config/db.js";
import dotenv from "dotenv";
import { cardRouter } from "./api/card.js";
import { dropRouter } from "./api/drop.js";
import { navbarRouter } from "./api/navbar.js";
import { warehouseCERouter } from "./api/warehouseCE.js";
import { requestRouter } from "./api/requests.js";
import { labourRouter } from "./api/labour.js";
import { equipmentRouter } from "./api/equipment.js";
import { leaveRouter } from "./api/leave.js";
import { fileuploadRouter } from "./api/fileupload.js";
import { commentRouter } from "./api/comment.js";
import { kanbanboardRouter } from "./api/kanbanbord.js";
import { cardInfoRouter } from "./api/cardInfo.js";
import { imageUploadRouter } from "./api/imageUpload.js";
import { imageRouter } from "./api/image.js";
import { labourLeaveRouter } from "./api/labourleave.js";
import Stripe from "stripe";
import { laborRouter } from "./api/labor.js";
import { iManagerRouter } from "./api/mCard.js";
import { iManagerERouter } from "./api/eCard.js";
import { iManagerMRRouter } from "./api/mRequest.js";
import { iManagerERRouter } from "./api/eRequest.js";
import { paymentRouter } from "./api/payment.js";
dotenv.config();
connectDB();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

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
app.use("/api/labourleave", labourLeaveRouter);
app.use("/api/labor", laborRouter);

//govindani

app.use("/api/card", cardRouter);
app.use("/api/drop", dropRouter);
app.use("/api/requests", requestRouter);
app.use("/api/labour", labourRouter);
app.use("/api/equipment", equipmentRouter);
app.use("/api/leave", leaveRouter);
app.use("/api/fileupload", fileuploadRouter);
app.use("/api/comment", commentRouter);
app.use("/api/kanbanbord", kanbanboardRouter);
app.use("/api/cardInfo", cardInfoRouter);
app.use("/api/imageUpload", imageUploadRouter);
app.use("/api/image", imageRouter);

//nilshan
app.use("/api/employee", employeeRouter);
app.use("/api/payment", paymentRouter);

//chamodi
app.use("/api/site", siteRouter);
app.use("/api/navbar", navbarRouter);
app.use("/api/warehouseCE", warehouseCERouter);
app.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

app.post("/create-payment-intent", async (req, res) => {
  console.log(req.body);
  const { amount } = req.body;
  console.log(amount);
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "EUR",
      amount: amount,
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
app.use("/api/material", iManagerRouter);
app.use("/api/equipment", iManagerERouter);
app.use("/api/mrequest", iManagerMRRouter);
app.use("/api/erequest", iManagerERRouter);

//rumindu

let onlineUsers = [];

const addNewUser = (employeeNo, socketId) => {
  console.log("Adding new user:", employeeNo, socketId);
  !onlineUsers.some((user) => user.employeeNo === employeeNo) &&
    onlineUsers.push({ employeeNo, socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (employeeNo) => {
  console.log(employeeNo);
  console.log(onlineUsers);
  console.log(onlineUsers.find((user) => user.employeeNo == employeeNo));
  return onlineUsers.find((user) => user.employeeNo == employeeNo);
};

// WebSocket server logic
io.on("connection", (socket) => {
  socket.on("newUser", async (employeeNo) => {
    console.log(socket.id);
    addNewUser(employeeNo, socket.id);
  });
  

  socket.on("sendEquipmentNotification", ({ reciver, sender }) => {
    console.log(reciver)
    reciver.map((el) => {
      const toUser = getUser(el.no);
      console.log(el.no, sender);
      io.to(toUser?.socketId).emit("getEquipmentNotification", {
        sender: sender,
        reciver: el.no,
        msg: "Equipment Add",
      });
    });

  });

  socket.on("sendEquipmentAcceptNotification", ({ reciver, sender }) => {
    console.log("reciver",reciver)
    reciver.map((el) => {
      const toUser = getUser(el.no);
      console.log(el.no, sender);
      io.to(toUser?.socketId).emit("getEquipmentAcceptNotification", {
        sender: sender,
        reciver: el.no,
        msg: "Equipment Request Approved",
      });
    });

  });

  socket.on("sendMessage", (data) =>{
    socket.emit("receiveMessage",data)
  })
  

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
