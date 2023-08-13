import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateTokens.js";
import { query } from "../config/db.js";
import {
  userExists,
  regUser,
  loginUser,
  updateUser,
  userRoles,
  addeUserPrivileges,
  allPrivileges,
  addeUserRole,
  rolePrivileges,
} from "../models/userModel.js";
import bcrypt from "bcrypt";

const existUser = asyncHandler(async(req,res) => {
  const {email} = req.body
  console.log(email)
  try {
    const userExist = await userExists(email);
    console.log(userExist)
    if(userExist){
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

// @desc    Auth user/set token
// route    POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);

  try {
    const user = await loginUser(email, password);

    if (user === "Password was Incoorect") {
      res.status(400).json({ error: "Password was Incoorect" });
    } else if (user === "Email does not exist") {
      res.status(400).json({ error: "Email does not exist" });
    } else {
      generateToken(res, user.company_id);
      res.status(201).json({
        id: user.company_id,
        name: user.company_name,
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @desc    Register user
// route    POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const {
    email,
    name,
    regNo,
    line1,
    line2,
    contactNo,
    certificate,
    username,
    password,
  } = req.body;
  console.log(req.body);

  // const userExist = await userExists(email);

  // if (userExist) {
  //   res.status(400);
  //   throw new Error("User already exists");
  // }

  const user = await regUser(
    email,
    name,
    regNo,
    line1,
    line2,
    contactNo,
    certificate,
    username,
    password
  );

  if (user) {
    res.status(201).json({
      id: user.company_id,
      name: user.company_name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Logout user
// route    POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logged out" });
});

// @desc    Get user profile
// route    POST /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    id: req.user.rows[0].id,
    name: req.user.rows[0].name,
    email: req.user.rows[0].email,
  };
  res.status(200).json(user);
});

// @desc    Update user profile
// route    PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userId = req.user.id;

  const updatedUser = await updateUser(userId, name, email, password);
  if (updateUser) {
    res.status(200).json({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const createUserRole = asyncHandler(async (req, res) => {
  const { name, type, company_id } = req.body;
  console.log(req.body);
  const customFileName = req.file;

  const addRole = await addeUserRole(name, type, company_id);

  if (addRole) {
    res.status(200).json({
      id: addRole.role_id,
    });
  } else {
    res.status(404);
    throw new Error("User role not added succsesfully");
  }
});

const getUserRoles = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const result = await userRoles(id);
  res.status(200).json(result);
});

const getPrivileges = asyncHandler(async (req, res) => {
  const result = await allPrivileges();
  res.status(200).json(result);
});

const getRolePrivileges = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const result = await rolePrivileges(id);
  res.status(200).json(result);
});

export {
  existUser,
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUserRoles,
  getPrivileges,
  createUserRole,
  getRolePrivileges,
};
