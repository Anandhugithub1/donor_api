const express =require('express');
const bycrypt =require('bcryptjs');
const authRouter =express.Router();
const jwt =require('jsonwebtoken')
const User =require('../models/user');
const auth = require('../middlewares/auth');

authRouter.post('/api/signup',async(req,res)=>{
    try{
        const {username,email,password} =req.body
        const existingEmail = await User.findOne({email});
        const existingusername =await User.findOne({username})
        if(existingEmail){
            return res.status(400).json({msg:'user with same email exists'})
        }
        if(existingusername){
            return res.status(400).json({msg:'user with same username exists'})
        }
        const hashpassword =await bycrypt.hash(password,8);
        let user =new User({
            username,
            password:hashpassword,
            email,
        })
        user =await user.save();
        res.json(user);
    }
    catch(e){
        res.status(500).json({error:e.message})
    }
})
authRouter.post('/api/login',async(req,res)=>{
    try{
        const {email,password} =req.body;
        const user =await User.findOne({email});
        if(!user){
            return res.status(400).json({msg:'user with username doesnot exist'})
        }
        const ismatch =await bycrypt.compare(password,user.password);
        if(!ismatch){
                return res.status(400).json({msg:'incorrect password'})
        }
        const token= jwt.sign({id:user._id},'passwordKey')

        res.json({
            token,...user._doc
        })
    }
    catch(e){
        res.status(500).json({msg:e.message})
    }
})
authRouter.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);
    const verified = jwt.verify(token, "passwordKey");
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);
    res.json(true);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});




authRouter.post("/tokenIsValid", async (req, res) => {
    try {
      const token = req.header("x-auth-token");
      if (!token) return res.json(false);
      const verified = jwt.verify(token, "passwordKey");
      if (!verified) return res.json(false);
  
      const user = await User.findById(verified.id);
      if (!user) return res.json(false);
      res.json(true);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });
  
authRouter.get('/',auth,async(req,res)=>{
        const user =User.findById(req.user)
        res.json({...user._doc,token:req.token})

})

  
module.exports =authRouter;