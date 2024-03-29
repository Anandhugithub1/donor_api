

const jwt =require('jsonwebtoken');


const auth =(async(req,res,next)=>{
    try{
        const token =await req.header('x-auth-token')
        if(!token){
            return res.status(401).json({msg:'no auth token acess denied'})
        }
        const verified = jwt.verify(token,'passwordKey');
        if(!verified){
            return res.status(401).json({msg:"token verification failed please try again later"})
        }
        req.user =verified.id
        req.token =token
        next()
    }
    catch(e){
         res.status(500).json({msg:e.message})
    }


})

  
module.exports =auth;