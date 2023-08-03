import {app} from './core/init.js';
import {userRouter} from './api/user.js';
import { employeeRouter } from './api/employee.js';
import { connectDB,query } from './config/db.js'
import dotenv from 'dotenv'
dotenv.config()

connectDB(); 
//gineth
app.use('/api/user', userRouter);
// app.use('/api/task', taskRouter);
// app.use('/api/card' ,)








//govindani









//nilshan
app.use('/api/employee',employeeRouter)








//chamodi









//sadun









//rumindu










const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})


//axios use to get and post data