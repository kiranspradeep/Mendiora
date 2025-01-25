const express = require('express')
const cors = require('cors')
const mongoose =require('mongoose')
const app = express()
const userRouter=require("./routes/userRouter")
const attendeeRouter=require("./routes/attendeeRouter")
const eventRouter=require("./routes/eventRouter")
require('dotenv').config()
app.use(cors())
app.use(express.json())
const connectDB =async  function main(){
    try {
        await mongoose.connect(process.env.MONGO_URL);
    } catch (error) {
        console.error('Error connecting to database:', error);
        process.exit(1);
    }
};
connectDB()

app.use('/',userRouter)
app.use('/attendee',attendeeRouter)
app.use('/event',eventRouter)

app.listen(process.env.PORT,()=>{
    console.log(`server is running on port 3000`);
})