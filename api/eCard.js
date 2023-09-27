// import { router as iManagerERouter} from "./index.js";
// import { getAllEquipments, updateEquipments } from '../controllers/ecardController.js';
// iManagerERouter.get('/getAllEquipments', getAllEquipments);
// iManagerERouter.put('/updateEquipments/:equipmentId', updateEquipments);
// export {iManagerERouter};
import { router as iManagerERouter} from "./index.js";
import { getAllEquipments, updateEquipment, addEquipment, deleteEquipment } from '../controllers/ecardController.js';
iManagerERouter.get('/getAllEquipments', getAllEquipments);
iManagerERouter.post('/addEquipment', addEquipment);
iManagerERouter.put('/updateEquipment/:equipmentId', updateEquipment);
iManagerERouter.delete('/deleteEquipment/:equipmentId', deleteEquipment);
export {iManagerERouter};