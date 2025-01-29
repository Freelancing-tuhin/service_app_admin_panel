import { useContext, useEffect, useState } from "react";
import { api } from "../../../utils";
import Layout from "../../layout/Layout";
import AuthContext from "../../../contexts/authContext/authContext";
import {
  Drawer,
  IconButton,
  Select,
  Option,
  Button,
} from "@material-tailwind/react";
import ProviderHeader from "./providerHeader/ProviderHeader";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { formatDateTime } from "../../../utils/commonFunctions/dateFormater";

interface Provider {
  _id: string;
  full_name: string;
  age: number;
  phone: string;
  gender: string;
  address: string;
  profile_pic: string;
  provided_service: string;
  createdAt: string;
  updatedAt: string;
}

const ProvidersList = () => {
  const { user } = useContext(AuthContext);
  const [rowData, setRowData] = useState<Provider[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(
    null
  );
  const [isEditing, setIsEditing] = useState(false);

  const [editedData, setEditedData] = useState<Partial<Provider>>({});

  const getAllProviders = async () => {
    try {
      const response = await api.providers.getAllProviders({
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

  const handleSeeDetails = (provider: Provider) => {
    setSelectedProvider(provider);
    setEditedData(provider); // Pre-fill edit form with selected provider details
    setIsDrawerOpen(true);
    setIsEditing(false); // Reset editing state
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | { target: { name: string; value: any } }
  ) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeleteProvider = async () => {
    if (window.confirm("Are you sure you want to delete this provider?")) {
      try {
        await api.providers.deleteProvider(user?.phone, selectedProvider?._id);
        getAllProviders();
        setIsDrawerOpen(false);
      } catch (error) {
        console.error("Failed to delete provider", error);
      }
    }
  };

  const handleSaveChanges = async () => {
    if (selectedProvider?._id) {
      try {
        await api.providers.editProvider(
          editedData,
          user?.phone,
          selectedProvider._id
        );
        getAllProviders();
        setIsEditing(false);
        setIsDrawerOpen(false);
      } catch (error) {
        console.error("Failed to update provider", error);
      }
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-4">
        <ProviderHeader getAllProviders={getAllProviders} />
        <div className="overflow-x-auto shadow h-96 border rounded">
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left font-medium text-gray-700">
                  Name
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-700">
                  Phone
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-700">
                  Provided Service
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-700">
                  Last Login
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {rowData.map((provider: any) => (
                <tr key={provider._id} className="border-b">
                  <td className="px-4 py-2 text-gray-800">
                    {provider.full_name}
                  </td>
                  <td className="px-4 py-2 text-gray-800">{provider.phone}</td>
                  <td className="px-4 py-2 text-gray-800">
                    {provider.provided_service?.service_name}
                  </td>
                  <td className="px-4 py-2 text-gray-800">
                    {formatDateTime(provider.updatedAt)}
                  </td>
                  <td className="px-4 py-2 flex space-x-2">
                    <IconButton
                      onClick={() => handleSeeDetails(provider)}
                      className="bg-green-50 text-green-700"
                    >
                      <PencilSquareIcon className="h-5 w-5" />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setSelectedProvider(provider);
                        handleDeleteProvider();
                      }}
                      className="bg-red-50 text-red-700"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Drawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        placement="right"
      >
        <div className="p-4 w-[100%]">
          <h3 className="text-xl font-bold mb-4">Edit Provider Details</h3>

          {selectedProvider && (
            <div>
              <div>
                <label className="block mb-2 text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="full_name"
                  value={editedData.full_name || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded mb-4"
                />
                <label className="block mb-2 text-sm font-medium">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={editedData.phone || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded mb-4"
                />

                <Select
                  value={editedData.provided_service || "Select a Service"}
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
                <label className="block mb-2 text-sm font-medium mt-1">
                  Age
                </label>

                <input
                  type="text"
                  name="age"
                  value={editedData.age || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded mb-4"
                />
                <Button onClick={handleSaveChanges} className=" w-full rounded">
                  Save Changes
                </Button>
              </div>
            </div>
          )}
          <Button
            onClick={() => setIsDrawerOpen(false)}
            className="mt-4 w-full bg-gray-500  rounded"
          >
            Close
          </Button>
        </div>
      </Drawer>
    </Layout>
  );
};

export default ProvidersList;
