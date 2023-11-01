import { query } from "../config/db.js";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";

const addSite = async (
  siteName,
  siteDesc,
  siteType,
  siteClient,
  siteAddr,
  companyID
) => {
  
  const addSiteQuery =
    "INSERT INTO sites ( site_name, site_desc, site_type, client_id, site_addr, company_id ) VALUES ($1, $2, $3, $4, $5, $6)";

  try {
    const createSite = await query(addSiteQuery, [
      siteName,
      siteDesc,
      siteType,
      siteClient,
      siteAddr,
      companyID
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
  companyID,
) => {
  
  const addCustomerQuery =
    "INSERT INTO customer ( cust_fname, cust_lname, cust_email, cust_tel, cust_pwd, comp_id ) VALUES ($1, $2, $3, $4, $5, $6)";

  try {
    const createCustomer = await query(addCustomerQuery, [
      fName,
      lName,
      email,
      contNo,
      confpwd,
      companyID,
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

const siteDisplay = asyncHandler(async (companyID) => {
  try {
    const sitesQuery = "SELECT * FROM sites WHERE company_id = $1";
    const result = await query(sitesQuery, [companyID]);
    return result.rows;
  } catch (err) {
    throw new Error("Internal error");
  }
});

const singleSiteDisplay = asyncHandler(async (id) => {
  try {
    // const singleSiteQuery = "SELECT * FROM sites WHERE site_id = $1";
    // const singleSiteQuery = "SELECT s.*,(SELECT COUNT(*) FROM tasks t  WHERE s.site_id = t.siteid) AS task_count, (SELECT COUNT(*) FROM tasks t WHERE s.site_id = t.siteid AND t.status = 1) AS task_completed_count, CASE WHEN s.site_id = $1 THEN (SELECT c.image FROM activity c WHERE c.id = s.site_id) ELSE NULL END AS img_path FROM sites s WHERE s.site_id = $1";
    const singleSiteQuery = 'SELECT s.*,(SELECT COUNT(*) FROM tasks t  WHERE s.site_id = t.siteid) AS task_count, (SELECT COUNT(*) FROM tasks t WHERE s.site_id = t.siteid AND t.status = 1) AS task_completed_count FROM sites s WHERE s.site_id = $1';
    const result = await query(singleSiteQuery, [id]);
    return result.rows;
  } catch (err) {
    throw new Error("Internal error");
  }
});

const siteImagePath = asyncHandler(async (id) => {
  try {
    // const singleSiteQuery = "SELECT * FROM sites WHERE site_id = $1";
    // const siteImageQuery = "SELECT image FROM Card WHERE siteId = $1";
    const siteImageQuery = 'SELECT title, image, "taskId" FROM "Card" WHERE "siteId" = $1';
    const result = await query(siteImageQuery, [id]);
    return result.rows;
  } catch (err) {
    throw new Error("Internal error");
  }
});

const fetchAllCustomers = asyncHandler(async (companyID) => {
  try {
    const custFetchQuery = "SELECT cust_id, CONCAT(cust_fname, ' ', cust_lname) AS cust_name FROM Customer WHERE comp_id = $1";
    const result = await query(custFetchQuery, [companyID]);
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
        return { success: true, message: 'Password is correct', employeeNo: employee.no, userType: 'supervisor' };
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
    const siteQuery = "SELECT * FROM sites WHERE client_id = $1";
    const result = await query(siteQuery, [customerID]);
    return result.rows;
  } catch (err) {
    throw new Error("Internal error");
  }
});

const checkAssigned = asyncHandler(async (siteId) => {
  try {
    const checkAssignedQuery = "SELECT e.*, CONCAT(e.f_name, ' ', e.l_name) AS full_name FROM employee e WHERE e.no IN (SELECT employee_id FROM site_manager WHERE site_id = $1)";
    const result = await query(checkAssignedQuery, [siteId]);
    return result.rows;
  } catch (err) {
    throw new Error("Internal error");
  }
});


const availManagers = asyncHandler(async (companyID) => {
  try {
    const managersFetchQuery = "SELECT e.*, CONCAT(e.f_name, ' ', e.l_name) AS full_name FROM employee e LEFT JOIN site_manager sm ON e.no = sm.employee_id WHERE e.type = 4 AND (sm.employee_id IS NULL OR (SELECT COUNT(DISTINCT employee_id) FROM site_manager WHERE employee_id = e.no) = 1) AND e.company_id = $1";
    // const managersFetchQuery = "SELECT e.*, CONCAT(e.f_name, ' ', e.l_name) AS full_name FROM employee e LEFT JOIN site_manager sm ON e.no = sm.employee_id WHERE e.type = 4 AND (sm.site_id = 0 OR ( sm.site_id > 0  AND (SELECT COUNT(*) FROM site_manager sm2 WHERE sm2.employee_id = sm.employee_id AND sm2.site_id > 0) = 1))";
    const result = await query(managersFetchQuery, [companyID]);
    return result.rows;
  } catch (err) {
    throw new Error("Internal error");
  }
});

const assignManagerUpdate = asyncHandler(async (siteId, selectedPersonNo) => {
  try {
    // const updateSiteIDQuery = "UPDATE site_manager AS sm SET site_id = site_id + 1 WHERE employee_id = (SELECT e.no from employee AS e WHERE e.no = $1 AND e.company_id = $2)";
    const updateSiteIDQuery = "INSERT INTO site_manager (employee_id, site_id) VALUES ($1, $2)";
    const result = await query(updateSiteIDQuery, [selectedPersonNo, siteId]);
    return result.rows;
  } catch (err) {
    throw new Error("Internal error");
  }
});

const unassignManagerUpdate = asyncHandler(async (siteId) => {
  try {
    // const updateSiteIDQuery = "UPDATE site_manager AS sm SET site_id = site_id + 1 WHERE employee_id = (SELECT e.no from employee AS e WHERE e.no = $1 AND e.company_id = $2)";
    const unassignQuery = "DELETE FROM site_manager WHERE site_id = $1";
    const result = await query(unassignQuery, [siteId]);
    return result.rows;
  } catch (err) {
    throw new Error("Internal error");
  }
});

const allManagers = asyncHandler(async (companyID) => {
  try {
    // const managersGetQuery = "SELECT * FROM employee WHERE type = 4 AND company_id = $1";
    const managersGetQuery = "SELECT e.*, CONCAT(e.f_name, ' ', e.l_name) AS full_name, COUNT(sm.employee_id) AS site_manager_count FROM employee AS e LEFT JOIN site_manager AS sm ON e.no = sm.employee_id WHERE e.type = 4 AND e.company_id = $1 GROUP BY e.no";
    const result = await query(managersGetQuery, [companyID]);
    return result.rows;
  } catch (err) {
    throw new Error("Internal error");
  }
});

const allInManagers = asyncHandler(async (companyID) => {
  try {
    // const managersGetQuery = "SELECT * FROM employee WHERE type = 4 AND company_id = $1";
    const InmanagersGetQuery = "SELECT e.*, CONCAT(e.f_name, ' ', e.l_name) AS full_name, COUNT(sm.employee_id) AS site_manager_count FROM employee AS e LEFT JOIN site_manager AS sm ON e.no = sm.employee_id WHERE e.type = 4 AND e.company_id = $1 GROUP BY e.no";
    const result = await query(InmanagersGetQuery, [companyID]);
    return result.rows;
  } catch (err) {
    throw new Error("Internal error");
  }
});

const selectedManager = asyncHandler(async (employeeNo) => {
  try {
    const managerGetQuery = "SELECT COUNT(sm.site_id) AS assigned_sites_count, STRING_AGG(s.site_name, ', ') AS assigned_site_names FROM employee AS e LEFT JOIN site_manager AS sm ON e.no = sm.employee_id LEFT JOIN sites AS s ON sm.site_id = s.site_id WHERE e.no = $1 GROUP BY e.no, e.f_name";
    const result = await query(managerGetQuery, [employeeNo]);
    return result.rows;
  } catch (err) {
    throw new Error("Internal error");
  }
});

const siteAnalytics = asyncHandler(async (companyID) => {
  try {
    const siteAnalyticsQuery = "SELECT * FROM sites WHERE company_id = $1";
    const result = await query(siteAnalyticsQuery, [companyID]);
    return result.rows;
  } catch (err) {
    throw new Error("Internal error");
  }
});

export { addSite, addCustomer, siteDisplay, singleSiteDisplay, fetchAllCustomers, checkCustDetails, customerAllSites, checkAssigned, availManagers, assignManagerUpdate, unassignManagerUpdate, allManagers, selectedManager, siteImagePath, siteAnalytics, allInManagers };