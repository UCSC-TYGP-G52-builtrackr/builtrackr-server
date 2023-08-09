// import { router as uploadRouter } from "./index.js";

import { upload } from "../utils/multer";


// import { UploadDocuments } from "../controllers/uploadController.js"

// uploadRouter.post('/upload', AddDocuments)

// uploadRouter.get('/view', ViewDocuments)

// export { uploadRouter }

uploadRouter.post('/upload', upload.single('document'), (req, res) => {
    res.send("Image Uploaded");
});