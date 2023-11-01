import {getLaborData} from '../models/labourModel.js'
import asyncHandler from 'express-async-handler'

const GetLaborData = asyncHandler(async(req,res)=>{
    
    const siteId = req.params.siteId
    console.log("siteId in getl",siteId)
    const data = await getLaborData(siteId)
    res.status(200).json(data)
})



export {GetLaborData}
