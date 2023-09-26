const express = require('express');
const router = express.Router();
const path = require('path');
var uid = require('uid-safe')


router.get('/',(req,res)=>{
    res.render('login');
});



router.get('/login',(req,res)=>{
    res.render('login');
});


router.get('/chat',(req,res)=>{
    res.render('chat');
});


router.post('/login',(req,res)=>{
    let session = uid.sync(18);
    res.json({success:true,message:'logged in',session:session});
});

module.exports.router = router;