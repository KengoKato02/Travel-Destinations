import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    minlength: 3,
  },
  description: {
    type: String,
    minlength: 10,
    required: true,
  },
  destinations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
      required: true,
    },
  ],
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
});

const Trip = mongoose.model("Trip", tripSchema);

export default Trip;
