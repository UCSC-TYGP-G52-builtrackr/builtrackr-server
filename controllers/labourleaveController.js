import {getLeaves,approveLeave,declineLeave,leaveData,getStatus,leaveCount} from '../models/labourModel.js'
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

const LeaveData = asyncHandler(async (req, res) => {
    const leaves = await getLeaves()
    res.status(200).json(leaves)    //tasks send to the front end

})

const GetStatus = asyncHandler(async (req, res) => {
    const status = await getStatus()
    res.status(200).json(status)    //tasks send to the front end

})

const LeaveCount = asyncHandler(async (req, res) => {
    const count = await leaveCount()
    res.status(200).json(count)    //tasks send to the front end
    
})


export {GetLeaves,ApproveLeave,DeclineLeave,LeaveData,GetStatus,LeaveCount}
