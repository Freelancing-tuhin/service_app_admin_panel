import { Button, Dialog } from "@material-tailwind/react";
import React, { useContext, useState } from "react";
import { api } from "../../../../utils";
import AuthContext from "../../../../contexts/authContext/authContext";
import { PlusIcon } from "@heroicons/react/16/solid";

const ServiceHeader = ({ getAllProviders }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [serviceDetails, setServiceDetails] = useState({
    service_name: "",
    description: "",
  }); // Form state
  const [error, setError] = useState<string | null>(null); // Error state

  // Open modal
  const openModal = () => {
    setServiceDetails({ service_name: "", description: "" }); // Reset form fields
    setError(null);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle form changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setServiceDetails({ ...serviceDetails, [name]: value });
  };

  const { user } = useContext(AuthContext);

  // Submit form to create service
  const handleSubmit = async () => {
    if (!serviceDetails.service_name || !serviceDetails.description) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await api.services.createService(
        serviceDetails,
        user?.phone
      );
      console.log("Service created successfully:", response.data);
      getAllProviders();
      closeModal(); // Close the modal after submission
    } catch (error) {
      console.error("Failed to create service:", error);
      setError("Failed to create service. Please try again.");
    }
  };

  return (
    <div className="p-4 mb-4 flex justify-between items-center">
      <div>
        <h2 className="text-2xl text-gray-800 font-semibold">Service List</h2>
        <p className="text-gray-500">Edit service information</p>
      </div>

      {/* Button to open the modal */}
      <Button
        onClick={openModal}
        className=" text-white text-xs rounded flex transition items-center gap-1"
      >
        <PlusIcon className="h-5 w-5 text-gray-50" />
        Add new service
      </Button>

      <Dialog
        open={isModalOpen}
        handler={setIsModalOpen}
        className="relative z-50"
      >
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-700">
            Add New Service
          </h3>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <div className="mt-4">
            <label className="block text-sm text-gray-600">Service Name</label>
            <input
              type="text"
              name="service_name"
              value={serviceDetails.service_name}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter service name"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm text-gray-600">Description</label>
            <textarea
              name="description"
              value={serviceDetails.description}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
              placeholder="Enter service description"
              rows={3}
            />
          </div>

          <div className="flex justify-end mt-6">
            <Button onClick={handleSubmit} className="rounded">
              Save Changes
            </Button>
            <Button onClick={closeModal} className="rounded ml-5 bg-gray-500">
              Close
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ServiceHeader;
