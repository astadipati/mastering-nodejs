const express = require('express');
const dotenv = require('dotenv');

// load env
dotenv.config({path:'./config/config.env'});
// load routes files
const bootcamps = require('./routes/bootcamps');

const app = express();

// routes
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT ||5000;

app.listen(
    PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);