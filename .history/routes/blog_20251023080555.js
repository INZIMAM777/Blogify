const {Router}=express;
const router=Router();

router.get('/add-blog',(req,res)=>{
    return res.render('add-blog',{
        user:req.user,
    })
})
router.post('/add-blog',async(req,res)=>{

module.exports=router;
