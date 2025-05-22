import React from 'react'
import { useDispatch } from 'react-redux'
import { updateError } from '../features/commonSlice'
import { constants } from '../utils/constants'

const useValidation = () => {
    const dispatch = useDispatch()
    const validateName = (firstName, lastName) => {
        if (firstName.length === 0 || lastName.length === 0) {
            dispatch(
                updateError({
                    errorType: constants.apiResponseStatus.ERROR,
                    errorMessage: "Name Field can't be Empty",
                    flag: true
                })
            )
        } else {
            return true
        }
    }
    const validatePhone = (phone) => {
        const phoneRegex = /[0-9]{10}/
        if (!phone.match(phoneRegex)) {
            console.log(phone)
            dispatch(
                updateError({
                    errorType: constants.apiResponseStatus.ERROR,
                    errorMessage: 'Invalid Phone Number',
                    flag: true
                })
            )
            return false
        } else {
            return true
        }
    }
    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        if (!email.match(emailRegex)) {
            dispatch(
                updateError({
                    errorType: constants.apiResponseStatus.ERROR,
                    errorMessage: 'Invalid Email',
                    flag: true
                })
            )
        } else {
            return true
        }
    }
    const validatePassword = (password) => {
        if (password.length < 8) {
            dispatch(
                updateError({
                    errorType: constants.apiResponseStatus.ERROR,
                    errorMessage: 'Your password must be at least 8 characters long!',
                    flag: true
                })
            )
            return false
        } else {
            return true
        }
    }
    return { validateName, validatePhone, validateEmail, validatePassword }
}

export default useValidation