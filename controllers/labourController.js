import {viewEmployee} from '../models/labourModel.js';
import asyncHandler from 'express-async-handler'




const ViewEmployee = asyncHandler(async (req, res) => {
    const employee = await viewEmployee()
    res.status(200).json(employee)    //tasks send to the front end

})

export { ViewEmployee }