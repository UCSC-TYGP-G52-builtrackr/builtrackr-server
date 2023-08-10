import asyncHandler from "express-async-handler";
import {
  addSite,
} from "../models/siteModel.js";

const addNewSite = asyncHandler(async (req, res) => {
    const {
      siteName,
      siteDesc,
      siteType,
      siteClient
    } = req.body;
  
    console.log(req.body);
  
    try {
      const site = await addSite(
        siteName,
        siteDesc,
        siteType,
        siteClient,
      );
      res.status(200).json({
        // id: site.siteId,
      });
    } catch (err) {
      throw new Error(err);
    }
  });

  export { addNewSite };
