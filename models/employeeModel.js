import { query } from "../config/db.js";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";

const addEmployee = async (
  fName,
  lName,
  nic,
  phone,
  id,
  email,
  dob,
  registerDate,
  address,
  password,
  company_id,
  type
) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const createEmployeeQuery =
    "INSERT INTO employee (f_name ,l_name,nic,tel_no,id,email,address,dob,register_date,password,company_id,type ) VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING no ";

  try {
    const createEmployee = await query(createEmployeeQuery, [
      fName,
      lName,
      nic,
      phone,
      id,
      email,
      address,
      dob,
      registerDate,
      hashedPassword,
      company_id,
      type,
    ]);

    if (createEmployee.rowCount > 0) {
      return createEmployee.rows[0];
    } else {
      throw new Error("Employee adding not sucess");
    }
  } catch (err) {
    throw new Error(err);
  }
};

export { addEmployee };
