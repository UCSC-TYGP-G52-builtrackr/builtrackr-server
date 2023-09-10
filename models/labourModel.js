import {query} from '../config/db.js'



const viewEmployee = async () => {
    try {
        const viewEmployeeQuery = 'SELECT * from Employee'
        const queryResult = await query(viewEmployeeQuery)
        return queryResult.rows
    } catch (error) {
        console.error(`Error viewing employee: ${error.message}`)
        throw new Error(error.message)
    }
}


export {viewEmployee};