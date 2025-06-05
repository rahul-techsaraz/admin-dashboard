import { createApiThunk } from '../apiThunk'

export const fetchAllCallbackRequestList = createApiThunk('callbackrequest/fetchAllCallbackRequestList')
export const fetchCallbackRequestDetailsByEmail = createApiThunk('callbackrequest/fetchCallbackRequestDetailsByEmail')
export const markResolvedQuery = createApiThunk('callbackrequest/markResolvedQuery')
