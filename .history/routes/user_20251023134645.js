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

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Generate token if email/password match
    const token = await User.matchPasswordAndGenerateToken(email, password);

    // Set cookie properly
    res.cookie('token', token, {
      httpOnly: true,          // prevents client JS access
      secure: false,           // must be false on localhost
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      sameSite: 'lax'          // recommended for local dev
    });

    return res.redirect('/');
  } catch (err) {
    res.render('signin', { error: err.message });
  }
});

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