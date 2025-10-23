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
    res.clearCookie("token").redirect('/');    
})

router.post("/signin",async(req,res)=>{
    try{
    const {email,password}=req.body;  
    const token=await User.matchPasswordAndGenerateToken(email,password);
    // console.log("Generated Token:", token);
    res.cookie('token', token, {
            httpOnly: true,      // Prevents client JS from reading the cookie
            secure: false,       // Must be true if using HTTPS, false for localhost
            maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
            sameSite: 'lax'      // Helps with CSRF and localhost
        });

    return res.redirect('/')
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