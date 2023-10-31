import { router as fileuploadRouter } from "./index.js";
import path from 'path';
import fs from 'fs';

import { upload3 } from "../utils/multer.js";
import { log } from "console";

//upload file from frontend
const __dirname = path.resolve();



fileuploadRouter.post('/uploads3', upload3.single('document'), (req, res) => {
    res.send("Image Uploaded");
});




// this is the code for get documents from document folder
fileuploadRouter.get('/uploads/Documents', (req, res) => {
    // get all the files inside upload folder
    const directoryPath = path.join(__dirname, '/uploads/Documents/');
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

const pdfDirectory = path.join(__dirname, 'uploads/Documents');

fileuploadRouter.post('/uploads/Documents', (req, res) => {
    const { filename } = req.body;
    console.log(req.body.filename)
  
    // Construct the file path
    const filePath = path.join(pdfDirectory, filename);
  
    // Check if the file exists
    if (fs.existsSync(filePath)) {
      // Set the appropriate content type for PDF files
      res.setHeader('Content-Type', 'application/pdf');
  
      // Stream the file to the response
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    } else {
      // Return a 404 response if the file does not exist
      res.status(404).send('File not found');
    }
  });

fileuploadRouter.delete('/uploads/Documents/:filename', async (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, '/uploads/Documents', filename);
  
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