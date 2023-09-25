import { router as iManagerERouter} from "./index.js";
import { getAllEquipments, updateEquipments } from '../controllers/ecardController.js';
iManagerERouter.get('/getAllEquipments', getAllEquipments);
iManagerERouter.put('/updateEquipments/:equipmentId', updateEquipments);
export {iManagerERouter};