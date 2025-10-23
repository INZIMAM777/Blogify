const express=require('express')

const app=express()
const PORT=8001

app.set('view engine','ejs')
app.set('views',Path2D.resolve('/'))

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})