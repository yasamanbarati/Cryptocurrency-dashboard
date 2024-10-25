import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Chart from "components/chart";
import SearchBar from "components/search-bar";
import { Box, Grid2 } from "@mui/material";
import MasterLayout from "scenes/layout";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { coinList = [], loading = false } = useSelector(
    (state: any) => state.coins || {}
  );
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (coinList.length === 0) {
        setTimeout(() => {
          setCompleted(true);
        }, 1000);
      } else {
        setCompleted(true);
      }
    };

    const timeoutId = setTimeout(fetchData, 2500);
    return () => clearTimeout(timeoutId); // Cleanup on unmount
  }, [coinList.length]);

  return (
    <MasterLayout>
      <Box
        sx={{
          py: 4,
          px: 4,
        }}
      >
        <Grid2 container spacing={2}>
          <Grid2 size={12}>
            <SearchBar />
            <Chart />
          </Grid2>
        </Grid2>
      </Box>
    </MasterLayout>
  );
};

export default Dashboard;
