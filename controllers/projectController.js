import {projectInfo} from  "../models/projectModel.js";
import asyncHandler from 'express-async-handler'




export const  ProjectInfo = asyncHandler(async(req,res)=>{

    const cards  = await projectInfo()
    res.status(200).json(project);

});

