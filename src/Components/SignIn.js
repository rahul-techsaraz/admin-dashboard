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

  const handleLogin=async()=>{
    const data = await fetch ('https://techsaraz.in//admission-cart/api/login/adminlogin/login.php',{
    method: 'post',
    headers:{'Content-Type':'application/json'},
    body:  JSON.stringify({
      "email":email,
      "password":pass
    })
    })
  
    console.log(data)
    const json = await data.json()
    if(json.success==1){
      localStorage.setItem('token',json.token)
      localStorage.setItem('userData',JSON.stringify(json))
      navigate('/')
    }else{
      alert(json.message);
    }
    console.log(json)
  }
  useEffect(()=>{
    if(localStorage.getItem('token')){
      navigate('/')     
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
    {/* <footer className="footer">
      <div className="container">
        <nav>
          <ul>
            <li><Link to={'/'} target="_blank">Contact Us</Link></li>
            <li><Link to={'/'} target="_blank">About Us</Link></li>
            <li><Link to={'/'}>FAQ</Link></li>
          </ul>
        </nav>
        <div className="copyright">
          ©
          ,
          <span>Designed by <Link to={'/'} target="_blank">Admission Cart</Link></span>
        </div>
      </div>
    </footer> */}
  </div>


    </>
  )
}
