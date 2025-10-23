const jwt=require('jsonwebtoken');
const User=require('../models/user');

const generateToken=(user)=>{
    const payload={
        id:user._id,
        email:user.email,
        password
        role:user.role
    };
    return
    }
}