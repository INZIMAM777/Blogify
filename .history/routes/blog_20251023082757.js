const express=require('express');
const {Router}=express;
const router=Router();
const multer  = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/${req.user._id}`) )
  },
  filename: function (req, file, cb) {
    const fileName='${Date.now()}-'
  }
})

const upload = multer({ storage: storage })

router.get('/add-blog',(req,res)=>{
    return res.render('add-blog',{
        user:req.user,
    })
})
router.post('/add-blog',async(req,res)=>{
    const {title,body,coverUrl}=req.body;
    await Blog.create({
        title,
        body,
        coverUrl
    })
    return res.redirect('/');
})

module.exports=router;
