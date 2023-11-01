import { query } from "../config/db.js";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";

const fetchCompName = asyncHandler(async (companyID, employeeNo) => {
  try {
    // const navQuery = "SELECT * FROM users WHERE company_id = $1";
    const navQuery = "SELECT users.*, employee.photo_path FROM users INNER JOIN employee on users.company_id = employee.company_id WHERE users.company_id = $1 AND employee.no = $2";
    const result = await query(navQuery, [companyID, employeeNo]);
    return result.rows;
  } catch (err) {
    throw new Error("Internal error");
  }
});

export { fetchCompName };