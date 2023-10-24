import {updateImage,selectImage} from '../models/imageUploadModel.js';
import asyncHandler from "express-async-handler";




//controller for card information image
export const updateCardInfoImage = asyncHandler(async (req, res) => {
    const {imageUrl,cardId} = req.body;
    console.log(req.body);
    try {
        const image = await updateImage({
            imageUrl,cardId
        });
        res.status(201).json({
            status: true,
        });
    } catch (err) {
        console.log("here",err);
        res.status(500).json({ error: err.message });
    }   
});

export const getImage = asyncHandler(async (req, res) => {  
    const image = await selectImage()
    res.status(200).json(image)    //tasks send to the front end

})

export default { updateCardInfoImage, getImage}