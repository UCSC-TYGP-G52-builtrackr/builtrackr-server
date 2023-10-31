import {query} from '../config/db.js'



const viewEquipments = async (siteId) => {
    const site  = siteId;
    const approved = 'Approved'
    console.log("site",siteId);
    try {
        const viewEmployeeQuery = 'SELECT * from equipment_request WHERE siteid = $1 and status = $2';
        const queryResult = await query(viewEmployeeQuery, [site , approved]);
        return queryResult.rows;
    } catch (error) {
        console.error(`Error viewing employee: ${error.message}`);
        throw new Error(error.message);
    }
}

const viewMaterials = async (siteId) => {
    const site  = siteId;
    const approved = 'Approved'
    console.log("siteMaterial",siteId);
    try {
        const viewMaterialQuery = 'SELECT * from material_request  WHERE siteid = $1 and status = $2';
        const queryResult = await query(viewMaterialQuery, [site , approved]);
        return queryResult.rows;
    } catch (error) {
        console.error(`Error viewing employee: ${error.message}`);
        throw new Error(error.message);
    }
}


//update
const updateEquipment = async (equipment) => {
    const {cardId,equip} = equipment
    const result = await query(
        'UPDATE equipment_request SET "cardId" = $1 WHERE id =$2  RETURNING "cardId"',
    [cardId,equip]
    );

    return result;
}

const updateAvailable = async (id) => {
console.log(id)
const available = 0;
    try {
        const updateAvailableQuery = 'UPDATE equipment_request SET siteid = $1 WHERE equipment_id = $2';
        const queryResult = await query( updateAvailableQuery, [available, id]);
        return queryResult.rows;
    } catch (error) {
        console.error(`Error updating employee: ${error.message}`);
        throw new Error(error.message);
    }


}

export {viewEquipments,updateEquipment,updateAvailable, viewMaterials};