const express=require('express');

const logger=require('morgan');

const app=express();
const userRoute=require('./routes/user');

//body parser

const bodyParser=require('body-parser');
//mongoose connect
const mongoose=require('mongoose');

//setup connect mongoosedb by mongoose

mongoose.connect('mongodb://localhost/nodejsapistarter',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
        .then(()=>{
            console.log('connect suggsess!!');
        })
        .catch(()=>{
                console.log('connect fail!');
            })

//Middlewares(chay truoc khi ta xu ly)
app.use(logger('dev'));
app.use(bodyParser.json());

//Routes
app.use('/users',userRoute)

//Routes

app.get('/',(req,res,next)=>{
    return res.status(200).json({
        message:"server is oke!"
    })
})
//Catch 404 Errors and forward them to error handles

app.use((req,res,next)=>{
    const err=new Error('Not Found');
    err.status=404;
    next(err);
})
//Error handles function

app.use(()=>{
    const error=app.get('env')==='development'?err:{};
    const status=err.status||500;

    //response to client

    return res.status(status).json({
        error:{
            message:error.message
        }
    })
})
//start the server

const port =app.get('port')||3000;
app.listen(port, ()=>console.log(`Server is listening on port ${port}`));