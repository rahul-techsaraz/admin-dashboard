import { createSlice } from '@reduxjs/toolkit'
// Constants for field names to avoid naming mismatches
import { FIELDS } from '../Constants/redux/courseFieldName'

const localData = localStorage.getItem('courseFormData')

export const defaultState = {
  basicDetails: {
    [FIELDS.COURSE_NAME]: '',
    [FIELDS.SUB_COURSE_NAME]: '',
    [FIELDS.COURSE_MODE]: '',
    [FIELDS.COURSE_FEE_MIN]: null,
    [FIELDS.COURSE_FEE_MAX]: null,
    [FIELDS.COURSE_DURATION]: null,
    [FIELDS.CATEGORY]: [],
    [FIELDS.COURSE_ACCEPTING_EXAM]: [],
    [FIELDS.IS_VALIDATION_ERROR]: true
  },
  description: {
    [FIELDS.COURSE_PLACEMENT_DESCRIPTION]: '',
    [FIELDS.COURSE_ADMISSION_PROCESS_DESCRIPTION]: '',
    [FIELDS.COURSE_ELIGIBILITY_CRITERIA_DESCRIPTION]: '',
    [FIELDS.COURSE_DESCRIPTION]: '',
    [FIELDS.IS_VALIDATION_ERROR]: true
  },
  otherInfo: {
    [FIELDS.COURSE_CATEGORY_LEVEL]: '',
    [FIELDS.EXAM_TYPE]: '',
    [FIELDS.ELIGIBILITY_CRITERIA]: '',
    [FIELDS.IS_VALIDATION_ERROR]: true
  },
  syllabusDetails: {
    [FIELDS.SYLLABUS]: [],
    [FIELDS.IS_VALIDATION_ERROR]: true
  },
  allCourseDetails: []
}

// Final initialState
const initialState = localData ? JSON.parse(localData) : defaultState

// Helper function to check validation for Basic Details step
const checkBasicDetailsValidation = (state) => {
  return (
    !state[FIELDS.COURSE_NAME] ||
    !state[FIELDS.SUB_COURSE_NAME] ||
    !state[FIELDS.COURSE_MODE] ||
    state[FIELDS.COURSE_FEE_MIN] === null || // Check for null or potentially invalid number
    state[FIELDS.COURSE_FEE_MAX] === null || // Check for null or potentially invalid number
    state[FIELDS.COURSE_FEE_MIN] < 0 || // Basic number validation
    state[FIELDS.COURSE_FEE_MAX] < 0 || // Basic number validation
    (state[FIELDS.COURSE_FEE_MAX] !== null &&
      state[FIELDS.COURSE_FEE_MIN] !== null &&
      state[FIELDS.COURSE_FEE_MAX] < state[FIELDS.COURSE_FEE_MIN]) || // Max < Min check
    state[FIELDS.COURSE_DURATION] === null || // Check for null
    state[FIELDS.CATEGORY].length === 0 ||
    state[FIELDS.COURSE_ACCEPTING_EXAM].length === 0
  )
}

// Helper function to check validation for Description step
const checkDescriptionValidation = (state) => {
  return (
    !state[FIELDS.COURSE_PLACEMENT_DESCRIPTION] ||
    !state[FIELDS.COURSE_ADMISSION_PROCESS_DESCRIPTION] ||
    !state[FIELDS.COURSE_ELIGIBILITY_CRITERIA_DESCRIPTION] ||
    !state[FIELDS.COURSE_DESCRIPTION]
  )
}

// Helper function to check validation for Other Info step
const checkOtherInfoValidation = (state) => {
  return !state[FIELDS.COURSE_CATEGORY_LEVEL] || !state[FIELDS.EXAM_TYPE] || !state[FIELDS.ELIGIBILITY_CRITERIA]
}

// Helper function to check validation for Syllabus Details step
const checkSyllabusValidation = (state) => {
  if (state[FIELDS.SYLLABUS].length === 0) {
    return true // Empty syllabus array is invalid
  }
  // Check if any entry in the syllabus is incomplete
  return state[FIELDS.SYLLABUS].some(
    (entry) => entry[FIELDS.YEAR] === null || entry[FIELDS.YEAR] <= 0 || entry[FIELDS.SUBJECTS].length === 0 || !entry[FIELDS.TYPE]
  )
}

