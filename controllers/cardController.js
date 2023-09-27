import {viewCard,updateTask,viewTask} from  "../models/cardModel.js";
import asyncHandler from 'express-async-handler'





export const  ViewCard = asyncHandler(async(req,res)=>{

    const cards  = await viewCard()
    res.status(200).json(cards);

});
export const  ViewTask = asyncHandler(async(req,res)=>{

    const tasks  = await viewTask()
    res.status(200).json(tasks);

});


export const updatetaskId = asyncHandler(async(req,res)=>{
    const {taskId} = req.body;
    try{
        const task = await updateTask(taskId);
        res.status(201).json({
            status:true,
        });
    }catch(err){
        console.log("here",err);
        res.status(500).json({error:err.message});
    }
});



