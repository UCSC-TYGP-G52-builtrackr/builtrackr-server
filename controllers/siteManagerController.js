import {
  viewSupervisor,
  selectSupervisor,
  viewLabour,
  assignLabour,
  viewSites,
  countSites,
  viewEquipment,
  viewMaterial,
  assignEquipment,
  assignMaterial,
  getIds,
  getSupervisor,
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
  const siteID = req.params.siteId;
  console.log("site ID :");
  console.log(siteID);
  const sites = await viewSites(siteID);
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
    const { siteid ,equipmentid, quantity,name} = req.body;
    console.log(equipmentid, siteid,quantity,name);
    const equipment = await assignEquipment({siteid ,equipmentid, quantity,name});
    res.status(200).json(equipment);
    }
);

const GetMaterial = asyncHandler(async (req, res) => {
  const sites = await viewMaterial();
  res.status(200).json(sites); //tasks send to the front end
}
);

const AssignMaterial = asyncHandler(async (req, res) => {
  const { siteid ,materialid, quantity,date,type,name} = req.body;
  console.log(materialid, siteid,quantity,date,type,name);
  const material = await assignMaterial({siteid ,materialid, quantity,date,type,name});
  res.status(200).json(material);
  }
);


const GetIds = asyncHandler(async (req, res) => {
  const empID=req.params.id;
  const ids = await getIds(empID);
  res.status(200).json(ids); //tasks send to the front end
}
);

const GetSupervisor = asyncHandler(async (req, res) => {
  const siteId=req.params.id;
  const sites = await getSupervisor(siteId);
  res.status(200).json(sites); //tasks send to the front end
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
  GetMaterial,
  AssignMaterial,
  GetIds,
  GetSupervisor

};
