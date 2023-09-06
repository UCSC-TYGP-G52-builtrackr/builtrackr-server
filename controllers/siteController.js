import asyncHandler from "express-async-handler";
import {
  addSite,
  addCustomer,
  siteDisplay,
  singleSiteDisplay,
  fetchAllCustomers,
  checkCustDetails,
  customerAllSites,
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

  const addNewCustomer = asyncHandler(async (req, res) => {
    const {
      fName,
      lName,
      email,
      contNo,
      confpwd,
    } = req.body;
  
    console.log(req.body);
  
    try {
      const site = await addCustomer(
        fName,
        lName,
        email,
        contNo,
        confpwd,
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

  const getAllCustomers = asyncHandler(async (req, res) => {
    const result = await fetchAllCustomers();
    res.status(200).json(result);
  });

  const checkCustomers = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const result = await checkCustDetails(email, password);
    res.status(200).json(result);
  });

  const getCustomerSites = asyncHandler(async (req, res) => {
    const { customerID } = req.body;
    const result = await customerAllSites(customerID);
    res.status(200).json(result);
  });

  export { addNewSite, addNewCustomer, getSitesToDisplay, getSingleSiteData, getAllCustomers, checkCustomers, getCustomerSites };
