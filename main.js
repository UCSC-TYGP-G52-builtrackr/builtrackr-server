import {app} from './core/init.js';
import {userRouter} from './api/user.js';
import { connectDB,query } from './config/db.js'
import dotenv from 'dotenv'
import { cardRouter } from './api/card.js';
import { dropRouter } from './api/drop.js';

dotenv.config()

connectDB(); 
app.use('/api/user', userRouter);
// app.use('/api/task', taskRouter);
app.use('/api/card', cardRouter);
app.use('/api/drop', dropRouter);

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})


//axios use to get and post data