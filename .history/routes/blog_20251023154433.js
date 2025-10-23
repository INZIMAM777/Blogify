const express=require('express');
const {Router}=express;
const router=Router();
const multer  = require('multer');
const path = require('path');
const Blog = require('../models/blog');
const Comment=require('../models/comment')

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

router.get('/:id',async(req,res)=>{
    const blog=await Blog.findById(req.params.id).populate('createdBy');
    console.log(blog)
    return res.render('blog',{
        user:req.user,
        blog
    })
})

router.post('/comment/:blogId', async (req, res) => {
    try {
        console.log('📝 Comment Body:', JSON.stringify(req.body, null, 2));
        console.log('🪶 Blog ID Params:', JSON.stringify(req.params, null, 2));
        console.log('👤 Logged-in User:', JSON.stringify(req.user, null, 2));

        await Comment.create({
            content: req.body.content,
            blogId: req.params.blogId,
            createdBy: req.user._id,
        });

        console.log('✅ Comment successfully created!');
        return res.redirect(`/blog/${req.params.blogId}`);
    } catch (error) {
        console.error('❌ Error while creating comment:', error);
        return res.status(500).send('Error creating comment');
    }
});


// router.get('/comment/:blogId',async(req,res)=>{
//     const comment=await Comment.findById(req.params.id).populate('createdBy');
//     console.log(blog)
//     return res.render('blog',{
//         user:req.user,
//         blog
//     })
// })



router.post('/',upload.single('coverImg'),async(req,res)=>{
    const {title,body}=req.body;

     if (!req.user) {
    console.log("No user found in request.");
    return res.status(401).send("Unauthorized: Please log in first.");
  }
    console.log(req.file)
    console.log(req.user)
    const blog=await Blog.create({
        title,
        body,
        createdBy:req.user.id,
        coverUrl:`/uploads/${req.file.filename}`,
    })
    console.log(blog)
    return res.redirect('/');
})

module.exports=router;
