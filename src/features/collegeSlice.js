import {createSlice} from '@reduxjs/toolkit';
import {fetchAgentCollegeList, fetchCityList, fetchCourseList, fetchStateList, fileUpload, fileUploadGallary, fileUploadThumbnail, fileUploadlogo} from '../utils/reduxThunk/collegeThunk';
import {constants} from '../utils/constants';



const initialState = {
	agentCollegeList : [],
	allCourseDetails : [],
	isDisabled : true,
	courseList : [],
	stateList : [],
	cityList : [],
	facultyList : [],
	highlightList : [],
	courseOfferedList : [],
	isValitadeError : true,
	collegeBasicDetails : {
		isValitadeError : true,
		college_name : '',
		location : '',
		affiliate_by : '',
		ratings : '',
		state : '',
		city : '',
		college_type : '',
		fee_range_min : 1,
		fee_range_max : 10,
		college_logo : '',
		college_thumbnail : '',
	},
	courseOffered :{
		isValitadeError : true,
		course_name : '',
		course_fee_min : '',
		course_fee_max : '',
		course_accepting_exam : '',
		sub_course_fee : '',
		sub_course_duration : '',
	},
	collegeDescriptions : {
		isValitadeError : true,
		college_description : '',
		college_course_description : '',
		college_highlights_description : '',
		college_campus_description : '',
	},
	collegeHighlights : {
		isValitadeError : true,
		course_name : '',
		Specialisations_offered : '',
		fees_annually : '',
		course_duration : '',
		eligibility_criteria : '',
	},
	common :{
		isValitadeError : true,
		facilities : '',
		faculty_name : '',
		department : '',
	},
	gallary : {
		isValitadeError : true,
		image_path : '',
		video_path :'',
		files : [],
	}
};
const collegeSlice = createSlice({
	name: 'college',
	initialState,
	reducers: {
		updateCollegeInfo:(state,{payload})=>{
            if(payload.key !== undefined){
                state[payload.classKey][payload.key] = payload.value;
            }else{
                state[payload.classKey] = payload.value
            }
        },
		updateAgentCollegeList : (state, {payload})=>{
			state.agentCollegeList = payload.data
		},
		resetCollege : ()=> initialState,
	},
	extraReducers: builder => {
		builder.addCase(fetchAgentCollegeList.fulfilled, (state, {payload}) => {
			if (payload.status === constants.apiResponseStatus.SUCCESS) {
				const userAccountName = JSON.parse(localStorage.getItem('userData'))
				state.agentCollegeList = payload.data.filter(data=>data.account_name === userAccountName.account_name);
			}
		});
		builder.addCase(fetchStateList.fulfilled, (state, {payload}) => {
			if(payload.error === false){
				state.stateList = payload.data.states.map(data=>data.name)
			}
		})
		builder.addCase(fetchCityList.fulfilled, (state, {payload}) => {
			if(payload.error === false){
				state.cityList = payload.data
			}
		});
		builder.addCase(fetchCourseList.fulfilled, (state, {payload}) => {
			if(payload.status === constants.apiResponseStatus.SUCCESS){
				state.allCourseDetails = payload.data.result
			}
		});
		builder.addCase(fileUploadlogo.fulfilled, (state, {payload}) => {
			if(payload.status === 200){
				state.collegeBasicDetails.college_logo = payload.data[0].fileName
			}
		});
		builder.addCase(fileUploadThumbnail.fulfilled, (state, {payload}) => {
			if(payload.status === 200){
				state.collegeBasicDetails.college_thumbnail = payload.data[0].fileName
			}
		});
		builder.addCase(fileUploadGallary.fulfilled, (state, {payload}) => {
			if(payload.status === 200){
				state.gallary.image_path = payload.data.map(filePath=>filePath.fileName).join(', ')
			}
		});
	},
});

export const {
	updateAgentCollegeList,updateCollegeInfo,resetCollege,
} = collegeSlice.actions;
export default collegeSlice.reducer;
