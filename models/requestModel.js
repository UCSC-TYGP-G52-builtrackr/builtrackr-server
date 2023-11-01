import { query } from '../config/db.js'


const sendRequest= async (name,number,note) => {
    try {
        const sendRequestQuery = 'INSERT INTO request (name, number, note) VALUES ($1, $2, $3) RETURNING name, number, note'
        const queryResult = await query(sendRequestQuery , [ name, number, note])
        return queryResult.rows[0]
    } catch (error) {
        console.error(`Error sending request: ${error.message}`)
        throw new Error(error.message)
    }
}


export {sendRequest};