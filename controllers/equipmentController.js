import { viewEquipments } from "../models/equipmentModel.js";
import asyncHandler from "express-async-handler";


const ViewEquipments = asyncHandler(async (req, res) => {
    const equipment = await viewEquipments()
    res.status(200).json(equipment)    //tasks send to the front end

})


export { ViewEquipments }