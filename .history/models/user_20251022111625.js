const {Schema,model} = require('mongoose');

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
    salt:{
        type:String,
    },
    password:{
        type:String,
        required:true
    },
    profileImgUrl:{
        type:String,
        default:'/images/default-profile.png'
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"User"
    }

},{timestamps:true}
)

const User=model('user',userSchema);

module.exports=User;