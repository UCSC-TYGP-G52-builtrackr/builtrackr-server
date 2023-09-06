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

const authEmployee = async(email,password) =>{
  const employeeDetailsQuery = "SELECT * FROM employee WHERE email = $1";
  const employeeDetails = await query(employeeDetailsQuery, [email]);
  if (employeeDetails.rowCount > 0) {
    const employee = employeeDetails.rows[0];
    const matchPassword = await bcrypt.compare(password, employee.password);

    return matchPassword ? employee : false;
  } else {
    throw new Error("Email does not exist");
  }
}

const getEmployeesByType = async(id,type) => {
  console.log(id,type);
  const employeeDetailsQuery = "SELECT * FROM employee WHERE company_id = $1 AND type = $2";
  try {
    const employeeDetails = await query (employeeDetailsQuery, [id,type])
    if (employeeDetails.rowCount > 0) {
      return employeeDetails.rows;
    } else {
      throw new Error("No employee records1111");
    }
  } catch (err) {
    throw new Error(err);
  }
}

export { addEmployee,authEmployee,getEmployeesByType };
