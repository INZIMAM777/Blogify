const path=require('path')
const express=require('express')

const {mongoose}=require('mongoose');
mongoose.connect(' mongodb://127.0.0.1:27017/My_Blog')

const app=express()
const PORT=8001

const userRouter=require('./routes/user')


app.set('view engine','ejs')
app.set('views',path.resolve('./views'))

app.use(express.urlencoded({extended:true}))
app.use(express.json());


app.get('/',(req,res)=>{
    res.render('home')
})
app.use('/user',userRouter)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})