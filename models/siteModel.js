import { query } from "../config/db.js";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";

const addSite = async (
  siteName,
  siteDesc,
  siteType,
  siteClient,
) => {
  
  const addSiteQuery =
    "INSERT INTO consite ( site_name, site_desc, site_type, site_client ) VALUES ($1, $2, $3, $4)";

  try {
    const createSite = await query(addSiteQuery, [
      siteName,
      siteDesc,
      siteType,
      siteClient
    ]);

    if (createSite.rowCount > 0) {
      return createSite.rows[0];
    } else {
      throw new Error("Site not added");
    }
  } catch (err) {
    throw new Error(err);
  }
};

const addCustomer = async (
  fName,
  lName,
  email,
  contNo,
  confpwd,
) => {
  
  const addCustomerQuery =
    "INSERT INTO customer ( cust_fname, cust_lname, cust_email, cust_tel, cust_pwd ) VALUES ($1, $2, $3, $4, $5)";

  try {
    const createCustomer = await query(addCustomerQuery, [
      fName,
      lName,
      email,
      contNo,
      confpwd,
    ]);

    if (createCustomer.rowCount > 0) {
      return createCustomer.rows[0];
    } else {
      throw new Error("Customer not added");
    }
  } catch (err) {
    throw new Error(err);
  }
};

const siteDisplay = asyncHandler(async () => {
  try {
    const sitesQuery = "SELECT * FROM consite";
    const result = await query(sitesQuery);
    return result.rows;
  } catch (err) {
    throw new Error("Internal error");
  }
});

const singleSiteDisplay = asyncHandler(async (id) => {
  try {
    const singleSiteQuery = "SELECT * FROM consite WHERE site_id = $1";
    const result = await query(singleSiteQuery, [id]);
    return result.rows;
  } catch (err) {
    throw new Error("Internal error");
  }
});

const fetchAllCustomers = asyncHandler(async () => {
  try {
    const custFetchQuery = "SELECT cust_id, CONCAT(cust_fname, ' ', cust_lname) AS cust_name FROM Customer";
    const result = await query(custFetchQuery);
    return result.rows;
  } catch (err) {
    throw new Error("Internal error");
  }
});

const checkCustDetails = asyncHandler(async (email, password) => {
  try {
    const customerQuery = "SELECT * FROM customer WHERE cust_email = $1"
    const employeeQuery = "SELECT * FROM employee WHERE email = $1 AND type = 3";

    //customer authentication
    const customerResult = await query(customerQuery, [email]);
    
    if (customerResult.rows.length > 0) {
      const customer = customerResult.rows[0];
      if (password === customer.cust_pwd) {
        return { success: true, message: 'Password is correct', customerID: customer.cust_id, userType: 'customer' };
      } else {
        return { success: false, message: 'Incorrect password' };
      }
    }

    //employee authentication
    const employeeResult = await query(employeeQuery, [email]);
    if (employeeResult.rows.length > 0) {
      const employee = employeeResult.rows[0];
      if (password === employee.password) {
        return { success: true, message: 'Password is correct', employeeID: employee.id, userType: 'supervisor' };
      } else {
        return { success: false, message: 'Incorrect password' };
      }
    }
  // No record with the provided email was found in either table
    return { success: false, message: 'User not found' };
  } catch (err) {
    throw new Error("Internal error");
  }
});

const customerAllSites = asyncHandler(async (customerID) => {
  try {
    const siteQuery = "SELECT * FROM consite WHERE site_client = $1";
    const result = await query(siteQuery, [customerID]);
    return result.rows;
  } catch (err) {
    throw new Error("Internal error");
  }
});

export { addSite, addCustomer, siteDisplay, singleSiteDisplay, fetchAllCustomers, checkCustDetails, customerAllSites };