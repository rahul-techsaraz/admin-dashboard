import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { constants } from "../utils/constants";
import { httpCall, thunkAPICall } from '../utils/service';

const { initialState } = constants.examDescriptionInitialState;

 export const fetchExamDescriptionById = createAsyncThunk(
  "exam/fetchExamDescriptionById",
   async ({ url, header, method }, thunkApi) => {
     console.log(thunkApi);
    try {
      const data = await httpCall(url, header, method);
      return data;

    } catch (error) {
      return thunkApi.rejectWithError(error);
    }
  }
);
 export const updateExamDescription = createAsyncThunk(
  "exam/updateExamDescription",
   async ({ url, header, method, payload }, thunkApi) => {
    console.log({ url, header, method, payload })
    try {
      const data = await httpCall(url, header, method, payload);
      console.log({data})
      return data;

    } catch (error) {
      return thunkApi.rejectWithError(error);
    }
  }
);

const initialStates = {
  activeExamTab: 'description',
  isEdit:false,
  examDescriptionsById: false,
  isError: false,
  errorMessage:""
 
};

const examSlice = createSlice({
  name: "exam",
  initialState:initialStates,
  reducers: {
      updateExamTab: (state, { payload }) => {
          state.activeExamTab = payload.data;
    },
    updateEditMode: (state,{payload}) => {
      state.isEdit = payload.flag
    }
   

  },
   extraReducers: (builder) => {
     builder.addCase(fetchExamDescriptionById.fulfilled, (state, { payload }) => {
       if (payload.data) {
         state.examDescriptionsById = payload.data
         initialState.exam_description = payload.data.exam_description;
            initialState.exam_conducting_body_description = payload.data.exam_conducting_body_description;
            initialState.exam_important_dates_description = payload.data.exam_important_dates_description;
            initialState.exam_session_description = payload.data.exam_session_description;
            initialState.exam_counselling_description = payload.data.exam_counselling_description;
            initialState.exam_application_form_description = payload.data.exam_application_form_description;
            initialState.apllication_form_step1_description = payload.data.apllication_form_step1_description;
            initialState.apllication_form_step2_description = payload.data.apllication_form_step2_description;
            initialState.apllication_form_step3_description = payload.data.apllication_form_step3_description;
            initialState.exam_intimation_slip_description = payload.data.exam_intimation_slip_description;
            initialState.exam_admit_card_description = payload.data.exam_admit_card_description;
            initialState.exam_center_description = payload.data.exam_center_description;
            initialState.exam_pattern_description = payload.data.exam_pattern_description;
            initialState.exam_syllabus_description = payload.data.exam_syllabus_description;
         //state.isEdit = false
       } else {
          initialState.exam_description = '';
            initialState.exam_conducting_body_description = '';
            initialState.exam_important_dates_description = '';
            initialState.exam_session_description = '';
            initialState.exam_counselling_description = '';
            initialState.exam_application_form_description = '';
            initialState.apllication_form_step1_description = '';
            initialState.apllication_form_step2_description = '';
            initialState.apllication_form_step3_description = '';
            initialState.exam_intimation_slip_description = '';
            initialState.exam_admit_card_description = '';
            initialState.exam_center_description = '';
            initialState.exam_pattern_description = '';
            initialState.exam_syllabus_description = '';
         state.examDescriptionsById = false
         //state.isEdit = true
         
       }
     });
     builder.addCase(updateExamDescription.fulfilled, (state, { payload }) => {
       if (payload.status === 'success') {
          state.isEdit=false
       }
       state.errorMessage = payload.data.message;
       
    });
   
  }
});

export const { 
  updateExamTab,
  updateEditMode
 } = examSlice.actions;

export default examSlice.reducer;