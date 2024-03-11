import React from 'react'
import leftLogo from '../assets/images/profile_av.jpg'

export default function LeftSidebar() {
  return (
    <>
    
<aside id="leftsidebar" className="sidebar">
  <ul className="nav nav-tabs">
    <li className="nav-item"><a className="nav-link active" data-toggle="tab" href="#dashboard"><i className="zmdi zmdi-home m-r-5" />Oreo</a></li>
    <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#user"><i className="zmdi zmdi-account m-r-5" />Agent</a></li>
  </ul>
  <div className="tab-content">
    <div className="tab-pane stretchRight active" id="dashboard">
      <div className="menu">
        <ul className="list">
          <li>
            <div className="user-info">
              <div className="image"><a href="profile.html"><img src={leftLogo} alt="User" /></a></div>
              <div className="detail">
                <h4>Michael</h4>
                <small>Agent</small>
              </div>
              <a title="facebook" href="javascript:void(0);"><i className="zmdi zmdi-facebook" /></a>
              <a title="twitter" href="javascript:void(0);"><i className="zmdi zmdi-twitter" /></a>
              <a title="instagram" href="javascript:void(0);"><i className="zmdi zmdi-instagram" /></a>                            
            </div>
          </li>
          <li className="header">MAIN</li>
          <li className="active open"><a href="index.html"><i className="zmdi zmdi-home" /><span>Dashboard</span></a></li>                    
          <li><a href="javascript:void(0);" className="menu-toggle"><i className="zmdi zmdi-city" /><span>Property</span></a>
            <ul className="ml-menu">
              <li><a href="property-list.html">Property List</a></li>
              <li><a href="property-list3.html">3 Column</a></li>
              <li><a href="property-list4.html">4 Column</a></li>
              <li><a href="property-add.html">Add Property</a></li>
              <li><a href="property-detail.html">Property Detail</a></li>
            </ul>
          </li>
          <li><a href="javascript:void(0);" className="menu-toggle"><i className="zmdi zmdi-city" /><span>Types</span></a>
            <ul className="ml-menu">
              <li><a href="apartment.html">Apartment</a></li>
              <li><a href="office.html">Office</a></li>
              <li><a href="shop.html">Shop</a></li>                        
              <li><a href="villa.html">Villa</a></li>
            </ul>
          </li>
          <li><a href="javascript:void(0);" className="menu-toggle"><i className="zmdi zmdi-accounts-outline" /><span>Agents</span></a>
            <ul className="ml-menu">
              <li><a href="agent.html">All Agents</a></li>
              <li><a href="add-agent.html">Add Agent</a></li>
              <li><a href="profile.html">Agent Profile</a></li>
              <li><a href="invoices.html">Agent Invoice</a></li>
            </ul>
          </li>
          <li><a href="javascript:void(0);" className="menu-toggle"><i className="zmdi zmdi-case-check" /><span>Contract</span></a>
            <ul className="ml-menu">
              <li><a href="contract-add.html">Add New</a></li>
              <li><a href="contract-list.html">List</a></li>
            </ul>
          </li>
          <li><a href="javascript:void(0);" className="menu-toggle"><i className="zmdi zmdi-apps" /><span>App</span></a>
            <ul className="ml-menu">
              <li><a href="mail-inbox.html">Inbox</a></li>
              <li><a href="chat.html">Chat</a></li>
              <li><a href="events.html">Calendar</a></li>
              <li><a href="contact.html">Contact list</a></li>
              <li><a href="blog-dashboard.html">Blog</a></li>
            </ul>
          </li>
          <li><a href="groups.html"><i className="zmdi zmdi-ungroup" /><span>Groups</span></a>
          </li><li><a href="file-dashboard.html"><i className="zmdi zmdi-file-text" /><span>File Manager</span></a>
          </li><li><a href="jvectormap.html"><i className="zmdi zmdi-map" /><span>Site Location</span></a>
          </li><li className="header">EXTRA COMPONENTS</li>
          <li>
            <a href="javascript:void(0);" className="menu-toggle"><i className="zmdi zmdi-swap-alt" /><span>User Interface (UI)</span></a>
            <ul className="ml-menu">
              <li><a href="ui_kit.html">UI KIT</a></li>                    
              <li><a href="alerts.html">Alerts</a></li>                    
              <li><a href="collapse.html">Collapse</a></li>
              <li><a href="colors.html">Colors</a></li>
              <li><a href="dialogs.html">Dialogs</a></li>
              <li><a href="icons.html">Icons</a></li>                    
              <li><a href="list-group.html">List Group</a></li>
              <li><a href="media-object.html">Media Object</a></li>
              <li><a href="modals.html">Modals</a></li>
              <li><a href="notifications.html">Notifications</a></li>                    
              <li><a href="progressbars.html">Progress Bars</a></li>
              <li><a href="range-sliders.html">Range Sliders</a></li>
              <li><a href="sortable-nestable.html">Sortable &amp; Nestable</a></li>
              <li><a href="tabs.html">Tabs</a></li>
              <li><a href="waves.html">Waves</a></li>
            </ul>
          </li>                    
          <li>
            <a href="javascript:void(0);" className="menu-toggle"><i className="zmdi zmdi-assignment" /><span>Forms</span></a>
            <ul className="ml-menu">
              <li><a href="basic-form-elements.html">Basic Elements</a> </li>
              <li><a href="advanced-form-elements.html">Advanced Elements</a> </li>
              <li><a href="form-examples.html">Form Examples</a> </li>
              <li><a href="form-validation.html">Form Validation</a> </li>
              <li><a href="form-wizard.html">Form Wizard</a> </li>
              <li><a href="form-editors.html">Editors</a> </li>
              <li><a href="form-upload.html">File Upload</a></li>
            </ul>
          </li>
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
