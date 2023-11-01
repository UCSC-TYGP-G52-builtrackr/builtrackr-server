import  {insertCardInfo,selectCardInfo, insertCardInfoTask,selectCardInfoTask,
    updateCardInfoTask, updateCardInfoDescription, updateCardInfoTitle,updateCardInfoDate, removeLabel} from "../models/cardInfoModel.js";
import asyncHandler from "express-async-handler";


//controller for card information label
export const addCardInfo = asyncHandler(async (req, res) => {

    const { cardId ,label,color} = req.body;
    console.log(req.body);
    try {
        const card = await insertCardInfo({
            cardId ,label,color
        });
        res.status(201).json({
            status: true,
        });
    } catch (err) {
        console.log("here",err);
        res.status(500).json({ error: err.message });
    }


});


//tasks send to the front end
export const getCardInfo = asyncHandler(async (req, res) => {
    const board = await selectCardInfo()
    res.status(200).json(board)    

})


//controller for card information task
export const addCardInfoTask = asyncHandler(async (req, res) => {
    const {task,completed,cardId,companyId} = req.body;
    console.log(req.body);
    try {
        const card = await insertCardInfoTask({
            task,completed,cardId,companyId
        });
        res.status(201).json({
            status: true,
        });
    } catch (err) {
        console.log("here",err);
        res.status(500).json({ error: err.message });
    }

});

//tasks send to the front end
export const getCardInfoTask = asyncHandler(async (req, res) => {
    const board = await selectCardInfoTask()
    res.status(200).json(board)
})

//update the task column
export const updateCardInfo = asyncHandler(async (req, res) => {
    const {completed,CardtaskId} = req.body;
    console.log(req.body);
    try {
        const task = await updateCardInfoTask({
            completed,CardtaskId
        });
        res.status(201).json({
            status: true,
        });
    } catch (err) {
        console.log("here",err);
        res.status(500).json({ error: err.message });
    }

});


//update the task column
export const updateCardInfoDesc = asyncHandler(async (req, res) => {
    const {desc,cardId} = req.body;
    console.log(req.body);
    try {
        const description = await updateCardInfoDescription({
            desc,cardId
        });
        res.status(201).json({
            status: true,
        });
    } catch (err) {
        console.log("here",err);
        res.status(500).json({ error: err.message });
    }

});

//update the title column
export const updateCardTitle = asyncHandler(async (req, res) => {
    const {title,cardId} = req.body;
    console.log(req.body);
    try {
        const titles = await updateCardInfoTitle({
            title,cardId
        });
        res.status(201).json({
            status: true,
        });
    } catch (err) {
        console.log("here",err);
        res.status(500).json({ error: err.message });
    }

});

export const updateCardDate = asyncHandler(async (req, res) => {
    const {date,cardId} = req.body;
    console.log(req.body);
    try {
        const dates = await updateCardInfoDate({
            date,cardId
        });
        res.status(201).json({
            status: true,
        });
    } catch (err) {
        console.log("here",err);
        res.status(500).json({ error: err.message });
    }

});

//delete label

export const removelabel = asyncHandler(async (req, res) => {
    const id = req.body.labelId;
    console.log(req.body);
    try {
        const label = await removeLabel({
            id
        });
        res.status(201).json({
            status: true,
        });
    } catch (err) {
        console.log("here",err);
        res.status(500).json({ error: err.message });
    }

});





export default { addCardInfo,getCardInfo,addCardInfoTask,
    getCardInfoTask,updateCardInfo,updateCardInfoDesc,updateCardTitle,updateCardDate , removelabel};