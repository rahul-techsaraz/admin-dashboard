import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { constants } from "../utils/constants";
import { httpCall, thunkAPICall } from '../utils/service';
import { fetchExamConfigById, fetchExamDescriptionById, fetchExamHighlightsById, fetchExamInfoById, fetchExamList, updateExamDescription } from "../utils/reduxThunk/examThunk";


 

const initialState = {
  activeExamTab: constants.examDetailsTab.EXAM_INFO,
  examDescriptionsById: {},
  isEdit: false,
  examList:[],
  isValidationError:true,
  examInfo: {
    isValidationError: true,
    isEdit:true,
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
  initialState,
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
    reset: () => initialState,
    toggelExamInfoEdit: (state, { payload }) => {
       state.isEdit = !state.isEdit
     }
  },
   extraReducers: (builder) => {
     builder.addCase(fetchExamInfoById.fulfilled, (state, { payload }) => {
       if (payload.data) {
         state.examInfo.examName = payload.data.exam_name;
         state.examInfo.applicationStartDates = payload.data.application_start_date;
         state.examInfo.applicationEndDates = payload.data.application_end_date;
         state.examInfo.examStartDates = payload.data.exam_start_date;
         state.examInfo.examEndDates = payload.data.exam_end_date;
         state.examInfo.examYear = payload.data.exam_year;
       } else {
           state.examInfo.examName = '';
         state.examInfo.applicationStartDates = '';
         state.examInfo.applicationEndDates = '';
         state.examInfo.examStartDates = '';
         state.examInfo.examEndDates = '';
         state.examInfo.examYear = '';
       }
     });
       builder.addCase(fetchExamDescriptionById.fulfilled, (state, { payload }) => {
       if (payload.data) {
         const objKeys = Object.keys(payload.data);
         objKeys.map(description => {
           state.examDescriptionOptions[description]=payload.data[description]
         })
       } else {
           const objKeys = Object.keys(payload.data);
         objKeys.map(description => {
           state.examDescriptionOptions[description]=""
         })
       }
       });
      builder.addCase(fetchExamHighlightsById.fulfilled, (state, { payload }) => {
       if (payload.data) {
         state.examHighlights.conducting_body = payload.data.conducting_body;
         state.examHighlights.exam_level = payload.data.exam_level;
         state.examHighlights.exam_frequency = payload.data.exam_frequency;
         state.examHighlights.exam_mode = payload.data.model_of_exam;
         state.examHighlights.exam_duration = payload.data.exam_duration;
         state.examHighlights.paper_marks = payload.data.paper_marks;
         state.examHighlights.marking_scheme = payload.data.marking_scheme;
       } else {
           state.examHighlights.conducting_body = '';
         state.examHighlights.exam_level = '';
         state.examHighlights.exam_frequency = '';
         state.examHighlights.exam_mode = '';
         state.examHighlights.exam_duration = '';
         state.examHighlights.paper_marks = '';
         state.examHighlights.marking_scheme = '';
       }
      });
      builder.addCase(fetchExamConfigById.fulfilled, (state, { payload }) => {
       if (payload.data) {
         state.examConfig.no_session = payload.data.no_of_session;
         state.examConfig.session_name = payload.data.session_name;
         state.examConfig.is_counselling_announced = payload.data.is_counselling_announced;
         state.examConfig.counselling_date = payload.data.counselling_dates;
         state.examConfig.exam_conducting_address = payload.data.exam_conducting_address;
         state.examConfig.exam_conducting_email = payload.data.exam_conducting_email;
       } else {
           state.examConfig.no_session = '';
         state.examConfig.session_name = '';
         state.examConfig.is_counselling_announced = '';
         state.examConfig.counselling_date = '';
         state.examConfig.exam_conducting_address = '';
         state.examConfig.exam_conducting_email = '';
       }
     });
     builder.addCase(updateExamDescription.fulfilled, (state, { payload }) => {
       if (payload.status === constants.apiResponseStatus.SUCCESS) {
          state.isEdit = false;
       }       
     });
     builder.addCase(fetchExamList.fulfilled, (state, { payload }) => {
       if (payload.status === constants.apiResponseStatus.SUCCESS) {
         state.isEdit = false;
         state.examList = payload.data;
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
  handleValidation,
  reset,
  toggelExamInfoEdit
 } = examSlice.actions;

export default examSlice.reducer;