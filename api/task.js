import { router as taskRouter } from "./index.js";


import { AddTask,ViewTask } from "../controllers/taskController.js"

taskRouter.post('/addtask', AddTask)

taskRouter.get('/viewtask', ViewTask)

export { taskRouter }