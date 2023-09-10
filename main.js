import {app} from './core/init.js';
import {userRouter} from './api/user.js';
import { siteRouter } from './api/site.js';
import { employeeRouter } from './api/employee.js';
import {taskRouter} from './api/task.js';
import {siteManagerRouter} from './api/sitemanger.js';
import {uploadRouter} from './api/upload.js';
import { connectDB,query } from './config/db.js'
import dotenv from 'dotenv'
import { cardRouter } from './api/card.js';
import { dropRouter } from './api/drop.js';
import {requestRouter} from './api/requests.js';
import{labourRouter} from './api/labour.js';
import { equipmentRouter } from './api/equipment.js';
import { leaveRouter } from './api/leave.js';
import {fileuploadRouter} from './api/fileupload.js';

dotenv.config()


// import { paymentRouter } from './api/payment.js';
dotenv.config()
connectDB(); 

//gineth
app.use('/api/user', userRouter);
app.use('/api/task', taskRouter);
app.use('/api/sitemanager', siteManagerRouter);
app.use('/api/upload', uploadRouter);
// app.use('/api/payment', paymentRouter);









//govindani

app.use('/api/card', cardRouter);
app.use('/api/drop', dropRouter);
app.use('/api/requests', requestRouter);
app.use('/api/labour', labourRouter);
app.use('/api/equipment', equipmentRouter);
app.use('/api/leave', leaveRouter);
app.use('/api/fileupload', fileuploadRouter);





//nilshan
app.use('/api/employee',employeeRouter)








//chamodi
app.use('/api/site',siteRouter);








//sadun









//rumindu









const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})


//axios use to get and post data