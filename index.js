
const express = require('express');

//Instead of initiating dotenv config here,
//we are adding a -r flag to the server initiator code
//in the package.json file

// const dotenv = require('dotenv')

// dotenv.config()

const helmet = require('helmet');

// const logger = require('./middleware/logger');

const actionRoutes = require('./actions/actionRouter');
const projectRoutes = require('./projects/projectRouter');


const server = express();

server.use(helmet())

// server.use(logger());


//Using some middleware to parse request body if its JSON
server.use(express.json());


//Using imported userRoutes
server.use('/actions', actionRoutes);
server.use('/projects', projectRoutes);


//Home Page
server.use('/', (req, res) => {

    const name = process.env.MY_NAME

    res.send(`Welcome To ${name}'s Sprint Page`)
  });




 


const port = process.env.PORT || 5000; //yea

const host = process.env.HOST || "0.0.0.0";

// watch for connections on port 5000
server.listen(port, host, () =>
  console.log('Server running on http://localhost:5000')
);