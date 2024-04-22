import { createSlice } from "@reduxjs/toolkit";
import { KaboomCtx } from "kaboom";

export interface KaboomState {
  context: KaboomCtx | null;
}

const initialState: KaboomState = {
  context: null,
};
export const kaboomContextSlice = createSlice({
  name: "kaboomContext",
  initialState,
  reducers: {
    setContext: (state, action) => {
      state.context = action.payload;
    },
  },
});

export const { setContext } = kaboomContextSlice.actions;

export default kaboomContextSlice.reducer;
