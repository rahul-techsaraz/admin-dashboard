import React from 'react'
import logo1 from '../assets/images/imgpsh_fullsize_anim.jpeg'
import { Link } from 'react-router-dom'

export default function SignIn() {
  return (
    <>

  {/* Navbar */}
  <nav className="navbar navbar-expand-lg fixed-top navbar-transparent">
    <div className="container">        
      <div className="navbar-translate n_logo">
        <a className="navbar-brand" href="javascript:void(0);" title target="_blank">Admission Kart</a>
        <button className="navbar-toggler" type="button">
          <span className="navbar-toggler-bar bar1" />
          <span className="navbar-toggler-bar bar2" />
          <span className="navbar-toggler-bar bar3" />
        </button>
      </div>
      <div className="navbar-collapse">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to={'/'}>Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={'/'}>Search Result</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" title="Follow us on Twitter" to={'/'} target="_blank">
              <i className="zmdi zmdi-twitter" />
              <p className="d-lg-none d-xl-none">Twitter</p>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" title="Like us on Facebook" to={'/'} target="_blank">
              <i className="zmdi zmdi-facebook" />
              <p className="d-lg-none d-xl-none">Facebook</p>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" title="Follow us on Instagram" to={'/'} target="_blank">                        
              <i className="zmdi zmdi-instagram" />
              <p className="d-lg-none d-xl-none">Instagram</p>
            </Link>
          </li>                
          <li className="nav-item">
            <Link className="nav-link btn btn-white btn-round" to={'/'}>SIGN UP</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  {/* End Navbar */}
  <div className="page-header">
    <div className="page-header-image" style={{backgroundImage: 'url(assets/images/login.jpg)'}} />
    <div className="container">
      <div className="col-md-12 content-center">
        <div className="card-plain">
          <form className="form" method action="#">
            <div className="header">
              <div className="logo-container">
                <img src={logo1} width={80} alt />
              </div>
              <h5>Log in</h5>
            </div>
            <div className="content">                                                
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Enter User Name" />
                <span className="input-group-addon">
                  <i className="zmdi zmdi-account-circle" />
                </span>
              </div>
              <div className="input-group">
                <input type="password" placeholder="Password" className="form-control" />
                <span className="input-group-addon">
                  <i className="zmdi zmdi-lock" />
                </span>
              </div>
            </div>
            <div className="footer text-center">
              <a href="index.html" className="btn btn-primary btn-round btn-lg btn-block ">SIGN IN</a>
              <h5><a href="forgot-password.html" className="link">Forgot Password?</a></h5>
            </div>
          </form>
        </div>
      </div>
    </div>
    <footer className="footer">
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
          <span>Designed by <Link to={'/'} target="_blank">ThemeMakker</Link></span>
        </div>
      </div>
    </footer>
  </div>


    </>
  )
}
