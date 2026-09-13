const express= require('express');


const app= express();//initializing express server      

app.use(express.json());        




module.exports=app;