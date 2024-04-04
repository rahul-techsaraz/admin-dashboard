import React, { useEffect } from 'react'
import {useState} from 'react'
import logo1 from '../assets/images/imgpsh_fullsize_anim.jpeg'
import bgLogo from '../assets/images/login.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { constants } from '../utils/constants'
import { httpCall } from '../utils/service'
import Navbar from './Navbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux'
import { handleUserAuthentication } from '../features/userSlice'

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fname,setFname] = useState('');
  const [lname,setLname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [cPass, setCpass] = useState('');
  const [aname, setAname] = useState('');
  const [iname, setIname] = useState('');
  const [gender, setGender] = useState('');
  const [isValidEmail, setValidEmail] = useState(false);
  

  // useEffect(()=>{
  //   if(email!== ""){
  //     if(validateEmail()){
  //       setValidEmail(true)
  //     }else{
  //       setValidEmail(false)
  //     }
  //   }
  
  // },[email])

const validateName =()=>{
  if(fname.length === 0 || lname.length === 0){
    toast.error("Name Field can't be Empty")   
  }else{
    return true
  }
}  

const validatePhone = ()=>{
  const phoneRegex = /[0-9]{10}/;
  if(!phone.match(phoneRegex)){
    // alert("Invalid Phone Number ")
    toast.error("Invalid Phone Number")
  }else{
    return true
  }
}


const validateEmail = ()=>{
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  if(!email.match(emailRegex)){
    toast.success("Invalid Email")
  }else{
    return true;
  }

}

const validatePass=()=>{
  if(pass.length<8){
    toast.error("Your password must be at least 8 characters long!")
  }else if(pass!==cPass){
    toast.error("Password Missmatch")
  }else{
    return true
  }
}


  
   const handleRegister = async () => {
    if(validateName() && validatePhone() && validateEmail() && validatePass()){
    const payload = {
    "first_name":fname,
    "last_name": lname,
    "phone_number":phone,
    "email": email,
    "password":pass,
    "account_name":aname,
    "institute_name":iname,
    "gender":gender,
    "designation":"Admin",
    "user_role":"",
    "user_status":"inactive",
    "approvedBy":""

   
    }
    const json = await httpCall(constants.apiEndPoint.ADMIN_REGISTER, constants.apiHeaders.HEADER, constants.httpMethod.POST, payload);
    if(json.success==1){
      navigate('/sign-in')
    }else{
      toast.error(json.message)
    }
   }
  }
  
    
   useEffect(()=>{
    if (localStorage.getItem('token')) {
      const headers = {...constants.apiHeaders.HEADER,"Authorization":localStorage.getItem('token')}
      httpCall(constants.apiEndPoint.AUTHENTICATE_USER, headers, constants.httpMethod.GET)
        .then(data => {
         if (data.success === 1) {
        dispatch(handleUserAuthentication({ flag: false }))
        // navigate('/')
        
      }
      //  else {
      //   dispatch(handleUserAuthentication({ flag: false }))
      // }
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
              <h5>SignUp</h5>
            </div>
            <div className="content"> 
            <div className="input-group">
                <input type="text"  className="form-control " placeholder="Enter First Name"  onChange={(event)=>setFname(event.target.value)} />
                <span className="input-group-addon">
                  <i className="zmdi zmdi-account-circle" />
                </span>
              </div>
              <div className="input-group">
                <input type="text"  className="form-control " placeholder="Enter Last Name"  onChange={(event)=>setLname(event.target.value)} />
                <span className="input-group-addon">
                  <i className="zmdi zmdi-account-circle" />
                </span>
              </div>
              <div className="input-group">
                <input type="tel"  className="form-control " placeholder="Enter Phone Number" onChange={(event)=>setPhone(event.target.value)}  />
                <span className="input-group-addon">
                  <i className={phone.length === 0 ? "zmdi zmdi-account-circle" : "zmdi zmdi-account-circle hide" } />
                  <button type="button" className={phone.length === 0 ? "btn btn-info hide" : "btn btn-info" }  style={{height: "20px" ,width: "20px", textAlign:"center"}}>Validate</button>
                </span>
               
              </div>                                               
              <div className="input-group">
                <input type="email"  className="form-control " placeholder="Enter Email"  onChange={(event)=>setEmail(event.target.value)}   />
                <span className="input-group-addon">
                  <i className={email.length === 0 ? "zmdi zmdi-account-circle" : "zmdi zmdi-account-circle hide" } />
                  {isValidEmail&& <button type="button" className= "btn btn-info"   style={{height: "20px" ,width: "20px", textAlign:"center"}}>Validate</button>}
                </span>
              </div>
              <div className="input-group">
                <input type="password" placeholder="Password" className="form-control"  onChange={(event)=>setPass(event.target.value)} />
                <span className="input-group-addon">
                  <i className="zmdi zmdi-lock" />
                </span>
              </div>
              <div className="input-group">
                <input type="password" placeholder="Confirm Password" className="form-control" onChange={(event)=>setCpass(event.target.value)}  />
                <span className="input-group-addon">
                  <i className="zmdi zmdi-lock" />
                </span>
              </div>
              <div className="input-group">              
              <div className="flex items-center  gap-2"><p className='text-left'>Gender</p>
              <input type="radio" name="status" class="mx-2 w-[20px] h-[20px] text-[20px]" style={{width:"16px", height:"16px", fontSize:"20px"}} value="Female" onChange={(event)=>setGender(event.target.value)} /> Female
              <input type="radio" name="status" className="mx-2 w-[20px] h-[20px] text-[20px]" style={{width:"16px", height:"16px", fontSize:"20px"}} value="Male" onChange={(event)=>setGender(event.target.value)} /> Male</div>
              </div>
              <div className="input-group">
                <input type="password" placeholder="account name" className="form-control" onChange={(event)=>setAname(event.target.value)}  />
                <span className="input-group-addon">
                  <i className="zmdi zmdi-lock" />
                </span>
              </div>
              <div className="input-group">
                <input type="password" placeholder="institute name" className="form-control" onChange={(event)=>setIname(event.target.value)}  />
                <span className="input-group-addon">
                  <i className="zmdi zmdi-lock" />
                </span>
              </div>
           
            </div>
            <div className="footer text-center">
              {/* <Link  className="btn btn-primary btn-round btn-lg btn-block btn-ad " >AS ADMIN</Link> */}
              <Link  className="btn btn-primary btn-round btn-lg btn-block btn-ad" onClick={()=>handleRegister()}>Submit</Link>
            </div>
            <div>
            {/* <h5><Link  className="link text-white">Forgot Password?</Link></h5> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  
  </div>
  <ToastContainer />


    </>
  )
}
