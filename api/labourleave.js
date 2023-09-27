import {router as labourLeaveRouter} from './index.js'
import {GetLeaves,ApproveLeave,DeclineLeave} from '../controllers/labourleaveController.js'

labourLeaveRouter.get('/leavereq',GetLeaves)
labourLeaveRouter.post('/approve',ApproveLeave)
labourLeaveRouter.post('/decline',DeclineLeave)


export {labourLeaveRouter}