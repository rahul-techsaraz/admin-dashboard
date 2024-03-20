import { createSlice } from "@reduxjs/toolkit";
import { constants } from "../utils/constants";

const initialState = {
    categoryInputValue: '',
 
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
      updateACategoryInputValue: (state, { payload }) => {
          state.categoryInputValue = payload.data;
    },
   

  },
});

export const { 
    updateACategoryInputValue
 } = categorySlice.actions;

export default categorySlice.reducer;