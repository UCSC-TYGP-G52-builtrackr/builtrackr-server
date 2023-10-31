
import multer, {diskStorage} from 'multer';
import path from 'path';

const uploadDir = 'uploads/';

const storage = diskStorage({
    destination: function (req, file, cb) {
      const uploadPath = path.join(uploadDir);
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
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


const uploadDir2 = 'uploads/Supervisor/uploads';

const storage2 = diskStorage({
    destination: function (file,req, cb) {

      const uploadPath = path.join(uploadDir2);
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
});


const upload2 = multer({ storage: storage2 });


const uploadDir3 = 'uploads/Documents/';

const storage3 = diskStorage({
  destination: function (file,req, cb) {

    const uploadPath = path.join(uploadDir3);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});


const upload3 = multer({ storage: storage3 });

export { upload ,upload1, upload2 , upload3}
