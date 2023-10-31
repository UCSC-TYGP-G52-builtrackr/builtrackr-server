import { query } from "../config/db.js";


 export const  dropDown = async(siteId) =>{
    const site = siteId;
    try{
        const viewDropQuery  =  "SELECT * FROM labourer WHERE site_id = $1 ";
        const queryResult  = await query(viewDropQuery,[site])
        return queryResult.rows

    }catch (error){
        console.error(`Error viewing task: ${error.message}`)
        throw new Error(error.message)
    }
}




export default {dropDown}
