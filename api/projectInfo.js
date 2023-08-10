import { router as projectRouter} from "./index.js";
import {ProjectInfo} from "../controllers/projectController.js";



projectRouter.get('/project', ProjectInfo);

export {projectRouter};