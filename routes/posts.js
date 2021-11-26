const express=require('express')
const router=express.Router()
const {getPosts,createpost,updatepost,deletepost,likepost}=require('../controllers/posts.js')
const auth=require('../middleware/auth.js')
//const createpost=require('../controllers/posts.js')
//checking routes
//router.get('/',(req,res)=>{
  //res.send('checking')
  //})
///http://localhost:5000/posts
router.get('/',getPosts)

router.post('/',auth,createpost)
router.patch('/:id',auth,updatepost)
router.delete('/:id',auth,deletepost)
router.patch('/:id/likepost',auth,likepost)

module.exports=router