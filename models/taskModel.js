import { query } from "../config/db.js";

const addTask = async (taskName, specialInformation, dueDate) => {
  try {
    const addTaskQuery =
      "INSERT INTO tasks (taskname, specialinformation, duedate) VALUES ($1, $2, $3) RETURNING taskname, specialinformation, duedate";
    const queryResult = await query(addTaskQuery, [
      taskName,
      specialInformation,
      dueDate,
    ]);
    return queryResult.rows[0];
  } catch (error) {
    console.error(`Error adding task: ${error.message}`);
    throw new Error(error.message);
  }
};

const getAllTasks = async () => {
  try {
    const viewTaskQuery = "SELECT * FROM tasks";
    const queryResult = await query(viewTaskQuery);
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
      "SELECT COUNT(*) as count FROM tasks WHERE status =true";
    const queryResult = await query(taskCompletionQuery);
    return queryResult.rows[0] ?? { count: 0 };
  } catch (error) {
    console.error(`Error counting task: ${error.message}`);
    throw new Error(error.message);
  }
};

const rejectTask = async () => {
  const num = 0;

  try {
    const rejectTaskQuery = 'SELECT * FROM tasks WHERE "cStatus"=$1';
    const queryResult = await query(rejectTaskQuery, [num]);
    // return queryResult.rows[0] ?? {count:0}
    return queryResult.rows;
  } catch (error) {
    console.error(`Error counting task: ${error.message}`);
    throw new Error(error.message);
  }
};

export {
  addTask,
  getAllTasks,
  deleteTask,
  taskCompletion,
  taskCount,
  rejectTask,
};
