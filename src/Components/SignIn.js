import React, { useEffect } from 'react'
import {useState} from 'react'
import logo1 from '../assets/images/imgpsh_fullsize_anim.jpeg'
import bgLogo from '../assets/images/login.jpg'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import { constants } from '../utils/constants'
import { httpCall } from '../utils/service'
import { useDispatch } from 'react-redux'
import { handleUserAuthentication, updateUserInfo, updateUserToken } from '../features/userSlice'

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email,setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleLogin = async () => {
    const payload = {
      "email":email,
      "password":pass
    }
    const json = await httpCall(constants.apiEndPoint.USER_LOGIN, constants.apiHeaders.HEADER, constants.httpMethod.POST, payload);
    if (json.success === 1) {
      dispatch(handleUserAuthentication({ flag: true }))
      dispatch(updateUserToken({ token: json.token }))
      dispatch(updateUserInfo({userInfo:json}))
      localStorage.setItem('token',json.token)
      localStorage.setItem('userData',JSON.stringify(json))
      navigate('/')
    } else {
      dispatch(handleUserAuthentication({ flag: false }))
      alert(json.message);
    }
  }
  useEffect(()=>{
    if (localStorage.getItem('token')) {
      const headers = {...constants.apiHeaders.HEADER,"Authorization":localStorage.getItem('token')}
      httpCall(constants.apiEndPoint.AUTHENTICATE_USER, headers, constants.httpMethod.GET)
        .then(data => {
         if (data.success === 1) {
        dispatch(handleUserAuthentication({ flag: true }))
        navigate('/')
        
      } else {
        dispatch(handleUserAuthentication({ flag: false }))
      }
      })

     
    }
  },[])
    

  return (
    <>

  {/* Navbar */}
  <Navbar/>
  {/* End Navbar */}
  <div className="page-header">
    <div className="page-header-image" style={{backgroundImage: `url(${bgLogo})` }} />
    <div className="container">
      <div className="col-md-12 content-center">
        <div className="card-plain">
          <form className="form" method action="#" style={{width:"350px",margin:"auto"}}>
            <div className="header">
              <div className="logo-container">
                <img src={logo1} width={80} alt />
              </div>
              <h5>Log in</h5>
            </div>
            <div className="content">                                                
              <div className="input-group">
                <input type="email"  className="form-control " placeholder="Enter Email" onChange={(event)=>setEmail(event.target.value)} />
                <span className="input-group-addon">
                  <i className="zmdi zmdi-account-circle" />
                </span>
              </div>
              <div className="input-group">
                <input type="password" placeholder="Password" className="form-control" onChange={(event)=>setPass(event.target.value)} />
                <span className="input-group-addon">
                  <i className="zmdi zmdi-lock" />
                </span>
              </div>
            </div>
            <div className="footer text-center">
              <Link  className="btn btn-primary btn-round btn-lg btn-block btn-ad " onClick={()=>handleLogin()}>AS ADMIN</Link>
              <Link to={'/'} className="btn btn-primary btn-round btn-lg btn-block btn-ad">AS AGENT</Link>
            </div>
            <div>
            <h5><Link  className="link text-white">Forgot Password?</Link></h5>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>


    </>
  )
}
