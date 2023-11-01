import { query } from "../config/db.js";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";

const addWarehouseFunc = async (
    warehouseName,
    warehousePhone,
    warehouseAddr,
    companyID
  ) => {
    
    const addWarehouseQuery =
      "INSERT INTO warehouse ( name, address, tel_no, company_id ) VALUES ($1, $2, $3, $4)";
  
    try {
      const createWarehouse = await query(addWarehouseQuery, [
        warehouseName,
        warehousePhone,
        warehouseAddr,
        companyID
      ]);
  
      if (createWarehouse.rowCount > 0) {
        return createWarehouse.rows[0];
      } else {
        throw new Error("Warehouse not added");
      }
    } catch (err) {
      throw new Error(err);
    }
  };

const warehouseDisplay = asyncHandler(async (companyID) => {
    try {
      const warehouseGetQuery = "SELECT * FROM warehouse WHERE company_id = $1";
      const result = await query(warehouseGetQuery, [companyID]);
      return result.rows;
    } catch (err) {
      throw new Error("Internal error");
    }
  });

  const singleWarehouse = asyncHandler(async (id) => {
    try {
      const singleWarehouseQuery = "SELECT * FROM warehouse WHERE warehouse_id = $1";
      const result = await query(singleWarehouseQuery, [id]);
      return result.rows;
    } catch (err) {
      throw new Error("Internal error");
    }
  });
  
  const availWarehouseManagers = asyncHandler(async (companyID) => {
    try {
      const wmanagersFetchQuery = "SELECT e.*, CONCAT(e.f_name, ' ', e.l_name) AS full_name FROM employee e LEFT JOIN inventory_manager im ON e.no = im.employee_id WHERE e.type = 2 AND (im.employee_id IS NULL OR (SELECT COUNT(DISTINCT employee_id) FROM inventory_manager WHERE employee_id = e.no) = 1) AND e.company_id = $1";
      const result = await query(wmanagersFetchQuery, [companyID]);
      return result.rows;
    } catch (err) {
      throw new Error("Internal error");
    }
  });

  const checkAssignedWarehouse = asyncHandler(async (warehouseId) => {
    try {
      const checkWAssignedQuery = "SELECT e.*, CONCAT(e.f_name, ' ', e.l_name) AS full_name FROM employee e WHERE e.no IN (SELECT employee_id FROM inventory_manager WHERE warehouse_id = $1)";
      const result = await query(checkWAssignedQuery, [warehouseId]);
      return result.rows;
    } catch (err) {
      throw new Error("Internal error");
    }
  });

  const assignInvManagerUpdate = asyncHandler(async (warehouseId, selectedPersonNo) => {
    try {
      const updateWarehouseIDQuery = "INSERT INTO inventory_manager (employee_id, warehouse_id) VALUES ($1, $2)";
      const result = await query(updateWarehouseIDQuery, [selectedPersonNo, warehouseId]);
      return result.rows;
    } catch (err) {
      throw new Error("Internal error");
    }
  });

  const unassignInvManagerUpdate = asyncHandler(async (warehouseId) => {
    try {
      // const updateSiteIDQuery = "UPDATE site_manager AS sm SET site_id = site_id + 1 WHERE employee_id = (SELECT e.no from employee AS e WHERE e.no = $1 AND e.company_id = $2)";
      const unassignInvQuery = "DELETE FROM inventory_manager WHERE warehouse_id = $1";
      const result = await query(unassignInvQuery, [warehouseId]);
      return result.rows;
    } catch (err) {
      throw new Error("Internal error");
    }
  });

export { addWarehouseFunc, warehouseDisplay, singleWarehouse, availWarehouseManagers, assignInvManagerUpdate, unassignInvManagerUpdate, checkAssignedWarehouse };