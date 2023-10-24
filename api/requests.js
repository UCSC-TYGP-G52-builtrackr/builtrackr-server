import { router as requestRouter } from "./index.js";

import { SendRequest } from "../controllers/requestController.js"

requestRouter.post('/sendrequest', SendRequest )

export { requestRouter }