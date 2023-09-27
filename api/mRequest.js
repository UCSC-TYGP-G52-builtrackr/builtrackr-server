import { router as iManagerMRRouter} from "./index.js";
import { getAllMaterialRequests } from '../controllers/mrequestcontroller.js';
iManagerMRRouter.get('/getAllMaterialRequests', getAllMaterialRequests);

export {iManagerMRRouter};