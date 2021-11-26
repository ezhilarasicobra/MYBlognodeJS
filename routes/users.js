const express=require('express')
const userrouter=express.Router()
const {signin,signup}=require('../controllers/user')
userrouter.post('/signin',signin)
userrouter.post('/signup',signup)

module.exports=userrouter