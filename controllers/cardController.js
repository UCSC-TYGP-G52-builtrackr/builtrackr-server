import {viewCard,updateTask,viewTask, declineTask} from  "../models/cardModel.js";
import asyncHandler from 'express-async-handler'





export const  ViewCard = asyncHandler(async(req,res)=>{
    const siteid  = req.query.siteId;
    console.log("siteId",req.query.siteId);
    try {
        const siteId = await  viewCard(siteid)
        res.status(201).json(siteId);
    } catch (err) {
        console.log("here",err);
        res.status(500).json({ error: err.message });
    }

});

export const  ViewTask = asyncHandler(async(req,res)=>{

    const siteid  = req.query.siteId;
    console.log("siteId",req.query.siteId);
    try {
        const siteId = await  viewTask(siteid)
        res.status(200).json(siteId);
    } catch (err) {
        console.log("here",err);
        res.status(500).json({ error: err.message });
    }    
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

export const declinetaskId = asyncHandler(async(req,res)=>{
    const taskId = req.query.id;
    try{
        const task = await declineTask(taskId);
        res.status(200).json({
            status:true,
        });
    }catch(err){
        console.log("here",err);
        res.status(500).json({error:err.message});
    }
});



