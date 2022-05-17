import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { Router } from 'express';
import usersRoute from './routes/usersRoute';
import { AppDataSource } from "./data-source"

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor() {
    this.app = express();
    this.env = process.env.NODE_ENV || 'development';
    this.port = process.env.PORT || 3000;
    this.initializeDB();
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

    this.app.listen(this.port, () => {
      console.log(`Example app listening on port ${this.port}`)
    })
  }

  public getServer() {
    return this.app;
  }
}

export default App;