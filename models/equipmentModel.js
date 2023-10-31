import {query} from '../config/db.js'



const viewEquipments = async () => {
    const availableValue = 1;
    try {
        const viewEmployeeQuery = 'SELECT * from "Equipments" WHERE available = $1';1
        const queryResult = await query(viewEmployeeQuery, [availableValue]);
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
        'UPDATE "Equipments" SET "cardId" = $1 WHERE id =$2  RETURNING "cardId"',
    [cardId,equip]
    );

    return result;
}

const updateAvailable = async (id) => {
console.log(id)
const available = 0;
    try {
        const updateAvailableQuery = 'UPDATE "Equipments" SET available = $1 WHERE id = $2';
        const queryResult = await query( updateAvailableQuery, [available, id]);
        return queryResult.rows;
    } catch (error) {
        console.error(`Error updating employee: ${error.message}`);
        throw new Error(error.message);
    }


}

export {viewEquipments,updateEquipment,updateAvailable};