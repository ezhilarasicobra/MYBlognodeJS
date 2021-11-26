const jwt=require('jsonwebtoken')

const auth=(req,res,next)=>{
try {
  const token=req.headers.authorization.split(" ")[1]
  const isCustomAuth = token.length < 500
  let decodeddata;
  if(token && isCustomAuth){
    decodeddata=jwt.verify(token,'test')
    req.userId=decodeddata?.id
  }else{
    decodeddata=jwt.decode(token)
    req.userId=decodeddata?.sub
  }
  next()
} catch (error) {
  
}
}
module.exports=auth