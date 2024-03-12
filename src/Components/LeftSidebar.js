import React, { useState } from 'react'
import leftLogo from '../assets/images/profile_av.jpg'
import { Link } from 'react-router-dom'
import { constants } from '../utils/constants'

export default function LeftSidebar() {
  const [activeOption, setActiveOption] = useState(0);
  const [isOpen, setOpen] = useState(false);

  return (
    <>
    
<aside id="leftsidebar" className="sidebar">
  <ul className="nav nav-tabs">
    <li className="nav-item"><Link className="nav-link active" data-toggle="tab" to={'/'}><i className="zmdi zmdi-home m-r-5" />Admission Kart</Link></li>
    <li className="nav-item"><Link className="nav-link" data-toggle="tab" to={'/'}><i className="zmdi zmdi-account m-r-5" />Agent</Link></li>
  </ul>
  <div className="tab-content">
    <div className="tab-pane stretchRight active" id="dashboard">
      <div className="menu">
        <ul className="list">
          <li>
            <div className="user-info">
              <div className="image"><Link to={'/'}><img src={leftLogo} alt="User" /></Link></div>
              <div className="detail">
                <h4>Michael</h4>
                <small>Agent</small>
              </div>
              <Link title="facebook" to={'/'}><i className="zmdi zmdi-facebook" /></Link>
              <Link title="twitter" to={'/'}><i className="zmdi zmdi-twitter" /></Link>
              <Link title="instagram" to={'/'}><i className="zmdi zmdi-instagram" /></Link>                            
            </div>
          </li>
          <li className="header">MAIN</li>
                <li className="active open"><a href=""><i className="zmdi zmdi-home" /><span>Dashboard</span></a></li> 
                {constants.sideBarMenu.map((data,i) => (
                  <li><Link className="menu-toggle" onClick={() => {
                    setActiveOption(i)
                    setOpen(!isOpen)
                  }}><i className="zmdi zmdi-city" /><span>{data.heading}</span></Link>
                    <ul className="ml-menu" style={activeOption === i && isOpen ? { display: 'block' } :{display:'none'}}>
                      
                      {data.list && data?.list.map(listName => (<li><Link to={listName.option_path}>{listName.option_name}</Link></li>))}
              
            </ul>
          </li>
          ))}      
         
         
         
          <li>
            <a href="javascript:void(0);" className="menu-toggle"><i className="zmdi zmdi-grid" /><span>Tables</span></a>
            <ul className="ml-menu">                        
              <li><a href="normal-tables.html">Normal Tables</a></li>
              <li><a href="jquery-datatable.html">Jquery Datatables</a></li>
              <li><a href="editable-table.html">Editable Tables</a></li>
              <li><a href="table-color.html">Tables Color</a></li>
            </ul>
          </li>            
          <li>
            <a href="javascript:void(0);" className="menu-toggle"><i className="zmdi zmdi-chart" /><span>Charts</span> </a>
            <ul className="ml-menu">
              <li><a href="c3chart.html">C3 Chart</a></li>
              <li><a href="morris.html">Morris</a></li>
              <li><a href="flot.html">Flot</a></li>
              <li><a href="chartjs.html">ChartJS</a></li>
              <li><a href="sparkline.html">Sparkline</a></li>
              <li><a href="jquery-knob.html">Jquery Knob</a></li>
            </ul>
          </li>
          <li>
            <a href="javascript:void(0);" className="menu-toggle"><i className="zmdi zmdi-delicious" /><span>Widgets</span></a>
            <ul className="ml-menu">
              <li><a href="widgets-app.html">Apps Widgetse</a></li>
              <li><a href="widgets-data.html">Data Widgetse</a></li>
            </ul>
          </li>
          <li>
            <a href="javascript:void(0);" className="menu-toggle"><i className="zmdi zmdi-lock" /><span>Authentication</span></a>
            <ul className="ml-menu">
              <li><a href="sign-in.html">Sign In</a></li>
              <li><a href="sign-up.html">Sign Up</a></li>
              <li><a href="forgot-password.html">Forgot Password</a></li>
              <li><a href="404.html">Page 404</a></li>
              <li><a href="500.html">Page 500</a></li>
              <li><a href="page-offline.html">Page Offline</a></li>
              <li><a href="locked.html">Locked Screen</a></li>
            </ul>
          </li>
          <li>
            <a href="javascript:void(0);" className="menu-toggle"><i className="zmdi zmdi-copy" /><span>Sample Pages</span></a>
            <ul className="ml-menu">
              <li><a href="blank.html">Blank Page</a></li>
              <li><a href="image-gallery.html">Image Gallery</a></li>
              <li><a href="timeline.html">Timeline</a></li>
              <li><a href="pricing.html">Pricing</a></li>
              <li><a href="search-results.html">Search Results</a></li>
            </ul>
          </li>
          <li className="header">Extra</li>
          <li>
            <div className="progress-container progress-primary m-t-10">
              <span className="progress-badge">Traffic this Month</span>
              <div className="progress">
                <div className="progress-bar progress-bar-warning" role="progressbar" aria-valuenow={67} aria-valuemin={0} aria-valuemax={100} style={{width: '67%'}}>
                  <span className="progress-value">67%</span>
                </div>
              </div>
            </div>
            <div className="progress-container progress-info">
              <span className="progress-badge">Server Load</span>
              <div className="progress">
                <div className="progress-bar progress-bar-warning" role="progressbar" aria-valuenow={86} aria-valuemin={0} aria-valuemax={100} style={{width: '86%'}}>
                  <span className="progress-value">86%</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div className="tab-pane stretchLeft" id="user">
      <div className="menu">
        <ul className="list">
          <li>
            <div className="user-info m-b-20 p-b-15">
              <div className="image"><a href="profile.html"><img src={leftLogo} alt="User" /></a></div>
              <div className="detail">
                <h4>Michael</h4>
                <small>Agent</small>
              </div>
              <a title="facebook" href="javascript:void(0);"><i className="zmdi zmdi-facebook" /></a>
              <a title="twitter" href="javascript:void(0);"><i className="zmdi zmdi-twitter" /></a>
              <a title="instagram" href="javascript:void(0);"><i className="zmdi zmdi-instagram" /></a>
              <p className="text-muted">795 Folsom Ave, Suite 600 San Francisco, CADGE 94107</p>
              <div className="row">
                <div className="col-4">
                  <h6 className="mb-1">852</h6>
                  <small>Deals</small>
                </div>
                <div className="col-4">
                  <h6 className="mb-1">13k</h6>
                  <small>Sales</small>
                </div>
                <div className="col-4">
                  <h6 className="mb-1">234</h6>
                  <small>Clients</small>
                </div>                            
              </div>
            </div>
          </li>
          <li>
            <small className="text-muted">Email address: </small>
            <p>michael@gmail.com</p>
            <hr />
            <small className="text-muted">Phone: </small>
            <p>+ 202-555-0191</p>
            <hr />
            <ul className="list-unstyled">
              <li>
                <div>Honesty &amp; Integrity</div>
                <div className="progress m-b-20">
                  <div className="progress-bar l-blue " role="progressbar" aria-valuenow={89} aria-valuemin={0} aria-valuemax={100} style={{width: '89%'}}> <span className="sr-only">62% Complete</span> </div>
                </div>
              </li>
              <li>
                <div>Responsiveness</div>
                <div className="progress m-b-20">
                  <div className="progress-bar l-green " role="progressbar" aria-valuenow={56} aria-valuemin={0} aria-valuemax={100} style={{width: '56%'}}> <span className="sr-only">87% Complete</span> </div>
                </div>
              </li>
              <li>
                <div>Local Knowledge</div>
                <div className="progress m-b-20">
                  <div className="progress-bar l-amber" role="progressbar" aria-valuenow={78} aria-valuemin={0} aria-valuemax={100} style={{width: '78%'}}> <span className="sr-only">32% Complete</span> </div>
                </div>
              </li>
            </ul>                        
          </li>
        </ul>
      </div>
    </div>
  </div>    
</aside>

    </>
  )
}
