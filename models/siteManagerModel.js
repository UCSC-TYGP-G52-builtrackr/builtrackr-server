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

const selectSupervisor = async (supervisorID, siteID) => {
    try {
        const selectSupervisorQuery = `UPDATE site SET supervisor_id = ${supervisorID} WHERE site_id = ${siteID}`
        const queryResult = await query(selectSupervisorQuery)
        return queryResult.rows
    } catch (error) {
        console.error(`Error selecting supervisor: ${error.message}`)
        throw new Error(error.message)
    }
}

export { viewSupervisor,selectSupervisor }
