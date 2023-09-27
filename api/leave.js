import { router as leaveRouter } from "./index.js";

import { LeaveRequest } from "../controllers/leaveController.js"

leaveRouter.post('/sendleave', LeaveRequest )

export {leaveRouter }