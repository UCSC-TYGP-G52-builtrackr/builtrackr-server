import asyncHandler from "express-async-handler";
import {
    addWarehouseFunc,
    warehouseDisplay,
    checkAssignedWarehouse,
    singleWarehouse,
    availWarehouseManagers,
    assignInvManagerUpdate,
    unassignInvManagerUpdate
} from "../models/warehouseCEModel.js";

  const addWarehouse = asyncHandler(async (req, res) => {
    const {
        warehouseName,
        warehousePhone,
        warehouseAddr,
        companyID
    } = req.body;
  
    console.log(req.body);
  
    try {
      const warehouse = await addWarehouseFunc(
        warehouseName,
        warehousePhone,
        warehouseAddr,
        companyID
      );
      res.status(200).json({
        // id: site.siteId,
      });
    } catch (err) {
      throw new Error(err);
    }
  });

  const getWarehouses = asyncHandler(async (req, res) => {
    const {
      companyID
    } = req.body;
    console.log(req.body);
    const result = await warehouseDisplay(companyID);
    res.status(200).json(result);
  });

  const checkWhetherAssignedWarehouse = asyncHandler(async (req, res) => {
    const {
      warehouseId
    } = req.body;
    const result = await checkAssignedWarehouse(warehouseId);
    console.log("assigned check results", result);
    res.status(200).json(result);
  });

  const getSingleWarehouse = asyncHandler(async (req, res) => {
    const { id } = req.body;
    const result = await singleWarehouse(id);
    res.status(200).json(result);
  });

  const getWarehouseManagers = asyncHandler(async (req, res) => {
    const {
      companyID
    } = req.body;
    const result = await availWarehouseManagers(companyID);
    res.status(200).json(result);
  });

  const assignInvManager = asyncHandler(async (req, res) => {
    const { warehouseId, selectedPersonNo } = req.body;
    const result = await assignInvManagerUpdate(warehouseId, selectedPersonNo);
    res.status(200).json(result);
  });

  const unassignInvManager = asyncHandler(async (req, res) => {
    const { warehouseId } = req.body;
    const result = await unassignInvManagerUpdate(warehouseId);
    res.status(200).json(result);
  });

  export { addWarehouse, getWarehouses, checkWhetherAssignedWarehouse, getSingleWarehouse, getWarehouseManagers, assignInvManager, unassignInvManager };
