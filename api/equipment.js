import {router as equipmentRouter} from "./index.js";
import { ViewEquipments,updateEquipmentInfo } from "../controllers/equipmentController.js";



equipmentRouter.get('/viewequipments', ViewEquipments);
equipmentRouter.post('/updateEquipment', updateEquipmentInfo);


export {equipmentRouter}
