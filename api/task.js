import { router as taskRouter } from "./index.js";

import { AddTask,ViewTask,DeleteTask,TaskCount,TaskCompletion,RejectTask} from "../controllers/taskController.js"

taskRouter.post('/addtask', AddTask)

taskRouter.get('/viewtask', ViewTask)

taskRouter.delete('/deletetask', DeleteTask)

// taskRouter.get('/displaytask',CountTask)

taskRouter.get('/completion',TaskCompletion)

taskRouter.get('/taskcount',TaskCount)

taskRouter.get('/rejecttask',RejectTask)


export { taskRouter }