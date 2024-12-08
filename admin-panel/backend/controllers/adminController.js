import User from '../models/User.js';
import Car from '../models/Car.js';
import Booking from '../models/Booking.js';
import jwt from 'jsonwebtoken';

// Auth
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && user.role === 'admin' && (await user.comparePassword(password))) {
      res.json({
        token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' }),
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cars
export const getCars = async (req, res) => {
  try {
    const cars = await Car.find().populate('owner', 'name email');
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const approveCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(
      req.params.id,
      { status: 'available' },
      { new: true }
    );
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Bookings
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('car')
      .populate('renter', 'name email');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reports
export const getReports = async (req, res) => {
  try {
    const totalRevenue = await Booking.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);

    const popularCars = await Booking.aggregate([
      { $group: { _id: '$car', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    const userActivity = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } }
    ]);

    res.json({
      totalRevenue: totalRevenue[0]?.total || 0,
      popularCars,
      userActivity
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};