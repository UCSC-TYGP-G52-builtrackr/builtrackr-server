import asyncHandler from 'express-async-handler';
import {sendRequest} from '../models/requestModel.js';



const SendRequest = asyncHandler(async (req, res) => {
    const { name, number, note } = req.body
    const request = await sendRequest(name, number, note)
    if (request) {
        res.status(200).json({
            name: request.name,
            number: request.number,
           note: request.note,
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid request');
    }
});

export { SendRequest }