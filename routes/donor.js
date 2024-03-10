const express =require('express');
const DonorRoute =express.Router();
const auth =require('../middlewares/auth')
const Donor =require('../models/donors')

DonorRoute.post('/donor/add',auth,async(req,res)=>{
    try{
        const {name,address,bloodGroup,age,district,phoneNumber} =req.body
        let donor =new Donor({name,address,bloodGroup,district,age,phoneNumber})
        const existingNo =await Donor.findOne({phoneNumber})
        if(existingNo){
            res.status(401).json({msg:"donor already exists"})
        }
        donor =await donor.save();
        res.json(donor);
    }
    catch(e){
        res.status(500).json({msg:e.message})
    }
})
DonorRoute.get('/donor/all',auth,async(req,res)=>{
    try{
        const donor =await Donor.find({});
        res.json(donor)
    }
    catch(e){
        res.status(500).json({msg:e.message})
    }
})
DonorRoute.get('/donor',auth,async(req,res)=>{
    try{
        const donor =await Donor.find({district:req.query.district});

        res.json(donor)
    }
    catch(e){
        res.status(500).json({msg:e.message})
    }
})
DonorRoute.get('/donor/search/:bloodGroup', auth, async (req, res) => {
    try {
        const donor = await Donor.find({ bloodGroup: { $regex: req.params.bloodGroup, $options: 'i' } });
        res.json(donor);
    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
});
DonorRoute.post('/donor/delete',auth,async(req,res)=>{
    try{
       const {id} =req.body
        const donor = await Donor.findByIdAndDelete(id);
        if (!donor) {
            return res.status(404).json({ message: 'donor not found' });
        }

        res.json({msg:"donor removed"});

    }
    catch(e){
        res.status(500).json({msg:e.message})
    }
})


module.exports =DonorRoute;