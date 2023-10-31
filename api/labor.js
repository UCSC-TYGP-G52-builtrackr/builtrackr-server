import {router as laborRouter} from './index.js'
import {GetLaborData} from '../controllers/laborController.js'

laborRouter.get('/data/:siteId',GetLaborData)


export {laborRouter}