import { createSlice } from "@reduxjs/toolkit";
import { EXAM_FIELDS } from "../Constants/redux/courseFieldName";

const localData = localStorage.getItem('examFormData')

export const defaultState = {
    examInfo: {
        [EXAM_FIELDS.EXAM_NAME]: '',
        [EXAM_FIELDS.APPLICATION_START_DATES]: '',
        [EXAM_FIELDS.APPLICATION_END_DATES]: '',
        [EXAM_FIELDS.EXAM_SRART_DATES]: '',
        [EXAM_FIELDS.EXAM_END_DATES]: '',
        [EXAM_FIELDS.EXAM_YEAR]: '',
        [EXAM_FIELDS.CATEGORY_NAME]: '',
        [EXAM_FIELDS.IS_VALIDATION_ERROR]: true
    },
    examDescriptionOptions: {
        [EXAM_FIELDS.EXAM_DESCRIPTION]: '',
        [EXAM_FIELDS.EXAM_CONDUCTING_BODY_DISCRIPTION]: '',
        [EXAM_FIELDS.EXAM_IMPORTANT_DATES_DESCRIPTION]: '',
        [EXAM_FIELDS.EXAM_SESSION_DESCRIPTION]: '',
        [EXAM_FIELDS.EXAM_COUNSELLING_DESCRIPTION]: '',
        [EXAM_FIELDS.EXAM_APPLICATION_FORM_DESCRIPTION]: '',
        [EXAM_FIELDS.APPLICATION_FORM_STEP1_DESCRIPTION]: '',
        [EXAM_FIELDS.APPLICATION_FORM_STEP2_DESCRIPTION]: '',
        [EXAM_FIELDS.APPLICATION_FORM_STEP3_DESCRIPTION]: '',
        [EXAM_FIELDS.EXAM_INTIMATION_SLIP_DESCRIPTION]: '',
        [EXAM_FIELDS.EXAM_ADMIT_CARD_DESCRIPTION]: '',
        [EXAM_FIELDS.EXAM_CENTER_DESCRIPTION]: '',
        [EXAM_FIELDS.EXAM_PATTERN_DESCRIPTION]: '',
        [EXAM_FIELDS.EXAM_SYLLABUS_DESCRIPTION]: '',
        [EXAM_FIELDS.IS_VALIDATION_ERROR]: true
    },
    examHighlights: {
        [EXAM_FIELDS.CONDUCTING_BODY]: '',
        [EXAM_FIELDS.EXAM_LEVEL]: '',
        [EXAM_FIELDS.EXAM_FREQUENCY]: '',
        [EXAM_FIELDS.EXAM_MODE]: '',
        [EXAM_FIELDS.EXAM_DURATION]: '',
        [EXAM_FIELDS.PAPER_MARKS]: '',
        [EXAM_FIELDS.MARKING_SCHEME]: '',
        [EXAM_FIELDS.IS_VALIDATION_ERROR]: true
    },
    examConfig: {
        [EXAM_FIELDS.NO_SESSION]: 1,
        [EXAM_FIELDS.SESSION_NAME]: '',
        [EXAM_FIELDS.IS_COUNSELLING_ANNOUNCED]: '',
        [EXAM_FIELDS.COUNSELLING_DATE]: '',
        [EXAM_FIELDS.EXAM_CONDUCTING_ADDRESS]: '',
        [EXAM_FIELDS.EXAM_CONDUCTING_EMAIL]: '',
        [EXAM_FIELDS.IS_VALIDATION_ERROR]: true
    }
}

// Final initialState
const initialState = localData ? JSON.parse(localData) : defaultState

const checkExamInfoValidation = (state) => {
    return (
        !state[EXAM_FIELDS.EXAM_NAME] ||
        !state[EXAM_FIELDS.APPLICATION_START_DATES] ||
        !state[EXAM_FIELDS.APPLICATION_END_DATES] ||
        !state[EXAM_FIELDS.EXAM_SRART_DATES] ||
        !state[EXAM_FIELDS.EXAM_END_DATES] ||
        !state[EXAM_FIELDS.EXAM_YEAR] ||
        !state[EXAM_FIELDS.CATEGORY_NAME]
    )
}

