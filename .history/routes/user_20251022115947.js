const {Router}=express('express');
const router=Router();

const User=require('../models/user');

router.get("/signup",(req,res)=>{
    return res.render('signup');    
})

router.get("/signin",(req,res)=>{
    return res.render('signin');    
})

router.post("/signup",a(req,res)=>{
    const {name,email,password}=req.body;
    await User.create({
        name,
        email,
        password
    })

})


module.exports=router;