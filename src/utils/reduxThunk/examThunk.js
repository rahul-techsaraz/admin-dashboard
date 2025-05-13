import { createApiThunk } from '../apiThunk'

export const addNewExams = createApiThunk('exam/addNewExams')
export const fetchExamDetails = createApiThunk('exam/fetchExamDetails')
export const fetchExamDetailById = createApiThunk('exam/fetchExamDetailById')
export const updateExamDetails = createApiThunk('exam/updateExamDetails')
export const fetchAllExams = createApiThunk('exam/fetchAllExams')
export const deleteExamById = createApiThunk('exam/deleteExamById')
