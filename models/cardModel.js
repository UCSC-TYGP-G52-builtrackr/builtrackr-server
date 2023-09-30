import { query } from "../config/db.js";


 export const  viewCard = async() =>{
    try{
        const viewCardQuery  =  "SELECT * FROM tasks";
        const queryResult  = await query(viewCardQuery)
        return queryResult.rows
        
    }catch (error){
        console.error(`Error viewing task: ${error.message}`)
        throw new Error(error.message)
    }
}


