import asyncHandler from "express-async-handler";
import {
  addEmployee,
  authEmployee,
  getEmployeesByType,
  getAllEmployeesDetails,
  employeeExists,
  getEmployeesCount
} from "../models/employeeModel.js";
import generateToken from "../utils/generateTokens.js";

const existEmployee = asyncHandler(async(req,res) => {
  const {email} = req.body
  console.log(email)
  try {
    const employeeExist = await employeeExists(email);
    console.log(employeeExist)
    if(employeeExist){
      res.status(201).json({
        status: true
      });
    }else{
      res.status(201).json({
        status: false
      });
    }
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

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

  try {
    const employee = await authEmployee(email, password);

    if (employee === "Password was Incoorect") {
      res.status(400).json({ error: "Password was Incoorect" });
    } else if (employee === "Email does not exist") {
      res.status(400).json({ error: "Email does not exist" });
    } else {
      generateToken(res, employee.no);
      res.status(201).json({
        employee_id: employee.no,
        name: `${employee.f_name} ${employee.l_name}`,
        type: employee.type,
        company_id: employee.company_id,
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
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
const getAllEmployees = asyncHandler(async (req, res) => {
  const { id, type } = req.body;
  console.log(id)
  try {
    const employees = await getAllEmployeesDetails(id, type);
    console.log(employees)
    if (employees) {
      res.status(200).json(employees);
    } else {
      res.status(401).json({ message: "Not success" });
    }
  } catch (err) {
    throw new Error(err);
  }
});
const getAllemployeesCount = asyncHandler(async(req,res) => {
  const { id } = req.body;
  try {
    const employees = await getEmployeesCount(id);
    if (employees) {
      res.status(200).json(employees);
    } else {
      res.status(401).json({ message: "No employee records" });
    }
  } catch (err) {
    throw new Error(err);
  }
})

export { registerEmployee, loginEmployee, test, getEmployees, getAllEmployees,existEmployee,getAllemployeesCount };
