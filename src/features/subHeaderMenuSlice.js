import { createSlice } from "@reduxjs/toolkit";
import { constants } from "../utils/constants";

const initialState = {
    activeSubHeader: '',
 
};

const subHeaderMenuSlice = createSlice({
  name: "subheadermenu",
  initialState,
  reducers: {
      updateActiveSubHeader: (state, { payload }) => {
          console.log({payload})
          state.activeSubHeader = payload.subHeaderArr;
    },
   

  },
});

export const { 
    updateActiveSubHeader,
 } = subHeaderMenuSlice.actions;

export default subHeaderMenuSlice.reducer;