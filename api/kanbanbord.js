import { addBoard , getBoard ,addCard, getCard , deleteCardInfo , deleteBoardInfo} from '../controllers/kanbanboardController.js';
import {router as kanbanboardRouter} from './index.js';


kanbanboardRouter.post('/addBoard', addBoard);
kanbanboardRouter.get('/getBoard', getBoard);
kanbanboardRouter.post('/addCard', addCard);
kanbanboardRouter.get('/getCard', getCard);
kanbanboardRouter.delete('/deleteCard/:id', deleteCardInfo);
kanbanboardRouter.delete('/deleteBoard/:id', deleteBoardInfo);


export {kanbanboardRouter};
