import { query } from "../config/db.js";
import asyncHandler from "express-async-handler";

const paymentDetails = asyncHandler(async (id) => {
  console.log(id);
  const paymentQuery = "SELECT * FROM payment WHERE company_id = $1 ";
  try {
    const payments = await query(paymentQuery, [id]);
    return payments.rows;
  } catch (error) {
    throw new Error(`Internal Error. Try again later`);
  }
});

export { paymentDetails };
