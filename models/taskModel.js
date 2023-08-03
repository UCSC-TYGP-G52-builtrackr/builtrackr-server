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

export { addTask, getAllTasks };
