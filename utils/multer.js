import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Specify the destination directory for uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); 
      // Customize the file name if needed
      console.log("whoooooooooooooo")
    }
  });

const upload = multer({ storage: storage });


export { upload}