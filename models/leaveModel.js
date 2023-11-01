import { query } from '../config/db.js'

const leaveRequest= async (id,Lname,start,end,note, name) => {
    try {
        const leaveRequestQuery = 'INSERT INTO laborleave (labor_id, labor_name, leave_start_date, leave_end_date, description,"Category") VALUES ($1, $2, $3,$4,$5 ,$6) RETURNING *'
        const queryResult = await query(leaveRequestQuery , [id,Lname,start,end,note,name])
        return queryResult.rows[0]
    } catch (error) {
        console.error(`Error sending request: ${error.message}`)
        throw new Error(error.message)
    }
}


export {leaveRequest}