var   jwt=require("jsonwebtoken");

let JWT_SECRET ="mahajangood$boy";

const fetchuser =(req,res,next)=>{

    // get user from jwt token and add id tto req
    const token = req.header("auth");

    if(!token){
        res.status(401).send({error:" please authenticate using valid token "})
    }
    try {
        const data = jwt.verify(token,JWT_SECRET);
        req.user=data.user;
    
        next();
    } catch (error) {
        res.status(401).send({error:" please authenticate using valid token "}) 
        console.error(error.message); 
    } 
   
}
module.exports=fetchuser;
