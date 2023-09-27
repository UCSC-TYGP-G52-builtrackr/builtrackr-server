import { router as siteRouter } from "./index.js";

import { addNewSite, getSitesToDisplay, getSingleSiteData } from "../controllers/siteController.js";

siteRouter.post("/addSite", addNewSite);
siteRouter.post("/getSites", getSitesToDisplay);
siteRouter.post("/getSingleSite", getSingleSiteData);


export {siteRouter}