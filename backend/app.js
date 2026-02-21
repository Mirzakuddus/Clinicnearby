const express=require('express');
const app=express();
const database=require('./Db/db');
const userroutes=require('./Routes/user.routes');
const doctorroutes=require('./Routes/doctor.routes');
const cors=require('cors');

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
const cookieParser = require('cookie-parser');
app.use(cookieParser());

database();

app.use(express.json());
app.use('/users',userroutes);
app.use('/doctors',doctorroutes);



module.exports=app;