import { query } from "../config/db.js";


 export const  viewCard = async() =>{
    const num = 0;
    try{
        const viewCardQuery  =  "SELECT * FROM name WHERE completed = $1";
        const queryResult  = await query(viewCardQuery , [num]);
        return queryResult.rows
        
    }catch (error){
        console.error(`Error viewing task: ${error.message}`)
        throw new Error(error.message)
    }
}

export const  viewTask = async() =>{
    try{
        const viewCardQuery  =  "SELECT * FROM name";
        const queryResult  = await query(viewCardQuery);
        return queryResult.rows
    }catch (error){
        console.error(`Error viewing task: ${error.message}`)
        throw new Error(error.message)
    }
}

export const updateTask =(taskId) =>{
    const num = 1;
    try{
        const updateTaskQuery = 'UPDATE name SET completed = $1 WHERE id = $2';
        const queryResult = query(updateTaskQuery, [num, taskId]);
        return queryResult.rows;
    }catch(error){
        console.error(`Error updating task: ${error.message}`);
        throw new Error(error.message);
    }
}



