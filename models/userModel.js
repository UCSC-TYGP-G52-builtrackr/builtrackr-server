import { query } from "../config/db.js";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";

const userExists = async (email) => {
  try {
    const userExistsQuery = "SELECT * FROM users WHERE company_email = $1";
    const userExists = await query(userExistsQuery, [email]);

    return userExists.rowCount > 0 ? true : false;
  } catch (error) {
    throw new Error(`Internal Error. Try again later`);
  }
};

// login user with the given email and password
const loginUser = asyncHandler(async (email, password) => {
  const userDetailsQuery = "SELECT * FROM users WHERE company_email = $1";
  const employeeDetailsQuery =
    "SELECT e.*,r.role_name FROM employee AS e INNER JOIN user_roles as r ON e.company_id = r.company_id AND e.type = r.type  WHERE email = $1";
  console.log("1");
  try {
    const userDetails = await query(userDetailsQuery, [email]);
    const employeeDetails = await query(employeeDetailsQuery, [email]);
    console.log("2");
    if (userDetails.rowCount > 0) {
      console.log("3");
      const user = userDetails.rows[0];
      const matchPassword = await bcrypt.compare(password, user.password);
      if (matchPassword) {
        console.log("4");
        return user;
      } else {
        console.log("5");
        return "Password was Incorect";
      }
    } else if (employeeDetails.rowCount > 0) {
      console.log("6");
      const employee = employeeDetails.rows[0];
      const matchPassword2 = await bcrypt.compare(password, employee.password);
      if (matchPassword2) {
        console.log("7");
        return employee;
      } else {
        console.log("8");
        return "Password was Incorect";
      }
    } else {
      console.log("9");
      const employeeDetailsQuery2 =
        "SELECT *,'HR Manager' AS role_name FROM employee  WHERE email = $1";
      try {
        console.log("10");
        const employeeDetails2 = await query(employeeDetailsQuery2, [email]);
        if (employeeDetails2.rowCount > 0) {
          console.log("11");
          const employee2 = employeeDetails2.rows[0];
          const matchPassword3 = await bcrypt.compare(
            password,
            employee2.password
          );
          if (matchPassword3) {
            console.log("12");
            return employee2;
          } else {
            console.log("13");
            return "Password was Incorect";
          }
        } else {
          console.log("14");
          return "Email does not exist";
        }
      } catch (err) {
        throw new Error("Internal Error");
      }
    }
  } catch (err) {
    console.log("15");
    throw new Error("Internal Error");
  }
});

// register a new company
const regUser = asyncHandler(
  async (
    email,
    name,
    regNo,
    line1,
    line2,
    contactNo,
    certificate,
    username,
    password,
    company_id,
    plan
  ) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let sites;
    let amount;
    if (plan === 1) {
      sites = 2;
      amount = 5000;
    } else if (plan == 2) {
      sites = 5;
      amount = 20000;
    } else if (plan === 3) {
      sites = 20;
      amount = 30000;
    }

    const createUser = await query(
      "SELECT insert_user_and_payment($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,$12,$13)",
      [
        name,
        regNo,
        "nameofphoto",
        email,
        line1,
        line2,
        contactNo,
        username,
        hashedPassword,
        1,
        sites,
        1,
        amount,
      ]
    );

    if (createUser.rowCount > 0) {
      return createUser.rows[0];
    } else {
      throw new Error("Internal Error");
    }
  }
);

// update user details
const updateUser = asyncHandler(async (userId, name, email, password) => {
  let hashedPassword;
  if (password) {
    // Hash the new password
    hashedPassword = await bcrypt.hash(password, 10);
  }
  const updateUserQuery = `
      UPDATE users
      SET name = COALESCE($1, name),
          email = COALESCE($2, email),
          password = COALESCE($3, password)
      WHERE id = $4
      RETURNING id, name, email
    `;
  const updateUserValues = [name, email, hashedPassword, userId];
  const updatedUser = await query(updateUserQuery, updateUserValues);

  if (updatedUser.rowCount > 0) {
    return updatedUser.rows[0];
  } else {
    throw new Error("Internal Error");
  }
});

