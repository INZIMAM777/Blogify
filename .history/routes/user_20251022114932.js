const {Router}=express('express');
const router=Router();

const 

router.get("/signup",(req,res)=>{
    return res.render('signup');    
})

router.get("/signin",(req,res)=>{
    return res.render('signin');    
})

router.post("/signup",(req,res)=>{
    const {name,email,password}=req.body;

})


module.exports=router;