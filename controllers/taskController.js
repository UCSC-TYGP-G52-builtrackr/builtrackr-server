import {
  addTask,
  getAllTasks,
  deleteTask,
  taskCount,
  taskCompletion,
  rejectTask,
  reassignTask,
  eachTaskCount,
  eachCompletedTaskCount,
} from "../models/taskModel.js";
import asyncHandler from "express-async-handler";

const AddTask = asyncHandler(async (req, res) => {
  const { taskName, specialInformation, dueDate, siteID, siteName } = req.body;
  const task = await addTask(
    taskName,
    specialInformation,
    dueDate,
    siteID,
    siteName
  );
  if (task) {
    res.status(201).json({
      id: task.task_id,
      taskName: task.task_name,
      specialInformation: task.special_information,
      dueDate: task.due_date,
      siteId: task.site_id,
      siteName: task.site_name,
    });
  } else {
    res.status(400);
    throw new Error("Invalid task data");
  }
});

const ViewTask = asyncHandler(async (req, res) => {
  const siteId = req.params.siteId;
  const tasks = await getAllTasks(siteId);
  res.status(200).json(tasks); //tasks send to the front end
});

const DeleteTask = asyncHandler(async (req, res) => {
  const { id } = req.query;
  const task = await deleteTask(id);
  console.log(req.query);
  if (task) {
    res.status(201).json({
      id: task.task_id,
      taskName: task.task_name,
      specialInformation: task.special_information,
      dueDate: task.due_date,
    });
  } else {
    res.status(400);
    throw new Error("Invalid task data");
  }
});

const TaskCount = asyncHandler(async (req, res) => {
  const tasks = await taskCount();
  res.status(200).json(tasks); //tasks send to the front end
});

const TaskCompletion = asyncHandler(async (req, res) => {
  const tasks = await taskCompletion();
  res.status(200).json(tasks); //tasks send to the front end
});

const RejectTask = asyncHandler(async (req, res) => {
  const tasks = await rejectTask();
  res.status(200).json(tasks);
});

const ReassignTask = asyncHandler(async (req, res) => {
  const { taskID } = req.body;
  console.log(taskID);
  const task = await reassignTask(taskID);
  res.status(200).json(task);
});

const EachCountTask = asyncHandler(async (req, res) => {
  const siteId = req.params.siteId;
  const tasks = await eachTaskCount(siteId);
  res.status(200).json(tasks); //tasks send to the front end
});

const EachCompletedCountTask = asyncHandler(async (req, res) => {
  const siteId = req.params.siteId;
  const tasks = await eachCompletedTaskCount(siteId);
  res.status(200).json(tasks); //tasks send to the front end
});

export {
  AddTask,
  ViewTask,
  DeleteTask,
  TaskCount,
  TaskCompletion,
  RejectTask,
  ReassignTask,
  EachCountTask,
  EachCompletedCountTask,
};
