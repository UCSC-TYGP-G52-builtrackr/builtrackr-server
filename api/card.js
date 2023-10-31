import { router as cardRouter} from "./index.js";
import {ViewCard,updatetaskId,ViewTask ,declinetaskId} from "../controllers/cardController.js";



cardRouter.get('/viewcard', ViewCard);
cardRouter.get('/viewTaskname', ViewTask);
cardRouter.post('/updateId', updatetaskId);
cardRouter.post('/declineId', declinetaskId);

export {cardRouter};