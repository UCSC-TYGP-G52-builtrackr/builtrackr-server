import { router as requestRouter } from "./index.js";

import { SendRequest  , ViewEquipment, SendMaterial ,ViewMaterial} from "../controllers/requestController.js"

requestRouter.post('/sendrequest', SendRequest )
requestRouter.get('/viewrequest', ViewEquipment )
requestRouter.post('/sendmaterial', SendMaterial )
requestRouter.get('/viewmaterial', ViewMaterial )

export { requestRouter }