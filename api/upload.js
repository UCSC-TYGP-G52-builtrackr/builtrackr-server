import { router as uploadRouter } from "./index.js";
import path from "path";
import fs from "fs";

import { upload, upload1,upload3 } from "../utils/multer.js";
import { log } from "console";

const __dirname = path.resolve();

// import { UploadDocuments } from "../controllers/uploadController.js"

// uploadRouter.post('/upload', AddDocuments)

// uploadRouter.get('/view', ViewDocuments)

// export { uploadRouter }

uploadRouter.post("", upload.single("document"), (req, res) => {
  res.send("Image Uploaded");
});
// uploadRouter.post("/labourer", upload.single("image"), (req, res, ) => {
//   console.log(req.body)
//   console.log("Request come");
//   res.status(200).json(req.file.filename);
// });

uploadRouter.post("/employee", (req, res) => {
  upload1.single("image")(req, res, (err) => {
    if (err) {
      // Handle the upload error
      console.error("Multer Error:", err);
      return res
        .status(500)
        .json({ error: "File upload failed", message: err.message });
    }

    // File upload was successful, continue with your logic here
    console.log("Request received");
    res.status(200).json(req.file.filename);
  });
});

uploadRouter.post("/task", (req, res) => {
  upload3.single("image")(req, res, (err) => {
    console.log('server')
    if (err) {
      // Handle the upload error
      console.error("Multer Error:", err);
      return res
        .status(500)
        .json({ error: "File upload failed", message: err.message });
    }

    // File upload was successful, continue with your logic here
    console.log("Request received");
    res.status(200).json(req.file.filename);
  });
});

// this is the code for get documents from document folder
uploadRouter.get("/getpdfs", (req, res) => {
  // get all the files inside upload folder
  const directoryPath = path.join(__dirname, "/uploads");
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
    });
    res.send(imageInfo);
  });
});

uploadRouter.post("/downloadpdfs", (req, res) => {
  // get all the files inside upload folder
  const { filename } = req.body;
  const filePath = path.join(__dirname, "/uploads", filename);
  res.download(filePath);
});

uploadRouter.delete("/deletepdf/:filename", async (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, "/uploads", filename);

  try {
    fs.unlinkSync(filePath);
    console.log(`PDF ${filename} deleted.`);
    res.status(200).send(`PDF ${filename} deleted.`);
  } catch (error) {
    console.error(`Error deleting PDF ${filename}:`, error);
    res.status(500).send(`Error deleting PDF ${filename}`);
  }
});
export { uploadRouter };
