import { useContext, useEffect, useState } from "react";
import { api } from "../../../utils";
import Layout from "../../layout/Layout";
import AuthContext from "../../../contexts/authContext/authContext";
import { Drawer } from "@material-tailwind/react"; // Import Drawer from Material Tailwind
import ProviderHeader from "./providerHeader/ProviderHeader";

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
  action: any;
}

const ProvidersList = () => {
  const { user } = useContext(AuthContext);
  const [rowData, setRowData] = useState<Provider[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State for drawer visibility
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(
    null
  ); // Store the selected provider details

  const getAllProviders = async () => {
    try {
      const response = await api.providers.getAllProviders({
        phone: user?.phone,
      });
      console.log("======>providers list", response);
      setRowData(response || []);
    } catch (error) {
      console.error(error);
      setRowData([]);
    }
  };

  useEffect(() => {
    getAllProviders();
  }, []);

  // Format the date
  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    const formattedDate = new Date(date).toLocaleString("en-GB", options);
    return formattedDate;
  };

  // Handle the "See Details" button click
  const handleSeeDetails = (provider: Provider) => {
    setSelectedProvider(provider); // Set the selected provider
    setIsDrawerOpen(true); // Open the drawer
  };

  // Handle drawer close
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false); // Close the drawer
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-4">
        <ProviderHeader />
        {/* Material Tailwind Table */}
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
              {rowData.map((provider) => (
                <tr key={provider._id} className="border-b">
                  <td className="px-4 py-2 text-gray-800">
                    {provider.full_name}
                  </td>
                  <td className="px-4 py-2 text-gray-800">{provider.phone}</td>

                  <td className="px-4 py-2 text-gray-800">
                    {provider.provided_service}
                  </td>
                  <td className="px-4 py-2 text-gray-800">
                    {formatDate(provider.updatedAt)}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleSeeDetails(provider)}
                      className="bg-green-50 text-green-700 border-2 rounded border-gray-200 text-center w-32 h-8"
                    >
                      See Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right-Side Drawer */}
      <Drawer
        open={isDrawerOpen}
        onClose={handleCloseDrawer}
        placement="right" // Set the drawer to open from the right side
        className="transition-transform transform translate-x-full duration-300 ease-in-out"
        style={{ height: "100%", width: "100%" }}
      >
        <div className="p-4 w-[100%]">
          <h3 className="text-xl font-bold mb-4">Provider Details</h3>
          {selectedProvider && (
            <div>
              <p>
                <strong>Name:</strong> {selectedProvider.full_name}
              </p>
              <p>
                <strong>Phone:</strong> {selectedProvider.phone}
              </p>
              <p>
                <strong>Age:</strong> {selectedProvider.age}
              </p>
              <p>
                <strong>Gender:</strong> {selectedProvider.gender}
              </p>
              <p>
                <strong>Address:</strong> {selectedProvider.address}
              </p>
              <p>
                <strong>Provided Service:</strong>{" "}
                {selectedProvider.provided_service}
              </p>
              <p>
                <strong>Last Login:</strong> {selectedProvider.updatedAt}
              </p>
            </div>
          )}
          <button
            onClick={handleCloseDrawer}
            className="mt-4 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </Drawer>
    </Layout>
  );
};

export default ProvidersList;
