
const express =require('express');
const admin =require('../models');
const jwt =require('jsonwebtoken')


const admin =async(req,res,next,)=>{
    try{
        const token =await req.body('x-auth-token');
        if(!token){
            return res.status(401).json({msg:'Authorization failed no token found'});
        }
        const verified =jwt.verify(token,'passwordKey');
        if(!verified){
            return res.status(401).json({msg:"'invalid token please try again later"})
        }
        const user =await User.findById(verified.id);
        if(user.type =='user'){
            return res.status(401).json({msg:"You are not an admin"})
        }
        req.user=verified.id;
        req.token =token;
        next();
    }
    catch(e){
        res.status(500).json({error:e.message});
    }

}
