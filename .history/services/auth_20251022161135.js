const jwt=require('jsonwebtoken');

const secret="$uperman@123"

const generateToken=(user)=>{
    const payload={
        id:user._id,
        email:user.email,
        password:user.password,
        role:user.role
    };
    const token=jwt.sign(payload,secret)
}

const verifyToken=(token)=>{
    try{
        const payload=jwt.verify(token,secret);
        return payload;
    }catch(err){
        throw new Error('Invalid Token')   
    }
}

module.exports={generateToken};
