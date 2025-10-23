const {Router}=express;
const router=Router();
const multer  = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/my-uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
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
