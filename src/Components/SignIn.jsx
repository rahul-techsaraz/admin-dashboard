import React, { useEffect } from 'react'
import { useState } from 'react'
import '../style/signin.css'
import logo from '../assets/images/logo.png'
import eductionBanner2 from '../assets/images/sign-in-education2.png'

import Navbar from './Navbar'
import { constants } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { handleUserAuthentication, updateUserInfo, updateUserToken } from '../features/userSlice'
import 'react-toastify/dist/ReactToastify.css'
import { authenticateUsers, loginUsers } from '../utils/reduxThunk/commonThunk'
import { updateError } from '../features/commonSlice'
import CustomAllert from '../utils/CommonComponents/CustomAllert'
import Loader from './Loader/Loader'
import { useNavigate } from 'react-router-dom'
import usePasswordManage from '../hooks/usePasswordManage'
import OTPModal from '../modal/ForgotPasswordModal'

export default function SignIn() {
  const { isLoading, isError, errorMessage, errorType } = useSelector((state) => state.common)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { generate4DigitOTP, manageFoegotPassword, sendEmail } = usePasswordManage()
  const [isForgotPassword, setForgotPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [otp4Digit, set4digitOtp] = useState('')
  const [openForgotPasswordModal, setForgotModal] = useState(false)

  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const handleLogin = async () => {
    try {
      const payload = {
        email: email,
        password: pass
      }
      const response = await dispatch(
        loginUsers({
          url: constants.apiEndPoint.USER_LOGIN,
          header: constants.apiHeaders.HEADER,
          method: constants.httpMethod.POST,
          payload: payload
        })
      )
      if (response.payload.success === 1) {
        console.log(response.payload)
        dispatch(handleUserAuthentication({ flag: true }))
        localStorage.setItem('token', response.payload.token)
        dispatch(updateUserToken({ token: response.payload.token }))
        localStorage.setItem('userData', JSON.stringify(response.payload))
        dispatch(updateUserInfo({ userInfo: response.payload }))
        dispatch(
          updateError({
            errorType: constants.apiResponseStatus.SUCCESS,
            errorMessage: response.payload.message,
            flag: true
          })
        )
        navigate('/')
      } else {
        dispatch(
          updateError({
            errorType: constants.apiResponseStatus.ERROR,
            errorMessage: response.payload.message,
            flag: true
          })
        )
        dispatch(handleUserAuthentication({ flag: false }))
      }
    } catch (error) {
      dispatch(
        updateError({
          errorType: constants.apiResponseStatus.ERROR,
          errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
          flag: true
        })
      )
    }
  }
  //   const handleForgotPassword = () => {
  //     const validateEmail = isValidEmail(email)
  //     if (!validateEmail) {
  //       dispatch(
  //         updateError({
  //           errorType: constants.apiResponseStatus.WARNING,
  //           errorMessage: 'Inavlid Email, Please enter the valid email asscoiated with your admissionkart account',
  //           flag: true
  //         })
  //       )
  //       return
  //     }
  //     // Generate 4 digit password and save into local state
  //     set4digitOtp(generate4DigitOTP())
  //     //Prepare mail payload
  //     const subject = 'Use This OTP to Complete Your Action'

  //     const otpEmailTemplate = `
  // <!DOCTYPE html>
  // <html>
  // <head>
  //   <meta charset="UTF-8" />
  //   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  //   <title>Your OTP Code</title>
  //   <style>
  //     body {
  //       font-family: Arial, sans-serif;
  //       background-color: #f4f6f8;
  //       padding: 20px;
  //       color: #333;
  //     }
  //     .container {
  //       max-width: 500px;
  //       margin: auto;
  //       background-color: #ffffff;
  //       border-radius: 8px;
  //       padding: 30px;
  //       box-shadow: 0 0 10px rgba(0,0,0,0.05);
  //       text-align: center;
  //     }
  //     .otp {
  //       font-size: 32px;
  //       font-weight: bold;
  //       color: #2c3e50;
  //       letter-spacing: 4px;
  //       margin: 20px 0;
  //     }
  //     .footer {
  //       font-size: 12px;
  //       color: #777;
  //       margin-top: 30px;
  //     }
  //   </style>
  // </head>
  // <body>
  //   <div class="container">
  //     <h2>🔐 Your One-Time Password (OTP)</h2>
  //     <p>Use the following OTP to complete your verification. This code is valid for 10 minutes.</p>
  //     <div class="otp">${otp4Digit}</div>
  //     <p>Please do not share this code with anyone.</p>
  //     <div class="footer">
  //       If you did not request this, please ignore this email.
  //     </div>
  //   </div>
  // </body>
  // </html>
  // `
  //     const fromEmail = 'rahul.tech.mastery@gmail.com'
  //     const fromEmailName = 'AdmissionKartTeam'
  //     const mailPayload = {
  //       toEmail: email,
  //       subject,
  //       fromEmail,
  //       htmlTemplate: otpEmailTemplate,
  //       fromEmailName
  //     }
  //     Promise.all([manageFoegotPassword(email, otp4Digit), sendEmail(mailPayload)])
  //       .then(([forgotPasswordResult, sendEmailResult]) => {
  //         console.log(forgotPasswordResult)
  //         console.log(sendEmailResult)
  //         if (forgotPasswordResult?.payload?.success === 1 && sendEmailResult?.payload?.data?.success) {
  //           setForgotModal(true)
  //         }
  //       })
  //       .catch((err) => console.error(err))
  //   }
  const handleForgotPassword = async () => {
    if (!isValidEmail(email)) {
      dispatch(
        updateError({
          errorType: constants.apiResponseStatus.WARNING,
          errorMessage: 'Invalid Email. Please enter the email associated with your AdmissionKart account.',
          flag: true
        })
      )
      return
    }

    // Ensure OTP is a non-zero 4-digit number
    let otp = generate4DigitOTP()
    while (otp === '0000') {
      otp = generate4DigitOTP()
    }

    set4digitOtp(otp) // Save OTP for modal

    const subject = 'Use This OTP to Complete Your Action'
    const fromEmail = 'rahul.tech.mastery@gmail.com'
    const fromEmailName = 'AdmissionKartTeam'

    const otpEmailTemplate = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="UTF-8" /><title>Your OTP Code</title></head>
    <body style="font-family:Arial,sans-serif;background:#f4f6f8;padding:20px;">
      <div style="max-width:500px;margin:auto;background:#fff;padding:30px;text-align:center;border-radius:8px;">
        <h2>🔐 Your OTP Code</h2>
        <p>This code is valid for 10 minutes.</p>
        <div style="font-size:32px;font-weight:bold;color:#2c3e50;margin:20px 0;">${otp}</div>
        <p>Please do not share this with anyone.</p>
        <div style="font-size:12px;color:#777;margin-top:30px;">If you did not request this, ignore the email.</div>
      </div>
    </body>
    </html>
  `

    const mailPayload = {
      toEmail: email,
      subject,
      fromEmail,
      htmlTemplate: otpEmailTemplate,
      fromEmailName
    }

    try {
      const response = await manageFoegotPassword(email)
      if (response.payload.success === 1) {
        dispatch(
          updateError({
            errorType: constants.apiResponseStatus.ERROR,
            errorMessage: 'OTP send to Email Sucessfully',
            flag: true
          })
        )
        setForgotModal(true)
      } else {
        dispatch(
          updateError({
            errorType: constants.apiResponseStatus.ERROR,
            errorMessage: 'Failed to send OTP or reset password. Please try again.',
            flag: true
          })
        )
      }
    } catch (err) {
      console.error('Forgot password error:', err)
      dispatch(
        updateError({
          errorType: constants.apiResponseStatus.ERROR,
          errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
          flag: true
        })
      )
    }
  }

  const authenticateUser = async (headers) => {
    const response = await dispatch(
      authenticateUsers({
        url: constants.apiEndPoint.AUTHENTICATE_USER,
        header: headers,
        method: constants.httpMethod.GET
      })
    )
    if (response.payload.success === 1) {
      dispatch(handleUserAuthentication({ flag: true }))
      navigate('/')
    } else {
      dispatch(handleUserAuthentication({ flag: false }))
    }
  }
  useEffect(() => {
    if (localStorage.getItem('token')) {
      const headers = { ...constants.apiHeaders.HEADER, Authorization: localStorage.getItem('token') }
      authenticateUser(headers)
    }
  }, [])

  return (
    <>
      {isLoading && <Loader />}
      {isError && <CustomAllert isError={isError} errorMessage={errorMessage} errorType={errorType} />}
      {openForgotPasswordModal && (
        <OTPModal
          onClose={(flag) => {
            setForgotModal(flag)
            setForgotPassword(flag)
          }}
          email={email}
        />
      )}

      {/* Navbar */}
      {/* <Navbar /> */}
      {/* End Navbar */}
      <section className='dashbord-login-page'>
        <div className='dashbord-login-page-left-contact-form'>
          <div className='dashbord-login-page-left-contact-form-logo-div'>
            <img src={logo} alt='' />
          </div>
          <div className='dashbord-login-page-left-contact-form-contact-filed'>
            <div className='dashbord-login-page-left-contact-form-contact-filed-form'>
              <h3>
                welcome to <span className='dashbord-login-page-left-contact-form-contact-filed-form-text-color-change'>admissionkart</span>
              </h3>
              <div className='dashbord-login-page-left-contact-form-contact-filed-gap-on'>
                <div className='dashbord-login-page-left-contact-form-contact-filed-form-all-input gmail-name'>
                  <label htmlFor='name' className='fullname'>
                    Email
                  </label>
                  <input type='text' value={email} placeholder='admin@gmail.com' onChange={(e) => setEmail(e.target.value)} />
                </div>
                {!isForgotPassword && (
                  <div className='dashbord-login-page-left-contact-form-contact-filed-form-all-input gmail-name'>
                    <label htmlFor='name' className='fullname'>
                      Password
                    </label>
                    <input type='password' value={pass} placeholder='admin@gmail.com' onChange={(e) => setPass(e.target.value)} />
                  </div>
                )}

                {!isForgotPassword ? (
                  <button
                    style={{ cursor: 'pointer' }}
                    className='dashbord-login-page-left-contact-form-contact-filed-form-all-input-button'
                    onClick={handleLogin}
                  >
                    Sign In
                  </button>
                ) : (
                  <button
                    style={{ cursor: 'pointer' }}
                    className='dashbord-login-page-left-contact-form-contact-filed-form-all-input-button'
                    onClick={handleForgotPassword}
                  >
                    Recover Password
                  </button>
                )}

                <span
                  className='dashbord-login-page-left-contact-form-contact-filed-span-text'
                  style={{ cursor: 'pointer' }}
                  onClick={() => setForgotPassword(!isForgotPassword)}
                >
                  {isForgotPassword ? 'Already have account? SignIn' : 'Forgot Password?'}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className='dashbord-login-page-right-imagebox'></div>
      </section>
    </>
  )
}
