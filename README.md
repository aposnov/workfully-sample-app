# workfully-sample-app

## Project description

### Database
Should be pre-installed PostgreSQL
https://www.postgresql.org/download/

### Frontend / client
React Webpack TypeScript

### Backend / server
NodeJS Express TypeScript

## Info assignment
All requirements was achieved

### Code
I have added comments to all important parts of code

### ENV variables
.env 
SRV_PORT= port of server

POSTGRES_DB = name of database

POSTGRES_USER = username of database

POSTGRES_PASSWORD = password of user database

POSTGRES_HOST = host of database

ACCESS_TOKEN_EXPIRE = '5m' 

more data/variables can be moved into ENVs for prod use

### Authentication
Better to store auth tokens in Redis, but to simplify app, i created table in Postgres – UserRepoTokens, where i store all tokens, create it in registration/login and remove in logout. Also to simplify i have skipped refresh token functionality. Token JWT expire - 5min (can be edited)

### Structure
 **Client** – frontend app with 4 inputs and submit button
 **Public** - build of frontend app by webpack (bundle)
 **Src** - server app with all backend files

 ### Backend (Src folder)
 **index.ts** - main file for server
 **backend/apiRoutes.ts** - all logic for API endpoits /register /login /profile /logout
 **backend/basicRoutes.ts** - logic for fronted to run app and 404
 **backend/auth.ts** - logic to generate and verify JWT tokens
 **backend/bd.ts** - connection and communication with database (two tables User and UserRepoTokens)

 ### Tests

 Tests – folder for tests
 basic.test.ts – basic test to run and check server env
 registration.test.ts – registration endpoint tests
 profile.test.ts – profile endpoint tests

 **To run test please use command**
 npx jest
 
## To install and run project commands
**npm ci** - install
**npm run start:dev** - RUN server

## Report testing
Checked with FE app, by Postman and manually

**For Postman positive testing steps:**
[link collection for simplify test](https://elements.getpostman.com/redirect?entityId=6166489-2997a2c3-d4ab-4787-bc4e-f78c4ca3fa4a&entityType=collection)

1) Register – 200
2) Login – 200
3) Profile – 200
4) Logout – 200
5) Profile – 401
