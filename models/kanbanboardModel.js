import { query } from "../config/db.js";


//insert board information
export const insertBoard = async (board) => {
    const { title ,companyId, supervisorId } = board;
    const result = await query(
        'INSERT INTO "Board" (title, "companyId", "supervisorId") VALUES ($1, $2, $3) RETURNING title, "companyId", "supervisorId"',
    [title, companyId, supervisorId] 
    );
    //insert query in express js

    return result;
}


//get board information
export const selectBoard = async () => {
    try{
const viewBoardQuery = 'SELECT * FROM "Board"'
const queryResult = await query(viewBoardQuery) 
return queryResult.rows
    }catch(error){
        console.error(`Error viewing board: ${error.message}`)
        throw new Error(error.message)
    }
}

export const insertCard = async (card) => {
    const { title, date, companyId, supervisorId, boardId } = card;
    const result = await query(
        'INSERT INTO "Card"(title, date, "companyId", "supervisorId", "boardId") VALUES ($1, $2, $3,$4,$5) RETURNING title, date, "companyId", "supervisorId", "boardId"',
    [title, date, companyId, supervisorId, boardId] 
    );
    //insert query in express js

    return result;
}


//get board information
export const selectCard = async () => {
    try{
const viewBoardQuery = 'SELECT *FROM "Card" ORDER BY id ASC'
const queryResult = await query(viewBoardQuery)
return queryResult.rows
    }catch(error){
        console.error(`Error viewing card: ${error.message}`)
        throw new Error(error.message)
    }
}

//delete card
export const deleteCard = async (card) => {
    const  cardId  = card.id;
    try{
        const deleteCardQuery = `DELETE FROM "Card" WHERE id = $1`
        const queryResult = await query(deleteCardQuery , [cardId])
        return queryResult.rows
    }catch(error){
        console.error(`Error deleting card: ${error.message}`)
        throw new Error(error.message)
    }
}


//delete board

export const deleteBoard = async (board) => {
    const  boardId  = board.id;
    console.log("board values",boardId);
    try{
        const deleteBoardQuery = `DELETE FROM "Board" WHERE id = $1`
        const queryResult = await query(deleteBoardQuery , [boardId])
        return queryResult.rows
    }catch(error){
        console.error(`Error deleting board: ${error.message}`)
        throw new Error(error.message)
    }
}






export default {insertBoard, selectBoard,insertCard, selectCard, deleteCard, deleteBoard}