const express = require('express');
const dotenv = require('dotenv');

// load env
dotenv.config({path:'./config/config.env'});

const app = express();

// routes
app.get('/api/v1/bootcamps',(req, res)=>{
    res.status(200)
       .json({success: true,
              data: 'Show all Data bootcamps'})
})

app.get('/api/v1/bootcamps/:id',(req, res)=>{
    res.status(200)
       .json({success: true,
              data: `Show Single Data bootcamps ${req.params.id}`})
})

app.post('/api/v1/bootcamps/',(req, res)=>{
    res.status(200)
       .json({success: true,
              data: `Add Data bootcamps`})
})

app.put('/api/v1/bootcamps/:id',(req, res)=>{
    res.status(200)
       .json({success: true,
              data: `Update Data bootcamps ${req.params.id}`})
})

app.delete('/api/v1/bootcamps/:id',(req, res)=>{
    res.status(200)
       .json({success: true,
              data: `Show all Data bootcamps ${req.params.id}`})
})

const PORT = process.env.PORT ||5000;

app.listen(
    PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} 
                 mode on port ${PORT}`)
);