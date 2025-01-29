const mongoose =require('mongoose')

const OrganizerAdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'organizer'],
        default: 'organizer'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const OrganizerAdmin = mongoose.model('OrganizerAdmin',OrganizerAdminSchema)
module.exports=OrganizerAdmin