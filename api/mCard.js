import { router as iManagerRouter} from "./index.js";
import { getAllMaterials, updateMaterial, addMaterial, deleteMaterial } from '../controllers/mcardController.js';
iManagerRouter.get('/getAllMaterials', getAllMaterials);
iManagerRouter.post('/addMaterial', addMaterial);
iManagerRouter.put('/updateMaterial/:materialId', updateMaterial);
iManagerRouter.delete('/deleteMaterial/:materialId', deleteMaterial);
export {iManagerRouter};