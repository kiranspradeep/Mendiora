const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Routes
const organizerAdminRouter = require("./routes/OrganizerAdminRouter");
const userRouter = require("./routes/userRouter");
const eventRouter = require("./routes/eventRouter");
const venueRouter = require("./routes/venueRouter");
const paymentRouter = require("./routes/venueBookingRouter");
const eventBookingRouter = require("./routes/eventBookingRouter");

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// MongoDB connection
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ Error connecting to database:", error);
    process.exit(1);
  }
}
connectDB();

// Routes
app.use('/', organizerAdminRouter);
app.use('/user', userRouter);
app.use('/event', eventRouter);
app.use('/venue', venueRouter);
app.use('/venuepayment', paymentRouter);
app.use('/eventbooking', eventBookingRouter);

// Root route (health check)
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
