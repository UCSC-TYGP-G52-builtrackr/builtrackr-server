
import multer, {diskStorage} from 'multer'

const storage = diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Specify the destination directory for uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); 
      // Customize the file name if needed
    }
  });
  const storage1 = diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/employees/'); // Specify the destination directory for uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); 
      // Customize the file name if needed
    }
  });

const upload = multer({ storage: storage });
const upload1 = multer({ storage: storage1 });


export { upload,upload1}