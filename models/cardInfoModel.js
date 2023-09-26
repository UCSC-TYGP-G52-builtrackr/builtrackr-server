import {query} from "../config/db.js";

//insert card information label
export const insertCardInfo = async (card) => {
    const {cardId,label,color} = card;
    console.log("card values",card);
    const result = await query(
        'INSERT INTO "CardInfo"("CardId", label, color) VALUES ($1,$2,$3) RETURNING "CardId",label,color',
    [cardId,label,color]
    );
    //insert query in express js

    return result;
}


//get card information label
export const selectCardInfo = async () => {
    try{
const viewCardInfoQuery = 'SELECT id, "CardId", label, color FROM "CardInfo"'
const queryResult = await query(viewCardInfoQuery)
return queryResult.rows
    }catch(error){
        console.error(`Error viewing card Information: ${error.message}`)
        throw new Error(error.message)
    }
}



//insert card information task
export const insertCardInfoTask = async (card) => {
    console.log(card.task)
    const {task,completed,cardId,companyId} = card;
    console.log("card values",card);
    const result = await query(
        'INSERT INTO "CardInfoSubtask"(task, completed, "cardId", "companyId") VALUES ($1,$2,$3,$4) RETURNING task, completed, "cardId", "companyId"',
    [task,completed,cardId,companyId]
    );
    //insert query in express js

    return result;
}


//get card information task
export const selectCardInfoTask = async () => {
    try{
const viewCardInfoQuery = 'SELECT * FROM "CardInfoSubtask" ORDER BY id ASC'
const queryResult = await query(viewCardInfoQuery)
return queryResult.rows

    }catch(error){
        console.error(`Error viewing card Information: ${error.message}`)
        throw new Error(error.message)
    }
}

//update the task column
export const updateCardInfoTask = async (task) => {
    const {completed,CardtaskId} = task;
    console.log("card values",task);
    const result = await query(
        'UPDATE "CardInfoSubtask" SET completed = $1 WHERE id =$2  RETURNING completed',
    [completed,CardtaskId]
    );

    return result;

}

//update the description
export const updateCardInfoDescription = async (description) => {
    const {desc,cardId} = description;
    console.log("card values",description);
    const result = await query(
        'UPDATE "Card" SET description = $1 WHERE id =$2  RETURNING description',
    [desc,cardId]
    );
    return result;
}

export const updateCardInfoTitle = async (titles) => {
    const {title,cardId} = titles;
    console.log("card values",titles);
    const result = await query(
        'UPDATE "Card" SET title = $1 WHERE id =$2  RETURNING description',
    [title,cardId]
    );
    return result;
}

export default { insertCardInfo,selectCardInfo,insertCardInfoTask,selectCardInfoTask,updateCardInfoTask,updateCardInfoDescription, updateCardInfoTitle};