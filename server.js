const express = require('express');
const dotenv = require('dotenv');
// const logger = require('./middleware/logger');
const morgan = require('morgan');

// load env
dotenv.config({path:'./config/config.env'});
// load routes files
const bootcamps = require('./routes/bootcamps');

const app = express();

// implemented kita ganti pakai morgan
// app.use(logger);
// @desc Dev logging midleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// routes
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT ||5000;

app.listen(
    PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);