import {router as labourRouter} from "./index.js";
import { ViewEmployee, UpdateEmployeeAvailable } from "../controllers/labourController.js";


labourRouter.get('/viewemployee', ViewEmployee);
labourRouter.post('/updateemployee', UpdateEmployeeAvailable);


export {labourRouter}