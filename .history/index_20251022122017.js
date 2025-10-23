const path=require('path')
const express=require('express')

const app=express()
const PORT=8001

const userRouter=require('./routes/user')


app.set('view engine','ejs')
app.set('views',path.resolve('./views'))

app.use(express.urlencoded({extended:false}))


app.get('/',(req,res)=>{
    res.render('home')
})
app.use('/user',userRouter)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})