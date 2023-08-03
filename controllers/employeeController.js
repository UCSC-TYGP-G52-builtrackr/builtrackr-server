import asyncHandler from "express-async-handler";
import { addEmployee } from "../models/employeeModel.js";

const registerEmployee = asyncHandler(async (req, res) => {
  const {
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
    type,
  } = req.body;

  console.log(req.body);

  try {
    const employee = await addEmployee(
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
    );
    res.status(200).json({
      no: employee.no,
    });
  } catch (err) {
    throw new Error(err);
  }
});

export { registerEmployee };
