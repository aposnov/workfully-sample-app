# workfully-sample-app
![alt text](example.jpg)

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

NODE_ENV = 'localtest' – this variable should be setted to allow work srv on 3000 port, if not it will be 0 (that means for unix use any port that available)

SRV_PORT= port of server

POSTGRES_DB = name of database

POSTGRES_USER = username of database

POSTGRES_PASSWORD = password of user database

POSTGRES_HOST = host of database

ACCESS_TOKEN_EXPIRE = '5m' 

more data/variables can be moved into ENVs for prod use

### Authentication
Better to store auth tokens in Redis, but to simplify app, i created table in Postgres – UserRepoTokens, where i store all tokens, create it in registration/login and remove in logout. Also to simplify i have skipped refresh token functionality. 
Token stored on client in httpOnly cookie that server put there after login. 
Token JWT expire - 5min (can be edited)

### Structure
 **SRC/FRONTEND** – frontend app with 3 components and main app with navigation

 **Public** - build of frontend app by webpack (bundle)

 **SRC/BACKEND** - server app with all backend files

  ### Frontend (Src folder)
**src/frontend/package.json** - dependencies of FE app

**src/frontend/App.tsx** - main app with navigation

**src/frontend/LoginForm.tsx** - login form with login/register button

**src/frontend/RegistrationForm.tsx** - registration form with login/register button

**src/frontend/Profilepage.tsx** - profile page, show "not autorized" and "profile with user data" if authorized

 ### Backend (Src folder)

 **src/backend/package.json** - dependencies of Backend app

 **index.ts** - main file for server

 **src/backend/controllers/apiRoutes.ts** - all routes for API endpoits /register /login /profile /logout

 **src/backend/services/registration.ts** - logic for /register route

 **src/backend/services/login.ts** - logic for /login route

 **src/backend/services/profile.ts** - logic for /profile route

 **src/backend/services/logout.ts** - logic for /logout route

 **src/backend/controllers/basicRoutes.ts** - logic for fronted to run app and 404

 **src/backend/controllers/interfaces.ts** - models and interfaces

 **src/backend/controllers/bd.ts** - connection and communication with database (two tables User and UserRepoTokens)

 **src/backend/helpers/authHelpers.ts** – helper to generate JWT tokens, compare passwords

 **src/backend/middleware/auth.ts** – middleware to manage and validate JWT token

 ### Unit Tests

 Tests – folder for tests /profile and /registration endpoints

  **src/frontend/basic.test.ts** – basic test to run and check server env

  **src/frontend/registration.test.ts** – registration endpoint tests

  **src/frontend/profile.test.ts** – profile endpoint tests

 **To run test please use command**

 npx jest
 
## To install and run project commands

1. install and Backend server | go to /src/backend
   
```npm ci```

```npm run start:be```  

2. Build FE | go to /src/frontend
   
```npm ci```

```npm run build:fe```  

## Report testing
Checked with FE app, by Postman and manually

**For Postman positive testing steps:**
[link collection for simplify test](https://elements.getpostman.com/redirect?entityId=6166489-2997a2c3-d4ab-4787-bc4e-f78c4ca3fa4a&entityType=collection)

1) Register – 200
2) Login – 200
3) Profile – 200
4) Logout – 200
5) Profile – 401
