const {Router}=express;
const router=Router();

router.get('/add-blog',(req,res)=>{
    return res.render('add-blog',{
        user:req.user,
    })
})
router.post('/add-blog',async(req,res)=>{
    const {title,body,coverUrl}=req.body;
    await Blog.create({
        
    })
})

module.exports=router;
