import e from "express";
import { query } from "../config/db.js";

const viewSupervisor = async () => {
  try {
    const viewSupervisorQuery = "SELECT * FROM employee where type=5 ";
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
    console.log("supervisor",supervisorID);
    const selectSupervisorQuery = `UPDATE sites SET supervisorid = ${supervisorID} WHERE site_id = ${parseInt(
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
    const viewLabourQuery = "SELECT * FROM labourer where site_id=0";
    const queryResult = await query(viewLabourQuery);
    return queryResult.rows;
  } catch (error) {
    console.error(`Error viewing labour: ${error.message}`);
    throw new Error(error.message);
  }
};

const assignLabour = async (labourID, siteID) => {
  try {
    const assignLabourQuery = `UPDATE labourer SET site_id = ${siteID} WHERE labourid = ${labourID}`;
    const queryResult = await query(assignLabourQuery);
    return queryResult.rows;
  } catch (error) {
    console.error(`Error assigning labour: ${error.message}`);
    throw new Error(error.message);
  }
};

const viewSites = async (siteId) => {
  try {
    const viewSitesQuery = "SELECT * FROM sites where site_id=$1";
    const queryResult = await query(viewSitesQuery,[siteId]);
    return queryResult.rows;
  } catch (error) {
    console.error(`Error viewing sites: ${error.message}`);
    throw new Error(error.message);
  }
};

const countSites = async () => {
  try {
    const siteCountQuery = "SELECT COUNT(*) FROM sites";
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
    const { siteid, equipmentid, quantity,name } = equipment;
    console.log("eqpii", equipment)
    console.log(name)
  try {
    
    const results = await query('INSERT INTO equipment_request (siteid, equipment_id, req_quantity,equipmentname) VALUES ($1, $2, $3,$4) RETURNING siteid, equipment_id, req_quantity,equipmentname',
    [siteid, equipmentid, quantity,name])

    return results.rows;
  } catch (error) {
    console.error(`Error assigning equipment: ${error.message}`);
    throw new Error(error.message);
  }
};

const viewMaterial = async () => {
  try {
    const viewMaterialQuery = "SELECT * FROM material";
    const queryResult = await query(viewMaterialQuery);
    return queryResult.rows;
  } catch (error) {
    console.error(`Error viewing material: ${error.message}`);
    throw new Error(error.message);
  }
}

const assignMaterial = async (material) => {
  const { siteid, materialid, quantity,date,type ,name} = material;

try {
    
    const results = await query('INSERT INTO material_request (siteid, material_id, req_quantity,req_date,type,materialname) VALUES ($1, $2, $3,$4,$5,$6) RETURNING siteid, material_id, req_quantity,req_date,type,materialname',
    [siteid, materialid, quantity,date,type,name])
  
    return results.rows;
  }
  catch (error) {
    console.error(`Error assigning material: ${error.message}`);
    throw new Error(error.message);
  }
}

const getIds = async (empID) => {
  
  try {
    const getIdsQuery = "SELECT site_id FROM site_manager WHERE employee_id = $1";
    const queryResult = await query(getIdsQuery,[empID]);
    console.log("siteids",queryResult.rows);
    return queryResult.rows;
    
  } catch (error) {
    console.error(`Error getting ids: ${error.message}`);
    throw new Error(error.message);
  }


}

const getSupervisor = async (siteId) => {
  try {
    console.log(siteId);
    const viewSupervisorQuery = "SELECT employee.* FROM employee INNER JOIN sites ON sites.supervisorid=employee.no where sites.site_id=$1";
    const queryResult = await query(viewSupervisorQuery,[siteId]);
    console.log(queryResult.rows);
    return queryResult.rows[0];
  } catch (error) {
    console.error(`Error viewing supervisor: ${error.message}`);
    throw new Error(error.message);
  }
}

export {
  viewSupervisor,
  selectSupervisor,
  viewLabour,
  assignLabour,
  viewSites,
  countSites,
  viewEquipment,
  assignEquipment,
  viewMaterial,
  assignMaterial,
  getIds,
  getSupervisor

};
