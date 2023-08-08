import { router as taskRouter } from "./index.js";

import { AddTask,ViewTask,DeleteTask } from "../controllers/taskController.js"

taskRouter.post('/addtask', AddTask)

taskRouter.get('/viewtask', ViewTask)

taskRouter.delete('/deletetask', DeleteTask)

export { taskRouter }