const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const ReservationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  tel: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
   
  },
  message: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    enum: ["PENDING", "ACCEPTED", "REJECTED"],
    default: "PENDING",
  },
  reservedFor: {
    type: ObjectId,
    ref: "client",
  },
});

mongoose.model("reservation", ReservationSchema);
