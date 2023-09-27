import { query } from "../config/db.js";


//update image in card
export const updateImage = async (image) => {

 const {imageUrl,cardId} = image;

 const result = await query(
        'UPDATE "Card" SET "image" = $1 WHERE id = $2 RETURNING "image"',
    [imageUrl,cardId]
    );

return result;
}


export const selectImage = async () => {
    
    try{
const viewImageQuery = 'SELECT * FROM "Card" '
const queryResult = await query(viewImageQuery)
return queryResult.rows
    }catch(error){
        console.error(`Error viewing image: ${error.message}`)
        throw new Error(error.message)
    }
}


export default {updateImage, selectImage}