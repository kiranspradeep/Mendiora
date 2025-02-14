const express = require('express')
const organizerAdminRouter=express.Router()
const OrganizerAdminController = require('../controllers/OrganizerAdminController')
const Auth =require('../middlewares/authMiddleware')
const Role =require('../middlewares/roleMiddleware')

organizerAdminRouter.post('/signupAdminOrg',OrganizerAdminController.signupUser)
organizerAdminRouter.post('/loginAdminOrg',OrganizerAdminController.loginUser)
organizerAdminRouter.get('/getOrganizers',Auth,Role([ 'admin']),OrganizerAdminController.getOrganizers)
organizerAdminRouter.get('/getAprovedOrg',Auth,Role([ 'admin']),OrganizerAdminController.getApprovedOrganizers)
organizerAdminRouter.get('/getunapprovedOrg',Auth,Role([ 'admin']),OrganizerAdminController.getUnapprovedOrganizers)
organizerAdminRouter.get('/getLoggedInAdminOrg',Auth,OrganizerAdminController.getLoggedInUser)
organizerAdminRouter.put('/updateAdminOrg',Auth,OrganizerAdminController.updateUser)
// Backend Route for approving an organizer
organizerAdminRouter.put('/approveOrg/:userId', Auth, Role(['admin']), OrganizerAdminController.approveOrganizer);
organizerAdminRouter.put('/block/:userId', Auth, Role(['admin']), OrganizerAdminController.blockOrganizer);
organizerAdminRouter.put('/unblock/:userId', Auth, Role(['admin']), OrganizerAdminController.unblockOrganizer);

// Backend Route for rejecting an organizer
organizerAdminRouter.put('/rejectOrg/:userId', Auth, Role(['admin']), OrganizerAdminController.rejectOrganizer);

organizerAdminRouter.delete('/deleteAdminOrg',Auth,OrganizerAdminController.deleteUser)

module.exports=organizerAdminRouter