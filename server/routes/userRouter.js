const express = require('express')
const userRouter=express.Router()
const userController = require('../controllers/userController')
const Auth =require('../middlewares/authMiddleware')

userRouter.post('/signupUser',userController.signupAttendee)
userRouter.post('/loginUser',userController.loginAttendee)
userRouter.get('/getAllUser',userController.getAllAttendee)
userRouter.get('/getSingleUser',Auth,userController.getSingleattendee)
userRouter.put('/updateUser',Auth,userController.updateAttendee)
userRouter.delete('/deleteUser',Auth,userController.deleteAttendee)

module.exports=userRouter