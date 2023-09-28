import asyncHandler from "express-async-handler";
import { transporter } from "../utils/mailer.js";

import {
  addEmployee,
  getEmployeesByType,
  getAllEmployeesDetails,
  employeeExists,
  employeeExistByType,
  employeeExistById,
  labourerExists,
  labourerExistById,
  getEmployeesCount,
  addLaboures,
  getAllLabourers,
} from "../models/employeeModel.js";
import generateToken from "../utils/generateTokens.js";

const existEmployee = asyncHandler(async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    const employeeExist = await employeeExists(email);
    console.log("Hello");
    if (employeeExist) {
      res.status(201).json({
        status: true,
      });
    } else {
      res.status(201).json({
        status: false,
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
const existEmployeeByType = asyncHandler(async (req, res) => {
  const { company_id, type } = req.body;
  
  try {
    const employeeExistType = await employeeExistByType(type, company_id);
    if (employeeExistType) {
      res.status(201).json({
        status: true,
      });
    } else {
      res.status(201).json({
        status: false,
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
const existEmployeeById = asyncHandler(async (req, res) => {
  const { company_id, employee_id } = req.body;
  try {
    const employeeExistId = await employeeExistById(employee_id, company_id);
    if (employeeExistId) {
      res.status(201).json({
        status: true,
      });
    } else {
      res.status(201).json({
        status: false,
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
const existLabourer = asyncHandler(async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    const labourerExist = await labourerExists(email);
    console.log(labourerExist);
    if (labourerExist) {
      res.status(201).json({
        status: true,
      });
    } else {
      res.status(201).json({
        status: false,
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const existLabourerById = asyncHandler(async (req, res) => {
  const { company_id, employee_id } = req.body;
  try {
    const labourerExistId = await labourerExistById(employee_id, company_id);
    if (labourerExistId) {
      res.status(201).json({
        status: true,
      });
    } else {
      res.status(201).json({
        status: false,
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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
    imageName,
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
      type,
      imageName
    );
    let options = {
      from: "builtrackrverifyn@gmail.com",
      to: `${email}`,
      subject: "Succesfully register into the system",
      html: `<p>You havv been succesfully registerd into bulitrackr system by Company Admin</p>
            <p> Now yo can login into the system using given credebtials<p/>
            <p> Username : ${email}</p>
            <p> Password : ${password}</p>
            <p>Click here to login : http://localhost:3000/login </p>`,
    };
    transporter.sendMail(options, function (error, info) {
      if (error) {
        console.log(error);
        res.status(201).send("Email not send");
      } else {
        res.status(200).json({
          no: employee.no,
        });
      }
    });
  } catch (err) {
    throw new Error(err);
  }
});

const addLabourer = asyncHandler(async (req, res) => {
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
    company_id,
    imageName,
  } = req.body;

  console.log(req.body);

  try {
    const labourer = await addLaboures(
      fName,
      lName,
      nic,
      phone,
      id,
      email,
      dob,
      registerDate,
      address,
      company_id,
      imageName
    );

    res.status(200).json({
      no: labourer.no,
    });
  } catch (err) {
    throw new Error(err);
  }
});

// const loginEmployee = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const employee = await authEmployee(email, password);

//     if (employee === "Password was Incoorect") {
//       res.status(400).json({ error: "Password was Incoorect" });
//     } else if (employee === "Email does not exist") {
//       res.status(400).json({ error: "Email does not exist" });
//     } else {
//       generateToken(res, employee.no);
//       res.status(201).json({
//         employee_id: employee.no,
//         name: `${employee.f_name} ${employee.l_name}`,
//         type: employee.type,
//         company_id: employee.company_id,
//         role_name: employee.role_name,
//       });
//     }
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
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

const getLabourers = asyncHandler(async (req, res) => {
  const { id } = req.body;
  try {
    const labourers = await getAllLabourers(id);
    if (labourers) {
      res.status(200).json(labourers);
    } else {
      res.status(401).json({ message: "Not success" });
    }
  } catch (err) {
    throw new Error(err);
  }
});

const getAllEmployees = asyncHandler(async (req, res) => {
  const { id, type } = req.body;
  console.log(id);
  try {
    const employees = await getAllEmployeesDetails(id, type);
    if (employees) {
      res.status(200).json(employees);
    } else {
      res.status(401).json({ message: "Not success" });
    }
  } catch (err) {
    throw new Error(err);
  }
});
const getAllemployeesCount = asyncHandler(async (req, res) => {
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
});

export {
  registerEmployee,
  test,
  getEmployees,
  getAllEmployees,
  existEmployee,
  existEmployeeByType,
  existEmployeeById,
  existLabourer,
  existLabourerById,
  addLabourer,
  getAllemployeesCount,
  getLabourers,
};
