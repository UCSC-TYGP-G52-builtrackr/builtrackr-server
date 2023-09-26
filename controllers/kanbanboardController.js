import { insertBoard,selectBoard, insertCard,selectCard, deleteCard, deleteBoard } from "../models/kanbanboardModel.js";
import asyncHandler from "express-async-handler";


export const addBoard = asyncHandler(async (req, res) => {
    const { title ,companyId, supervisorId } = req.body;
    console.log(req.body);
    try {
        const board = await insertBoard({
           title ,companyId, supervisorId,
        });
        res.status(201).json({
            status: true,
        });
    } catch (err) {
        console.log("here",err);
        res.status(500).json({ error: err.message });
    }

});


export const getBoard = asyncHandler(async (req, res) => {
    const board = await selectBoard()
    res.status(200).json(board)    //tasks send to the front end

})

//insert card

export const addCard = asyncHandler(async (req, res) => {
    const { title, date, companyId, supervisorId, boardId} = req.body;
    console.log(req.body);
    try {
        const card = await insertCard({
            title, date, companyId, supervisorId, boardId
        });
        res.status(201).json({
            status: true,
        });
    } catch (err) {
        console.log("here",err);
        res.status(500).json({ error: err.message });
    }

});


export const getCard = asyncHandler(async (req, res) => {
    const board = await selectCard()
    res.status(200).json(board)    //tasks send to the front end

})


export const deleteCardInfo = asyncHandler(async (req, res) => {
    const id  = req.params.id;

    try {
        const card = await deleteCard(
            {id}
            
            );
        res.status(201).json({
            status: true,
        });
    } catch (err) {
        console.log("here",err);
        res.status(500).json({ error: err.message });
    }

});

export const deleteBoardInfo = asyncHandler(async (req, res) => {
    const id  = req.params.id;
    console.log("board",req.params.id);
    try {
        const board = await deleteBoard (
            {id}
            
            );
        res.status(201).json({
            status: true,
        });
    } catch (err) {
        console.log("here",err);
        res.status(500).json({ error: err.message });
    }

});





export default { addBoard,getBoard , addCard,getCard , deleteCardInfo , deleteBoardInfo};