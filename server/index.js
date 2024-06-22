const express = require('express');
const cors = require('cors');
require('dotenv').config();
const {connectToDB} = require('./config/connect');
const morgan = require('morgan');
const app = express();
const PORT= process.env.PORT;
const Userrouter = require('./routes/user');



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(morgan('tiny'));    //logging the  requests to the route

app.use('/favicon.ico', (req,res,next)=>{
    return res.end();
})

app.get('/', (req,res)=>{
    return res.end("Hello world");
})


app.use('/api/user', Userrouter);

app.listen(PORT, async()=>{
    try{
        await connectToDB('mongodb://127.0.0.1:27017/cms');
        console.log("Server is live at ", PORT);
    }catch(err){
        console.log("Server could not start!!");
    }
})