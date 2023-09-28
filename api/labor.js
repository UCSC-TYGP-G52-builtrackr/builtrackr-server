import {router as laborRouter} from './index.js'
import {GetData} from '../controllers/laborController.js'

laborRouter.get('/data',GetData)

export {laborRouter}