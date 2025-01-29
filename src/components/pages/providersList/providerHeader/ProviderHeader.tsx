import { PlusIcon } from "@heroicons/react/16/solid";
import {
  Button,
  Dialog,
  Select,
  Option,
  Input,
} from "@material-tailwind/react";
import React, { useContext, useState } from "react";
import { api } from "../../../../utils";
import AuthContext from "../../../../contexts/authContext/authContext";

const ProviderHeader = ({ getAllProviders }: any) => {
  const { user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1); // Tracks the current form page
  const [providerDetails, setProviderDetails] = useState({
    full_name: "",
    age: 0,
    phone: "",
    gender: "",
    address: "",
    password: "",
    profile_pic:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkAJEkJQ1WumU0hXNpXdgBt9NUKc0QDVIiaw&s",
    provided_service: "",
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setPage(1); // Reset to the first page when closing the modal
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setProviderDetails({ ...providerDetails, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await api.providers.createProvider(
        providerDetails,
        user?.phone
      );
      console.log("Provider details submitted", response);
      closeModal();
      getAllProviders();
    } catch (error) {
      console.error("Error submitting provider details", error);
    }
  };

  return (
    <div className="p-4 mb-4 flex justify-between items-center">
      <div>
        <h2 className="text-2xl text-gray-800 font-semibold">Provider List</h2>
        <p className="text-gray-500">Edit provider information</p>
      </div>

      <Button
        onClick={openModal}
        className=" text-white text-xs rounded flex transition items-center gap-1"
      >
        <PlusIcon className="h-5 w-5 text-gray-50" />
        Add new Provider
      </Button>

      {/* Paginated Dialog */}
      <Dialog
        open={isModalOpen}
        handler={setIsModalOpen}
        className="p-5 h-[30rem]"
      >
        <h3 className="text-lg mb-8 font-semibold text-gray-700">
          Add New Provider
        </h3>
        <form className="space-y-4">
          {/* Page 1: Full Name, Age, Phone, Gender */}
          {page === 1 && (
            <>
              <div>
                <Input
                  label="Full Name"
                  type="text"
                  name="full_name"
                  value={providerDetails.full_name}
                  onChange={handleChange}
                  crossOrigin={undefined}
                />
              </div>

              <div>
                <Input
                  label="Age"
                  crossOrigin={undefined}
                  type="number"
                  name="age"
                  value={providerDetails.age}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Input
                  label="Phone Number"
                  crossOrigin={undefined}
                  type="text"
                  name="phone"
                  maxLength={10} // Restrict input to 10 characters
                  value={providerDetails.phone}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      handleChange(e); // Allow only numeric input
                    }
                  }}
                />
              </div>

              <div>
                <Input
                  label="Current Address"
                  crossOrigin={undefined}
                  type="text"
                  name="address"
                  value={providerDetails.address}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Select
                  value={providerDetails.gender || "Select a Service"}
                  onChange={(value: any) =>
                    handleChange({
                      target: { name: "gender", value },
                    })
                  }
                  label="Select Service"
                  className="mb-4"
                >
                  {[
                    {
                      _id: "MALE",
                      service_name: "Male",
                    },
                    {
                      _id: "FEMALE",
                      service_name: "Female",
                    },
                  ].map((service) => (
                    <Option key={service._id} value={service._id}>
                      {service.service_name}
                    </Option>
                  ))}
                </Select>
                {/* <input
                  type="text"
                  name="gender"
                  value={providerDetails.gender}
                  onChange={handleChange}
                /> */}
              </div>

              <Button onClick={() => setPage(2)} className="rounded">
                Next
              </Button>
            </>
          )}

          {/* Page 2: Service, Password, Address */}
          {page === 2 && (
            <>
              <div>
                <Select
                  value={providerDetails.provided_service || "Select a Service"}
                  onChange={(value: any) =>
                    handleChange({
                      target: { name: "provided_service", value },
                    })
                  }
                  label="Select Service"
                  className="mb-4"
                >
                  {[
                    {
                      _id: "67950eebd67cacc7d3570d25",
                      service_name: "Psycologist",
                    },
                    {
                      _id: "679510f3d67cacc7d3570d27",
                      service_name: "Lawyer",
                    },
                    {
                      _id: "6795110dd67cacc7d3570d29",
                      service_name: "Consultant",
                    },
                    {
                      _id: "6795111ad67cacc7d3570d2b",
                      service_name: "Tutor",
                    },
                  ].map((service) => (
                    <Option key={service._id} value={service._id}>
                      {service.service_name}
                    </Option>
                  ))}
                </Select>
              </div>

              <div>
                <Input
                  label="Password"
                  crossOrigin={undefined}
                  type="text"
                  name="password"
                  value={providerDetails.password}
                  onChange={handleChange}
                />
              </div>

              <div className="flex gap-4 mt-4">
                <Button
                  onClick={() => setPage(1)}
                  className="bg-gray-500  rounded"
                >
                  Back
                </Button>
                <Button onClick={handleSubmit} className="rounded">
                  Submit
                </Button>
              </div>
            </>
          )}
        </form>
      </Dialog>
    </div>
  );
};

export default ProviderHeader;
