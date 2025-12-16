const express = require('express');  //BODYPARSER IS BUILT INTO EXPRESS NOW
const router = express.Router();

const Person=require('./../models/Person');

router.post('/',async(req,res)=>{     //REMOVE PERSON NEAR SLASH
    try{
      const data=req.body; //ASSUMING THE PERSON DATA IS STORED IN A REQUEST BODY AFTER PARSES BY THE bodyparser.json()
    const newPerson=new Person(data);//CREATE A NEW PERSON DOCUMENT USING A MONGOOSE MODEL
    const response=await newPerson.save(); //SAVED THE NEWPERSON TO A DATABASE
    console.log('data saved');
    res.status(200).json(response);
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal server error'});
    }
  })


  router.get('/', async(req,res)=>{     //REMOVE PERSON NEAR SLASH
    try{
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
  })

  router.get('/:workType', async(req,res)=>{   //REMOVE PERSON NEAR SLASH
    try{
      const workType=req.params.workType;
      if(workType=='chef' || workType== 'waiter' || workType == 'manager'){
        const response = await Person.find({work: workType});
        console.log('response fetched');
        res.status(200).json(response);
  
      }
      else{
        res.status(404).json({error:'Invalid work type'});
      }
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal server error'});
    }
    
  })



  //METHOD TO UPDDATE A DATA
  router.put('/:id', async(req,res)=>{
    try{
      const personId= req.params.id;
      const updatedPersonData = req.body;
      const response = await Person.findByIdAndUpdate(personId,updatedPersonData,{
        new:true,
        runValidators:true
      })
      if(!response){
        res.status(404).json({error:'Person not found'});
      }
      else{
        console.log('data updated');
        res.status(200).json(response);
      }
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal server error'});
    }
  })

  // METHOD TO DELETE A DATA
  router.delete('/:id', async(req,res)=>{
    try{
      const personId = req.params.id;  //THE VALUE WE PUT IN THE URL i.e id
    const response = await Person.findByIdAndDelete(personId);
    if(!response){
      res.status(404).json({error:'Person not found'});
    }
    else{
      console.log('data delete');
      res.status(200).json({message:'Person deleted successfully'})
    }
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal server error'});
    }
  })

  
  
 module.exports = router;