import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
    minLength: 3
  },
  description: {
    type: String,
    minLength: 3,
    required: true
  },
  start_date: {
    type: Date,
    required: true
  },
  end_date: {
    type: Date,
    required: true
  },
  image_url: {
    type: String,
    required: true,
    match: /^https?:\/\/.+/
  },
  country: {
    type: String,
    required: true
  }
});

const Destination = mongoose.model('Destination', destinationSchema);
export default Destination;
