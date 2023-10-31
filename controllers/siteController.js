import asyncHandler from "express-async-handler";
import {
  addSite,
  addCustomer,
  siteDisplay,
  singleSiteDisplay,
  fetchAllCustomers,
  checkCustDetails,
  customerAllSites,
  checkAssigned,
  availManagers,
  assignManagerUpdate,
  unassignManagerUpdate,
  allManagers,
  selectedManager,
  siteCountOftime,
} from "../models/siteModel.js";

const addNewSite = asyncHandler(async (req, res) => {
  const { siteName, siteDesc, siteType, siteClient, siteAddr, companyID } =
    req.body;

  console.log(req.body);

  try {
    const site = await addSite(
      siteName,
      siteDesc,
      siteType,
      siteClient,
      siteAddr,
      companyID
    );
    res.status(200).json({
      // id: site.siteId,
    });
  } catch (err) {
    throw new Error(err);
  }
});

const addNewCustomer = asyncHandler(async (req, res) => {
  const { fName, lName, email, contNo, confpwd } = req.body;

  console.log(req.body);

  try {
    const site = await addCustomer(fName, lName, email, contNo, confpwd);
    res.status(200).json({
      // id: site.siteId,
    });
  } catch (err) {
    throw new Error(err);
  }
});

const getSitesToDisplay = asyncHandler(async (req, res) => {
  const { companyID } = req.body;
  console.log(req.body);
  const result = await siteDisplay(companyID);
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

const checkWhetherAssigned = asyncHandler(async (req, res) => {
  const { siteId } = req.body;
  const result = await checkAssigned(siteId);
  res.status(200).json(result);
});

const getManagers = asyncHandler(async (req, res) => {
  const { companyID } = req.body;
  const result = await availManagers(companyID);
  res.status(200).json(result);
});

const assignSiteManager = asyncHandler(async (req, res) => {
  const { siteId, selectedPersonNo } = req.body;
  const result = await assignManagerUpdate(siteId, selectedPersonNo);
  res.status(200).json(result);
});

const unassignSiteManager = asyncHandler(async (req, res) => {
  const { siteId } = req.body;
  const result = await unassignManagerUpdate(siteId);
  res.status(200).json(result);
});

const getAllManagers = asyncHandler(async (req, res) => {
  const { companyID } = req.body;
  const result = await allManagers(companyID);
  res.status(200).json(result);
});

const getManagerDetails = asyncHandler(async (req, res) => {
  const { employeeNo } = req.body;
  const result = await selectedManager(employeeNo);
  res.status(200).json(result);
});

const siteCountOfPeriod = asyncHandler(async (req, res) => {
  const { company_id, f_date, t_date } = req.body;
  console.log(req.body);
  try {
    const siteCount = await siteCountOftime(company_id, f_date, t_date);
    res.status(200).json(siteCount);
  } catch (err) {
    throw err;
  }
});

export {
  addNewSite,
  addNewCustomer,
  getSitesToDisplay,
  getSingleSiteData,
  getAllCustomers,
  checkCustomers,
  getCustomerSites,
  checkWhetherAssigned,
  getManagers,
  assignSiteManager,
  unassignSiteManager,
  getAllManagers,
  getManagerDetails,
  siteCountOfPeriod,
};
