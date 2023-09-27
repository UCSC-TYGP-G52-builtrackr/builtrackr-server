import { query } from '../config/db.js'

const leaveRequest= async (option,name,start,end,note) => {
    try {
        const leaveRequestQuery = 'INSERT INTO leave_employee (e_name, type, start_date,end_date, note) VALUES ($1, $2, $3,$4,$5) RETURNING e_name, type, start_date,end_date, note'
        const queryResult = await query(leaveRequestQuery , [option,name,start,end,note])
        return queryResult.rows[0]
    } catch (error) {
        console.error(`Error sending request: ${error.message}`)
        throw new Error(error.message)
    }
}


export {leaveRequest};