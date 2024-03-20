import React from 'react'
import logo1 from '../assets/images/imgpsh_fullsize_anim.jpeg'
import { Link, useNavigate } from 'react-router-dom'


export default function Header() {
    const navigate = useNavigate();
    const handleLogout=()=>{
        if(window.confirm('Are you sure you want to logout?')) {
            // localStorage.clear(); // Clear local storage
            localStorage.removeItem('token')
          navigate('/sign-in')
        }
    }
   
  return (
    <>
<nav className="navbar p-l-5 p-r-5">
    <ul className="nav navbar-nav navbar-left">
        <li>
            <div className="navbar-header">
                <Link to={'/'} className="bars"></Link>
                <Link className="navbar-brand" to={'/'}><img src={logo1} width="80" alt="Admission Kart"/></Link>
            </div>
        </li>
        <li className="hidden-md-down"><Link to={'/'} title="Events"><i className="zmdi zmdi-calendar"></i></Link></li>
        <li className="hidden-md-down"><Link to={'/'} title="Inbox"><i className="zmdi zmdi-email"></i></Link></li>
        <li><Link to={'/'} title="Contact List"><i className="zmdi zmdi-account-box-phone"></i></Link></li>
        <li className="dropdown"> <Link to={'/'} className="dropdown-toggle" data-toggle="dropdown" role="button"><i className="zmdi zmdi-notifications"></i>
            <div className="notify">
            </div>
            </Link>
            <ul className="dropdown-menu pullDown">
                <li className="body">
                    <ul className="menu list-unstyled">
                        <li>
                            <Link to={'/'}>
                                <div className="media">
                                    <img className="media-object w60" src="assets/images/image-gallery/1.jpg" alt=""/>
                                    <div className="media-body">
                                        <span className="name">Sophia <span className="time">For Sale</span></span>
                                        <span className="message">Relaxing Apartment</span>                                        
                                    </div>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/'}>
                                <div className="media">
                                    <img className="media-object w60" src="assets/images/image-gallery/2.jpg" alt=""/>
                                    <div className="media-body">
                                        <span className="name">Sophia <span className="time">For Rent</span></span>
                                        <span className="message">Co-op Apartment in Bay Terrace</span>                                        
                                    </div>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/'}>
                                <div className="media">
                                    <img className="media-object w60" src="assets/images/image-gallery/3.jpg" alt=""/>
                                    <div className="media-body">
                                        <span className="name">Isabella <span className="time">For Rent</span></span>
                                        <span className="message">A must see Villa on Chicago Ave</span>                                        
                                    </div>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/'}>
                                <div className="media">
                                    <img className="media-object w60" src="assets/images/image-gallery/4.jpg" alt=""/>
                                    <div className="media-body">
                                        <span className="name">Alexander <span className="time">For Sale</span></span>
                                        <span className="message">5 Room Apartment Special Deal</span>                                        
                                    </div>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/'}>
                                <div className="media">
                                    <img className="media-object w60" src="assets/images/image-gallery/5.jpg" alt=""/>
                                    <div className="media-body">
                                        <span className="name">Grayson <span className="time">For Rent</span></span>
                                        <span className="message">Real House Luxury Villa</span>                                        
                                    </div>
                                </div>
                            </Link>
                        </li>                        
                    </ul>
                </li>
                <li className="footer"> <Link to={'/'}>View All</Link> </li>
            </ul>
        </li>        
        <li className="hidden-sm-down">
            <div className="input-group">
                <input type="text" className="form-control" placeholder="Search..."/>
                <span className="input-group-addon"><i className="zmdi zmdi-search"></i></span>
            </div>
        </li>        
        <li className="float-right">
            <Link to={'/'} className="mega-menu" data-close="true"><i className="zmdi zmdi-power" onClick={()=>handleLogout()}></i></Link>
            <Link to={'/'} className="js-right-sidebar" data-close="true"><i className="zmdi zmdi-settings zmdi-hc-spin"></i></Link>
        </li>
    </ul>
</nav>
    </>
  )
}
