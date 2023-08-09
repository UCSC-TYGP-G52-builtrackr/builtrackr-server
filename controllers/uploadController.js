// import {uploadDocument} from "../models/uploadModel.js";
// import asyncHandler from 'express-async-handler'
// import {getDocument} from "../models/uploadModel.js";

// const UploadDocuments = asyncHandler(async (req, res) => {
//     const {documentName,documentType,document} = req.body
//     const document = await uploadDocument(documentName,documentType,document)
//     if (document) {
//         res.status(201).json({
//             id: document.document_id,
//             documentName: document.document_name,
//             documentType: document.document_type,
//             document: document.document,
//         })
//     }
//     else {
//         res.status(400)
//         throw new Error('Invalid document data')
//     }
// }