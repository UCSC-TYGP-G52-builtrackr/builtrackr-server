import { router as taskRouter } from "./index.js";

import {
  AddTask,
  ViewTask,
  DeleteTask,
  TaskCount,
  TaskCompletion,
  RejectTask,
  ReassignTask,
  EachCountTask,
  EachCompletedCountTask
,SupervisorTask,SupervisorTaskProof} from "../controllers/taskController.js";

taskRouter.post("/addtask", AddTask);

taskRouter.get("/viewtask/:siteId", ViewTask);

taskRouter.delete("/deletetask", DeleteTask);

// taskRouter.get('/displaytask',CountTask)

taskRouter.get("/completion", TaskCompletion);

taskRouter.get("/taskcount", TaskCount);

taskRouter.get("/rejecttask", RejectTask);

taskRouter.post("/reassigntask", ReassignTask);

taskRouter.get("/eachtaskcount/:siteId", EachCountTask);

taskRouter.get("/eachcompletedcount/:siteId", EachCompletedCountTask);


//passing url from frontend
taskRouter.post('/getTaskOfSupervisor', SupervisorTask)
taskRouter.post('/addTaskProofOfSupervisor', SupervisorTaskProof)

export { taskRouter };
