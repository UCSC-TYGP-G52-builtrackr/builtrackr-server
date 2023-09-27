import {getData} from '../models/labourModel.js'
import asyncHandler from 'express-async-handler'


const GetData = asyncHandler(async(req,res)=>{
    const data = await getData()
    res.send(data)
}
)

export {GetData}
