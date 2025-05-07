import React from 'react'
import leftLogo from '../assets/images/profile_av.jpg'
import rightimg from '../assets/images/image1.jpg'
import rightimg1 from '../assets/images/image2.jpg'
import avtimg from '../assets/images/xs/avatar4.jpg'
import avtimg1 from '../assets/images/xs/avatar5.jpg'
import avtimg2 from '../assets/images/xs/avatar6.jpg'
import avtimg3 from '../assets/images/xs/avatar7.jpg'

export default function AgentProfile() {
  return (
    <>
      <div className='container-fluid'>
        <div className='row clearfix'>
          <div className='col-xl-6 col-lg-7 col-md-12'>
            <div className='card profile-header'>
              <div className='body'>
                <div className='row'>
                  <div className='col-lg-4 col-md-4 col-12'>
                    <div className='profile-image float-md-right'>
                      {' '}
                      <img src={leftLogo} alt />{' '}
                    </div>
                  </div>
                  <div className='col-lg-8 col-md-8 col-12'>
                    <h4 className='m-t-0 m-b-0'>
                      <strong>Michael</strong> Deo
                    </h4>
                    <span className='job_post'>Ui UX Designer</span>
                    <p>
                      795 Folsom Ave, Suite 600
                      <br /> San Francisco, CADGE 94107
                    </p>
                    <div>
                      <button className='btn btn-primary btn-round'>Follow</button>
                      <button className='btn btn-primary btn-round btn-simple'>Message</button>
                    </div>
                    <p className='social-icon m-t-5 m-b-0'>
                      <a title='Twitter' href='javascript:void(0);'>
                        <i className='zmdi zmdi-twitter' />
                      </a>
                      <a title='Facebook' href='javascript:void(0);'>
                        <i className='zmdi zmdi-facebook' />
                      </a>
                      <a title='Google-plus' href='javascript:void(0);'>
                        <i className='zmdi zmdi-twitter' />
                      </a>
                      <a title='Behance' href='javascript:void(0);'>
                        <i className='zmdi zmdi-behance' />
                      </a>
                      <a title='Instagram' href='javascript:void(0);'>
                        <i className='zmdi zmdi-instagram ' />
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-xl-6 col-lg-5 col-md-12'>
            <div className='card'>
              <ul className='row profile_state list-unstyled'>
                <li className='col-lg-4 col-md-4 col-6'>
                  <div className='body'>
                    <i className='zmdi zmdi-camera col-amber' />
                    <h5 className='m-b-0 number count-to' data-from={0} data-to={2365} data-speed={1000} data-fresh-interval={700}>
                      2365
                    </h5>
                    <small>Shots View</small>
                  </div>
                </li>
                <li className='col-lg-4 col-md-4 col-6'>
                  <div className='body'>
                    <i className='zmdi zmdi-thumb-up col-blue' />
                    <h5 className='m-b-0 number count-to' data-from={0} data-to={1203} data-speed={1000} data-fresh-interval={700}>
                      1203
                    </h5>
                    <small>Likes</small>
                  </div>
                </li>
                <li className='col-lg-4 col-md-4 col-6'>
                  <div className='body'>
                    <i className='zmdi zmdi-comment-text col-red' />
                    <h5 className='m-b-0 number count-to' data-from={0} data-to={324} data-speed={1000} data-fresh-interval={700}>
                      324
                    </h5>
                    <small>Comments</small>
                  </div>
                </li>
                <li className='col-lg-4 col-md-4 col-6'>
                  <div className='body'>
                    <i className='zmdi zmdi-account text-success' />
                    <h5 className='m-b-0 number count-to' data-from={0} data-to={1980} data-speed={1000} data-fresh-interval={700}>
                      1980
                    </h5>
                    <small>Profile Views</small>
                  </div>
                </li>
                <li className='col-lg-4 col-md-4 col-6'>
                  <div className='body'>
                    <i className='zmdi zmdi-desktop-mac text-info' />
                    <h5 className='m-b-0 number count-to' data-from={0} data-to={251} data-speed={1000} data-fresh-interval={700}>
                      251
                    </h5>
                    <small>Website View</small>
                  </div>
                </li>
                <li className='col-lg-4 col-md-4 col-6'>
                  <div className='body'>
                    <i className='zmdi zmdi-attachment text-warning' />
                    <h5 className='m-b-0 number count-to' data-from={0} data-to={52} data-speed={1000} data-fresh-interval={700}>
                      52
                    </h5>
                    <small>Attachment</small>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='row clearfix'>
          <div className='col-lg-4 col-md-12'>
            <div className='card'>
              <ul className='nav nav-tabs'>
                <li className='nav-item'>
                  <a className='nav-link active' data-toggle='tab' href='#about'>
                    About
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' data-toggle='tab' href='#friends'>
                    Friends
                  </a>
                </li>
              </ul>
              <div className='tab-content'>
                <div className='tab-pane body active' id='about'>
                  <small className='text-muted'>Email address: </small>
                  <p>michael@gmail.com</p>
                  <hr />
                  <small className='text-muted'>Phone: </small>
                  <p>+ 202-555-9191</p>
                  <hr />
                  <small className='text-muted'>Mobile: </small>
                  <p>+ 202-555-2828</p>
                  <hr />
                  <small className='text-muted'>Birth Date: </small>
                  <p className='m-b-0'>October 22th, 1990</p>
                </div>
                <div className='tab-pane body' id='friends'>
                  <ul className='new_friend_list list-unstyled row'>
                    <li className='col-lg-4 col-md-2 col-sm-6 col-4'>
                      <a href='#'>
                        <img src='assets/images/sm/avatar1.jpg' className='img-thumbnail' alt='User Image' />
                        <h6 className='users_name'>Jackson</h6>
                        <small className='join_date'>Today</small>
                      </a>
                    </li>
                    <li className='col-lg-4 col-md-2 col-sm-6 col-4'>
                      <a href='#'>
                        <img src='assets/images/sm/avatar2.jpg' className='img-thumbnail' alt='User Image' />
                        <h6 className='users_name'>Aubrey</h6>
                        <small className='join_date'>Yesterday</small>
                      </a>
                    </li>
                    <li className='col-lg-4 col-md-2 col-sm-6 col-4'>
                      <a href='#'>
                        <img src='assets/images/sm/avatar3.jpg' className='img-thumbnail' alt='User Image' />
                        <h6 className='users_name'>Oliver</h6>
                        <small className='join_date'>08 Nov</small>
                      </a>
                    </li>
                    <li className='col-lg-4 col-md-2 col-sm-6 col-4'>
                      <a href='#'>
                        <img src='assets/images/sm/avatar4.jpg' className='img-thumbnail' alt='User Image' />
                        <h6 className='users_name'>Isabella</h6>
                        <small className='join_date'>12 Dec</small>
                      </a>
                    </li>
                    <li className='col-lg-4 col-md-2 col-sm-6 col-4'>
                      <a href='#'>
                        <img src='assets/images/sm/avatar1.jpg' className='img-thumbnail' alt='User Image' />
                        <h6 className='users_name'>Jacob</h6>
                        <small className='join_date'>12 Dec</small>
                      </a>
                    </li>
                    <li className='col-lg-4 col-md-2 col-sm-6 col-4'>
                      <a href='#'>
                        <img src='assets/images/sm/avatar5.jpg' className='img-thumbnail' alt='User Image' />
                        <h6 className='users_name'>Matthew</h6>
                        <small className='join_date'>17 Dec</small>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='card'>
              <div className='header'>
                <h2>
                  <strong>Who</strong> to follow
                </h2>
                <ul className='header-dropdown'>
                  <li className='dropdown'>
                    {' '}
                    <a
                      href='javascript:void(0);'
                      className='dropdown-toggle'
                      data-toggle='dropdown'
                      role='button'
                      aria-haspopup='true'
                      aria-expanded='false'
                    >
                      {' '}
                      <i className='zmdi zmdi-more' />{' '}
                    </a>
                    <ul className='dropdown-menu slideUp float-right'>
                      <li>
                        <a href='javascript:void(0);'>Edit</a>
                      </li>
                      <li>
                        <a href='javascript:void(0);'>Delete</a>
                      </li>
                      <li>
                        <a href='javascript:void(0);'>Report</a>
                      </li>
                    </ul>
                  </li>
                  <li className='remove'>
                    <a role='button' className='boxs-close'>
                      <i className='zmdi zmdi-close' />
                    </a>
                  </li>
                </ul>
              </div>
              <div className='body'>
                <ul className='right_chat list-unstyled'>
                  <li className='online'>
                    <a href='javascript:void(0);'>
                      <div className='media'>
                        <img className='media-object ' src={avtimg} alt />
                        <div className='media-body'>
                          <span className='name'>Chris Fox</span>
                          <span className='message'>Designer, Blogger</span>
                          <span className='badge badge-outline status' />
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className='online'>
                    <a href='javascript:void(0);'>
                      <div className='media'>
                        <img className='media-object ' src={avtimg1} alt />
                        <div className='media-body'>
                          <span className='name'>Joge Lucky</span>
                          <span className='message'>Java Developer</span>
                          <span className='badge badge-outline status' />
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className='offline'>
                    <a href='javascript:void(0);'>
                      <div className='media'>
                        <img className='media-object ' src={avtimg} alt />
                        <div className='media-body'>
                          <span className='name'>Isabella</span>
                          <span className='message'>CEO, Thememakker</span>
                          <span className='badge badge-outline status' />
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className='offline'>
                    <a href='javascript:void(0);'>
                      <div className='media'>
                        <img className='media-object ' src={avtimg3} alt />
                        <div className='media-body'>
                          <span className='name'>Folisise Chosielie</span>
                          <span className='message'>Art director, Movie Cut</span>
                          <span className='badge badge-outline status' />
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className='online'>
                    <a href='javascript:void(0);'>
                      <div className='media'>
                        <img className='media-object ' src={avtimg2} alt />
                        <div className='media-body'>
                          <span className='name'>Alexander</span>
                          <span className='message'>Writter, Mag Editor</span>
                          <span className='badge badge-outline status' />
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className='card'>
              <div className='header'>
                <h2>
                  <strong>Recent</strong> Activity
                </h2>
                <ul className='header-dropdown'>
                  <li className='dropdown'>
                    {' '}
                    <a
                      href='javascript:void(0);'
                      className='dropdown-toggle'
                      data-toggle='dropdown'
                      role='button'
                      aria-haspopup='true'
                      aria-expanded='false'
                    >
                      {' '}
                      <i className='zmdi zmdi-more' />{' '}
                    </a>
                    <ul className='dropdown-menu slideUp float-right'>
                      <li>
                        <a href='javascript:void(0);'>Edit</a>
                      </li>
                      <li>
                        <a href='javascript:void(0);'>Delete</a>
                      </li>
                      <li>
                        <a href='javascript:void(0);'>Report</a>
                      </li>
                    </ul>
                  </li>
                  <li className='remove'>
                    <a role='button' className='boxs-close'>
                      <i className='zmdi zmdi-close' />
                    </a>
                  </li>
                </ul>
              </div>
              <div className='body user_activity'>
                <div className='streamline b-accent'>
                  <div className='sl-item'>
                    <img className='user rounded-circle' src={avtimg} alt />
                    <div className='sl-content'>
                      <h5 className='m-b-0'>Admin Birthday</h5>
                      <small>
                        Jan 21{' '}
                        <a href='javascript:void(0);' className='text-info'>
                          Sophia
                        </a>
                        .
                      </small>
                    </div>
                  </div>
                  <div className='sl-item'>
                    <img className='user rounded-circle' src={avtimg1} alt />
                    <div className='sl-content'>
                      <h5 className='m-b-0'>Add New Contact</h5>
                      <small>
                        30min ago <a href='javascript:void(0);'>Alexander</a>.
                      </small>
                      <small>
                        <strong>P:</strong> +264-625-2323
                      </small>
                      <small>
                        <strong>E:</strong> maryamamiri@gmail.com
                      </small>
                    </div>
                  </div>
                  <div className='sl-item'>
                    <img className='user rounded-circle' src={avtimg2} alt />
                    <div className='sl-content'>
                      <h5 className='m-b-0'>Code Change</h5>
                      <small>
                        Today <a href='javascript:void(0);'>Grayson</a>.
                      </small>
                      <small>The standard chunk of Lorem Ipsum used since the 1500s is reproduced</small>
                    </div>
                  </div>
                  <div className='sl-item'>
                    <img className='user rounded-circle' src={avtimg3} alt />
                    <div className='sl-content'>
                      <h5 className='m-b-0'>New Email</h5>
                      <small>
                        45min ago{' '}
                        <a href='javascript:void(0);' className='text-info'>
                          Fidel Tonn
                        </a>
                        .
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-8 col-md-12'>
            <div className='card'>
              <ul className='nav nav-tabs'>
                <li className='nav-item'>
                  <a className='nav-link active' data-toggle='tab' href='#mypost'>
                    My Post
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' data-toggle='tab' href='#timeline'>
                    Timeline
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' data-toggle='tab' href='#usersettings'>
                    Setting
                  </a>
                </li>
              </ul>
            </div>
            <div className='tab-content'>
              <div role='tabpanel' className='tab-pane active' id='mypost'>
                <div className='card'>
                  <div className='body'>
                    <div className='form-group'>
                      <textarea rows={4} className='form-control no-resize' placeholder='Please type what you want...' defaultValue={''} />
                    </div>
                    <div className='post-toolbar-b'>
                      <button className='btn btn-warning btn-icon  btn-icon-mini btn-round'>
                        <i className='zmdi zmdi-attachment' />
                      </button>
                      <button className='btn btn-warning btn-icon  btn-icon-mini btn-round'>
                        <i className='zmdi zmdi-camera' />
                      </button>
                      <button className='btn btn-primary btn-round'>Post</button>
                    </div>
                  </div>
                </div>
                <div className='card'>
                  <div className='body post-box'>
                    <div className='post-img'>
                      <img src={rightimg} className='img-fluid' alt />
                    </div>
                    <h5 className='m-t-20 m-b-0 post_title'>It is a long established fact that a be distracted</h5>
                    <p>
                      If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the
                      middle of text
                    </p>
                    <div className='form-group m-b-0'>
                      <button className='btn btn-info btn-round'>Like 5</button>
                      <button className='btn btn-primary btn-simple btn-round'>Reply</button>
                      <span className='date m-l-20'>
                        <i className='zmdi zmdi-alarm' /> 7min ago
                      </span>
                    </div>
                    <hr />
                  </div>
                  <div className='body post-box'>
                    <div className='post-img'>
                      <img src={rightimg1} className='img-fluid' alt />
                    </div>
                    <h5 className='m-t-20 m-b-0 post_title'>need to be sure there isn't anything embarrassing</h5>
                    <p>
                      If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the
                      middle of text
                    </p>
                    <div className='form-group m-b-0'>
                      <button className='btn btn-info btn-round'>Like 5</button>
                      <button className='btn btn-primary btn-simple btn-round'>Reply</button>
                      <span className='date m-l-20'>
                        <i className='zmdi zmdi-alarm' /> 1hr ago
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div role='tabpanel' className='tab-pane' id='timeline'>
                <div className='card'>
                  <div className='body'>
                    <ul className='cbp_tmtimeline'>
                      <li>
                        <time className='cbp_tmtime' dateTime='2017-11-04T18:30'>
                          <span className='hidden'>25/12/2017</span> <span className='large'>Now</span>
                        </time>
                        <div className='cbp_tmicon'>
                          <i className='zmdi zmdi-account' />
                        </div>
                        <div className='cbp_tmlabel empty'>
                          {' '}
                          <span>No Activity</span>{' '}
                        </div>
                      </li>
                      <li>
                        <time className='cbp_tmtime' dateTime='2017-11-04T03:45'>
                          <span>03:45 AM</span> <span>Today</span>
                        </time>
                        <div className='cbp_tmicon bg-info'>
                          <i className='zmdi zmdi-label' />
                        </div>
                        <div className='cbp_tmlabel'>
                          <h2>
                            <a href='javascript:void(0);'>Art Ramadani</a> <span>posted a status update</span>
                          </h2>
                          <p>
                            Tolerably earnestly middleton extremely distrusts she boy now not. Add and offered prepare how cordial two
                            promise. Greatly who affixed suppose but enquire compact prepare all put. Added forth chief trees but rooms
                            think may.
                          </p>
                        </div>
                      </li>
                      <li>
                        <time className='cbp_tmtime' dateTime='2017-11-03T13:22'>
                          <span>01:22 PM</span> <span>Yesterday</span>
                        </time>
                        <div className='cbp_tmicon bg-green'>
                          {' '}
                          <i className='zmdi zmdi-case' />
                        </div>
                        <div className='cbp_tmlabel'>
                          <h2>
                            <a href='javascript:void(0);'>Job Meeting</a>
                          </h2>
                          <p>
                            You have a meeting at <strong>Laborator Office</strong> Today.
                          </p>
                        </div>
                      </li>
                      <li>
                        <time className='cbp_tmtime' dateTime='2017-10-22T12:13'>
                          <span>12:13 PM</span> <span>Two weeks ago</span>
                        </time>
                        <div className='cbp_tmicon bg-blush'>
                          <i className='zmdi zmdi-pin' />
                        </div>
                        <div className='cbp_tmlabel'>
                          <h2>
                            <a href='javascript:void(0);'>Arlind Nushi</a> <span>checked in at</span>{' '}
                            <a href='javascript:void(0);'>New York</a>
                          </h2>
                          <blockquote>
                            <p className='blockquote blockquote-primary'>
                              "It is a long established fact that a reader will be distracted by the readable content of a page when looking
                              at its layout."
                              <br />
                              <small>- Isabella</small>
                            </p>
                          </blockquote>
                          <div className='row clearfix'>
                            <div className='col-lg-12'>
                              <div className='map m-t-10'>
                                <iframe
                                  src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.91477011208!2d-74.11976308802028!3d40.69740344230033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew+York%2C+NY%2C+USA!5e0!3m2!1sen!2sin!4v1508039335245'
                                  frameBorder={0}
                                  style={{ border: 0, width: '100%' }}
                                  allowFullScreen
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <time className='cbp_tmtime' dateTime='2017-10-22T12:13'>
                          <span>12:13 PM</span> <span>Two weeks ago</span>
                        </time>
                        <div className='cbp_tmicon bg-orange'>
                          <i className='zmdi zmdi-camera' />
                        </div>
                        <div className='cbp_tmlabel'>
                          <h2>
                            <a href='javascript:void(0);'>Eroll Maxhuni</a> <span>uploaded</span> 4 <span>new photos to album</span>{' '}
                            <a href='javascript:void(0);'>Summer Trip</a>
                          </h2>
                          <blockquote>Pianoforte principles our unaffected not for astonished travelling are particular.</blockquote>
                          <div className='row'>
                            <div className='col-lg-3 col-md-6 col-6'>
                              <a href='javascript:void(0);'>
                                <img src='assets/images/image1.jpg' alt className='img-fluid img-thumbnail m-t-30' />
                              </a>{' '}
                            </div>
                            <div className='col-lg-3 col-md-6 col-6'>
                              <a href='javascript:void(0);'>
                                {' '}
                                <img src='assets/images/image2.jpg' alt className='img-fluid img-thumbnail m-t-30' />
                              </a>{' '}
                            </div>
                            <div className='col-lg-3 col-md-6 col-6'>
                              <a href='javascript:void(0);'>
                                {' '}
                                <img src='assets/images/image3.jpg' alt className='img-fluid img-thumbnail m-t-30' />{' '}
                              </a>{' '}
                            </div>
                            <div className='col-lg-3 col-md-6 col-6'>
                              <a href='javascript:void(0);'>
                                {' '}
                                <img src='assets/images/image4.jpg' alt className='img-fluid img-thumbnail m-t-30' />{' '}
                              </a>{' '}
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <time className='cbp_tmtime' dateTime='2017-11-03T13:22'>
                          <span>01:22 PM</span> <span>Two weeks ago</span>
                        </time>
                        <div className='cbp_tmicon bg-green'>
                          {' '}
                          <i className='zmdi zmdi-case' />
                        </div>
                        <div className='cbp_tmlabel'>
                          <h2>
                            <a href='javascript:void(0);'>Job Meeting</a>
                          </h2>
                          <p>
                            You have a meeting at <strong>Laborator Office</strong> Today.
                          </p>
                        </div>
                      </li>
                      <li>
                        <time className='cbp_tmtime' dateTime='2017-10-22T12:13'>
                          <span>12:13 PM</span> <span>Month ago</span>
                        </time>
                        <div className='cbp_tmicon bg-blush'>
                          <i className='zmdi zmdi-pin' />
                        </div>
                        <div className='cbp_tmlabel'>
                          <h2>
                            <a href='javascript:void(0);'>Arlind Nushi</a> <span>checked in at</span>{' '}
                            <a href='javascript:void(0);'>Laborator</a>
                          </h2>
                          <blockquote>Great place, feeling like in home.</blockquote>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div role='tabpanel' className='tab-pane' id='usersettings'>
                <div className='card'>
                  <div className='header'>
                    <h2>
                      <strong>Security</strong> Settings
                    </h2>
                  </div>
                  <div className='body'>
                    <div className='form-group'>
                      <input type='text' className='form-control' placeholder='Username' />
                    </div>
                    <div className='form-group'>
                      <input type='password' className='form-control' placeholder='Current Password' />
                    </div>
                    <div className='form-group'>
                      <input type='password' className='form-control' placeholder='New Password' />
                    </div>
                    <button className='btn btn-info btn-round'>Save Changes</button>
                  </div>
                </div>
                <div className='card'>
                  <div className='header'>
                    <h2>
                      <strong>Account</strong> Settings
                    </h2>
                  </div>
                  <div className='body'>
                    <div className='row clearfix'>
                      <div className='col-lg-6 col-md-12'>
                        <div className='form-group'>
                          <input type='text' className='form-control' placeholder='First Name' />
                        </div>
                      </div>
                      <div className='col-lg-6 col-md-12'>
                        <div className='form-group'>
                          <input type='text' className='form-control' placeholder='Last Name' />
                        </div>
                      </div>
                      <div className='col-lg-4 col-md-12'>
                        <div className='form-group'>
                          <input type='text' className='form-control' placeholder='City' />
                        </div>
                      </div>
                      <div className='col-lg-4 col-md-12'>
                        <div className='form-group'>
                          <input type='text' className='form-control' placeholder='E-mail' />
                        </div>
                      </div>
                      <div className='col-lg-4 col-md-12'>
                        <div className='form-group'>
                          <input type='text' className='form-control' placeholder='Country' />
                        </div>
                      </div>
                      <div className='col-md-12'>
                        <div className='form-group'>
                          <textarea rows={4} className='form-control no-resize' placeholder='Address Line 1' defaultValue={''} />
                        </div>
                      </div>
                      <div className='col-md-12'>
                        <div className='checkbox'>
                          <input id='procheck1' type='checkbox' />
                          <label htmlFor='procheck1'>Profile Visibility For Everyone</label>
                        </div>
                        <div className='checkbox'>
                          <input id='procheck2' type='checkbox' />
                          <label htmlFor='procheck2'>New task notifications</label>
                        </div>
                        <div className='checkbox'>
                          <input id='procheck3' type='checkbox' />
                          <label htmlFor='procheck3'>New friend request notifications</label>
                        </div>
                      </div>
                      <div className='col-md-12'>
                        <button className='btn btn-primary btn-round'>Save Changes</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
