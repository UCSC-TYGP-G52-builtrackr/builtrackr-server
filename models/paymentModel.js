import { query } from "../config/db.js";
import asyncHandler from "express-async-handler";

const currentPaymentDetails = asyncHandler(async (id) => {
  console.log(id);
  const paymentQuery =
    "SELECT * FROM payment_history WHERE company_id = $1 AND currente = 1 AND type =1 ";
  try {
    const payments = await query(paymentQuery, [id]);
    console.log(payments);

    return payments.rowCount > 0 ? payments.rows[0] : false;
  } catch (error) {
    throw new Error(`Internal Error. Try again later`);
  }
});

export { currentPaymentDetails };
