import {getLeaves,approveLeave,declineLeave} from '../models/labourModel.js'
import asyncHandler from 'express-async-handler'

const GetLeaves = asyncHandler(async (req, res) => {
    const leaves = await getLeaves()
    res.status(200).json(leaves)    //tasks send to the front end

})

const ApproveLeave = asyncHandler(async (req, res) => {
    const {laborId,approval,currentDate} = req.body
    const leave = await approveLeave(laborId,approval,currentDate)
    res.status(200).json(leave)    //tasks send to the front end

})

const DeclineLeave = asyncHandler(async (req, res) => {
    const {laborId,approval,currentDate} = req.body
    const leave = await declineLeave(laborId,approval,currentDate)
    res.status(200).json(leave)    //tasks send to the front end

})


export {GetLeaves,ApproveLeave,DeclineLeave}
