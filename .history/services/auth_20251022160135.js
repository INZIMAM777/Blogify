const jwt=require('jsonwebtoken');
const User=require('../models/user');

const secret="$uperman"

const generateToken=(user)=>{
    const payload={
        id:user._id,
        email:user.email,
        password:user.password,
        role:user.role
    };
    return
    }
}