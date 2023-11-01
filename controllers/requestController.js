import asyncHandler from 'express-async-handler';
import {sendRequest, viewEquipments,sendMaterialRequest,viewMaterials} from '../models/requestModel.js';



const SendRequest = asyncHandler(async (req, res) => {
    const { SupervisorId, id,number,siteId, name } = req.body
    const request = await sendRequest(SupervisorId, id,number,siteId, name)
    if (request) {
        res.status(200).json({
            supervisorId: request.SupervisorId,
            id: request.id,
            siteId: request.siteId,
            name: request.name,
            number: request.number,
           
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid request');
    }
});

const ViewEquipment = asyncHandler(async (req, res) => {

    const companyid  = req.query.companyId;
    console.log("siteIdlabourcontroller",req.query);
    try {
        const companyId = await  viewEquipments (companyid)
        res.status(200).json(companyId);
    } catch (err) {
        console.log("here",err);
        res.status(500).json({ error: err.message });
    }  ;

})
const SendMaterial = asyncHandler(async (req, res) => {
    const { SupervisorId, id,number,siteId,type, name } = req.body
    console.log("requestControllerMaterial",SupervisorId, id,number,siteId,type, name)
    const request = await sendMaterialRequest(SupervisorId, id,number,siteId,type, name)
    if (request) {
        res.status(200).json({
            supervisorId: request.SupervisorId,
            id: request.id,
            siteId: request.siteId,
            name: request.name,
            number: request.number,
            type: request.type,
           
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid request');
    }
});

const ViewMaterial = asyncHandler(async (req, res) => {

    const companyid  = req.query.companyId;
    console.log("siteIdlabourcontroller",req.query);
    try {
        const companyId = await  viewMaterials(companyid)
        res.status(200).json(companyId);
    } catch (err) {
        console.log("here",err);
        res.status(500).json({ error: err.message });
    }  ;

})

export { SendRequest, ViewEquipment,SendMaterial,ViewMaterial }