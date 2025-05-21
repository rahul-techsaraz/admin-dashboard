import React from 'react'
import { useDispatch } from 'react-redux'
import { forgotPassword, sendMail, updatePassword } from '../utils/reduxThunk/commonThunk'
import { constants } from '../utils/constants'

const usePasswordManage = () => {
  const dispatch = useDispatch()
  const manageFoegotPassword = (email, otp) => {
    return dispatch(
      forgotPassword({
        url: constants.apiEndPoint.FORGOT_PASSWORD,
        header: { ...constants.apiHeaders.HEADER },
        method: constants.httpMethod.POST,
        payload: { email, otp }
      })
    )
  }
  function objectToFormData(obj) {
    const formData = new FormData()
    for (const key in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(key)) {
        formData.append(key, obj[key])
      }
    }
    return formData
  }
  const sendEmail = (payload) => {
    console.log({ payload })
    // Assuming payload is an object with key-value pairs
    const formDataPayload = objectToFormData(payload)
    console.log({ formDataPayload })

    return dispatch(
      sendMail({
        url: constants.apiEndPoint.SENDMAIL,
        header: { Authorization: '865913f6692726f102d2715908fd0870bbbbd06775805c8396853cd348aa6108' },
        method: constants.httpMethod.POST,
        payload: formDataPayload
      })
    )
  }

  const generate4DigitOTP = () => {
    return Math.floor(1000 + Math.random() * 9000).toString()
  }
  const changePassword = (payload) => {
    return dispatch(
      updatePassword({
        url: constants.apiEndPoint.CHANGE_PASSWORD,
        header: { ...constants.apiHeaders.HEADER },
        method: constants.httpMethod.POST,
        payload
      })
    )
  }
  return { manageFoegotPassword, sendEmail, generate4DigitOTP, changePassword }
}

export default usePasswordManage
