import { router as taskRouter } from "./index.js";

import { AddTask,ViewTask,DeleteTask,SupervisorTask,SupervisorTaskProof} from "../controllers/taskController.js"

taskRouter.post('/addtask', AddTask)

taskRouter.get('/viewtask', ViewTask)

taskRouter.delete('/deletetask', DeleteTask)

//passing url from frontend
taskRouter.post('/getTaskOfSupervisor', SupervisorTask)
taskRouter.post('/addTaskProofOfSupervisor', SupervisorTaskProof)

export { taskRouter }