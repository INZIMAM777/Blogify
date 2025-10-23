const {} = require('mongoose');

const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{ 
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

userModel.exports=model('User',userSchema);