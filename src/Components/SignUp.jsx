import React, { useEffect } from 'react'
import { useState } from 'react'
import logo1 from '../assets/images/imgpsh_fullsize_anim.jpeg'
import bgLogo from '../assets/images/login.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { constants } from '../utils/constants'
import { httpCall } from '../utils/service'
import Navbar from './Navbar'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import { handleUserAuthentication } from '../features/userSlice'
import Loader from './Loader/Loader'
import CustomAllert from '../utils/CommonComponents/CustomAllert'
import { updateError } from '../features/commonSlice'

export default function SignIn() {
  const { isLoading, isError, errorMessage, errorType } = useSelector((state) => state.common)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [cPass, setCpass] = useState('')
  const [aname, setAname] = useState('')
  const [iname, setIname] = useState('')
  const [gender, setGender] = useState('')
  const [isValidEmail, setValidEmail] = useState(false)

  const validateName = () => {
    if (fname.length === 0 || lname.length === 0) {
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

  const validatePhone = () => {
    const phoneRegex = /[0-9]{10}/
    if (!phone.match(phoneRegex)) {
      dispatch(
        updateError({
          errorType: constants.apiResponseStatus.ERROR,
          errorMessage: 'Invalid Phone Number',
          flag: true
        })
      )
    } else {
      return true
    }
  }

  const validateEmail = () => {
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

  const validatePass = () => {
    if (pass.length < 8) {
      dispatch(
        updateError({
          errorType: constants.apiResponseStatus.ERROR,
          errorMessage: 'Your password must be at least 8 characters long!',
          flag: true
        })
      )
    } else if (pass !== cPass) {
      dispatch(
        updateError({
          errorType: constants.apiResponseStatus.ERROR,
          errorMessage: 'Password Missmatch',
          flag: true
        })
      )
    } else {
      return true
    }
  }

  const handleRegister = async () => {
    if (validateName() && validatePhone() && validateEmail() && validatePass()) {
      const payload = {
        first_name: fname,
        last_name: lname,
        phone_number: phone,
        email: email,
        password: pass,
        account_name: aname,
        institute_name: iname,
        designation: 'Admin',
        user_role: '',
        user_status: 'inactive',
        approvedBy: ''
      }
      const json = await httpCall(constants.apiEndPoint.ADMIN_REGISTER, constants.apiHeaders.HEADER, constants.httpMethod.POST, payload)
      if (json.success == 1) {
        dispatch(
          updateError({
            errorType: constants.apiResponseStatus.SUCCESS,
            errorMessage: json.message,
            flag: true
          })
        )
        navigate('/sign-in')
      } else {
        dispatch(
          updateError({
            errorType: constants.apiResponseStatus.ERROR,
            errorMessage: json.message,
            flag: true
          })
        )
      }
    }
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const headers = { ...constants.apiHeaders.HEADER, Authorization: localStorage.getItem('token') }
      httpCall(constants.apiEndPoint.AUTHENTICATE_USER, headers, constants.httpMethod.GET).then((data) => {
        if (data.success === 1) {
          dispatch(handleUserAuthentication({ flag: false }))
        }
      })
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
              <form className='form ' method action='#' style={{ width: '450px', margin: 'auto' }}>
                <div className='header'>
                  <div className='logo-container'>
                    <img src={logo1} width={80} alt />
                  </div>
                  <h5>SignUp</h5>
                </div>
                <div className='content'>
                  <div className='row g-3 mb-3'>
                    <div className='col-md-6 '>
                      <input
                        type='text'
                        className='form-control py-2'
                        placeholder='Enter First Name'
                        onChange={(event) => setFname(event.target.value)}
                      />
                    </div>
                    <div className='col-md-6'>
                      <input
                        type='text'
                        className='form-control py-2'
                        placeholder='Enter Last Name'
                        onChange={(event) => setLname(event.target.value)}
                      />
                    </div>
                  </div>
                  <div className='row  mb-3'>
                    <div className='col-md-6 '>
                      <input
                        type='tel'
                        className='form-control py-2 '
                        placeholder='Enter Phone Number'
                        onChange={(event) => setPhone(event.target.value)}
                      />
                    </div>
                    <div className='col-md-6'>
                      <input
                        type='email'
                        className='form-control py-2'
                        placeholder='Enter Email'
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </div>
                  </div>
                  <div className='row  mb-3'>
                    <div className='col-md-6'>
                      <div className='d-flex'>
                        <input
                          type='password'
                          className='form-control py-2 '
                          placeholder='Password'
                          onChange={(event) => setPass(event.target.value)}
                        />
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <input
                        type='password'
                        className='form-control py-2'
                        placeholder='Confirm Password'
                        onChange={(event) => setCpass(event.target.value)}
                      />
                    </div>
                  </div>
                  <div className='row  mb-3'>
                    <div className='col-md-6'>
                      <input
                        type='text'
                        placeholder='account name'
                        className='form-control py-2'
                        onChange={(event) => setAname(event.target.value)}
                      />
                    </div>
                    <div className='col-md-6'>
                      <input
                        type='text'
                        placeholder='institute name'
                        className='form-control py-2'
                        onChange={(event) => setIname(event.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className='footer text-center'>
                  {/* <Link  className="btn btn-primary btn-round btn-lg btn-block btn-ad " >AS ADMIN</Link> */}
                  <Link className='btn btn-primary btn-round btn-lg btn-block btn-ad' onClick={() => handleRegister()}>
                    Submit
                  </Link>
                </div>
                <div>{/* <h5><Link  className="link text-white">Forgot Password?</Link></h5> */}</div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
