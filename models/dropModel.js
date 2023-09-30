import { query } from "../config/db.js";


 export const  dropDown = async() =>{
    try{
        const viewDropQuery  =  "SELECT * FROM employee";
        const queryResult  = await query(viewDropQuery)
        return queryResult.rows
        
    }catch (error){
        console.error(`Error viewing task: ${error.message}`)
        throw new Error(error.message)
    }
}


