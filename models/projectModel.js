import { query } from "../config/db.js";


 export const  projectInfo = async() =>{
    try{
        const projectQuery  =  "SELECT * FROM project";
        const queryResult  = await query(projectQuery)
        return queryResult.rows
        
    }catch (error){
        console.error(`Error viewing task: ${error.message}`)
        throw new Error(error.message)
    }
}


