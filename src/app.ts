import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { Router } from 'express';
import usersRoute from './routes/usersRoute';
import postsRoute from './routes/postsRoute';
import authRoute from './routes/authRoute';
import { AppDataSource } from "./config/data-source"
import errorHandler from './middlewares/error.middleware';
import passport from './config/localStrategy';
import session from 'express-session'
import { cookieSessionConfig, dbSessionConfig } from './config/sessionConfig'
import checkOldPosts from './middlewares/cron.middeware';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor() {
    this.app = express();
    this.env = process.env.NODE_ENV || 'development';
    this.port = process.env.PORT || 3000;
    this.initializeDB();
    checkOldPosts();
    this.app.use(express.json());
    this.app.use(passport.initialize());
    this.app.use(session(dbSessionConfig));
    this.app.use(passport.authenticate('session'));
  }

  public initializeDB() {
    AppDataSource.initialize()
      .then(() => {
        console.log("DB started!");
      })
      .catch((error) => console.log(error))
  }

  public listen() {
    this.app.use(usersRoute());
    this.app.use(postsRoute());
    this.app.use(authRoute());
    this.app.use(errorHandler);
    
    this.app.listen(this.port, () => {
      console.log(`App listening on port ${this.port}`)
    })
  }

  public getServer() {
    return this.app;
  }
}

export default App;