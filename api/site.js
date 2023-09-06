import { router as siteRouter } from "./index.js";

import { addNewSite, addNewCustomer, getSitesToDisplay, getSingleSiteData, getAllCustomers, checkCustomers, getCustomerSites } from "../controllers/siteController.js";

siteRouter.post("/addSite", addNewSite);
siteRouter.post("/getSites", getSitesToDisplay);
siteRouter.post("/getSingleSite", getSingleSiteData);
siteRouter.post("/addCustomer", addNewCustomer);
siteRouter.post("/getCustomers", getAllCustomers);
siteRouter.post("/checkCustomer", checkCustomers);
siteRouter.post("/getCustomerSites", getCustomerSites);

export {siteRouter}