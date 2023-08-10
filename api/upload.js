import { router as uploadRouter } from "./index.js";
import path from 'path';
import fs from 'fs';

import { upload } from "../utils/multer.js";


const __dirname = path.resolve();

// import { UploadDocuments } from "../controllers/uploadController.js"

// uploadRouter.post('/upload', AddDocuments)

// uploadRouter.get('/view', ViewDocuments)

// export { uploadRouter }

uploadRouter.post('', upload.single('document'), (req, res) => {
    res.send("Image Uploaded");
});

// this is the code for get documents from document folder
uploadRouter.get('/getpdfs', (req, res) => {
    // get all the files inside upload folder
    const directoryPath = path.join(__dirname, '/uploads');
    console.log(directoryPath);
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            console.log(err);
            return console.log("Error while getting directory files");
        }
        // send file name and image file to client
        const imageInfo = [];
        files.forEach((file) => {
            imageInfo.push({
                name: file,
                
            });
        }
        );
        res.send(imageInfo);
    }
    );
});

export { uploadRouter }