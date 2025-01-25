const express = require('express')
const attendeeRouter=express.Router()
const attendeeController = require('../controllers/attendeeController')
const Auth =require('../middlewares/authMiddleware')

attendeeRouter.post('/signupAtt',attendeeController.signupAttendee)
attendeeRouter.post('/loginAtt',attendeeController.loginAttendee)
attendeeRouter.get('/getAllAtt',attendeeController.getAllAttendee)
attendeeRouter.get('/getSingleAtt',Auth,attendeeController.getSingleattendee)
attendeeRouter.put('/updateAtt',Auth,attendeeController.updateAttendee)
attendeeRouter.delete('/deleteAtt',Auth,attendeeController.deleteAttendee)

module.exports=attendeeRouter