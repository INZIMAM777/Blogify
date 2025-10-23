const {Router}=require('express');
const router=Router();

const User=require('../models/user');

router.get("/signup",(req,res)=>{
    return res.render('signup');    
})

router.get("/signin",(req,res)=>{
    return res.render('signin');    
})

router.get("/logout",(req,res)=>{
    return res.render('signin');    
})

router.post("/signin",async(req,res)=>{
    try{
    const {email,password}=req.body;  
    const token=await User.matchPasswordAndGenerateToken(email,password);
    return res.cookie('token',token).redirect('/')
    }catch(err){
        res.render('signin',{error:err.message})
    }
    
})

router.post("/signup",async(req,res)=>{
    const {name,email,password}=req.body;
    await User.create({
        name,
        email,
        password
    })
    return res.redirect('/user/signin')
})


module.exports=router;