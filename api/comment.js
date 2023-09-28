import {router as commentRouter} from './index.js';
import { addComment,getComment } from '../controllers/commentController.js';


commentRouter.post('/addComment', addComment);
commentRouter.get('/getComment', getComment);

export {commentRouter};
