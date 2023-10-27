import { router as iManagerMRRouter} from "./index.js";
import { getAllMaterialRequests } from '../controllers/mrequestcontroller.js';
iManagerMRRouter.get('/getAllMaterialRequests', getAllMaterialRequests);
// Add these new routes to your MRequest.js file
import { approveMaterialRequest, rejectMaterialRequest } from '../controllers/mrequestcontroller.js';

iManagerMRRouter.put('/approveMaterialRequest/:requestId', approveMaterialRequest);
iManagerMRRouter.put('/rejectMaterialRequest/:requestId', rejectMaterialRequest);


export {iManagerMRRouter};