import asyncHandler from "express-async-handler";
import {
  fetchCompName
} from "../models/navbarModel.js";

  const getCompanyName = asyncHandler(async (req, res) => {
    const {
      companyID,
      employeeNo
    } = req.body;
    console.log(req.body);
    const result = await fetchCompName(companyID, employeeNo);
    res.status(200).json(result);
  });

 
  export { getCompanyName };
