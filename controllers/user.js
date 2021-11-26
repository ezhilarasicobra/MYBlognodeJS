//bcrypt is used to has the password
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const User=require('../modules/user')

const signin=async(req,res)=>{
const {email,password}=req.body
try {
  const existinguser=await User.findOne({email})
  if(!existinguser) return res.status(404).json({message:"User doesn't exist"})
  const isPasswordCorrect=await bcrypt.compare(password,existinguser.password)
  if(!isPasswordCorrect) return res.status(400).json({message:"Invalid credentials"})
  const token =jwt.sign({email:existinguser.email,id:existinguser._id},'test',{expiresIn:"1hr"})
  res.status(200).json({result:existinguser,token})
} catch (error) {
  res.status(500).json({message:"something went wrong"})
}
}
const signup=async(req,res)=>{
const {email,password,firstName,lastName,confirmPassword}=req.body

try {
  console.log(req.body)
  const existinguser=await User.findOne({email})
  if(existinguser) return res.status(400).json({message:"User already exist"})
  if(password!==confirmPassword)
return res.status(400).json({message:"Passwords don't match"})
  
const hashedPassword=await bcrypt.hash(password,12)
const result= await User.create({email,password:hashedPassword,name:`${firstName} ${lastName}`})
const token =jwt.sign({email:result.email,id:result._id},'test',{expiresIn:"1hr"})
res.status(200).json({result,token})
  

} catch (error) {
  res.status(500).json({message:"something went wrong"})
}
}
module.exports={signin,signup}