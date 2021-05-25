'use strict';


// load modules
const express = require('express');
const morgan = require('morgan');
const {sequelize} = require('./models');
const cors = require('cors');

const corsOptions = {
  origin: 'localhost:3000',
  optionsSuccessStatus:200
}

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();
app.use(express.json());
app.use(cors(corsOptions));

const userRoutes = require('./routes/userRoutes');
const courseRoutes= require('./routes/courseRoutes');

app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);


(async()=>{
  try{
    await sequelize.authenticate();
    console.log('connection to the database was successful')
  } catch(err){
    console.error('unable to connect to database')
  }
})();

// setup morgan which gives us http request logging
app.use(morgan('dev'));

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});


// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
