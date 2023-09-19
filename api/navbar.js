import { router as navbarRouter } from "./index.js";

import { getCompanyName } from "../controllers/navbarController.js";

navbarRouter.post("/getCompanyName", getCompanyName);

export {navbarRouter}