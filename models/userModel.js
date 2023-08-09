import { query } from "../config/db.js";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";

const userExists = async (email) => {
  try {
    const userExistsQuery = "SELECT * FROM users WHERE company_email = $1";
    const userExists = await query(userExistsQuery, [email]);

    return userExists.rowCount > 0 ? true : false;
  } catch (error) {
    console.error(`Error checking user existence: ${error.message}`);
    throw new Error(`Internal Error`);
  }
};

// login user with the given email and password
const loginUser = asyncHandler(async (email, password) => {
  const userDetailsQuery = "SELECT * FROM users WHERE company_email = $1";
  const userDetails = await query(userDetailsQuery, [email]);
  if (userDetails.rowCount > 0) {
    const user = userDetails.rows[0];
    // const matchPassword = await bcrypt.compare(password, user.password);
    const matchPassword = user.password === password

    return matchPassword ? user : false;
  } else {
    throw new Error("Email does not exist");
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
    password
  ) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createUser = await query(createUserQuery, [
      name,
      regNo,
      "nameofphoto",
      email,
      line1,
      line2,
      contactNo,
      username,
      hashedPassword,
    ]);
    if (createUser.rowCount > 0) {
      // Upload file
      upload.single(certificate);
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
  try {
    const createQuery =
      "INSERT INTO user_roles (role_name, company_id, type) VALUES ($1, $2, $3) RETURNING role_id";
    const result = await query(createQuery, [name, id, type]);
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
};
