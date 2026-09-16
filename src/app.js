const express= require('express');
const cookieParser=require('cookie-parser');


const app= express();//initializing express server      

app.use(express.json());        

//require routes
const authRouter=require('./routes/auth.routes');


//using all the routes here
app.use('/api/auth',authRouter);

module.exports=app;