import { createSlice } from "@reduxjs/toolkit";
import { addExamConfig, addExamHighlights, addNewExam, fetchExamConfigById, fetchExamDescriptionById, fetchExamHighlightsById, fetchExamInfoById, fetchExamList, updateExamDescription } from "../utils/reduxThunk/examThunk";
const initialState = {
   isLoading: false,
   isError: false
};

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
      builder.addCase(fetchExamList.pending, (state, { payload }) => {
          state.isError = false;
         state.isLoading = true;
          
      });
       builder.addCase(fetchExamList.fulfilled, (state, { payload }) => {
          state.isError = false;
         state.isLoading = false;
          
      });
       builder.addCase(fetchExamList.rejected, (state, { payload }) => {
          state.isError = true;
         state.isLoading = false;
          
       });
       builder.addCase(fetchExamInfoById.pending, (state, { payload }) => {
          state.isError = false;
         state.isLoading = true;
          
      });
       builder.addCase(fetchExamInfoById.fulfilled, (state, { payload }) => {
          state.isError = false;
         state.isLoading = false;
          
      });
       builder.addCase(fetchExamInfoById.rejected, (state, { payload }) => {
          state.isError = true;
         state.isLoading = false;
          
       });
         builder.addCase(fetchExamHighlightsById.pending, (state, { payload }) => {
          state.isError = false;
         state.isLoading = true;
          
      });
       builder.addCase(fetchExamHighlightsById.fulfilled, (state, { payload }) => {
          state.isError = false;
         state.isLoading = false;
          
      });
       builder.addCase(fetchExamHighlightsById.rejected, (state, { payload }) => {
          state.isError = true;
         state.isLoading = false;
          
       });
       builder.addCase(fetchExamConfigById.pending, (state, { payload }) => {
          state.isError = false;
         state.isLoading = true;
          
      });
       builder.addCase(fetchExamConfigById.fulfilled, (state, { payload }) => {
          state.isError = false;
         state.isLoading = false;
          
      });
       builder.addCase(fetchExamConfigById.rejected, (state, { payload }) => {
          state.isError = true;
         state.isLoading = false;
          
       });
       builder.addCase(addNewExam.pending, (state, { payload }) => {
          state.isError = false;
         state.isLoading = true;
          
      });
       builder.addCase(addNewExam.fulfilled, (state, { payload }) => {
          state.isError = false;
         state.isLoading = false;
          
      });
       builder.addCase(addNewExam.rejected, (state, { payload }) => {
          state.isError = true;
         state.isLoading = false;
          
       });
       builder.addCase(addExamHighlights.pending, (state, { payload }) => {
          state.isError = false;
         state.isLoading = true;
          
      });
       builder.addCase(addExamHighlights.fulfilled, (state, { payload }) => {
          state.isError = false;
         state.isLoading = false;
          
      });
       builder.addCase(addExamHighlights.rejected, (state, { payload }) => {
          state.isError = true;
         state.isLoading = false;
          
       });
        builder.addCase(addExamConfig.pending, (state, { payload }) => {
          state.isError = false;
         state.isLoading = true;
          
      });
       builder.addCase(addExamConfig.fulfilled, (state, { payload }) => {
          state.isError = false;
         state.isLoading = false;
          
      });
       builder.addCase(addExamConfig.rejected, (state, { payload }) => {
          state.isError = true;
         state.isLoading = false;
          
    });
  }
    
})
export const { updateLoader } = commonSlice.actions;
export default commonSlice.reducer;