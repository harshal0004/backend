import express, {Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import sequelize, { syncDatabase } from './models';
import userRouter from './routers/user';
// import session from 'express-session';
import cookieParser from 'cookie-parser';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
// app.use(cookieParser());
// app.use(session({
//   secret: process.env.SESSION_SECRET || 'default_secret',
//   resave: false,
//   saveUninitialized: false,
//   cookie: { secure: false } // Set to true if using HTTPS
// }));

app.use('/users', userRouter);

app.get('/about', (req: Request, res: Response) => {
    res.send('Hello World');
});

async function startServer(){
  await syncDatabase();
  app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch(console.error);