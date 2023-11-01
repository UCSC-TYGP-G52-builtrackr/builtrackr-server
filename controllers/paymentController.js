import asyncHandler from "express-async-handler";
import { paymentDetails } from "../models/paymentModel.js";

const allPaymentDetails = asyncHandler(async (req, res) => {
  const { company_id } = req.body;
  try {
    const payments = await paymentDetails(company_id);
    res.status(200).json(payments);
  } catch (err) {
    throw new Error(err);
  }
});

export { allPaymentDetails };
