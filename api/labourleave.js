import {router as labourLeaveRouter} from './index.js'
import {GetLeaves,ApproveLeave,DeclineLeave,LeaveData,GetStatus,LeaveCount} from '../controllers/labourleaveController.js'

labourLeaveRouter.get('/leavereq',GetLeaves)
labourLeaveRouter.post('/approve',ApproveLeave)
labourLeaveRouter.post('/decline',DeclineLeave)
labourLeaveRouter.get('/leavedata',LeaveData)
labourLeaveRouter.get('/status',GetStatus)
labourLeaveRouter.get('/leavecount',LeaveCount)
export {labourLeaveRouter}