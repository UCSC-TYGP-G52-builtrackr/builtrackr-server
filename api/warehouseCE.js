import { router as warehouseCERouter } from "./index.js";

import { addWarehouse, getWarehouses, getSingleWarehouse, getWarehouseManagers, assignInvManager, unassignInvManager, checkWhetherAssignedWarehouse } from "../controllers/warehouseCEController.js";

warehouseCERouter.post("/addWarehouse", addWarehouse);
warehouseCERouter.post("/getWarehouses", getWarehouses);
warehouseCERouter.post("/checkWhetherAssignedWarehouse", checkWhetherAssignedWarehouse);
warehouseCERouter.post("/getSingleWarehouse", getSingleWarehouse);
warehouseCERouter.post("/getWarehouseManagers", getWarehouseManagers);
warehouseCERouter.post("/assignInvManager", assignInvManager);
warehouseCERouter.post("/unassignInvManager", unassignInvManager);

export {warehouseCERouter}