import {router as siteManagerRouter} from "./index.js";
import {ViewSupervisor,SelectSupervisor} from "../controllers/siteManagerController.js"


siteManagerRouter.get('/supervisor', ViewSupervisor)
siteManagerRouter.post('/supervisor/selectsupervisor', SelectSupervisor)


export {siteManagerRouter}