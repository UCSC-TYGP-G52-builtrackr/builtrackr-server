import asyncHandler from 'express-async-handler';
import {leaveRequest} from '../models/leaveModel.js';



const LeaveRequest = asyncHandler(async (req, res) => {
    const { option,name,start,end,note } = req.body
    const request = await leaveRequest(option,name,start,end,note)
    if (request) {
        res.status(200).json({
            name: request.option,
            type: request.name,
            start:request.start,
            end:request.end,
            note: request.note,
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid request');
    }
});

export { LeaveRequest }