import {viewSupervisor,selectSupervisor} from '../models/siteManagerModel.js';
import asyncHandler from 'express-async-handler'


const ViewSupervisor = asyncHandler(async (req, res) => {
    const supervisors = await viewSupervisor()
    res.status(200).json(supervisors)    //tasks send to the front end

})
//select supervisor for the site and update the database as well
const SelectSupervisor = asyncHandler(async (req, res) => {
    const {supervisorID, siteID} = req.body
    const supervisor = await selectSupervisor(supervisorID, siteID)
    res.status(200).json(supervisor)    

})

export {ViewSupervisor,SelectSupervisor}



