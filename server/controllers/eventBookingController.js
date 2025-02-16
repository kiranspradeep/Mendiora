const Booking = require("../models/eventBookingModel");
const Event = require("../models/eventModels");

// Create a booking

const createBooking = async (req, res) => {
    try {
      const { eventId, tickets, premiumAccess, addOnServices, totalAmount } = req.body;
      const userId = req.user.id; // Extract userId from Auth middleware
  
      const event = await Event.findById(eventId);
      if (!event) return res.status(404).json({ message: "Event not found" });
  
      if (event.ticketsSold + tickets > event.capacity) {
        return res.status(400).json({ message: "Not enough tickets available" });
      }
  
      // Validate total price using event model
      const calculatedPrice = event.calculateDynamicPrice({
        premiumAccess,
        addOnServices,
        tickets,
      });
  
      if (totalAmount !== calculatedPrice) {
        return res.status(400).json({ message: "Incorrect price calculation" });
      }
  
      // Create the booking
      const booking = new Booking({
        event: eventId,
        user: userId,  // User ID from Auth middleware
        tickets,
        totalAmount,
        paymentStatus: "pending",
      });
  
      await booking.save();
  
      event.ticketsSold += tickets;
      await event.save();
  
      res.status(201).json({ message: "Booking successful", booking });
    } catch (error) {
      res.status(500).json({ message: "Booking error", error: error.message });
    }
  };
  
  const getUserBookings = async (req, res) => {
    try {
      const userId = req.user.id; // Get userId from Auth middleware
      const bookings = await Booking.find({ user: userId }).populate("event");
  
      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Error fetching bookings", error: error.message });
    }
  };

  const deleteEventBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;
        await Booking.findByIdAndDelete(bookingId);
        res.status(200).json({ message: "Booking deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Error deleting booking", error });
    }
};



  
  module.exports = { createBooking, getUserBookings,deleteEventBooking };