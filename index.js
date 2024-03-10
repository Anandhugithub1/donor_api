// imports
const express =require('express')
const connectdb =require('./db/connect')
require('dotenv').config();
const authRouter =require('./routes/auth')
const donerRouter =require('./routes/donor')


const app =express();
app.use(express.json())

  
app.use(authRouter)
app.use(donerRouter);


const PORT = process.env.PORT || 3000;



const start =async()=>{
    try{
        await connectdb(process.env.Mongodb)
        app.listen(PORT,()=>{
            console.log(`connection sucessful at ${PORT}`)
        })
    }
    catch(e){
        console.log(e)
    }
}

start();
