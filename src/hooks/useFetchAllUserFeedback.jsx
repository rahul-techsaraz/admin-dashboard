import React from 'react'
import { useDispatch } from 'react-redux'
import { fetchAllFeedbackList, fetchFeedbackByEmail } from '../utils/reduxThunk/feedbackThunk'
import { constants } from '../utils/constants'

export const useFetchAllUserFeedback = () => {
  const dispatch = useDispatch()

  const fetchAllFeedback = () => {
    dispatch(
      fetchAllFeedbackList({
        url: constants.apiEndPoint.USER_FEADBACK_RESPONSE,
        method: constants.httpMethod.GET,
        header: constants.apiHeaders.HEADER
      })
    )
  }

  const fetchFeedbackBymail = (email) => {
    dispatch(
      fetchFeedbackByEmail({
        url: `${constants.apiEndPoint.USER_FEADBACK_RESPONSE}&email=${email}`,
        method: constants.httpMethod.GET,
        header: constants.apiHeaders.HEADER
      })
    )
  }
  return { fetchAllFeedback, fetchFeedbackBymail }
}
