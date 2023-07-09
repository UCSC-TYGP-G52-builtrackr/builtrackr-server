import { query } from '../config/db.js'
import bcrypt from 'bcrypt'
import asyncHandler from 'express-async-handler'
import multer from 'multer'

const userExists = async (email) => {
    try {
      const userExistsQuery = 'SELECT * FROM users WHERE company_email = $1'
      const userExists = await query(userExistsQuery, [email])
  
      return userExists.rowCount > 0 ? true : false
    } catch (error) {
      console.error(`Error checking user existence: ${error.message}`)
      throw new Error(`Internal Error`)
    }
  }
  
  // login user with the given email and password
  const loginUser = asyncHandler(async (email, password) => {
    const userDetailsQuery = 'SELECT * FROM users WHERE company_email = $1'
    const userDetails = await query(userDetailsQuery, [email])
    if (userDetails.rowCount > 0) {
      const user = userDetails.rows[0]
      const matchPassword = await bcrypt.compare(password, user.password)
  
      return matchPassword ? user : false
    } else {
      throw new Error('Email does not exist')
    }
  })
  
  // register a new company
  const regUser = asyncHandler(async (email, name, regNo, line1, line2, contactNo,certificate,username,password) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const upload = multer({ dest: '../../client/src/uploads' });

    
  
    const createUserQuery =
      'INSERT INTO users (company_name ,reg_no ,br_path ,company_email ,address_line_1 ,address_line_2 ,tel_no ,user_name ,password ) VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9) RETURNING company_id, company_name, company_email'
    const createUser = await query(createUserQuery, [name,regNo, certificate.name ,email, line1, line2, contactNo,username,hashedPassword])
    if (createUser.rowCount > 0) {
      // Upload file
      upload.single(certificate)
      return createUser.rows[0]
    } else {
      throw new Error('Internal Error')
    }
  })
  
  // update user details
  const updateUser = asyncHandler(async (userId, name, email, password) => {
    let hashedPassword
    if (password) {
      // Hash the new password
      hashedPassword = await bcrypt.hash(password, 10)
    }
    const updateUserQuery = `
      UPDATE users
      SET name = COALESCE($1, name),
          email = COALESCE($2, email),
          password = COALESCE($3, password)
      WHERE id = $4
      RETURNING id, name, email
    `
    const updateUserValues = [name, email, hashedPassword, userId]
    const updatedUser = await query(updateUserQuery, updateUserValues)
  
    if (updatedUser.rowCount > 0) {
      return updatedUser.rows[0]
    } else {
      throw new Error('Internal Error')
    }
  })
  
  // get the user with the given user id
  const getUserFromToken = asyncHandler(async (userId) => {
    const getUserQuery = 'SELECT * FROM users WHERE id = $1'
    const getUser = await query(getUserQuery, [userId])
  
    if (getUser.rowCount > 0) {
      return getUser.rows[0]
    } else {
      throw new Error('Invalid token')
    }
  })
  
  export { userExists, regUser, loginUser, updateUser, getUserFromToken }