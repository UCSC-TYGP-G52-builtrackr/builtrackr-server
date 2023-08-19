import { query } from "../config/db.js";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";

const employeeExists = async (email) => {
  try {
    const userExistsQuery = "SELECT * FROM employee WHERE email = $1";
    const userExists = await query(userExistsQuery, [email]);

    return userExists.rowCount > 0 ? true : false;
  } catch (error) {
    throw new Error(`Internal Error. Try again later`);
  }
};

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

const authEmployee = async (email, password) => {
  const employeeDetailsQuery = "SELECT * FROM employee WHERE email = $1";
  try {
    const employeeDetails = await query(employeeDetailsQuery, [email]);
    if (employeeDetails.rowCount > 0) {
      const employee = employeeDetails.rows[0];
      const matchPassword = await bcrypt.compare(password, employee.password);

      if (matchPassword) {
        return employee;
      } else {
        return "Password was Incoorect";
      }
    } else {
      return "Email does not exist";
    }
  } catch (err) {
    throw new Error("Internal Error");
  }
};

const getEmployeesByType = async (id, type) => {
  const employeeDetailsQuery =
    "SELECT * FROM employee WHERE company_id = $1 AND type = $2";
  try {
    const employeeDetails = await query(employeeDetailsQuery, [id, type]);
    if (employeeDetails.rowCount > 0) {
      return employeeDetails.rows;
    } else {
      throw new Error("No employee records");
    }
  } catch (err) {
    throw new Error(err);
  }
};

const getAllEmployeesDetails = async (id, type) => {
  const employeeDetailsQuery = `SELECT  e.*,u.role_name FROM employee as e INNER JOIN user_roles AS u ON e.type=u.type WHERE e.type = 1 and e.company_id = $1 UNION SELECT  e.*,u.role_name FROM employee as e INNER JOIN user_roles AS u ON e.type=u.type AND e.company_id=u.company_id WHERE e.company_id = $1`;
  try {
    const employeeDetails = await query(employeeDetailsQuery, [id]);
    if (employeeDetails.rowCount > 0) {
      return employeeDetails.rows;
    } else {
      throw new Error("No employee records");
    }
  } catch (err) {
    throw new Error(err);
  }
};

const getEmployeesCount = async (id) => {
  const countQuery = `select  count(*),'HR Manager' as role_name from employee where company_id=$1 and type=1
                      UNION SELECT  count(*),u.role_name FROM employee as e 
                      INNER JOIN user_roles AS u ON e.type=u.type AND e.company_id=u.company_id 
                      WHERE e.company_id = $1 group by role_name `;

  try {
    const employeeCount = await query(countQuery, [id]);
    if (employeeCount.rowCount === 1 && employeeCount.rows[0].count !== 0) {
      try {
        const userRolesQuery = "SELECT * FROM user_roles WHERE company_id = $1";
        const result = await query(userRolesQuery, [id]);
        const data = [];
        data.push({
          role_name: "HR Manager",
          count: employeeCount.rows[0].count,
        });
        result.rows.map((el) =>
          data.push({ role_name: el.role_name, count: 0 })
        );

        return data;
      } catch (error) {
        throw new Error(error);
      }
    } else if (employeeCount.rowCount > 1) {
      return employeeCount.rows;
    } else {
      console.log("ellllll0000000");
      return false;
    }
  } catch (err) {
    throw new Error(err);
  }
};

export {
  addEmployee,
  authEmployee,
  getEmployeesByType,
  getAllEmployeesDetails,
  employeeExists,
  getEmployeesCount,
};
