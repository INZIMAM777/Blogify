const path=require('path')
const express=require('express')
const cookieParser=require('cookie-parser');

const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/My_Blog2_App')

const app=express()
const PORT=8001

const userRouter=require('./routes/user');
const blogRouter=require('./routes/blog')


const { checkForAuthCookie } = require('./middleware/auth');
const Blog = require('./models/blog');


app.set('view engine','ejs')
app.set('views',path.resolve('./views'))

app.use(express.urlencoded({extended:true}))
app.use(express.json());
// Parse cookies
app.use(cookieParser());
app.use(checkForAuthCookie("token"));
app.use(express.static(path.resolve('./public')));


app.get('/', async (req, res) => {
  try {
    const allBlogs = await Blog.find({}).sort({ createdAt: -1 });
    res.render('home', {
      user: req.user,
      blogs: allBlogs
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading home page");
  }
});


app.use('/user',userRouter)
app.use('/blog',blogRouter)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})