// Create the Redux Toolkit slice
const courseFormSlice = createSlice({
  name: 'courseForm',
  initialState,
  reducers: {
    // --- Basic Details Reducers ---
    setBasicDetailField: (state, action) => {
      const { field, value } = action.payload
      if (field in state.basicDetails) {
        state.basicDetails[field] = value
      }
      state.basicDetails[FIELDS.IS_VALIDATION_ERROR] = checkBasicDetailsValidation(state.basicDetails)
    },
    // --- Description Reducers ---
    setDescriptionField: (state, action) => {
      const { field, value } = action.payload
      if (field in state.description) {
        state.description[field] = value
      }
      state.description[FIELDS.IS_VALIDATION_ERROR] = checkDescriptionValidation(state.description)
    },

    // --- Other Info Reducers ---
    setOtherInfoField: (state, action) => {
      const { field, value } = action.payload
      if (field in state.otherInfo) {
        state.otherInfo[field] = value
      }
      state.otherInfo[FIELDS.IS_VALIDATION_ERROR] = checkOtherInfoValidation(state.otherInfo)
    },

    // --- Syllabus Details Reducers ---
    addSyllabusEntry: (state) => {
      state.syllabusDetails[FIELDS.SYLLABUS].push({
        id: Date.now().toString(),
        [FIELDS.YEAR]: null,
        [FIELDS.SUBJECTS]: [],
        [FIELDS.TYPE]: 'Yearly'
      })
      state.syllabusDetails[FIELDS.IS_VALIDATION_ERROR] = checkSyllabusValidation(state.syllabusDetails)
    },
    updateSyllabusEntry: (state, action) => {
      const { id, updates } = action.payload
      if (Array.isArray(updates)) {
        // Full syllabus array is passed
        state.syllabusDetails[FIELDS.SYLLABUS] = updates
      } else {
        // Single entry update is passed
        const index = state.syllabusDetails[FIELDS.SYLLABUS].findIndex((entry) => entry.id === id)
        if (index !== -1) {
          state.syllabusDetails[FIELDS.SYLLABUS][index] = {
            ...state.syllabusDetails[FIELDS.SYLLABUS][index],
            ...updates
          }
        }
      }
      state.syllabusDetails[FIELDS.IS_VALIDATION_ERROR] = checkSyllabusValidation(state.syllabusDetails)
    },

    removeSyllabusEntry: (state, action) => {
      const { id } = action.payload
      state.syllabusDetails[FIELDS.SYLLABUS] = state.syllabusDetails[FIELDS.SYLLABUS].filter((entry) => entry.id !== id)
      state.syllabusDetails[FIELDS.IS_VALIDATION_ERROR] = checkSyllabusValidation(state.syllabusDetails)
    },
    setCourseDataFromApi: (state, action) => {
      const data = action.payload

      state.basicDetails = {
        [FIELDS.COURSE_NAME]: data.course_name || '',
        [FIELDS.SUB_COURSE_NAME]: data.sub_course_name || '',
        [FIELDS.COURSE_MODE]: data.course_mode || '',
        [FIELDS.COURSE_FEE_MIN]: data.course_fee_min ?? null,
        [FIELDS.COURSE_FEE_MAX]: data.course_fee_max ?? null,
        [FIELDS.COURSE_DURATION]: data.course_duration ?? null,
        [FIELDS.CATEGORY]: data.course_categories || [],
        [FIELDS.COURSE_ACCEPTING_EXAM]: data.course_accepting_exams || [],
        [FIELDS.IS_VALIDATION_ERROR]: checkBasicDetailsValidation({
          [FIELDS.COURSE_NAME]: data.course_name,
          [FIELDS.SUB_COURSE_NAME]: data.sub_course_name,
          [FIELDS.COURSE_MODE]: data.course_mode,
          [FIELDS.COURSE_FEE_MIN]: data.course_fee_min,
          [FIELDS.COURSE_FEE_MAX]: data.course_fee_max,
          [FIELDS.COURSE_DURATION]: data.course_duration,
          [FIELDS.CATEGORY]: data.course_categories,
          [FIELDS.COURSE_ACCEPTING_EXAM]: data.course_accepting_exams
        })
      }

      const descriptions = data.course_descriptions || {}

      state.description = {
        [FIELDS.COURSE_PLACEMENT_DESCRIPTION]: descriptions.coursePlacementDescription || '',
        [FIELDS.COURSE_ADMISSION_PROCESS_DESCRIPTION]: descriptions.courseAdmissionProcessDescription || '',
        [FIELDS.COURSE_ELIGIBILITY_CRITERIA_DESCRIPTION]: descriptions.courseEligibilityCriteriaDescription || '',
        [FIELDS.COURSE_DESCRIPTION]: descriptions.courseDescription || '',
        [FIELDS.IS_VALIDATION_ERROR]: checkDescriptionValidation({
          [FIELDS.COURSE_PLACEMENT_DESCRIPTION]: descriptions.coursePlacementDescription,
          [FIELDS.COURSE_ADMISSION_PROCESS_DESCRIPTION]: descriptions.courseAdmissionProcessDescription,
          [FIELDS.COURSE_ELIGIBILITY_CRITERIA_DESCRIPTION]: descriptions.courseEligibilityCriteriaDescription,
          [FIELDS.COURSE_DESCRIPTION]: descriptions.courseDescription
        })
      }

      state.otherInfo = {
        [FIELDS.COURSE_CATEGORY_LEVEL]: data.course_standard || '',
        [FIELDS.EXAM_TYPE]: data.exam_frequency || '',
        [FIELDS.ELIGIBILITY_CRITERIA]: data.eligibility_criteria || '',
        [FIELDS.IS_VALIDATION_ERROR]: checkOtherInfoValidation({
          [FIELDS.COURSE_CATEGORY_LEVEL]: data.course_standard,
          [FIELDS.EXAM_TYPE]: data.exam_frequency,
          [FIELDS.ELIGIBILITY_CRITERIA]: data.eligibility_criteria
        })
      }

      state.syllabusDetails = {
        [FIELDS.SYLLABUS]: Array.isArray(data.syllabus_details) ? data.syllabus_details : [],
        [FIELDS.IS_VALIDATION_ERROR]: checkSyllabusValidation({
          [FIELDS.SYLLABUS]: data.syllabus_details || []
        })
      }
    },
    setCourseDetails: (state, { payload }) => {
      state.allCourseDetails = payload.data
    },

    resetCourseForm: () => initialState
  }
})

// Export the actions
export const {
  setBasicDetailField,
  setDescriptionField,
  setOtherInfoField,
  addSyllabusEntry,
  updateSyllabusEntry,
  removeSyllabusEntry,
  resetCourseForm,
  setCourseDataFromApi,
  setCourseDetails
} = courseFormSlice.actions

// Export the reducer
export default courseFormSlice.reducer
