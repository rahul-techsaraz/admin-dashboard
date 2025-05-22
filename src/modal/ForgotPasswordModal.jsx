/* eslint-disable react/prop-types */
import React, { useRef, useState } from 'react'
import './forgotmodal.css'
import { useDispatch } from 'react-redux'
import { updateError } from '../features/commonSlice'
import { constants } from '../utils/constants'
import usePasswordManage from '../hooks/usePasswordManage'

const OTPModal = ({ onClose, email }) => {
  const dispatch = useDispatch()
  const { changePassword } = usePasswordManage()

  const OTP_LENGTH = 4
  const inputRefs = useRef([])
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''))
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, '')
    if (!value) return

    const newOtp = [...otp]
    newOtp[index] = value[0] // Only take first digit
    setOtp(newOtp)

    if (index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('Text').replace(/\D/g, '')
    const newOtp = [...otp]

    for (let i = 0; i < OTP_LENGTH; i++) {
      newOtp[i] = pasted[i] || ''
      if (inputRefs.current[i]) {
        inputRefs.current[i].value = pasted[i] || ''
      }
    }

    setOtp(newOtp)

    const lastFilled = Math.min(pasted.length, OTP_LENGTH) - 1
    inputRefs.current[lastFilled]?.focus()
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      e.preventDefault()
      const newOtp = [...otp]

      if (otp[index]) {
        newOtp[index] = ''
        setOtp(newOtp)
        inputRefs.current[index].value = ''
      } else if (index > 0) {
        inputRefs.current[index - 1].focus()
        newOtp[index - 1] = ''
        setOtp(newOtp)
        inputRefs.current[index - 1].value = ''
      }
    }
  }

  const handleVerify = () => {
    const enteredOtp = otp.join('')
    console.log('Entered OTP:', enteredOtp)
    // Add your verify logic here

    if (newPassword !== confirmPassword) {
      dispatch(
        updateError({
          errorType: constants.apiResponseStatus.WARNING,
          errorMessage: 'Password and confirm password is not same',
          flag: true
        })
      )
      return
    }
    if (newPassword.length < 8) {
      dispatch(
        updateError({
          errorType: constants.apiResponseStatus.WARNING,
          errorMessage: 'Please use strong password and length should be more than 8 ',
          flag: true
        })
      )
      return
    }

    //Call API to update Password
    changePassword({ email, password: newPassword, otp: enteredOtp })
      .then((res) => {
        if (res.payload.success === 1) {
          dispatch(
            updateError({
              errorType: constants.apiResponseStatus.SUCCESS,
              errorMessage: 'Your Password update successfully',
              flag: true
            })
          )
          onClose(false)
          return
        } else {
          throw new Error(res?.payload?.message ?? 'Something went wrong please try again')
        }
      })
      .catch((err) => console.error(err))
  }

  return (
    <section className='otp-model-main'>
      <div className='otp-model-form-filed'>
        <div className='otp-model-cross-button' onClick={onClose}>
          <i className='fa-solid fa-xmark'></i>
        </div>
        <div className='otp-model-form-filed-mail-icon-box'>
          <div className='otp-model-form-filed-mail-icon-box-icon'>
            <i className='fa-solid fa-envelope'></i>
          </div>
          <div className='otp-model-form-filed-mail-icon-box-text'>
            <h3>Check your email</h3>
            <p>We sent a code to {email}</p>
          </div>
        </div>

        <div className='confirm-password-input-filed'>
          <input
            type='text'
            value={newPassword}
            placeholder='New Password'
            className='new-password'
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type='text'
            placeholder='Confirm Password'
            className='confirm-password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className='otp-code-main-box' onPaste={handlePaste}>
          {otp.map((digit, i) => (
            <input
              key={i}
              type='text'
              maxLength={1}
              className='otp-code-main-box-input'
              ref={(el) => (inputRefs.current[i] = el)}
              value={otp[i]}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              inputMode='numeric'
              autoComplete='one-time-code'
            />
          ))}
        </div>

        <div className='otp-get-code-text'>
          Didn’t get a code? <span>click to send</span>
        </div>

        <div className='otp-cancle-verify-button'>
          <button className='otp-cancle-verify-button-on otp-cancle-verify-button-on-cancle' onClick={onClose}>
            Cancel
          </button>
          <button className='otp-cancle-verify-button-on otp-cancle-verify-button-on-verify' onClick={handleVerify}>
            Verify
          </button>
        </div>
      </div>
    </section>
  )
}

export default OTPModal
