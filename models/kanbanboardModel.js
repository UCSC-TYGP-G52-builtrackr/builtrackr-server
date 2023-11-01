import { query } from "../config/db.js";


//insert board information
export const insertBoard = async (board) => {
    const { title ,companyId, SupervisorId,siteId } = board;
    console.log("board values",board);
    const result = await query(
        'INSERT INTO "Board" (title, "companyId", "supervisorId", "siteId") VALUES ($1, $2, $3,$4) RETURNING *',
    [title, companyId, SupervisorId, siteId]
    );
    //insert query in express js

    return result;
}


//get board information
export const selectBoard = async (siteId) => {
const siteNo  = 0;
    try{
const viewBoardQuery = 'SELECT * FROM "Board" WHERE "siteId" = $1 or "siteId" = $2 '
const queryResult = await query(viewBoardQuery,[siteId , siteNo]) 
return queryResult.rows
    }catch(error){
        console.error(`Error viewing board: ${error.message}`)
        throw new Error(error.message)
    }
}


export const insertCard = async (card) => {
    const { title, date, companyId, SupervisorId, boardId,siteId } = card;
    console.log("card values",card);
    const result = await query(
        'INSERT INTO "Card"(title, date, "companyId", "supervisorId", "boardId" , "siteId") VALUES ($1, $2, $3,$4,$5, $6) RETURNING title, date, "companyId", "supervisorId", "boardId" , "siteId" ',
    [title, date, companyId, SupervisorId, boardId,siteId]
    );
    //insert query in express js

    return result;
}


//get board information
export const selectCard = async (siteId) => {
    const siteid = siteId;
    console.log("siteIdCardtest",siteId);
    try{
const viewBoardQuery = 'SELECT *FROM "Card"  WHERE "siteId" = $1 ORDER BY id ASC'
const queryResult = await query(viewBoardQuery,[siteid])
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


export const cardCompleted = async (boardChange) => {
    const { cardId, boardId } = boardChange;
    const result = await query(
        'UPDATE "Card" SET "boardId" = $1 WHERE id =$2  RETURNING "boardId"',
    [boardId, cardId]
    );
    return result;
}

export const updateTaskcardId = async (taskIdChange) => {

    const { taskId, id } = taskIdChange;
    const result = await query(
        'UPDATE "Card" SET "taskId" = $1 WHERE id =$2  RETURNING "taskId"',
    [taskId,id]
    );
    return result;



}


//get site id of employeeNo
export const selectSiteId = async (employeeNo) => {
    const  employee  = employeeNo.employeeNo;
    console.log("employeeNo",employeeNo.employeeNo);
    try{
        const viewSiteQuery = 'SELECT * FROM sites WHERE supervisorid = $1'
        const queryResult = await query(viewSiteQuery,[employee]) 
        console.log("queryResult",queryResult.rows);
        return queryResult.rows[0]
            }catch(error){
                console.error(`Error viewing board: ${error.message}`)
                throw new Error(error.message)
            }
}



export const siteDisplay = async (siteId) => {
    try {
      const sitesQuery = "SELECT site_addr FROM sites WHERE site_id = $1";
      const result = await query(sitesQuery, [siteId]);
      return result.rows;
    } catch (err) {
      throw new Error("Internal error");
    }
  };


export default {insertBoard, selectBoard,insertCard, 
    selectCard, deleteCard, deleteBoard,cardCompleted,updateTaskcardId, selectSiteId , siteDisplay}