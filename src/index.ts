import express from "express";
import bodyParser from 'body-parser';
import path from "path";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { User, UserRepoTokens } from "./backend/db";
import { configureApiRoutes } from "./backend/apiRoutes";
import { sequelize } from './backend/db';
import { configureBasicRoutes } from "./backend/basicRoutes";

//env variables
dotenv.config();

//add pass custom data
declare module 'express' {
  interface Request {
    customData?: any; // Add your custom property here
  }
}

//srv settings
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

//load routes
configureApiRoutes(app);
configureBasicRoutes(app);

//main function, check for db and start
async function main() {
  try {

    // Connect to db
    await sequelize.authenticate();
    //console.log(`Database was connected succesfully`);

    // Create DB Tables
    await User.sync()
    await UserRepoTokens.sync()
    //console.log(`Database model – ok`);

    // Start server
    if (process.env.NODE_ENV == 'localtest') {
      app.listen(3000, () => {
        //console.log(`App listening on port 3000`);
      });
    } else {
      app.listen(0, () => {
        //console.log(`App unit test srv`);
      });
    }
  } catch (error) {
    console.error('Database connection failed', error)
  }
}

main()

export default app;