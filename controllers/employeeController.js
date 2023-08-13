import asyncHandler from "express-async-handler";
import {
  addEmployee,
  authEmployee,
  getEmployeesByType,
} from "../models/employeeModel.js";
import generateToken from "../utils/generateTokens.js";

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

const loginEmployee = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);
  console.log(email);

  const employee = await authEmployee(email, password);
  console.log(employee);

  if (employee) {
    generateToken(res, employee.no);
    res.status(201).json({
      employee_id: employee.no,
      name: `${employee.f_name} ${employee.l_name}`,
      type: employee.type,
      company_id: employee.company_id,
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});
const test = asyncHandler(async (req, res) => {
  generateToken(res, 10);
  res.status(201).json({
    state: "ok",
  });
});

const getEmployees = asyncHandler(async (req, res) => {
  const { id, type } = req.body;
  try {
    const employees = await getEmployeesByType(id, type);
    if (employees) {
      res.status(200).json(employees);
    } else {
      res.status(401).json({ message: "Not success" });
    }
  } catch (err) {
    throw new Error(err);
  }
});

export { registerEmployee, loginEmployee, test, getEmployees };
