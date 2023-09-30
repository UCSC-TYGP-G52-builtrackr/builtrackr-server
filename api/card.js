import { router as cardRouter} from "./index.js";
import {ViewCard} from "../controllers/cardController.js";



cardRouter.get('/viewcard', ViewCard);

export {cardRouter};