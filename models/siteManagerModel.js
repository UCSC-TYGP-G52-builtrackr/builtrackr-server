import { query } from '../config/db.js'

const viewSupervisor = async () => {
    try {
        const viewSupervisorQuery = 'SELECT * FROM supervisor'
        const queryResult = await query(viewSupervisorQuery)
        return queryResult.rows
    } catch (error) {
        console.error(`Error viewing supervisor: ${error.message}`)
        throw new Error(error.message)
    }
}

export { viewSupervisor }
