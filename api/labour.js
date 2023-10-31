import {router as labourRouter} from "./index.js";
import {ViewRating, ViewEmployee, UpdateEmployeeAvailable ,UpdateRating} from "../controllers/labourController.js";


labourRouter.get('/viewemployee', ViewEmployee);
labourRouter.post('/updateemployee', UpdateEmployeeAvailable);
labourRouter.post('/updaterating', UpdateRating);
labourRouter.get('/viewrating', ViewRating);

export {labourRouter}