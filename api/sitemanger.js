import {router as siteManagerRouter} from "./index.js";
import {ViewSupervisor,SelectSupervisor,ViewLabour,AssignLabour,ViewSites,CountSites,GetEquipment,GetMaterial,AssignMaterial,AssignEquipment,GetIds,GetSupervisor} from "../controllers/siteManagerController.js"


siteManagerRouter.get('/supervisor', ViewSupervisor)
siteManagerRouter.post('/selectsupervisor', SelectSupervisor)
siteManagerRouter.get('/labour', ViewLabour)
siteManagerRouter.post('/assignlabour', AssignLabour)
siteManagerRouter.get('/viewsites/:siteId', ViewSites)
siteManagerRouter.get("/countsites", CountSites);
siteManagerRouter.get('/getequipment', GetEquipment)
siteManagerRouter.post('/assignequipment', AssignEquipment)
siteManagerRouter.get('/getmaterial', GetMaterial)
siteManagerRouter.post('/assignmaterial', AssignMaterial)
siteManagerRouter.get('/getsiteids/:id',GetIds)
siteManagerRouter.get('/getsupervisor',GetSupervisor)


export {siteManagerRouter}