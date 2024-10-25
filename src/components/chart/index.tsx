import React, { useEffect, useContext, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { CryptoContext } from "services/context/crypto-context";
import { Box, Button, Typography } from "@mui/material";

ChartJS.register(...registerables);

// Define types for chart data
interface ChartDataPoint {
  x: number; // Timestamp
  y: number; // Price
}

const Chart = () => {
  const context = useContext(CryptoContext);

  // Ensure context is defined
  if (!context) {
    throw new Error("CryptoChart must be used within a CryptoProvider");
  }

  const { currency, cryptoId } = context;
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [days, setDays] = useState<number>(2);
  const [id, setId] = useState<string>("bitcoin");
  const [interval, setInterval] = useState<string>("daily");
  const [chartType, setChartType] = useState<string>("LineChart");

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}&interval=${interval}`
        );
        const data = await response.json();
        setChartData(
          data.prices.map((price: [number, number]) => ({
            x: price[0],
            y: parseFloat(price[1].toFixed(2)), // Ensure y is a number
          }))
        );
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchChartData();
  }, [days, id, currency, interval]);

  const handleDaysChange = (newDays: number, newInterval: string) => {
    setDays(newDays);
    setInterval(newInterval);
  };

  return (
    <Box
      display="flex"
      gap={2}
      alignItems="flex-start"
      mt={3}
      flexDirection="column"
    >
      <Typography variant="h6" color="black">
        {currency.toUpperCase()}
      </Typography>
      <Box display="flex" gap={1} flexWrap="wrap" mt={1}>
        <Button
          variant="outlined"
          onClick={() => handleDaysChange(1, "hourly")}
          sx={{
            borderColor: days === 1 ? "white" : "transparent",
            color: days === 1 ? "black" : "black",
            backgroundColor: days === 1 ? "yellow" : "transparent",
          }}
        >
          1D
        </Button>
        <Button
          variant="outlined"
          onClick={() => handleDaysChange(7, "daily")}
          sx={{
            borderColor: days === 7 ? "white" : "transparent",
            color: days === 7 ? "black" : "black",
            backgroundColor: days === 7 ? "yellow" : "transparent",
          }}
        >
          1W
        </Button>
        <Button
          variant="outlined"
          onClick={() => handleDaysChange(30, "daily")}
          sx={{
            borderColor: days === 30 ? "white" : "transparent",
            color: days === 30 ? "black" : "black",
            backgroundColor: days === 30 ? "yellow" : "transparent",
          }}
        >
          1M
        </Button>
        <Button
          variant="outlined"
          onClick={() => handleDaysChange(180, "monthly")}
          sx={{
            borderColor: days === 180 ? "white" : "transparent",
            color: days === 180 ? "black" : "black",
            backgroundColor: days === 180 ? "yellow" : "transparent",
          }}
        >
          6M
        </Button>
        <Button
          variant="outlined"
          onClick={() => handleDaysChange(365, "yearly")}
          sx={{
            borderColor: days === 365 ? "white" : "transparent",
            color: days === 365 ? "black" : "black",
            backgroundColor: days === 365 ? "yellow" : "transparent",
          }}
        >
          1Y
        </Button>
      </Box>

      {chartType === "LineChart" ? (
        <Box sx={{ height: 500, width: "100%", mt: 2 }}>
          <Line
            data={{
              labels: chartData.map((val) => {
                let date = new Date(val.x);
                return days === 1
                  ? `${date.getHours()}:${date.getMinutes()}`
                  : date.toLocaleDateString("default", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
              }),
              datasets: [
                {
                  borderColor: "#FFA500",
                  backgroundColor: "rgba(255, 165, 0, 0.5)",
                  pointBorderColor: "transparent",
                  pointRadius: 2,
                  label: `${id} in ${currency}`,
                  data: chartData.map((val) => val.y),
                },
              ],
            }}
            options={{
              responsive: true,
              scales: {
                x: {
                  grid: {
                    display: false,
                  },
                  ticks: {
                    color: "black",
                  },
                },
                y: {
                  ticks: {
                    color: "black",
                  },
                },
              },
              plugins: {
                tooltip: {
                  displayColors: false,
                  backgroundColor: "gray",
                },
                legend: {
                  display: true,
                  align: "end",
                  labels: {
                    color: "black",
                    pointStyleWidth: 15,
                    usePointStyle: true,
                    pointStyle: "circle",
                    padding: 2,
                  },
                },
                title: {
                  display: true,
                },
              },
              maintainAspectRatio: false,
            }}
          />
        </Box>
      ) : (
        <Box sx={{ height: 300, width: "100%", mt: 2 }}>
          <Bar
            data={{
              labels: chartData.map((val) => {
                let date = new Date(val.x);
                return days === 1
                  ? `${date.getHours()}:${date.getMinutes()}`
                  : date.toLocaleDateString("default", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
              }),
              datasets: [
                {
                  label: `${id} in ${currency}`,
                  data: chartData.map((val) => val.y),
                  borderColor: "#FFA500",
                  backgroundColor: "rgba(255, 165, 0, 0.5)",
                },
              ],
            }}
            options={{
              responsive: true,
              scales: {
                x: {
                  grid: {
                    display: false,
                  },
                  ticks: {
                    color: "black",
                  },
                },
                y: {
                  ticks: {
                    color: "black",
                  },
                },
              },
              plugins: {
                legend: {
                  display: true,
                  align: "end",
                  labels: {
                    color: "black",
                    pointStyleWidth: 15,
                    usePointStyle: true,
                    pointStyle: "circle",
                    padding: 5,
                  },
                },
                title: {
                  display: true,
                },
              },
              maintainAspectRatio: false,
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default Chart;
