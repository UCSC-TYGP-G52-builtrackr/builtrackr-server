import asyncHandler from 'express-async-handler';
import {leaveRequest} from '../models/leaveModel.js';



const LeaveRequest = asyncHandler(async (req, res) => {
    const { id,Lname,start,end,note, name } = req.body
    const request = await leaveRequest( id,Lname,start,end,note, name)
    if (request) {
        res.status(200).json({
            id: request.id,
            Name: request.Lname,
            type: request.category,
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