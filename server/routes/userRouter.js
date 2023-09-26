const express = require('express');
const router = express.Router();
const path = require('path');



router.get('/',(req,res)=>{
    res.send('user router');
});



router.get('/login',(req,res)=>{
    res.render('login');
});


router.get('/chat',(req,res)=>{
    res.render('chat');
});


router.post('/login',(req,res)=>{
    let session = req.sessionID;
    res.json({success:true,message:'logged in',session:session});
});

module.exports.router = router;