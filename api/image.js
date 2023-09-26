import { router as imageRouter } from "./index.js";
import {updateCardInfoImage, getImage} from '../controllers/imageUploadController.js';

//update image in card
imageRouter .post('/updateImage',updateCardInfoImage);
imageRouter .get('/getImage',getImage);


export {imageRouter};

