const mongoose = require("mongoose");

const ReservationBookSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  dateReservation: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("ReservationBook", ReservationBookSchema);
