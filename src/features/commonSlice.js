import { createSlice } from "@reduxjs/toolkit";
import { fetchExamDescriptionById, updateExamDescription } from "../utils/reduxThunk/examThunk";
const initialState = {
    isLoading: false,
    isError:false
}

const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        updateLoader: (state, { payload }) => {
            state.isLoading = payload.flag;
        }
    },
    extraReducers: (builder) => {
     builder.addCase(fetchExamDescriptionById.pending, (state, { payload }) => {
         state.isLoading = true;
     });
        builder.addCase(fetchExamDescriptionById.fulfilled, (state, { payload }) => {
         state.isLoading = false;
     });
        builder.addCase(fetchExamDescriptionById.rejected, (state, { payload }) => {
          state.isError = true;
          state.isLoading = false;
        });
       builder.addCase(updateExamDescription.pending, (state, { payload }) => {
         state.isLoading = true;
     });
        builder.addCase(updateExamDescription.fulfilled, (state, { payload }) => {
         state.isLoading = false;
     });
        builder.addCase(updateExamDescription.rejected, (state, { payload }) => {
          state.isError = true;
         state.isLoading = false;
          
    });
   
  }
    
})
export const { updateLoader } = commonSlice.actions;
export default commonSlice.reducer;