import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { constants } from "../utils/constants";
import { httpCall, thunkAPICall } from '../utils/service';
import { fetchExamDescriptionById, updateExamDescription } from "../utils/reduxThunk/examThunk";

const { initialState } = constants.examDescriptionInitialState;

 

const initialStates = {
  activeExamTab: constants.examDetailsTab.EXAM_INFO,
  examDescriptionsById: {},
  isEdit: false,
  isValidationError:true,
  examInfo: {
    isValidationError: true,
    examName:'',
    applicationStartDates:'',
    applicationEndDates:'',
    examStartDates:'',
    examEndDates:'',
    examYear:''
    
  },
  examDescriptionOptions: {
    isValidationError:true,
        exam_description: '',
        exam_conducting_body_description: '',
        exam_important_dates_description: '',
        exam_session_description: '',
        exam_counselling_description: '',
        exam_application_form_description: '',
        apllication_form_step1_description: '',
        apllication_form_step2_description: '',
        apllication_form_step3_description: '',
        exam_intimation_slip_description: '',
        exam_admit_card_description: '',
        exam_center_description: '',
        exam_pattern_description: '',
        exam_syllabus_description: '',
  },
  examHighlights: {
    isValidationError: true,
    conducting_body: '',
    exam_level: '',
    exam_frequency: '',
    exam_mode: '',
    exam_duration: '',
    paper_marks: '',
    marking_scheme:''
  },
  examConfig: {
    isValidationError: true,
    no_session: '',
    session_name: '',
    is_counselling_announced: '',
    counselling_date: '',
    exam_conducting_address: '',
    exam_conducting_email: '',
  }
};

const examSlice = createSlice({
  name: "exam",
  initialState:initialStates,
  reducers: {
      updateExamTab: (state, { payload }) => {
          state.activeExamTab = payload.tabName;
    },
    updateEditMode: (state,{payload}) => {
      state.isEdit = payload.flag
    },
    updateDescriptionsOptions: (state, { payload }) => {
      state.examDescriptionOptions[payload.key] = payload.value;
    },
    handleExamInfoValidation: (state, { payload }) => {
      state.examInfo.isValidationError = payload.flag;
    },
    handleExamDescriptionValidation: (state, { payload }) => {
      state.examDescriptionOptions.isValidationError = payload.flag;
    },
    handleExamHighlightsValidation: (state, { payload }) => {
      state.examHighlights.isValidationError = payload.flag;
    },
    updateExamInfo: (state, { payload }) => {
      state.examInfo[payload.key] = payload.value
    },
    updateExamHighlights: (state, { payload }) => {
      state.examHighlights[payload.key] = payload.value
    },
    updateExamConfig: (state, { payload }) => {
      state.examConfig[payload.key] = payload.value
    },
    handleExamConfigValidation: (state, { payload }) => {
      state.examConfig.isValidationError = payload.flag;
    },
    handleValidation: (state, { payload }) => {
      state.isValidationError = payload.flag;
    },
  },
   extraReducers: (builder) => {
     builder.addCase(fetchExamDescriptionById.fulfilled, (state, { payload }) => {
       if (payload.data) {
         state.examDescriptionsById = payload.data
         const examDescriptionsKeys = Object.keys(payload.data);
         let prepareDescriptionsObj = {}
         examDescriptionsKeys.map((description) => {
           if (!['id', 'exam_id', 'updated_at', 'created_at'].includes(description)) {
          return prepareDescriptionsObj = {...prepareDescriptionsObj,[description]:payload.data[description]}
           }
         }) 
         state.examDescriptionOptions = {...state.examDescriptionOptions,...prepareDescriptionsObj};
         state.isEdit = false;
       } else {
          const examDescriptionsKeys = Object.keys(payload.data);
         let prepareDescriptionsObj = {}
         examDescriptionsKeys.map((description) => {
           if (!['id', 'exam_id', 'updated_at', 'created_at'].includes(description)) {
          return prepareDescriptionsObj = {...prepareDescriptionsObj,[description]:''}
           }
         }) 
         state.examDescriptionOptions = {...state.examDescriptionOptions,...prepareDescriptionsObj};
         state.examDescriptionsById = false
         state.isEdit = true;
       }
     });
     builder.addCase(updateExamDescription.fulfilled, (state, { payload }) => {
       if (payload.status === constants.apiResponseStatus.SUCCESS) {
          state.isEdit = false;
       }       
    });
   
  }
});

export const { 
  updateExamTab,
  updateEditMode,
  updateDescriptionsOptions,
  handleExamInfoValidation,
  updateExamInfo,
  handleExamDescriptionValidation,
  handleExamHighlightsValidation,
  updateExamHighlights,
  updateExamConfig,
  handleExamConfigValidation,
  handleValidation
 } = examSlice.actions;

export default examSlice.reducer;