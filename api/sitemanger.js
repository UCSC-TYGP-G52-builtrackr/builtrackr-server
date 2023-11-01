import {router as siteManagerRouter} from "./index.js";
import {ViewSupervisor,SelectSupervisor,ViewLabour,AssignLabour,ViewSites,CountSites,GetEquipment,AssignEquipment} from "../controllers/siteManagerController.js"


siteManagerRouter.get('/supervisor', ViewSupervisor)
siteManagerRouter.post('/selectsupervisor', SelectSupervisor)
siteManagerRouter.get('/labour', ViewLabour)
siteManagerRouter.post('/assignlabour', AssignLabour)
siteManagerRouter.get('/viewsites', ViewSites)
siteManagerRouter.get("/countsites", CountSites);
siteManagerRouter.get('/getequipment', GetEquipment)
siteManagerRouter.post('/assignequipment', AssignEquipment)

export {siteManagerRouter}