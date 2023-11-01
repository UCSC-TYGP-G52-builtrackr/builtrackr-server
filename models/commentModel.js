import { query } from "../config/db.js";


//insert comment
export const insertComment = async (comment) => {
    const {content ,cardId,date,companyID,userId } = comment;
    const result = await query(
        `INSERT INTO comment (content,"cardId",date,"companyID","userId") VALUES ('${content}','${cardId}','${date}','${companyID}','${userId}') RETURNING *`
    );
    //insert query in express js

    return result;
}

//get comment by post id
export const getCommentByPostId = async (cardId) => {
    const result = await query(
        `SELECT * FROM comment`
    );
    console.log(result);
    return result.rows;
}






export default {insertComment , getCommentByPostId }