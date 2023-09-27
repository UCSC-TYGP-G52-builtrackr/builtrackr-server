import asyncHandler from "express-async-handler";
import {
  addSite,
  siteDisplay,
  singleSiteDisplay,
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

  const getSitesToDisplay = asyncHandler(async (req, res) => {
    const result = await siteDisplay();
    res.status(200).json(result);
  });

  const getSingleSiteData = asyncHandler(async (req, res) => {
    const { id } = req.body;
    const result = await singleSiteDisplay(id);
    res.status(200).json(result);
  });


  
  export { addNewSite, getSitesToDisplay, getSingleSiteData};
