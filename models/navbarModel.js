import { query } from "../config/db.js";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";

const fetchCompName = asyncHandler(async (companyID) => {
  try {
    const navQuery = "SELECT * FROM users WHERE company_id = $1";
    const result = await query(navQuery, [companyID]);
    return result.rows;
  } catch (err) {
    throw new Error("Internal error");
  }
});

export { fetchCompName };