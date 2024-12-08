import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  make: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'rented', 'maintenance', 'pending_approval'],
    default: 'pending_approval'
  },
  images: [{
    type: String
  }],
  features: [{
    type: String
  }],
  location: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Car', carSchema);