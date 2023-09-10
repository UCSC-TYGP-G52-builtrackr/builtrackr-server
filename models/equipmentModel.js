import {query} from '../config/db.js'



const viewEquipments = async () => {
    try {
        const viewEquipmentQuery = 'SELECT * from Employee'
        const queryResult = await query(viewEquipmentQuery)
        return queryResult.rows
    } catch (error) {
        console.error(`Error viewing equipment: ${error.message}`)
        throw new Error(error.message)
    }
}


export {viewEquipments};