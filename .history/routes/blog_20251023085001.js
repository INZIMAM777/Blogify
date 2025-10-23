const express=require('express');
const {Router}=express;
const router=Router();
const multer  = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`) )
  },
  filename: function (req, file, cb) {
    const fileName=`${Date.now()}-${file.originalname}`
    cb(null,fileName)
  }
})

const upload = multer({ storage: storage })

router.get('/add-blog',(req,res)=>{
    return res.render('add-blog',{
        user:req.user,
    })
})
router.post('/',upload.single('coverImg'),async(req,res)=>{
    const {title,body,coverUrl}=req.body;
    console.log(req.file)
    console.log(req.body)
    await Blog.create({
        title,
        body,
        coverUrl:`/uploads`
    })
    return res.redirect('/');
})

module.exports=router;
