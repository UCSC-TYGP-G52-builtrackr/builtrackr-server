import {app} from './core/init.js';
import {userRouter} from './api/user.js';
import {taskRouter} from './api/task.js';
import {siteManagerRouter} from './api/sitemanger.js';
import {uploadRouter} from './api/upload.js';
import { connectDB,query } from './config/db.js'
import dotenv from 'dotenv'

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









//nilshan









//chamodi









//sadun









//rumindu










const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})


//axios use to get and post data