import React from 'react'
import logo1 from '../assets/images/logo.svg'

export default function Header() {
  return (
    <>
<nav className="navbar p-l-5 p-r-5">
    <ul className="nav navbar-nav navbar-left">
        <li>
            <div className="navbar-header">
                <a href="javascript:void(0);" className="bars"></a>
                <a className="navbar-brand" href="index.html"><img src={logo1} width="30" alt="Oreo"/><span className="m-l-10">Oreo</span></a>
            </div>
        </li>
        <li><a href="javascript:void(0);" className="ls-toggle-btn" data-close="true"><i className="zmdi zmdi-swap"></i></a></li>
        <li className="hidden-md-down"><a href="events.html" title="Events"><i className="zmdi zmdi-calendar"></i></a></li>
        <li className="hidden-md-down"><a href="mail-inbox.html" title="Inbox"><i className="zmdi zmdi-email"></i></a></li>
        <li><a href="contact.html" title="Contact List"><i className="zmdi zmdi-account-box-phone"></i></a></li>
        <li className="dropdown"> <a href="javascript:void(0);" className="dropdown-toggle" data-toggle="dropdown" role="button"><i className="zmdi zmdi-notifications"></i>
            <div className="notify"><span className="heartbit"></span><span className="point"></span></div>
            </a>
            <ul className="dropdown-menu pullDown">
                <li className="body">
                    <ul className="menu list-unstyled">
                        <li>
                            <a href="javascript:void(0);">
                                <div className="media">
                                    <img className="media-object w60" src="assets/images/image-gallery/1.jpg" alt=""/>
                                    <div className="media-body">
                                        <span className="name">Sophia <span className="time">For Sale</span></span>
                                        <span className="message">Relaxing Apartment</span>                                        
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0);">
                                <div className="media">
                                    <img className="media-object w60" src="assets/images/image-gallery/2.jpg" alt=""/>
                                    <div className="media-body">
                                        <span className="name">Sophia <span className="time">For Rent</span></span>
                                        <span className="message">Co-op Apartment in Bay Terrace</span>                                        
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0);">
                                <div className="media">
                                    <img className="media-object w60" src="assets/images/image-gallery/3.jpg" alt=""/>
                                    <div className="media-body">
                                        <span className="name">Isabella <span className="time">For Rent</span></span>
                                        <span className="message">A must see Villa on Chicago Ave</span>                                        
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0);">
                                <div className="media">
                                    <img className="media-object w60" src="assets/images/image-gallery/4.jpg" alt=""/>
                                    <div className="media-body">
                                        <span className="name">Alexander <span className="time">For Sale</span></span>
                                        <span className="message">5 Room Apartment Special Deal</span>                                        
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0);">
                                <div className="media">
                                    <img className="media-object w60" src="assets/images/image-gallery/5.jpg" alt=""/>
                                    <div className="media-body">
                                        <span className="name">Grayson <span className="time">For Rent</span></span>
                                        <span className="message">Real House Luxury Villa</span>                                        
                                    </div>
                                </div>
                            </a>
                        </li>                        
                    </ul>
                </li>
                <li className="footer"> <a href="javascript:void(0);">View All</a> </li>
            </ul>
        </li>        
        <li className="hidden-sm-down">
            <div className="input-group">
                <input type="text" className="form-control" placeholder="Search..."/>
                <span className="input-group-addon"><i className="zmdi zmdi-search"></i></span>
            </div>
        </li>        
        <li className="float-right">
            <a href="sign-in.html" className="mega-menu" data-close="true"><i className="zmdi zmdi-power"></i></a>
            <a href="javascript:void(0);" className="js-right-sidebar" data-close="true"><i className="zmdi zmdi-settings zmdi-hc-spin"></i></a>
        </li>
    </ul>
</nav>
    </>
  )
}
