import { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { PresentationChartLineIcon } from "@heroicons/react/24/outline";

const MonthlySalesBarChart = () => {
  const [chartData, setChartData] = useState<any>({
    type: "area",
    height: 300,
    series: [
      { name: "Standard cottage", data: [20, 30, 40, 60, 30] },
      { name: "Deluxe room", data: [25, 25, 20, 40, 70] },
      { name: "Executive suite", data: [10, 20, 10, 30, 40] },
    ],
    options: {
      chart: {
        toolbar: { show: false },
      },
      title: { show: "" },
      dataLabels: { enabled: false },
      colors: ["#ffff00", "#66ff66", "#0066ff"],
      plotOptions: {
        bar: {
          columnWidth: "80%",
          borderRadius: 2,
        },
      },
      xaxis: {
        axisTicks: { show: false },
        axisBorder: { show: false },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: [
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#d9d9d9",
        strokeDashArray: 1,
        xaxis: {
          lines: { show: true },
        },
        padding: { top: 5, right: 20 },
      },
      fill: { opacity: 0.8 },
      tooltip: { theme: "light" },
    },
  });

  const [selectedOption] = useState("Monthly");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response: any;
        // if (selectedOption === "Monthly") {
        //   response = await getTotalSell();
        // } else {
        //   response = await getSalesbyWeek();
        // }
        const salesData = response.data;

        const categories = salesData.map((data: any) => {
          return selectedOption === "Monthly"
            ? `${data.month}-${data.year}`
            : `${data.week}`;
        });
        const sales = salesData.map((data: any) => data.totalSales);

        setChartData((prevState: any) => ({
          ...prevState,
          series: [{ name: "Sales", data: sales }],
          options: {
            ...prevState.options,
            xaxis: {
              ...prevState.options.xaxis,
              categories,
            },
          },
        }));
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };

    fetchData();
  }, [selectedOption]);

  return (
    <Card className="w-full md:w-1/2 mx-auto mb-10">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
      >
        <div className="w-max rounded-lg bg-gray-900 p-2 text-white">
          <PresentationChartLineIcon className="h-6 w-6" />
        </div>
        <div>
          <Typography variant="h6" color="blue-gray">
            This Year Stats
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="px-2 pb-0">
        <Chart {...chartData} />
      </CardBody>
    </Card>
  );
};

export default MonthlySalesBarChart;
