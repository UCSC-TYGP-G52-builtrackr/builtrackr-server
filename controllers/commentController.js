import { insertComment, getCommentByPostId} from "../models/commentModel.js";
import asyncHandler from "express-async-handler";


const addComment = asyncHandler(async (req, res) => {
   
    const { content ,cardId,date,companyID,userId } = req.body;
    console.log(req.body);
    try {
        const comment = await insertComment({
            content ,cardId,date,companyID,userId,
        });
        res.status(201).json({
            status: true,
        });
    } catch (err) {
        // res.status(500).json({ error: err.message });
    }
});


const getComment = asyncHandler(async (req, res) => {
    const comment = await getCommentByPostId()
    res.status(200).json(comment)    //tasks send to the front end

})

export { addComment,getComment };