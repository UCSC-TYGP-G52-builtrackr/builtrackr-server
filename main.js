import {app} from './core/init.js';
import {userRouter} from './api/user.js';
import { connectDB,query } from './config/db.js'
import dotenv from 'dotenv'
dotenv.config()

connectDB(); 
app.use('/api/user', userRouter);

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})
