const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
// const logger = require('./middleware/logger');
const morgan = require('morgan');
// colors
const colors = require('colors');
// error handler from middleware
const erros = require('./middleware/error');
// load DB
const connectDB = require('./config/db');


// load env
dotenv.config({path:'./config/config.env'});
connectDB();
// load routes files
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');
const fileupload = require('express-fileupload');
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

// File uploading
app.use(fileupload());
// Set static folder
app.use(express.static(path.join(__dirname, 'public')));


// mount routes
app.use('/api/v1/bootcamps', bootcamps); //ini yang akan dipanggil
app.use('/api/v1/courses', courses);

// penggunaan errorhandler dibawah route wajib
app.use(erros);

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

module.exports = app;