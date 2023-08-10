import { router as siteRouter } from "./index.js";

import { addNewSite } from "../controllers/siteController.js";

siteRouter.post("/addSite", addNewSite);

export {siteRouter}