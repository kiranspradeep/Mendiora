const express = require('express')
const userRouter=express.Router()
const userController = require('../controllers/userController')
const Auth =require('../middlewares/authMiddleware')

userRouter.post('/signupUser',userController.signupUser)
userRouter.post('/loginUser',userController.loginUser)
userRouter.get('/getOrganizers',userController.getOrganizers)
userRouter.get('/getLoggedInUser',Auth,userController.getLoggedInUser)
userRouter.put('/updateUser',Auth,userController.updateUser)
userRouter.delete('/deleteUser',Auth,userController.deleteUser)

module.exports=userRouter