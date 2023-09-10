import { router as fileuploadRouter } from "./index.js";
import path from 'path';
import fs from 'fs';

import { upload } from "../utils/multer.js";
import { log } from "console";

//upload file from frontend
const __dirname = path.resolve();



fileuploadRouter.post('', upload.single('document'), (req, res) => {
    res.send("Image Uploaded");
});

// this is the code for get documents from document folder
fileuploadRouter.get('/getpdfs', (req, res) => {
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

fileuploadRouter.post('/downloadpdfs', (req, res) => {
    // get all the files inside upload folder
    const {filename} = req.body;
    const filePath = path.join(__dirname, '/uploads', filename);
    res.download(filePath);
});

fileuploadRouter.delete('/deletepdf/:filename', async (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, '/uploads', filename);
  
    try {
      fs.unlinkSync(filePath);
      console.log(`PDF ${filename} deleted.`);
      res.status(200).send(`PDF ${filename} deleted.`);
    } catch (error) {
      console.error(`Error deleting PDF ${filename}:`, error);
      res.status(500).send(`Error deleting PDF ${filename}`);
    }
  });

export { fileuploadRouter }