import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ReduxBodyType {}

const initialState: ReduxBodyType = {};

const homeSlice = createSlice({
  name: "homeState",
  initialState,
  reducers: {},
});

export const {} = homeSlice.actions;

export default homeSlice.reducer;
