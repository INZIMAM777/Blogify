const path=require('path')
const express=require('express')

const app=express()
const PORT=8001

app.set('view engine','ejs')
app.set('views',Path.resolve('./views'))

app.use(express.urlencoded({extended:false}))

app.get('/')

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})