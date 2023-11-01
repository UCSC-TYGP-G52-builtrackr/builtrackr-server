import {viewRating,viewEmployee , updateEmployee ,updateRating} from '../models/labourModel.js';
import asyncHandler from 'express-async-handler'




const ViewEmployee = asyncHandler(async (req, res) => {

    const siteid  = req.query.siteId;
    try {
        const siteId = await  viewEmployee (siteid)
        res.status(200).json(siteId);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

})

const UpdateEmployeeAvailable = asyncHandler(async (req, res) => {
    const employeeId = req.body.itemId
    console.log(employeeId)
    const employee = await updateEmployee(employeeId)
    res.status(200).json(employee)

})

const UpdateRating = asyncHandler(async (req, res) => {
    const employeeId = req.body.id
    const rating = req.body.rate
    console.log(req.body)
    const employee = await updateRating(employeeId,rating)
    res.status(200).json(employee)

})

const ViewRating = asyncHandler(async (req, res) => {

    const siteid  = req.query.siteId;
    try {
        const siteId = await  viewRating (siteid)
        res.status(200).json(siteId);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

})


export { ViewRating,ViewEmployee ,UpdateEmployeeAvailable, UpdateRating}