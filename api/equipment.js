import {router as equipmentRouter} from "./index.js";
import { ViewEquipments,updateEquipmentInfo,UpdateEquipmentAvailable} from "../controllers/equipmentController.js";



equipmentRouter.get('/viewequipments', ViewEquipments);
equipmentRouter.post('/updateEquipment', updateEquipmentInfo);
equipmentRouter.post('/updateEquipmentAvailable', UpdateEquipmentAvailable);



export {equipmentRouter}
