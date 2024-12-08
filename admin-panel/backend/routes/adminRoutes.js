import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import * as adminController from '../controllers/adminController.js';

const router = express.Router();

// Auth routes
router.post('/login', adminController.login);

// Protected admin routes
router.use(protect, admin);

// Users
router.get('/users', adminController.getUsers);
router.put('/users/:id', adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser);

// Cars
router.get('/cars', adminController.getCars);
router.put('/cars/:id/approve', adminController.approveCar);

// Bookings
router.get('/bookings', adminController.getBookings);
router.put('/bookings/:id', adminController.updateBooking);

// Reports
router.get('/reports', adminController.getReports);

export default router;