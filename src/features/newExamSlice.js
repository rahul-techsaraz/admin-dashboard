import { createSlice } from '@reduxjs/toolkit'
import { EXAM_FIELDS } from '../Constants/redux/courseFieldName'

const localData = localStorage.getItem('examFormData')

export const defaultState = {
  examBasicDetails: {
    [EXAM_FIELDS.EXAM_NAME]: '',
    [EXAM_FIELDS.EXAM_YEAR]: 0,
    [EXAM_FIELDS.EXAM_CATEGORY]: [],
    [EXAM_FIELDS.EXAM_FREQUENCY]: '',
    [EXAM_FIELDS.EXAM_MODE]: '',
    [EXAM_FIELDS.EXAM_DURATION]: 0,
    [EXAM_FIELDS.IS_VALIDATION_ERROR]: true
  },
  examImportantDates: {
    [EXAM_FIELDS.EXAM_APPLICATION_START_DATE]: '',
    [EXAM_FIELDS.EXAM_APPLICATION_END_DATE]: '',
    [EXAM_FIELDS.EXAM_ADMIT_CARD_RELEASE_DATE]: '',
    [EXAM_FIELDS.EXAM_START_DATE]: '',
    [EXAM_FIELDS.EXAM_END_DATE]: '',
    [EXAM_FIELDS.EXAM_RESULT_DECLARATION_DATE]: '',
    [EXAM_FIELDS.EXAM_COUNSELLING_DATE]: '',
    [EXAM_FIELDS.IS_VALIDATION_ERROR]: false
  },
  examEligibilityAndFees: {
    [EXAM_FIELDS.EXAM_ELIGIBILITY_CRITERIA]: '',
    [EXAM_FIELDS.EXAM_FEE_STRUCTURE]: [],
    [EXAM_FIELDS.IS_VALIDATION_ERROR]: true
  },
  examSyllabusAndMarks: {
    [EXAM_FIELDS.EXAM_SYLLABUS]: '',
    [EXAM_FIELDS.EXAM_PAPERS_AND_MARKS]: '',
    [EXAM_FIELDS.EXAM_MARKING_SCHEME]: '',
    [EXAM_FIELDS.IS_VALIDATION_ERROR]: true
  },
  examDescriptions: {
    [EXAM_FIELDS.EXAM_DESCRIPTION.EXAM_OVERVIEW]: '',
    [EXAM_FIELDS.EXAM_DESCRIPTION.EXAM_IMPORTANT_NOTES]: '',
    [EXAM_FIELDS.EXAM_DESCRIPTION.EXAM_IMPORTANT_DATES]: '',
    [EXAM_FIELDS.EXAM_DESCRIPTION.EXAM_APPLICATION_FORM]: '',
    [EXAM_FIELDS.EXAM_DESCRIPTION.EXAM_ADMIT_CARD]: '',
    [EXAM_FIELDS.EXAM_DESCRIPTION.EXAM_PATTERN]: '',
    [EXAM_FIELDS.EXAM_DESCRIPTION.EXAM_CONDUCTING_BODY]: '',
    [EXAM_FIELDS.EXAM_DESCRIPTION.EXAM_COUNSELLING]: '',
    [EXAM_FIELDS.EXAM_DESCRIPTION.EXAM_APPLICATION_FORM_STEP1]: '',
    [EXAM_FIELDS.EXAM_DESCRIPTION.EXAM_APPLICATION_FORM_STEP2]: '',
    [EXAM_FIELDS.EXAM_DESCRIPTION.EXAM_APPLICATION_FORM_STEP3]: '',
    [EXAM_FIELDS.EXAM_DESCRIPTION.EXAM_INTIMATION_SLIP]: '',
    [EXAM_FIELDS.EXAM_DESCRIPTION.EXAM_SESSION]: '',
    [EXAM_FIELDS.EXAM_DESCRIPTION.EXAM_CENTER]: '',
    [EXAM_FIELDS.EXAM_DESCRIPTION.EXAM_SYLLABUS]: '',
    [EXAM_FIELDS.IS_VALIDATION_ERROR]: false
  },
  examContactInfo: {
    [EXAM_FIELDS.EXAM_CONDUCTING_ADDRESS]: '',
    [EXAM_FIELDS.EXAM_SUPPORT_CONTACTS]: '',
    [EXAM_FIELDS.EXAM_WEBSITE]: '',
    [EXAM_FIELDS.EXAM_CONDUCTED_BY]: '',
    [EXAM_FIELDS.IS_VALIDATION_ERROR]: true
  },
  examPapers: {
    [EXAM_FIELDS.EXAM_MOCK_TEST_PAPERS]: [],
    [EXAM_FIELDS.EXAM_PREVIOUS_TEST_PAPERS]: [],
    [EXAM_FIELDS.IS_VALIDATION_ERROR]: true
  }
}

// Final initialState
const initialState = localData ? JSON.parse(localData) : defaultState

