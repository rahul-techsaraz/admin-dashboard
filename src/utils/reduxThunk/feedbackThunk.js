import { createApiThunk } from '../apiThunk'

export const fetchAllFeedbackList = createApiThunk('feedback/fetchAllFeedbackList')

export const fetchFeedbackByEmail = createApiThunk('feedback/fetchFeedbackByEmail')

export const deleteFeedbackByEmail = createApiThunk('feedback/deleteFeedbackByEmail')
