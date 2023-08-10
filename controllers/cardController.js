import {viewCard} from  "../models/cardModel.js";
import asyncHandler from 'express-async-handler'




export const  ViewCard = asyncHandler(async(req,res)=>{

    const cards  = await viewCard()
    res.status(200).json(cards);

});

