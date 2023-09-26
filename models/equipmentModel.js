import {query} from '../config/db.js'



const viewEquipments = async () => {
    try {
        const viewEquipmentQuery = 'SELECT * from "Equipments"'
        const queryResult = await query(viewEquipmentQuery)
        return queryResult.rows
    } catch (error) {
        console.error(`Error viewing equipment: ${error.message}`)
        throw new Error(error.message)
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


export {viewEquipments,updateEquipment};