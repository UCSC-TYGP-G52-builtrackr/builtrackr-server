import {router as equipmentRouter} from "./index.js";
import { ViewEquipments,updateEquipmentInfo,UpdateEquipmentAvailable, ViewMaterials} from "../controllers/equipmentController.js";



equipmentRouter.get('/viewequipments', ViewEquipments);
equipmentRouter.post('/updateEquipment', updateEquipmentInfo);
equipmentRouter.post('/updateEquipmentAvailable', UpdateEquipmentAvailable);
equipmentRouter.get('/viewmaterials', ViewMaterials);



export {equipmentRouter}
