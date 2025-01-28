import ServiceHeader from "./serviceHeader/ServiceHeader";
import Layout from "../../layout/Layout";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../contexts/authContext/authContext";
import { api } from "../../../utils";
import { Drawer, Button, Input } from "@material-tailwind/react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

interface Provider {
  _id: string;
  service_name: string;
  description: string;
  providerCount: number;
  createdAt: string;
  updatedAt: string;
}

const ServicesList = () => {
  const { user } = useContext(AuthContext);
  const [rowData, setRowData] = useState<Provider[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Provider | null>(null);
  const [formData, setFormData] = useState({
    service_name: "",
    description: "",
    id: "",
  });

  const getAllProviders = async () => {
    try {
      const response = await api.services.getAllServices({
        phone: user?.phone,
      });
      setRowData(response || []);
    } catch (error) {
      console.error(error);
      setRowData([]);
    }
  };

  useEffect(() => {
    getAllProviders();
  }, []);

  const handleEditClick = (service: Provider) => {
    setSelectedService(service);
    setFormData({
      service_name: service.service_name,
      description: service.description,
      id: service?._id,
    });
    setIsDrawerOpen(true);
  };

  const handleDeleteClick = async (serviceId: string) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await api.services.deleteService(user?.phone, serviceId);
        getAllProviders();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedService(null);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!selectedService) return;
    try {
      await api.services.editService(formData, user?.phone);
      getAllProviders();
      handleCloseDrawer();
    } catch (error) {
      console.error("Failed to update service", error);
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-4">
        <ServiceHeader getAllProviders={getAllProviders} />
        <div className="overflow-x-auto shadow h-96 border rounded">
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left font-medium text-gray-700">
                  Name
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-700">
                  Details
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-700">
                  Total providers
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {rowData.map((item) => (
                <tr key={item._id} className="border-b">
                  <td className="px-4 py-2 text-gray-800">
                    {item?.service_name}
                  </td>
                  <td className="px-4 py-2 text-gray-800">
                    {item?.description}
                  </td>
                  <td className="px-4 py-2 text-gray-800">
                    {item?.providerCount}
                  </td>
                  <td className="px-4 py-2 flex space-x-2">
                    <button
                      onClick={() => handleEditClick(item)}
                      className="text-green-800"
                    >
                      <PencilSquareIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(item._id)}
                      className="text-red-500"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drawer for editing service */}
      <Drawer
        open={isDrawerOpen}
        onClose={handleCloseDrawer}
        placement="right" // Set the drawer to open from the right side
        className="transition-transform transform translate-x-full duration-300 ease-in-out p-4"
        style={{ height: "100%", width: "100%" }}
      >
        <h2 className="text-xl font-bold mb-4">Edit Service</h2>
        <div className="flex flex-col gap-4">
          <Input
            label="Service Name"
            name="service_name"
            value={formData.service_name}
            onChange={handleFormChange}
            crossOrigin={undefined}
          />
          <Input
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleFormChange}
            crossOrigin={undefined}
          />
          <Button onClick={handleSubmit} className="mt-4">
            Save Changes
          </Button>
        </div>
      </Drawer>
    </Layout>
  );
};

export default ServicesList;
