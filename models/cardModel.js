import {
    query
} from "../config/db.js";


export const viewCard = async (siteId) => {
    const num = 0;
    const site = siteId;
    try {
        const viewCardQuery = "SELECT * FROM tasks WHERE status = $1 and siteid = $2";
        const queryResult = await query(viewCardQuery, [num, site]);

        return queryResult.rows
    } catch (error) {
        console.error(`Error viewing task: ${error.message}`)
        throw new Error(error.message)
    }
}

export const viewTask = async (siteId) => {
    const num = siteId;
    try {
        const viewCardQuery = "SELECT * FROM tasks  WHERE siteid = $1";
        const queryResult = await query(viewCardQuery, [num]);
        return queryResult.rows
    } catch (error) {
        console.error(`Error viewing task: ${error.message}`)
        throw new Error(error.message)
    }
}

export const updateTask = (taskId) => {
    const num = 1;
    try {
        const updateTaskQuery = 'UPDATE tasks SET status = $1 WHERE task_id = $2';
        const queryResult = query(updateTaskQuery, [num, taskId]);
        return queryResult.rows;
    } catch (error) {
        console.error(`Error updating task: ${error.message}`);
        throw new Error(error.message);
    }
}

//decline task
export const declineTask = (task) => {
    console.log("taskId", task);
    const num = 2;
    try {
        const updateTaskQuery = 'UPDATE tasks SET status = $1 WHERE task_id = $2';
        const queryResult = query(updateTaskQuery, [num, task]);
        return queryResult.rows;
    } catch (error) {
        console.error(`Error updating task: ${error.message}`);
        throw new Error(error.message);
    }
}