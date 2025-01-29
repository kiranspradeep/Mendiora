const express = require('express')
const organizerAdminRouter=express.Router()
const OrganizerAdminController = require('../controllers/OrganizerAdminController')
const Auth =require('../middlewares/authMiddleware')

organizerAdminRouter.post('/signupAdminOrg',OrganizerAdminController.signupUser)
organizerAdminRouter.post('/loginAdminOrg',OrganizerAdminController.loginUser)
organizerAdminRouter.get('/getOrganizers',OrganizerAdminController.getOrganizers)
organizerAdminRouter.get('/getLoggedInAdminOrg',Auth,OrganizerAdminController.getLoggedInUser)
organizerAdminRouter.put('/updateAdminOrg',Auth,OrganizerAdminController.updateUser)
organizerAdminRouter.delete('/deleteAdminOrg',Auth,OrganizerAdminController.deleteUser)

module.exports=organizerAdminRouter