import {router as equipmentRouter} from "./index.js";
import { ViewEquipments } from "../controllers/equipmentController.js";



equipmentRouter.get('/viewequipments', ViewEquipments);


export {equipmentRouter}
