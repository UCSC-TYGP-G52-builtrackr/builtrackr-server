import {router as labourRouter} from "./index.js";
import { ViewEmployee } from "../controllers/labourController.js";


labourRouter.get('/viewemployee', ViewEmployee);


export {labourRouter}