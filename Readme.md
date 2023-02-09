# MERN Stack Position Interview Project

This project is based on the given task for an interview job postion in MERN Stack Developer, This project has two tables for crud operation and authentication for both backend and frontend.

The Project consist of following technologies as per requirement:

1. ES6 JavaScript
2. React Js
3. Bootstrap
4. Node Js
5. Express Js
6. MongoDB
7. JWT and JWT-Decode
8. Nodemailer
9. Joi
10. React-Router-DOM

    These are core building blocks of this project, but it has more than that and have extraordinary dependencies, folder structured, maintainable code.

## Front-End

The front part is designed with javascript, react and bootstrap. The required functionality works perfectly fine:

- After login redirect to dashboard page as per expected
- CRUD operations and sorting performed in Both categories and car or vechicles components.
- Jwt authorization and authorization checks.
- JWt security and cross origin support for backend interaction is maintained by **cors**
- Logout feature implemented successfully#

In order to get started with front end part you need to do the following things:

1. Node latest version installed
2. **cd /frontend**
3. **npm install** to install dependencies.
4. **npm run dev**

## Backend interaction

The backend part is created with Node Js, MongoDB with mongoose community 6.\* and RESTful API's designed with Express Js and all the requirements perfectly working in my machine

- Nodemailer is used to send a **gmail** base random password to login later
- Application secrets stored in a .env file to make application more secure
- Complete CRUD operations with Schemas of mongoDB designed
- All Routes perfectly tested in Postman
- Folder structure and maintenance of code.
- Error handling and validation is perfectly checked

To get start with backend you need to follow the steps below:

1. Node version 18.\* installed in machine
2. MongoDB latest community edition with compass installed
3. **cd /backend**
4. **npm install**
5. **npm run seed** for seeding demo data of categories and vehicles to get started.
6. **sudo systemctl start mongod** to start mongoDB server.
7. **npm start**
8. **.env** file for environment variables
9. **Nodemailer** settings and app password to send emails, should be stored in config.env file
