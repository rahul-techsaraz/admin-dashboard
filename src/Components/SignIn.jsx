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

export default function SignIn() {
  const { isLoading, isError, errorMessage, errorType } = useSelector((state) => state.common)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

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
                create an <span className='dashbord-login-page-left-contact-form-contact-filed-form-text-color-change'>account</span>
              </h3>
              <div className='dashbord-login-page-left-contact-form-contact-filed-gap-on'>
                <div className='dashbord-login-page-left-contact-form-contact-filed-form-all-input gmail-name'>
                  <label htmlFor='name' className='fullname'>
                    Email
                  </label>
                  <input type='text' value={email} placeholder='admin@gmail.com' onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='dashbord-login-page-left-contact-form-contact-filed-form-all-input gmail-name'>
                  <label htmlFor='name' className='fullname'>
                    Password
                  </label>
                  <input type='password' value={pass} placeholder='admin@gmail.com' onChange={(e) => setPass(e.target.value)} />
                </div>

                <button
                  style={{ cursor: 'pointer' }}
                  className='dashbord-login-page-left-contact-form-contact-filed-form-all-input-button'
                  onClick={handleLogin}
                >
                  Sign In
                </button>
                <span className='dashbord-login-page-left-contact-form-contact-filed-span-text'>Have ant account? Sign Up</span>
              </div>
            </div>
          </div>
        </div>
        <div className='dashbord-login-page-right-imagebox'></div>
      </section>
    </>
  )
}
