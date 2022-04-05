const express = require('express');
const dotenv = require('dotenv');
// const logger = require('./middleware/logger');
const morgan = require('morgan');
// colors
const colors = require('colors');
// load DB
const connectDB = require('./config/db');


// load env
dotenv.config({path:'./config/config.env'});
connectDB();
// load routes files
const bootcamps = require('./routes/bootcamps');
const { ServerApiVersion } = require('mongodb');

const app = express();

// pengganti bodyparser sudah include di express
app.use(express.json());

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
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);

//handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red.bold);
    // close server & exit
    server.close(()=> process.exit(1));
});