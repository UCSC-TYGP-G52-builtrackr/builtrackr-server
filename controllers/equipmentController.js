import { viewEquipments,updateEquipment } from "../models/equipmentModel.js";
import asyncHandler from "express-async-handler";


const ViewEquipments = asyncHandler(async (req, res) => {
    const equipment = await viewEquipments()
    res.status(200).json(equipment)    //tasks send to the front end

})

 const updateEquipmentInfo = asyncHandler(async (req, res) => {
    const {cardId,equip} = req.body;
    console.log(req.body);
    try {
        const equipment = await updateEquipment({
            cardId,equip
        });
        res.status(201).json({
            status: true,
        });
    } catch (err) {
        console.log("here",err);
        res.status(500).json({ error: err.message });
    }

});



export { ViewEquipments ,updateEquipmentInfo}