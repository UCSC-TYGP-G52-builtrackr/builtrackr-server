import e from "express";
import { query } from "../config/db.js";

const viewSupervisor = async () => {
  try {
    const viewSupervisorQuery = "SELECT * FROM supervisor";
    const queryResult = await query(viewSupervisorQuery);
    return queryResult.rows;
  } catch (error) {
    console.error(`Error viewing supervisor: ${error.message}`);
    throw new Error(error.message);
  }
};

const selectSupervisor = async (supervisorID, supervisorName, siteID) => {
  try {
    console.log(siteID);
    const selectSupervisorQuery = `UPDATE site SET supervisorid = ${supervisorID} WHERE siteid = ${parseInt(
      siteID
    )}`;
    const queryResult = await query(selectSupervisorQuery);
    return queryResult.rows;
  } catch (error) {
    console.error(`Error selecting supervisor: ${error.message}`);
    throw new Error(error.message);
  }
};

const viewLabour = async () => {
  try {
    const viewLabourQuery = "SELECT * FROM labour";
    const queryResult = await query(viewLabourQuery);
    return queryResult.rows;
  } catch (error) {
    console.error(`Error viewing labour: ${error.message}`);
    throw new Error(error.message);
  }
};

const assignLabour = async (labourID, siteID) => {
  try {
    const assignLabourQuery = `UPDATE labour SET site_id = ${siteID} WHERE labourid = ${labourID}`;
    const queryResult = await query(assignLabourQuery);
    return queryResult.rows;
  } catch (error) {
    console.error(`Error assigning labour: ${error.message}`);
    throw new Error(error.message);
  }
};

const viewSites = async () => {
  try {
    const viewSitesQuery = "SELECT * FROM site";
    const queryResult = await query(viewSitesQuery);
    return queryResult.rows;
  } catch (error) {
    console.error(`Error viewing sites: ${error.message}`);
    throw new Error(error.message);
  }
};

const countSites = async () => {
  try {
    const siteCountQuery = "SELECT COUNT(*) FROM site";
    const queryResult = await query(siteCountQuery);
    return queryResult.rows[0];
  } catch (error) {
    console.error(`Error counting sites: ${error.message}`);
    throw new Error(error.message);
  }
};

const viewEquipment = async () => {
  try {
    const viewEquipmentQuery = "SELECT * FROM equipment";
    const queryResult = await query(viewEquipmentQuery);
    return queryResult.rows;
  } catch (error) {
    console.error(`Error viewing equipment: ${error.message}`);
    throw new Error(error.message);
  }
};

const assignEquipment = async (equipment) => {
    const { siteid, equipmentid, quantity } = equipment;
    console.log("eqpii", equipment)
  try {
    
    const results = await query('INSERT INTO equipmentrequest (siteid, equipmentid, quantity) VALUES ($1, $2, $3) RETURNING siteid, equipmentid, quantity',
    [siteid, equipmentid, quantity])

    return results.rows;
  } catch (error) {
    console.error(`Error assigning equipment: ${error.message}`);
    throw new Error(error.message);
  }
};


export {
  viewSupervisor,
  selectSupervisor,
  viewLabour,
  assignLabour,
  viewSites,
  countSites,
  viewEquipment,
  assignEquipment,
};
