
import multer, {diskStorage} from 'multer';
import path from 'path';

const uploadDir = 'uploads';

const storage = diskStorage({
    destination: function (req, file, cb) {
      const uploadPath = path.join(uploadDir);
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

const upload = multer({ storage: storage });


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



export { upload , upload2 }