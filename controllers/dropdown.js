import {dropDown} from  "../models/dropModel.js";
import asyncHandler from 'express-async-handler'




export const  DropDown = asyncHandler(async(req,res)=>{

    const siteid  = req.query.siteId;
    console.log("siteId",req.query.siteId);
    try {
        const siteId = await  dropDown(siteid)
        res.status(200).json(siteId);
    } catch (err) {
        console.log("here",err);
        res.status(500).json({ error: err.message });
    }

});

//update the task column



export default {DropDown}
