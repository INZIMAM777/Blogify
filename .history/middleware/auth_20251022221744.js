const { verifyToken } = require("../services/auth");

function checkForAuthCookie(cookieName){
    return(req,res,next)=>{
        const tokenCookieValue=req.cookies[cookieName];
        if(!tokenCookieValue){
            next();
        }
        try{
            const userPayload=verifyToken(tokenCookieValue);
            req.user=userPayload;
        }catch(err){
            next()
        }

    }
}

module.exports=checkForAuthCookie