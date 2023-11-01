import { query } from "../config/db.js";

const addTask = async (taskName, specialInformation, dueDate,siteID,siteName) => {
  console.log(siteName);
  const name=siteName.site_name;
  console.log(name);
  
  try {
    const addTaskQuery =
      "INSERT INTO tasks (taskname, specialinformation, duedate,siteID,siteName) VALUES ($1, $2, $3, $4,$5) RETURNING *";
    const queryResult = await query(addTaskQuery, [
      taskName,
      specialInformation,
      dueDate,
      siteID,
      name
    ]);
    return queryResult.rows[0];
  } catch (error) {
    console.error(`Error adding task: ${error.message}`);
    throw new Error(error.message);
  }
};

const getAllTasks = async (siteId) => {
  try {
    const viewTaskQuery = "SELECT * FROM tasks WHERE status = 0 and siteid =$1";
    const queryResult = await query(viewTaskQuery, [siteId]);
    return queryResult.rows;
  } catch (error) {
    console.error(`Error viewing task: ${error.message}`);
    throw new Error(error.message);
  }
};


const deleteTask = async (id) => {
  try {
    const deleteTaskQuery =
      "DELETE FROM tasks WHERE task_id = $1 RETURNING task_id, taskname, specialinformation, duedate";
    const queryResult = await query(deleteTaskQuery, [id]);
    return queryResult.rows[0];
  } catch (error) {
    console.error(`Error deleting task: ${error.message}`);
    throw new Error(error.message);
  }
};

const taskCount = async () => {
  try {
    const countTaskQuery = "SELECT COUNT(*) as count FROM tasks";
    const queryResult = await query(countTaskQuery);
    return queryResult.rows[0];
  } catch (error) {
    console.error(`Error counting task: ${error.message}`);
    throw new Error(error.message);
  }
};

const taskCompletion = async () => {
  try {
    const taskCompletionQuery =
      "SELECT COUNT(*) as count FROM tasks WHERE status =1";
    const queryResult = await query(taskCompletionQuery);
    return queryResult.rows[0] ?? { count: 0 };
  } catch (error) {
    console.error(`Error counting task: ${error.message}`);
    throw new Error(error.message);
  }
};

const rejectTask = async () => {
  const num = 0;
  const status = 2; 
  try {
    const rejectTaskQuery = 'SELECT * FROM tasks WHERE "status"=$1';
    
    const queryResult = await query(rejectTaskQuery, [status]);
    // return queryResult.rows[0] ?? {count:0}
    console.log(queryResult.rows)
    return queryResult.rows;
  } catch (error) {
    console.error(`Error counting task: ${error.message}`);
    throw new Error(error.message);
  }
};

const reassignTask = async (id) => {
  const status = 0;
  try {
    const reassignTaskQuery =
      'UPDATE tasks SET "status"=$1 WHERE task_id=$2 ';
    const queryResult = await query(reassignTaskQuery, [status, id]);
    return queryResult.rows[0];
  } catch (error) {
    console.error(`Error reassigning task: ${error.message}`);
    throw new Error(error.message);
  }
}

const eachTaskCount = async (siteId) => {
  try {
    const eachTaskCountQuery =
      "SELECT COUNT(*) as count FROM tasks WHERE siteid=$1 and status=0";
    const queryResult = await query(eachTaskCountQuery,[siteId]);
    return queryResult.rows[0] ?? { count: 0 };
  } catch (error) {
    console.error(`Error counting task: ${error.message}`);
    throw new Error(error.message);
  }
}
 const eachCompletedTaskCount = async (siteId) => {
  try {
    const eachCompletedCountTaskQuery =
      "SELECT COUNT(*) as count FROM tasks WHERE siteid=$1 and status=2";
    const queryResult = await query(eachCompletedCountTaskQuery,[siteId]);
    return queryResult.rows[0] ?? { count: 0 };
  } catch (error) {
    console.error(`Error counting task: ${error.message}`);
    throw new Error(error.message);
  }
 }


const TaskOfSupervisor = async (employeeId) => {
  const taskQuery = 
    `SELECT t.task_id AS "task_id",
    t.taskname AS "title",
    t.specialinformation AS "content",
    t.status AS "Status",
    c."supervisorId" AS "Supervisor_Id"
    FROM "tasks" t
    INNER JOIN "Card" c ON t.task_id = c."taskId"
    WHERE c."supervisorId" = $1 AND t.status = $2`;
  try {
    const result = await query(taskQuery, [employeeId,'0']);
    if (result.rowCount > 0) {
      return result.rows;
    }
    else{
      return 0
    } 
  } catch (error) {
    throw new Error("Internal error");
  }
};

const TaskOfSupervisorProof = async (taskId,imageName) => {
  const taskQuery = 
  `UPDATE "Card"
  SET image = $1
  WHERE "taskId" = $2;`;
  try {
    const result = await query(taskQuery, [imageName,taskId]);
    console.log(result.rowCount)
    if (result.rowCount > 0) {
      return result.rowCount;
    } 
  } catch (error) {
    throw new Error("Internal error");
  }
};

export { addTask, getAllTasks, deleteTask, TaskOfSupervisor, TaskOfSupervisorProof,taskCompletion,taskCount,rejectTask,reassignTask,eachTaskCount,eachCompletedTaskCount};

