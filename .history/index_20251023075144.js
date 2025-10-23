const path=require('path')
const express=require('express')
const cookieParser=require('cookie-parser');

const {mongoose}=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/My_Blog2_App')

const app=express()
const PORT=8001

const userRouter=require('./routes/user');



const { checkForAuthCookie } = require('./middleware/auth');


app.set('view engine','ejs')
app.set('views',path.resolve('./views'))

app.use(express.urlencoded({extended:true}))
app.use(express.json());
// Parse cookies
app.use(cookieParser());
app.use(checkForAuthCookie("token"));


app.get('/',(req,res)=>{
    res.render('home',{
        user:req.user,
    });
})
app.use('/user',userRouter)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})