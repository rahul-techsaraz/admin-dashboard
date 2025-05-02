import React, { useEffect } from 'react'
import { useState } from 'react'
import logo1 from '../assets/images/imgpsh_fullsize_anim.jpeg'
import bgLogo from '../assets/images/login.jpg'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import { constants } from '../utils/constants'
import { httpCall } from '../utils/service'
import { useDispatch, useSelector } from 'react-redux'
import { handleUserAuthentication, updateUserInfo, updateUserToken } from '../features/userSlice'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { authenticateUsers, loginUsers } from '../utils/reduxThunk/commonThunk'
import { updateError } from '../features/commonSlice'
import CustomAllert from '../utils/CommonComponents/CustomAllert'
import Loader from './Loader/Loader'

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
      <Navbar />
      {/* End Navbar */}
      <div className='page-header'>
        <div className='page-header-image' style={{ backgroundImage: `url(${bgLogo})` }} />
        <div className='container'>
          <div className='col-md-12 content-center'>
            <div className='card-plain'>
              <form className='form' method action='#' style={{ width: '350px', margin: 'auto' }}>
                <div className='header'>
                  <div className='logo-container'>
                    <img src={logo1} width={80} alt />
                  </div>
                  <h5>Log in</h5>
                </div>
                <div className='content'>
                  <div className='input-group'>
                    <input
                      type='email'
                      className='form-control '
                      placeholder='Enter Email'
                      onChange={(event) => setEmail(event.target.value)}
                    />
                    <span className='input-group-addon'>
                      <i className='zmdi zmdi-account-circle' />
                    </span>
                  </div>
                  <div className='input-group'>
                    <input
                      type='password'
                      placeholder='Password'
                      className='form-control'
                      onChange={(event) => setPass(event.target.value)}
                    />
                    <span className='input-group-addon'>
                      <i className='zmdi zmdi-lock' />
                    </span>
                  </div>
                </div>
                <div className='footer text-center'>
                  <Link className='btn btn-primary btn-round btn-lg btn-block btn-ad ' onClick={() => handleLogin()}>
                    Login
                  </Link>
                  {/* <Link to={'/'} className="btn btn-primary btn-round btn-lg btn-block btn-ad">AS AGENT</Link> */}
                </div>
                <div>
                  <h5>
                    <Link className='link text-white'>Forgot Password?</Link>
                  </h5>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
