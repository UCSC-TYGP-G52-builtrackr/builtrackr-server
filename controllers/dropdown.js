import {dropDown} from  "../models/dropModel.js";
import asyncHandler from 'express-async-handler'




export const  DropDown = asyncHandler(async(req,res)=>{

    const drops  = await dropDown()
    res.status(200).json(drops);

});

