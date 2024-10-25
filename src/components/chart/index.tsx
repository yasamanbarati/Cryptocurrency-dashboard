import React, { useEffect, useContext, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { CryptoContext } from "services/context/crypto-context";
import { Box, Button, Typography, useTheme } from "@mui/material";

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

  const { currency } = context;
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [days, setDays] = useState<number>(2);
  const [id, setId] = useState<string>("bitcoin");
  const [interval, setInterval] = useState<string>("daily");
  const [chartType, setChartType] = useState<string>("LineChart");
  
  const theme = useTheme(); // Get the current theme

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
      <Typography variant="h6" color={theme.palette.text.primary}>
        {currency.toUpperCase()}
      </Typography>
      <Box display="flex" gap={1} flexWrap="wrap" mt={1}>
        {[1, 7, 30, 180, 365].map((day) => (
          <Button
            key={day}
            variant="outlined"
            onClick={() => handleDaysChange(day, day === 1 ? "hourly" : "daily")}
            sx={{
              borderColor: days === day ? "white" : "transparent",
              color: days === day ? theme.palette.text.primary : theme.palette.text.secondary,
              backgroundColor: days === day ? "yellow" : "transparent",
            }}
          >
            {day === 1 ? "1D" : day === 7 ? "1W" : day === 30 ? "1M" : day === 180 ? "6M" : "1Y"}
          </Button>
        ))}
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
                    color: theme.palette.text.primary,
                  },
                },
                y: {
                  ticks: {
                    color: theme.palette.text.primary,
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
                    color: theme.palette.text.primary,
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
                    color: theme.palette.text.primary,
                  },
                },
                y: {
                  ticks: {
                    color: theme.palette.text.primary,
                  },
                },
              },
              plugins: {
                legend: {
                  display: true,
                  align: "end",
                  labels: {
                    color: theme.palette.text.primary,
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
