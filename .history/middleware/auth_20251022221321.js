function checkForAuthCookie(cookieName){
    return(req,res,next)=>{
        const tokenCookieValue=req.cookies[cookieName];
        if(!tokenCookieValue){
            next();
        }
        try{
            const userPayload=
        }
    }
}