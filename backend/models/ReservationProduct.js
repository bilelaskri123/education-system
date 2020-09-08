const mongoose = require("mongoose");

const ReservationProductSchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  dateReservation: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("ReservationProduct", ReservationProductSchema);
