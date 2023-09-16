import asyncHandler from "express-async-handler";
import { currentPaymentDetails } from "../models/paymentModel.js";

const currentPayment = asyncHandler(async (req, res) => {
  const { company_id } = req.body;
  try {
    const payments = await currentPaymentDetails(company_id);
    if (payments) {
      res.status(200).json(payments);
    } else {
      res.status(401).json({ message: "No Payment details" });
    }
  } catch (err) {
    throw new Error(err);
  }
});

export { currentPayment };
