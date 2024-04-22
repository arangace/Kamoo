import { configureStore } from "@reduxjs/toolkit";
import kaboomContextReducer from "../reducers/context-slice";

export const store = configureStore({
  reducer: {
    kaboomContext: kaboomContextReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
