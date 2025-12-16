const express = require('express');
const router = express.Router();

const MenuItem = require('./../models/MenuItem');

router.post('/menu', async(req,res)=>{
    try{
        const data = req.body;
    const newMenu = new MenuItem(data);
    const response = await newMenu.save();
    res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'})
    }
})

router.get('/menu', async(req,res)=>{
    try{
        const data = await MenuItem.find();
    console.log('data fetched');
    res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})

router.get('/menu/:tasteType', async(req,res)=>{
    try{
        const tasteType = req.params.tasteType;
        if(tasteType=='spicy' || tasteType=='sweet' || tasteType=='sour'){
            const response = await MenuItem.find({taste:tasteType});
            console.log('data fetched');
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error:'Invalid tasteType'})
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})

//comments added
module.exports = router;