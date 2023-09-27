import {
  viewSupervisor,
  selectSupervisor,
  viewLabour,
  assignLabour,
  viewSites,
  countSites,
  viewEquipment,
  assignEquipment,
} from "../models/siteManagerModel.js";
import asyncHandler from "express-async-handler";

const ViewSupervisor = asyncHandler(async (req, res) => {
  const supervisors = await viewSupervisor();
  res.status(200).json(supervisors); //tasks send to the front end
});
//select supervisor for the site and update the database as well
const SelectSupervisor = asyncHandler(async (req, res) => {
  const { supervisorID, supervisorName, siteID } = req.body;
  const supervisor = await selectSupervisor(
    supervisorID,
    supervisorName,
    siteID
  );
  res.status(200).json(supervisor);
});

const ViewLabour = asyncHandler(async (req, res) => {
  const labour = await viewLabour();
  res.status(200).json(labour); //tasks send to the front end
});

const AssignLabour = asyncHandler(async (req, res) => {
  const { labourID, siteID } = req.body;
  console.log(labourID, siteID);
  const labour = await assignLabour(labourID, siteID);
  res.status(200).json(labour);
});

const ViewSites = asyncHandler(async (req, res) => {
  const sites = await viewSites();
  res.status(200).json(sites); //tasks send to the front end
});
const CountSites = asyncHandler(async (req, res) => {
  const sites = await countSites();
  res.status(200).json(sites); //tasks send to the front end
});

const GetEquipment = asyncHandler(async (req, res) => {
  const sites = await viewEquipment();
  res.status(200).json(sites); //tasks send to the front end
});

const AssignEquipment = asyncHandler(async (req, res) => {
    const { siteid ,equipmentid, quantity} = req.body;
    console.log(equipmentid, siteid,quantity);
    const equipment = await assignEquipment({siteid ,equipmentid, quantity});
    res.status(200).json(equipment);
    }
);

export {
  ViewSupervisor,
  SelectSupervisor,
  ViewLabour,
  AssignLabour,
  ViewSites,
  CountSites,
  GetEquipment,
  AssignEquipment,
};