const checkExamBasicDetailsValidation = (state) => {
  return (
    !state[EXAM_FIELDS.EXAM_NAME]?.trim() ||
    !state[EXAM_FIELDS.EXAM_YEAR] ||
    !Array.isArray(state[EXAM_FIELDS.EXAM_CATEGORY]) ||
    state[EXAM_FIELDS.EXAM_CATEGORY].length === 0 ||
    !state[EXAM_FIELDS.EXAM_FREQUENCY]?.trim() ||
    !state[EXAM_FIELDS.EXAM_MODE]?.trim() ||
    !state[EXAM_FIELDS.EXAM_DURATION]
  )
}

const checkExamEligibilityAndFeesValidation = (state) => {
  const eligibilityCriteriaEmpty = !state[EXAM_FIELDS.EXAM_ELIGIBILITY_CRITERIA]?.trim()

  const feeStructure = state[EXAM_FIELDS.EXAM_FEE_STRUCTURE]
  const feeStructureInvalid =
    !Array.isArray(feeStructure) ||
    feeStructure.length === 0 ||
    feeStructure.some((row) => {
      // Check if any field is empty
      const hasEmptyField = Object.values(row).some((value) => value === '' || value === null || value === undefined)

      // Ensure application_fee is a number > 0
      const fee = Number(row[EXAM_FIELDS.EXAM_FEE_ROW.APPLICATION_FEE])
      const isInvalidFee = isNaN(fee) || fee <= 0

      return hasEmptyField || isInvalidFee
    })

  return eligibilityCriteriaEmpty || feeStructureInvalid
}

const checkExamSyllabusAndMarksValidation = (state) => {
  return (
    !state[EXAM_FIELDS.EXAM_SYLLABUS]?.trim() ||
    !state[EXAM_FIELDS.EXAM_PAPERS_AND_MARKS]?.trim() ||
    !state[EXAM_FIELDS.EXAM_MARKING_SCHEME]?.trim()
  )
}

const checkExamContactInfoValidation = (state) => {
  return (
    !state[EXAM_FIELDS.EXAM_CONDUCTING_ADDRESS]?.trim() ||
    !state[EXAM_FIELDS.EXAM_SUPPORT_CONTACTS]?.trim() ||
    !state[EXAM_FIELDS.EXAM_WEBSITE]?.trim() ||
    !state[EXAM_FIELDS.EXAM_CONDUCTED_BY]?.trim()
  )
}

const checkExamPapersValidation = (state) => {
  return (
    !Array.isArray(state[EXAM_FIELDS.EXAM_MOCK_TEST_PAPERS]) ||
    state[EXAM_FIELDS.EXAM_MOCK_TEST_PAPERS].length === 0 ||
    !Array.isArray(state[EXAM_FIELDS.EXAM_PREVIOUS_TEST_PAPERS]) ||
    state[EXAM_FIELDS.EXAM_PREVIOUS_TEST_PAPERS].length === 0
  )
}

const examFormSlice = createSlice({
  name: 'examForm',
  initialState,
  reducers: {
    setExamBasicDetails: (state, action) => {
      const { field, value } = action.payload
      if (field in state.examBasicDetails) {
        state.examBasicDetails[field] = value
      }
      state.examBasicDetails[EXAM_FIELDS.IS_VALIDATION_ERROR] = checkExamBasicDetailsValidation(state.examBasicDetails)
    },
    setExamImportantDates: (state, action) => {
      const { field, value } = action.payload
      if (field in state.examImportantDates) {
        state.examImportantDates[field] = value
      }
    },
    setExamEligibilityAndFees: (state, action) => {
      console.log({ action })
      const { field, value } = action.payload
      if (field in state.examEligibilityAndFees) {
        state.examEligibilityAndFees[field] = value
      }
      state.examEligibilityAndFees[EXAM_FIELDS.IS_VALIDATION_ERROR] = checkExamEligibilityAndFeesValidation(state.examEligibilityAndFees)
    },
    setExamSyllabusAndMarks: (state, action) => {
      const { field, value } = action.payload
      if (field in state.examSyllabusAndMarks) {
        state.examSyllabusAndMarks[field] = value
      }
      state.examSyllabusAndMarks[EXAM_FIELDS.IS_VALIDATION_ERROR] = checkExamSyllabusAndMarksValidation(state.examSyllabusAndMarks)
    },
    setExamDescriptions: (state, action) => {
      const { field, value } = action.payload
      if (field in state.examDescriptions) {
        state.examDescriptions[field] = value
      }
    },
    setExamContactInfo: (state, action) => {
      const { field, value } = action.payload
      if (field in state.examContactInfo) {
        state.examContactInfo[field] = value
      }
      state.examContactInfo[EXAM_FIELDS.IS_VALIDATION_ERROR] = checkExamContactInfoValidation(state.examContactInfo)
    },
    setExamPapers: (state, action) => {
      const { field, value } = action.payload
      if (field in state.examPapers) {
        state.examPapers[field] = value
      }
      state.examPapers[EXAM_FIELDS.IS_VALIDATION_ERROR] = checkExamPapersValidation(state.examPapers)
    },
    resetExamForm: initialState
  }
})

export const {
  setExamBasicDetails,
  setExamImportantDates,
  setExamEligibilityAndFees,
  setExamSyllabusAndMarks,
  setExamDescriptions,
  setExamContactInfo,
  setExamPapers,
  resetExamForm
} = examFormSlice.actions

export default examFormSlice.reducer