const checkExamDescriptionOptionsValidation = (state) => {
    return (
        !state[EXAM_FIELDS.EXAM_DESCRIPTION] ||
        !state[EXAM_FIELDS.EXAM_CONDUCTING_BODY_DISCRIPTION] ||
        !state[EXAM_FIELDS.EXAM_IMPORTANT_DATES_DESCRIPTION] ||
        !state[EXAM_FIELDS.EXAM_SESSION_DESCRIPTION] ||
        !state[EXAM_FIELDS.EXAM_COUNSELLING_DESCRIPTION] ||
        !state[EXAM_FIELDS.EXAM_APPLICATION_FORM_DESCRIPTION] ||
        !state[EXAM_FIELDS.APPLICATION_FORM_STEP1_DESCRIPTION] ||
        !state[EXAM_FIELDS.APPLICATION_FORM_STEP2_DESCRIPTION] ||
        !state[EXAM_FIELDS.APPLICATION_FORM_STEP3_DESCRIPTION] ||
        !state[EXAM_FIELDS.EXAM_INTIMATION_SLIP_DESCRIPTION] ||
        !state[EXAM_FIELDS.EXAM_ADMIT_CARD_DESCRIPTION] ||
        !state[EXAM_FIELDS.EXAM_CENTER_DESCRIPTION] ||
        !state[EXAM_FIELDS.EXAM_PATTERN_DESCRIPTION] ||
        !state[EXAM_FIELDS.EXAM_SYLLABUS_DESCRIPTION]
    )
}

const checkExamHighlightsValidation = (state) => {
    return (
        !state[EXAM_FIELDS.CONDUCTING_BODY] ||
        !state[EXAM_FIELDS.EXAM_LEVEL] ||
        !state[EXAM_FIELDS.EXAM_FREQUENCY] ||
        !state[EXAM_FIELDS.EXAM_MODE] ||
        !state[EXAM_FIELDS.EXAM_DURATION] ||
        !state[EXAM_FIELDS.PAPER_MARKS] ||
        !state[EXAM_FIELDS.MARKING_SCHEME]
    )
}

const checkExamConfigValidation = (state) => {
    return (
        !state[EXAM_FIELDS.NO_SESSION] ||
        !state[EXAM_FIELDS.SESSION_NAME] ||
        !state[EXAM_FIELDS.IS_COUNSELLING_ANNOUNCED] ||
        !state[EXAM_FIELDS.COUNSELLING_DATE] ||
        !state[EXAM_FIELDS.EXAM_CONDUCTING_ADDRESS] ||
        !state[EXAM_FIELDS.EXAM_CONDUCTING_EMAIL]
    )
}

const examFormSlice = createSlice({
    name: 'examForm',
    initialState,
    reducers: {
        setExamInfoField: (state, action) => {
            const { field, value } = action.payload
            if (field in state.examInfo) {
                state.examInfo[field] = value
            }
            state.examInfo[EXAM_FIELDS.IS_VALIDATION_ERROR] = checkExamInfoValidation(state.examInfo)
        },
        setExamDescriptionOptionsField: (state, action) => {
            const { field, value } = action.payload
            if (field in state.examDescriptionOptions) {
                state.examDescriptionOptions[field] = value
            }
            state.examDescriptionOptions[EXAM_FIELDS.IS_VALIDATION_ERROR] = checkExamDescriptionOptionsValidation(state.examDescriptionOptions)
        },
        setExamHighlightsField: (state, action) => {
            const { field, value } = action.payload
            if (field in state.examHighlights) {
                state.examHighlights[field] = value
            }
            state.examHighlights[EXAM_FIELDS.IS_VALIDATION_ERROR] = checkExamHighlightsValidation(state.examHighlights)
        },
        setExamConfigField: (state, action) => {
            const { field, value } = action.payload
            if (field in state.examConfig) {
                state.examConfig[field] = value
            }
            state.examConfig[EXAM_FIELDS.IS_VALIDATION_ERROR] = checkExamConfigValidation(state.examConfig)
        },
    }
})

export const {
    setExamInfoField,
    setExamDescriptionOptionsField,
    setExamHighlightsField,
    setExamConfigField,
} = examFormSlice.actions

export default examFormSlice.reducer