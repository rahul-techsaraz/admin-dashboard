import { createSlice } from '@reduxjs/toolkit'
import {
  fetchAgentCollegeList,
  fetchAllCollegeList,
  fetchCityList,
  fetchCollegeById,
  fetchCollegeCommonById,
  fetchCollegeDiscriptionById,
  fetchCollegeGallaryById,
  fetchCollegeHighlightsById,
  fetchCourseList,
  fetchCourseOfferedById,
  fetchStateList,
  fileUploadGallary,
  fileUploadThumbnail,
  fileUploadlogo
} from '../utils/reduxThunk/collegeThunk'
import { constants } from '../utils/constants'

const initialState = {
  allCollegeList: [],
  filteredCollegeList: [],
  agentCollegeList: [],
  allCourseDetails: [],
  isDisabled: true,
  isEdit: false,
  courseList: [],
  stateList: [],
  cityList: [],
  facultyList: [],
  highlightList: [],
  courseOfferedList: [],
  isValitadeError: true,
  collegeBasicDetails: {
    isValitadeError: true,
    college_id: '',
    college_name: '',
    location: '',
    affiliate_by: '',
    ratings: '',
    state: '',
    city: '',
    college_type: '',
    college_logo: '',
    college_thumbnail: '',
    message: '',
    account_name: '',
    is_publish: '',
  },
  courseOffered: {
    isValitadeError: true,
    college_id: '',
    course_id: '',
    course_name: '',
    course_fee_min: '',
    course_fee_max: '',
    course_accepting_exam: '',
    sub_course_fee: '',
    sub_course_duration: ''
  },
  collegeDescriptions: {
    isValitadeError: true,
    college_id: '',
    college_description: '',
    college_course_description: '',
    college_highlights_description: '',
    college_campus_description: ''
  },
  collegeHighlights: {
    isValitadeError: true,
    college_id: '',
    course_id: '',
    course_name: '',
    Specialisations_offered: '',
    fees_annually: '',
    course_duration: '',
    eligibility_criteria: ''
  },
  common: {
    isValitadeError: true,
    college_id: '',
    facilities: '',
    faculty_name: '',
    department: ''
  },
  gallary: {
    isValitadeError: true,
    college_id: '',
    image_path: '',
    video_path: ''
  }
}
const collegeSlice = createSlice({
  name: 'college',
  initialState,
  reducers: {
    updateCollegeInfo: (state, { payload }) => {
      if (payload.key !== undefined) {
        state[payload.classKey][payload.key] = payload.value
      } else {
        state[payload.classKey] = payload.value
      }
    },
    updateAgentCollegeList: (state, { payload }) => {
      state.agentCollegeList = payload.data
    },
    resetCollege: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllCollegeList.fulfilled, (state, { payload }) => {
      if (payload.status === constants.apiResponseStatus.SUCCESS) {
        state.allCollegeList = payload.data
      }
    })
    builder.addCase(fetchAgentCollegeList.fulfilled, (state, { payload }) => {
      if (payload.status === constants.apiResponseStatus.SUCCESS) {
        const userAccountName = JSON.parse(localStorage.getItem('userData'))
        state.agentCollegeList = payload.data.filter((data) => data.email === userAccountName.email)
      }
    })
    builder.addCase(fetchStateList.fulfilled, (state, { payload }) => {
      if (payload.error === false) {
        state.stateList = payload.data.states.map((data) => data.name)
      }
    })
    builder.addCase(fetchCityList.fulfilled, (state, { payload }) => {
      if (payload.error === false) {
        state.cityList = payload.data
      }
    })
    builder.addCase(fetchCourseList.fulfilled, (state, { payload }) => {
      if (payload.status === constants.apiResponseStatus.SUCCESS) {
        state.allCourseDetails = payload.data.result
      }
    })
    builder.addCase(fileUploadlogo.fulfilled, (state, { payload }) => {
      if (payload[0].status === constants.apiResponseStatus.SUCCESS) {
        state.collegeBasicDetails.college_logo = payload[0].fileName
      }
    })
    builder.addCase(fileUploadThumbnail.fulfilled, (state, { payload }) => {
      if (payload[0].status === constants.apiResponseStatus.SUCCESS) {
        state.collegeBasicDetails.college_thumbnail = payload[0].fileName
      }
    })
    builder.addCase(fileUploadGallary.fulfilled, (state, { payload }) => {
      console.log(payload)
      if (payload.status === 200) {
        state.gallary.image_path = state.gallary.image_path + ',' + payload.data.map((filePath) => filePath.fileName).join(',')
      }
    })
    builder.addCase(fetchCollegeById.fulfilled, (state, { payload }) => {
      if (payload.data) {
        state.collegeBasicDetails.college_id = payload.data.college_id
        state.collegeBasicDetails.college_name = payload.data.college_name
        state.collegeBasicDetails.college_type = payload.data.college_type
        state.collegeBasicDetails.affiliate_by = payload.data.affiliate_by
        state.collegeBasicDetails.state = payload.data.state
        state.collegeBasicDetails.city = payload.data.city
        state.collegeBasicDetails.location = payload.data.location
        state.collegeBasicDetails.ratings = payload.data.ratings
        state.collegeBasicDetails.college_logo = payload.data.college_logo
        state.collegeBasicDetails.college_thumbnail = payload.data.college_thumbnail
        state.collegeBasicDetails.message = payload.data.message
        state.collegeBasicDetails.account_name = payload.data.account_name
        state.collegeBasicDetails.is_publish = payload.data.is_publish
      }
    })
    builder.addCase(fetchCollegeCommonById.fulfilled, (state, { payload }) => {
      if (payload.data) {
        state.common.facilities = payload.data.facilities
        state.facultyList = payload.data.faculty_name.split(',')
      }
    })
    builder.addCase(fetchCollegeDiscriptionById.fulfilled, (state, { payload }) => {
      if (payload.data) {
        state.collegeDescriptions.college_description = payload.data.college_description
        state.collegeDescriptions.college_course_description = payload.data.college_course_description
        state.collegeDescriptions.college_highlights_description = payload.data.college_highlights_description
        state.collegeDescriptions.college_campus_description = payload.data.college_campus_description
      }
    })
    builder.addCase(fetchCourseOfferedById.fulfilled, (state, { payload }) => {
      if (payload.data) {
        state.courseOfferedList = payload.data
      }
    })
    builder.addCase(fetchCollegeHighlightsById.fulfilled, (state, { payload }) => {
      if (payload.data) {
        state.highlightList = payload.data
      }
    })
    builder.addCase(fetchCollegeGallaryById.fulfilled, (state, { payload }) => {
      if (payload.data) {
        state.gallary.image_path = payload.data.image_path
        state.gallary.video_path = payload.data?.video_path
      }
    })
  }
})

export const { updateAgentCollegeList, updateCollegeInfo, resetCollege } = collegeSlice.actions
export default collegeSlice.reducer