// get the user with the given user id
const getUserFromToken = asyncHandler(async (userId) => {
  const getUserQuery = "SELECT * FROM users WHERE id = $1";
  const getUser = await query(getUserQuery, [userId]);

  if (getUser.rowCount > 0) {
    return getUser.rows[0];
  } else {
    throw new Error("Invalid token");
  }
});

const addeUserRole = asyncHandler(async (name, type, id) => {
  let image;
  if (type === 2) {
    image = "Inventory.jpeg";
  } else if (type === 3) {
    image = "CheifEngineer.jpeg";
  } else if (type === 4) {
    image = "SiteEngineer.jpeg";
  } else if (type === 5) {
    image = "Supervisor.jpg";
  }

  try {
    const createQuery =
      "INSERT INTO user_roles (role_name,photo_path, company_id, type) VALUES ($1, $2, $3,$4) RETURNING role_id";
    const result = await query(createQuery, [name, image, id, type]);
    return result.rows[0];
  } catch (err) {
    throw new Error("Internal error");
  }
});

const addeUserPrivileges = asyncHandler(async (role_id, privilege) => {
  try {
    const createQuery =
      "INSERT INTO role_priviliges (role_id,privilege) VALUES ($1, $2) RETURNING role_id ";
    const result = await query(createQuery, [role_id, privilege]);
    return result.rows[0];
  } catch (err) {
    throw new Error("Internal error");
  }
});

const allPrivileges = asyncHandler(async () => {
  try {
    const getQuery = "SELECT * FROM privileges";
    const result = await query(getQuery);
    return result.rows;
  } catch (err) {
    throw new Error("Internal error");
  }
});

const userRoles = asyncHandler(async (id) => {
  try {
    const userRolesQuery = "SELECT * FROM user_roles WHERE company_id = $1";
    const result = await query(userRolesQuery, [id]);
    return result.rows;
  } catch (err) {
    throw new Error("Internal error");
  }
});

const rolePrivileges = asyncHandler(async (id) => {
  try {
    const getQuery = " SELECT * FROM role_priviliges WHERE role_id = $1";
    const result = await query(getQuery, [id]);
    return result.rows;
  } catch (err) {
    throw new Error("Internal error");
  }
});
const checkEmailType = asyncHandler(async (email) => {
  const query1 = "Select * from users where company_email=$1";
  const query2 = "Select * from employee where email=$1";
  try {
    const result1 = await query(query1, [email]);
    const result2 = await query(query2, [email]);

    if (result1.rowCount > 0) {
      return 1;
    } else if (result2.rowCount > 0) {
      return 2;
    }
  } catch (err) {
    throw new Error("Internal Error");
  }
});

const resetUserPassword = asyncHandler(async (email, password, type) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    if (type === 1) {
      const result = await query(
        "UPDATE users SET password = $1 WHERE company_email =$2",
        [hashedPassword, email]
      );
      return result;
    } else if (type == 2) {
      const result = await query(
        "UPDATE employee SET password = $1 WHERE email =$2",
        [hashedPassword, email]
      );
      return result;
    }
  } catch (err) {
    throw new Error("Internal Error");
  }
});

const siteAddons = asyncHandler(async (company_id, amount) => {
  const addQuery =
    "INSERT INTO payment (company_id, type, sites, currente, amount) VALUES ($1,$2,$3,$4,$5)";
  try {
    const result = await query(addQuery, [
      company_id,
      2,
      amount / 5000,
      1,
      amount,
    ]);
    return result;
  } catch (err) {
    throw new Error("Internal Error");
  }
});

export {
  userExists,
  regUser,
  loginUser,
  updateUser,
  getUserFromToken,
  addeUserRole,
  addeUserPrivileges,
  allPrivileges,
  userRoles,
  rolePrivileges,
  checkEmailType,
  resetUserPassword,
  siteAddons,
};
