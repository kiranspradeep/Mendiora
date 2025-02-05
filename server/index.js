const express = require('express')
const cors = require('cors')
const mongoose =require('mongoose')
const Razorpay =require('razorpay')
const app = express()
const organizerAdminRouter=require("./routes/OrganizerAdminRouter")
const userRouter=require("./routes/userRouter")
const eventRouter=require("./routes/eventRouter")
const venueRouter=require("./routes/venueRouter")
require('dotenv').config()
app.use(cors())
app.use(express.json())
app.use("/uploads", express.static("uploads"));
const connectDB =async  function main(){
    try {
        await mongoose.connect(process.env.MONGO_URL);
    } catch (error) {
        console.error('Error connecting to database:', error);
        process.exit(1);
    }
};
connectDB()

app.use('/',organizerAdminRouter)
app.use('/user',userRouter)
app.use('/event',eventRouter)
app.use('/venue',venueRouter)


app.listen(process.env.PORT,()=>{
    console.log(`server is running on port 3000`);
})