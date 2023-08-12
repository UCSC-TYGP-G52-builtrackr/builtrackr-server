import {router as siteManagerRouter} from "./index.js";
import {ViewSupervisor} from "../controllers/siteManagerController.js"


siteManagerRouter.get('/supervisor', ViewSupervisor)


export {siteManagerRouter}