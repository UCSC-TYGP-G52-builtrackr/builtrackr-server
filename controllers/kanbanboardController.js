import { insertBoard,selectBoard, insertCard,selectCard, 
    deleteCard, deleteBoard, cardCompleted, updateTaskcardId,selectSiteId} from "../models/kanbanboardModel.js";
import asyncHandler from "express-async-handler";


export const addBoard = asyncHandler(async (req, res) => {
    const { title ,companyId, SupervisorId,siteId } = req.body;
    console.log(req.body);
    try {
        const board = await insertBoard({
           title ,companyId, SupervisorId,siteId
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
    const siteid  = req.query.siteId;
    console.log("siteId",req.query.siteId);
    try {
        const siteId = await  selectBoard(siteid)
        res.status(200).json(siteId);
    } catch (err) {
        console.log("here",err);
        res.status(500).json({ error: err.message });
    }    //tasks send to the front end

})


//insert card

export const addCard = asyncHandler(async (req, res) => {
    const { title, date, companyId, SupervisorId, boardId ,siteId} = req.body;
    console.log(req.body);
    try {
        const card = await insertCard({
            title, date, companyId, SupervisorId, boardId, siteId
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
    const siteid  = req.query.siteId;
    console.log("siteId",req.query.siteId);
    try {
        const siteId = await  selectCard(siteid)
        res.status(200).json(siteId);
    } catch (err) {
        console.log("here",err);
        res.status(500).json({ error: err.message });
    }    

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

export const cardCompletedInfo = asyncHandler(async (req, res) => {
    const {cardId,boardId}  = req.body;
    console.log("board",req.body);
    try {
        const boardChange = await cardCompleted (
            {cardId,boardId}

        )
        res.status(201).json({
            status: true,
        });
    } catch (err) {
        console.log("here",err);
        res.status(500).json({ error: err.message });
    }

});

export const updateTaskId = asyncHandler(async (req, res) => {
    const {taskId,id}  = req.body;
    console.log("card",req.body);
    try {
        const taskIdChange = await updateTaskcardId (
            {taskId,id}

        )
        res.status(201).json({
            status: true,
        });
    } catch (err) {
        console.log("here",err);
        res.status(500).json({ error: err.message });
    }

});

//get site id of employeeNo from the front end

export const getSite = asyncHandler(async (req, res) => {
    const employeeNo  = req.query.employeeNo;
    console.log("employee",req.query.employeeNo);
    try {
        const siteId = await selectSiteId (
            {employeeNo}

        )
        res.status(201).json(siteId);
    } catch (err) {
        console.log("here",err);
        res.status(500).json({ error: err.message });
    }

});





export default { addBoard,getBoard , addCard,getCard ,
     deleteCardInfo , deleteBoardInfo, cardCompletedInfo , updateTaskId,getSite};