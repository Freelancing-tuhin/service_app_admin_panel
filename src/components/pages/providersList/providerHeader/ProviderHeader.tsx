import { Dialog } from "@material-tailwind/react";
import React, { useState } from "react";

const ProviderHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [providerDetails, setProviderDetails] = useState({
    full_name: "Test Provider",
    age: 22,
    phone: "9101844252",
    gender: "Male",
    address: "123 Main St, Some City, Country",
    password: "password123",
    profile_pic:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkAJEkJQ1WumU0hXNpXdgBt9NUKc0QDVIiaw&s",
    provided_service: "67950eebd67cacc7d3570d25",
  });

  const openModal = () => {
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProviderDetails({ ...providerDetails, [name]: value }); // Update state on form change
  };

  const handleSubmit = () => {
    // Handle form submission logic (e.g., update provider data)
    console.log("Provider details submitted", providerDetails);
    closeModal(); // Close the modal after submission
  };

  return (
    <div className="p-4 mb-4 flex justify-between items-center">
      <div>
        <h2 className="text-2xl text-gray-800 font-semibold">Provider List</h2>
        <p className="text-gray-500">Edit provider information</p>
      </div>

      {/* Button to open the modal */}
      <button
        onClick={openModal}
        className="px-4 py-2 bg-gray-800 text-white text-sm rounded hover:bg-gray-700 transition"
      >
        Add Provider
      </button>

      {/* Modal for filling provider details */}
      <Dialog
        open={isModalOpen}
        handler={setIsModalOpen} // Handler to close the modal
        className="relative z-50"
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="full_name"
              value={providerDetails.full_name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              type="number"
              name="age"
              value={providerDetails.age}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={providerDetails.phone}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <input
              type="text"
              name="gender"
              value={providerDetails.gender}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={providerDetails.address}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Provided Service
            </label>
            <input
              type="text"
              name="provided_service"
              value={providerDetails.provided_service}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </form>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Save Changes
        </button>
        <button
          onClick={closeModal}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition ml-2"
        >
          Close
        </button>
      </Dialog>
    </div>
  );
};

export default ProviderHeader;
