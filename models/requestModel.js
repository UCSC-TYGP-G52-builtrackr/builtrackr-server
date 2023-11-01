import { query } from '../config/db.js'


const sendRequest= async (SupervisorId, id,number,siteId, name) => {
    console.log("requestModel",SupervisorId, id,number,siteId, name)
    try {
        const sendRequestQuery = 'INSERT INTO equipment_request(req_emp_id, equipment_id, req_quantity,siteid, equipmentname) VALUES ($1, $2, $3, $4,$5) RETURNING *'
        const queryResult = await query(sendRequestQuery , [ SupervisorId, id,number,siteId, name])
        return queryResult.rows[0]
    } catch (error) {
        console.error(`Error sending request: ${error.message}`)
        throw new Error(error.message)
    }
}


const viewEquipments = async (companyId) => {
    const company  = companyId;
    console.log("companyid",companyId);

    try {
        const viewEmployeeQuery = 'SELECT equipment_id, equipment_name from equipment WHERE company_id = $1';
        const queryResult = await query(viewEmployeeQuery, [company]);
        console.log("queryResult.rows",queryResult.rows);
        return queryResult.rows;
    } catch (error) {
        console.error(`Error viewing equipment: ${error.message}`);
    }
}

const sendMaterialRequest= async (SupervisorId, id,number,siteId,type, name) => {
    console.log("requestModel",SupervisorId, id,number,siteId,type, name)
    try {
        const sendRequestQuery = 'INSERT INTO material_request(req_emp_id, material_id, req_quantity,siteid,type, materialname) VALUES ($1, $2, $3, $4,$5,$6) RETURNING *'
        const queryResult = await query(sendRequestQuery , [ SupervisorId, id,number,siteId,type, name])
        return queryResult.rows[0]
    } catch (error) {
        console.error(`Error sending request: ${error.message}`)
        throw new Error(error.message)
    }
}


const viewMaterials = async (companyId) => {
    const company  = companyId;
    console.log("companyidMaterial",companyId);

    try {
        const viewEmployeeQuery = 'SELECT material_id, material_name, type from material WHERE company_id = $1';
        const queryResult = await query(viewEmployeeQuery, [company]);
        console.log("queryResult.rows",queryResult.rows);
        return queryResult.rows;
    } catch (error) {
        console.error(`Error viewing material: ${error.message}`);
    }
}


export {sendRequest,viewEquipments,sendMaterialRequest,viewMaterials};