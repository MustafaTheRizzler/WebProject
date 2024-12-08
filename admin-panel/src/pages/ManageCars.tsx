import React, { useEffect, useState } from 'react';
import { fetchCars, approveCar } from '../utils/api';
import { Search, Check, X } from 'lucide-react';

interface Car {
  _id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  status: string;
  owner: {
    name: string;
    email: string;
  };
  location: string;
  features: string[];
}

const ManageCars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadCars();
  }, []);

  const loadCars = async () => {
    try {
      const response = await fetchCars();
      setCars(response.data);
    } catch (error) {
      console.error('Error loading cars:', error);
    }
  };

  const handleApproveCar = async (carId: string) => {
    try {
      await approveCar(carId);
      loadCars();
    } catch (error) {
      console.error('Error approving car:', error);
    }
  };

  const filteredCars = cars.filter(car =>
    car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.owner.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Manage Cars</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search cars..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCars.map((car) => (
          <div key={car._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {car.make} {car.model} ({car.year})
                  </h3>
                  <p className="text-sm text-gray-500">{car.location}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  car.status === 'available' ? 'bg-green-100 text-green-800' :
                  car.status === 'rented' ? 'bg-blue-100 text-blue-800' :
                  car.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {car.status}
                </span>
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium text-gray-900">Owner</p>
                <p className="text-sm text-gray-500">{car.owner.name}</p>
                <p className="text-sm text-gray-500">{car.owner.email}</p>
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium text-gray-900">Price</p>
                <p className="text-lg font-semibold text-gray-900">${car.price}/day</p>
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium text-gray-900">Features</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {car.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {car.status === 'pending_approval' && (
                <div className="mt-6">
                  <button
                    onClick={() => handleApproveCar(car._id)}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <Check size={16} className="mr-2" />
                    Approve Car
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageCars;