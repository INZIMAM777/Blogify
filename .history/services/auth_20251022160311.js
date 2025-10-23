const jwt=require('jsonwebtoken');
const User=require('../models/user');

const secret="$uperman@123"

const generateToken=(user)=>{
    const payload={
        id:user._id,
        email:user.email,
        password:user.password,
        role:user.role
    };
    return jwt.sign(payload,secret)
}

const verifyToken=(token)=>{
    try{
        return jwt.verify(token,secret)
    }catch(err){    
}

module.exports={generateToken};
