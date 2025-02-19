import { createSlice } from '@reduxjs/toolkit'
import {
  fetchCourseBasicDetailsById,
  fetchCourseDescriptionById,
  fetchCourseDetails,
  fetchCourseDetailsById,
  fetchSyllabusDetailsById
} from '../utils/reduxThunk/courseThunk'
import { constants } from '../utils/constants'

const initialState = {
  isEdit: false,
  isEditSyllabus: false,
  allCourseDetails: [],
  isValidationError: true,
  isDisabled: true,
  tabValue: '1',
  courseInfo: {
    isValidationError: true,
    course_id: '',
    course_name: '',
    sub_course_name: '',
    course_mode: '',
    course_duration: '',
    course_fee_min: 1,
    course_fee_max: 10,
    course_description: '',
    category_name: '',
    course_accepting_exam: []
  },
  courseDescriptions: {
    isValidationError: true,
    course_id: '',
    course_overview_description: '',
    course_entrance_exam_description: '',
    course_fee_description: '',
    course_placement_description: '',
    course_admission_process_description: '',
    course_eligibility_criteria_description: ''
  },
  courseDetails: {
    isValidationError: true,
    course_id: '',
    course_level: '',
    exam_type: '',
    eligiblity_criteria: ''
    // top_course_colleges:[],
  },
  syllabusDetails: {
    isValidationError: true,
    course_id: '',
    year_name: '',
    semester_name: '',
    list_of_subject: '',
    accumulated_data: []
  }
}
const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    updateCourseInfo: (state, { payload }) => {
      console.log(payload)
      if (payload.key !== undefined) {
        state[payload.classKey][payload.key] = payload.value
      } else {
        state[payload.classKey] = payload.value
      }
    },
    resetCourse: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCourseDetails.fulfilled, (state, { payload }) => {
      if (payload.status === constants.apiResponseStatus.SUCCESS) {
        const modifyCourseDetails = payload.data.map((data) => {
          return { ...data, course_fee: data.course_fee_min + ' - ' + data.course_fee_max }
        })
        state.allCourseDetails = modifyCourseDetails
      }
    })
    builder.addCase(fetchCourseBasicDetailsById.fulfilled, (state, { payload }) => {
      if (payload.data) {
        // const objKeys = Object.keys(payload.data)
        // objKeys.map(description=>{
        //     state.courseInfo[description] = payload.data[description]
        // })
        state.courseInfo.course_id = payload.data.course_id
        state.courseInfo.course_name = payload.data.course_name.split('-')[0]
        state.courseInfo.sub_course_name = payload.data.course_name.split('-')[1]
        state.courseInfo.course_mode = payload.data.course_mode
        state.courseInfo.course_duration = payload.data.course_duration
        state.courseInfo.course_fee_min = payload.data.course_fee_min
        state.courseInfo.course_fee_max = payload.data.course_fee_max
        state.courseInfo.course_description = payload.data.course_description
        state.courseInfo.category_name = payload.data.category_name
        state.courseInfo.course_accepting_exam = payload.data.course_accepting_exam.split(',')
      } else {
        // const objKeys = Object.keys(payload.data)
        // objKeys.map(description=>{
        //     state.courseInfo[description] = ''
        // })
        state.courseInfo.course_id = ''
        state.courseInfo.course_name = ''
        state.courseInfo.course_mode = ''
        state.courseInfo.course_duration = ''
        state.courseInfo.course_fee_min = 0
        state.courseInfo.course_fee_max = 10
        state.courseInfo.course_description = ''
        state.courseInfo.course_accepting_exam = ''
        state.courseInfo.course_accepting_exam = []
      }
    })
    builder.addCase(fetchCourseDescriptionById.fulfilled, (state, { payload }) => {
      if (payload.data) {
        const objKeys = Object.keys(payload.data)
        objKeys.map((description) => {
          state.courseDescriptions[description] = payload.data[description]
        })
      } else {
        const objKeys = Object.keys(payload.data)
        objKeys.map((description) => {
          state.courseDescriptions[description] = ''
        })
      }
    })
    builder.addCase(fetchCourseDetailsById.fulfilled, (state, { payload }) => {
      if (payload.data) {
        // const objKeys = Object.keys(payload.data)
        // objKeys.map(description=>{
        //     state.courseDetails[description] = payload.data[description]
        // })
        state.courseDetails.course_id = payload.data.course_id
        state.courseDetails.course_level = payload.data.course_level
        state.courseDetails.exam_type = payload.data.exam_type
        state.courseDetails.eligiblity_criteria = payload.data.eligiblity_criteria
        // state.courseDetails.top_course_colleges = payload.data.top_course_colleges.split(',')
      } else {
        // const objKeys = Object.keys(payload.data)
        // objKeys.map(description=>{
        //     state.courseDetails[description] = ''
        // })
        state.courseDetails.course_id = ''
        state.courseDetails.course_level = ''
        state.courseDetails.exam_type = ''
        state.courseDetails.eligiblity_criteria = ''
        // state.courseDetails.top_course_colleges = []
      }
    })
    builder.addCase(fetchSyllabusDetailsById.fulfilled, (state, { payload }) => {
      if (payload.data) {
        state.syllabusDetails.accumulated_data = payload.data
      } else {
        state.syllabusDetails.accumulated_data = ''
      }
    })
  }
})
export const { updateCourseInfo, resetCourse } = courseSlice.actions
export default courseSlice.reducer
