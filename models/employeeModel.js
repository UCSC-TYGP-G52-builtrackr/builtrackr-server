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
const employeeExistByType = async (type, company_id) => {
  try {
    const userExistsQuery =
      "SELECT * FROM employee WHERE company_id = $1 AND type = $2";
    const userExists = await query(userExistsQuery, [company_id, type]);

    return userExists.rowCount > 0 ? true : false;
  } catch (error) {
    throw new Error(`Internal Error. Try again later`);
  }
};

const employeeExistById = async (employee_id, company_id) => {
  try {
    const userExistsQuery =
      "SELECT * FROM employee WHERE company_id = $1 AND id = $2";
    const userExists = await query(userExistsQuery, [company_id, employee_id]);

    return userExists.rowCount > 0 ? true : false;
  } catch (error) {
    throw new Error(`Internal Error. Try again later`);
  }
};

const labourerExists = async (email) => {
  try {
    const labourerExistsQuery = "SELECT * FROM labourer WHERE email = $1";
    const labourerExists = await query(labourerExistsQuery, [email]);

    return labourerExists.rowCount > 0 ? true : false;
  } catch (error) {
    throw new Error(`Internal Error. Try again later`);
  }
};

const labourerExistById = async (employee_id, company_id) => {
  try {
    const userExistsQuery =
      "SELECT * FROM labourer WHERE company_id = $1 AND id = $2";
    const userExists = await query(userExistsQuery, [company_id, employee_id]);

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
  type,
  photo_path
) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  if (type === 4) {
    try {
      const createEmployee = await query(
        "SELECT add_site_manager($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12,$13)",
        [
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
          photo_path,
        ]
      );

      if (createEmployee.rowCount > 0) {
        return createEmployee.rows[0];
      } else {
        throw new Error("Employee adding not sucess");
      }
    } catch (err) {
      throw new Error(err);
    }
  } else if (type === 5) {
    try {
      const createEmployee = await query(
        "SELECT add_site_supervisor($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12,$13)",
        [
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
          photo_path,
        ]
      );

      if (createEmployee.rowCount > 0) {
        return createEmployee.rows[0];
      } else {
        throw new Error("Employee adding not sucess");
      }
    } catch (err) {
      throw new Error(err);
    }
  } else {
    const createEmployeeQuery =
      "INSERT INTO employee (f_name ,l_name,nic,tel_no,id,email,address,dob,register_date,password,company_id,type,photo_path ) VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING no ";

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
        photo_path,
      ]);

      if (createEmployee.rowCount > 0) {
        return createEmployee.rows[0];
      } else {
        throw new Error("Employee adding not sucess");
      }
    } catch (err) {
      throw new Error(err);
    }
  }
};

const addLaboures = async (
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
  photo_path
) => {
  try {
    const addLabourer = await query(
      "SELECT insert_labourer($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
      [
        fName,
        lName,
        nic,
        phone,
        id,
        email,
        address,
        dob,
        registerDate,
        company_id,
        photo_path,
      ]
    );

    if (addLabourer.rowCount > 0) {
      return addLabourer.rows[0];
    } else {
      throw new Error("Labourer adding not sucess");
    }
  } catch (err) {
    throw new Error(err);
  }
};

// const authEmployee = async (email, password) => {
//   const employeeDetailsQuery =
//     "SELECT e.*,r.role_name FROM employee AS e INNER JOIN user_roles as r ON e.company_id = r.company_id AND e.type = r.type  WHERE email = $1";
//   try {
//     const employeeDetails = await query(employeeDetailsQuery, [email]);
    
//     if (employeeDetails.rowCount > 0) {
//       const employee = employeeDetails.rows[0];
//       const matchPassword = await bcrypt.compare(password, employee.password);

//       if (matchPassword) {
//         return employee;
//       } else {
//         return "Password was Incoorect";
//       }
//     } else {
//       const employeeDetailsQuery2 =
//         "SELECT *,'HR Manager' AS role_name FROM employee  WHERE email = $1";
//       try {
//         console.log("2");
//         const employeeDetails2 = await query(employeeDetailsQuery2, [email]);
//         if (employeeDetails2.rowCount > 0) {
//           const employee2 = employeeDetails2.rows[0];
//           const matchPassword2 = await bcrypt.compare(
//             password,
//             employee2.password
//           );
//           if (matchPassword2) {
//             return employee2;
//           } else {
//             return "Password was Incoorect";
//           }
//         } else {
//           return "Email does not exist";
//         }
//       } catch (err) {
//         throw new Error("Internal Error");
//       }
//     }
//   } catch (err) {
//     throw new Error("Internal Error");
//   }
// };

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

const getAllLabourers = async (id) => {
  const labourerDetailsQuery = "SELECT * FROM labourer WHERE company_id = $1 ";
  try {
    const labourerDetails = await query(labourerDetailsQuery, [id]);
    if (labourerDetails.rowCount > 0) {
      return labourerDetails.rows;
    } else {
      throw new Error("No employee records");
    }
  } catch (err) {
    throw new Error(err);
  }
};

const getAllEmployeesDetails = async (id, type) => {
  const employeeDetailsQuery = `SELECT  	e.no,e.f_name ,e.l_name ,e.nic ,e.tel_no ,e.id ,e.email ,e.address ,e.dob ,e.register_date ,e.company_id ,e.type,e.photo_path,u.role_name FROM employee as e INNER JOIN user_roles AS u ON e.type=u.type WHERE e.type = 1 and e.company_id = $1 
                                UNION SELECT e.no,e.f_name ,e.l_name ,e.nic ,e.tel_no ,e.id ,e.email ,e.address ,e.dob ,e.register_date ,e.company_id ,e.type,e.photo_path,u.role_name FROM employee as e INNER JOIN user_roles AS u ON e.type=u.type AND e.company_id=u.company_id WHERE e.company_id = $1
                                UNION SELECT *, 'Labourer' AS role_name from labourer where company_id = $1 `;
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
                      WHERE e.company_id = $1 group by role_name  
                      UNION SELECT count(*),'Labourer' as role_name from labourer where company_id = $1`;

  try {
    const employeeCount = await query(countQuery, [id]);
    try {
      const userRolesQuery = "SELECT * FROM user_roles WHERE company_id = $1";
      const result = await query(userRolesQuery, [id]);
      const uniqueRoleNames = new Set([
        ...employeeCount.rows.map((item) => item.role_name),
        ...result.rows.map((role) => role.role_name),
      ]);

      // Create the resulting array with role name and count
      const resultArray = Array.from(uniqueRoleNames).map((roleName) => {
        const countItem = employeeCount.rows.find(
          (item) => item.role_name === roleName
        );
        const countValue = countItem ? parseInt(countItem.count) : 0;
        return { role_name: roleName, count: countValue };
      });
      console.log(resultArray);
      return resultArray;
    } catch (error) {}
  } catch (err) {
    throw new Error(err);
  }
};

export {
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
};