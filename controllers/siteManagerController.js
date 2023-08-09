import {viewSupervisor} from '../models/siteManagerModel.js';
import asyncHandler from 'express-async-handler'


const ViewSupervisor = asyncHandler(async (req, res) => {
    const supervisors = await viewSupervisor()
    res.status(200).json(supervisors)    //tasks send to the front end

}
)
export {ViewSupervisor}



