import { addTask,getAllTasks,deleteTask } from "../models/taskModel.js"
import asyncHandler from 'express-async-handler'



const AddTask = asyncHandler(async (req, res) => {
    const { taskName, specialInformation, dueDate } = req.body
    const task = await addTask(taskName, specialInformation, dueDate)
    if (task) {
        res.status(201).json({
            id: task.task_id,
            taskName: task.task_name,
            specialInformation: task.special_information,
            dueDate: task.due_date,
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid task data')
    }
})

const ViewTask = asyncHandler(async (req, res) => {
    const tasks = await getAllTasks()
    res.status(200).json(tasks)    //tasks send to the front end

})

const DeleteTask = asyncHandler(async (req, res) => {
    const { id } = req.query
    const task = await deleteTask(id)
    console.log(req.query);
    if (task) {
        res.status(201).json({
            id: task.task_id,
            taskName: task.task_name,
            specialInformation: task.special_information,
            dueDate: task.due_date,
        })

    }
    else {
        res.status(400)
        throw new Error('Invalid task data')
    }
})

export { AddTask,ViewTask,DeleteTask }
