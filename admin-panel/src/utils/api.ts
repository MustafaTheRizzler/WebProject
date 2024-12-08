import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/admin',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchDashboardData = () => api.get('/reports');
export const fetchUsers = () => api.get('/users');
export const updateUser = (id: string, data: any) => api.put(`/users/${id}`, data);
export const deleteUser = (id: string) => api.delete(`/users/${id}`);
export const fetchCars = () => api.get('/cars');
export const approveCar = (id: string) => api.put(`/cars/${id}/approve`);
export const fetchBookings = () => api.get('/bookings');
export const updateBooking = (id: string, data: any) => api.put(`/bookings/${id}`, data);

export default api;