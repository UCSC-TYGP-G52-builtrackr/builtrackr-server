import { query } from "../config/db.js";


 export const  viewCard = async() =>{
    try{
        const viewCardQuery  =  "SELECT * FROM name";
        const queryResult  = await query(viewCardQuery)
        return queryResult.rows
        
    }catch (error){
        console.error(`Error viewing task: ${error.message}`)
        throw new Error(error.message)
    }
}


