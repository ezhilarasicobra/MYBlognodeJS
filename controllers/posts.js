 
 const mongoose=require('mongoose')
 const postMessage=require('../modules/postMessage')
 
 const  getPosts= async(req,res)=>{
  try {
    const postMessages=await postMessage.find()
    res.status(200).json(postMessages)
  } catch (error) {
    res.status(404).json({message:error})
  }
}
const  createpost= async (req,res)=>{
const post=req.body

 const newpost =new postMessage({...post,creator:req.userId,createdAt:new Date().toISOString()})
  try {  
    await newpost.save()
    res.status(201).json(newpost)
  } catch (error) {
    res.status(409).json({message:error})
  }
}
const updatepost= async (req,res)=>{
const {id:_id}=req.params
const post=req.body
if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that ID")
const updatedPost=await postMessage.findByIdAndUpdate(_id,{...post,_id},{new:true})
res.json(updatedPost)
}
const deletepost=async(req,res)=>{
  const {id}=req.params
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that ID")
  await postMessage.findByIdAndDelete(id)
  res.json({message:'post deleted successfully'})

}
const likepost=async(req,res)=>{
  if(!req.userId) res.json({message:'unauthenticated'})
  const {id}=req.params
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that ID")
  const post=await postMessage.findById(id)
  const index=post.likes.findIndex((id)=>{id===String(req.userId)})
  if(index===-1){
    post.likes.push(req.userId)
    //like the one
  }else{
    //dislike a post
    post.likes = post.likes.filter((id)=>id!==String(req.userId))
  }
  const updatedPost=await postMessage.findByIdAndUpdate(id,post,{new:true})
  res.json(updatedPost)
}
module.exports={getPosts,createpost,updatepost,deletepost,likepost}
//module.exports=getPosts