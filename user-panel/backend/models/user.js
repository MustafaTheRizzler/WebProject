const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); 

const userSchema = new mongoose.Schema({
 
  firstName: {
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
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,  
  },

 
 
 
  rentalHistory: [
    {
      carId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',  
      },
      rentalStart: {
        type: Date,
        required: true,
      },
      rentalEnd: {
        type: Date,
        required: true,
      },
      totalCost: {
        type: Number,
        required: true,
      },
    },
  ],


  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});


userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);  
  }
  next();
});


userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
