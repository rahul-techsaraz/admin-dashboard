import React from 'react'
import { useDispatch } from 'react-redux'
import { constants } from '../utils/constants'
import {
  fetchAllCallbackRequestList,
  fetchCallbackRequestDetailsByEmail,
  markResolvedQuery
} from '../utils/reduxThunk/callbackrequestThunk'

export const useCallbackRequest = () => {
  const dispatch = useDispatch()

  const fetchcallbackRequestList = () => {
    dispatch(
      fetchAllCallbackRequestList({
        url: constants.apiEndPoint.USER_CALL_BACK_REQUEST,
        method: constants.httpMethod.GET,
        header: constants.apiHeaders.HEADER
      })
    )
  }
  const getUserQueryDetails = (email) => {
    console.log({ email })
    dispatch(
      fetchCallbackRequestDetailsByEmail({
        url: constants.apiEndPoint.USER_CALL_BACK_REQUEST + '&email=' + email,
        method: constants.httpMethod.GET,
        header: constants.apiHeaders.HEADER
      })
    )
  }

  const queryMarkResolved = (email, id) => {
    const payload = {
      email,
      id,
      is_resolved: 1
    }
    dispatch(
      markResolvedQuery({
        url: constants.apiEndPoint.USER_CALL_BACK_REQUEST,
        method: constants.httpMethod.PUT,
        header: constants.apiHeaders.HEADER,
        payload
      })
    )
      .then(() => getUserQueryDetails(email))
      .catch((err) => {
        console.error(err)
      })
  }

  return { fetchcallbackRequestList, getUserQueryDetails, queryMarkResolved }
}
