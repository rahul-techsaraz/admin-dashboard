import React, { useEffect } from 'react'
import {useState} from 'react'
import logo1 from '../assets/images/imgpsh_fullsize_anim.jpeg'
import bgLogo from '../assets/images/login.jpg'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

export default function SignIn() {
  const navigate = useNavigate();
  const [email,setEmail] = useState('');
  const [pass, setPass] = useState('');

  
  
   
    

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
              <h5>SignUp</h5>
            </div>
            <div className="content"> 
            <div className="input-group">
                <input type="text"  className="form-control " placeholder="Enter Name"  />
                <span className="input-group-addon">
                  <i className="zmdi zmdi-account-circle" />
                </span>
              </div>
              <div className="input-group">
                <input type="tel"  className="form-control " placeholder="Enter Phone Number"  />
                <span className="input-group-addon">
                  <i className="zmdi zmdi-account-circle" />
                </span>
              </div>                                               
              <div className="input-group">
                <input type="email"  className="form-control " placeholder="Enter Email"  />
                <span className="input-group-addon">
                  <i className="zmdi zmdi-account-circle" />
                </span>
              </div>
              <div className="input-group">
                <input type="password" placeholder="Password" className="form-control"  />
                <span className="input-group-addon">
                  <i className="zmdi zmdi-lock" />
                </span>
              </div>
              <div className="input-group">
                <input type="password" placeholder="Confirm Password" className="form-control"  />
                <span className="input-group-addon">
                  <i className="zmdi zmdi-lock" />
                </span>
              </div>
            </div>
            <div className="footer text-center">
              <Link  className="btn btn-primary btn-round btn-lg btn-block btn-ad " >AS ADMIN</Link>
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
