import { configureStore } from "@reduxjs/toolkit";
import coinReducer from "scenes/_slice/coin.slice";

export const store = configureStore({
  reducer: {
    coin: coinReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const { dispatch, getState } = store;
