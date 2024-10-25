import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Coin {
  id: string;
  name: string;
  symbol: string;
  // Add other fields as necessary
}

interface CoinState {
  coinList: Coin[];
  loading: boolean;
  error: string | null;
}

const initialState: CoinState = {
  coinList: [],
  loading: false,
  error: null,
};

export const fetchCoins = createAsyncThunk("coins/fetchCoins", async () => {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&page=1&per_page=9`
  );
  return response.data;
});

const coinSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoins.fulfilled, (state, action) => {
        state.loading = false;
        state.coinList = action.payload;
      })
      .addCase(fetchCoins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch coins";
      });
  },
});

export default coinSlice.reducer;
