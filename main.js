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
import {labourLeaveRouter} from './api/labourleave.js'

import { iManagerRouter } from './api/mCard.js';
import { iManagerERouter } from './api/eCard.js';

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
app.use('/api/labourleave',labourLeaveRouter)









//govindani

app.use('/api/card', cardRouter);
app.use('/api/drop', dropRouter);





//nilshan
app.use('/api/employee',employeeRouter)








//chamodi
app.use('/api/site',siteRouter);








//sadun
app.use('/api/material', iManagerRouter )
app.use('/api/equipment', iManagerERouter)








//rumindu









const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})


//axios use to get and post data