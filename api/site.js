import { router as siteRouter } from "./index.js";

import { addNewSite, addNewCustomer, getSitesToDisplay, getSingleSiteData, getAllCustomers, checkCustomers, getCustomerSites, checkWhetherAssigned, getManagers, assignSiteManager, unassignSiteManager, getAllManagers, getManagerDetails,getSiteDetails } from "../controllers/siteController.js";

siteRouter.post("/addSite", addNewSite);
siteRouter.post("/getSites", getSitesToDisplay);
siteRouter.post("/getSingleSite", getSingleSiteData);
siteRouter.post("/addCustomer", addNewCustomer);
siteRouter.post("/getCustomers", getAllCustomers);
siteRouter.post("/checkCustomer", checkCustomers);
siteRouter.post("/getCustomerSites", getCustomerSites);
siteRouter.post("/checkWhetherAssigned", checkWhetherAssigned);
siteRouter.post("/getManagers", getManagers);
siteRouter.post("/assignSiteManager", assignSiteManager);
siteRouter.post("/unassignSiteManager", unassignSiteManager);
siteRouter.post("/getAllManagers", getAllManagers);
siteRouter.post("/getManagerDetails", getManagerDetails);
siteRouter.post("/getSiteDetails", getSiteDetails);

export {siteRouter}