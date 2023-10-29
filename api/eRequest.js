import { router as iManagerERRouter} from "./index.js";
import { getAllEquipmentRequests } from '../controllers/erequestcontroller.js';
iManagerERRouter.get('/getAllEquipmentRequests', getAllEquipmentRequests);
// Add these new routes to your MRequest.js file
import { approveEquipmentRequest, rejectEquipmentRequest } from '../controllers/erequestcontroller.js';

iManagerERRouter.put('/approveEquipmentRequest/:requestId', approveEquipmentRequest);
iManagerERRouter.put('/rejectEquipmentRequest/:requestId', rejectEquipmentRequest);
// Add this new route to your MRequest.js file
import { deleteEquipmentRequest } from '../controllers/erequestcontroller.js';

iManagerERRouter.delete('/deleteEquipmentRequest/:requestId', deleteEquipmentRequest);

import { checkEquipmentQuantity } from '../controllers/erequestcontroller.js';
iManagerERRouter.get('/checkEquipmentQuantity/:requestId', checkEquipmentQuantity);



export {iManagerERRouter};