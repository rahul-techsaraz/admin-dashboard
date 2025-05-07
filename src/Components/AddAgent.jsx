import React from 'react'

export default function AddAgent() {
  return (
    <>
      <div className='container-fluid'>
        <div className='row clearfix'>
          <div className='col-lg-12'>
            <div className='card'>
              <div className='header'>
                <h2>
                  <strong>Basic</strong> Information <small>Description text here...</small>{' '}
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
                    <ul className='dropdown-menu dropdown-menu-right slideUp'>
                      <li>
                        <a href='javascript:void(0);'>Action</a>
                      </li>
                      <li>
                        <a href='javascript:void(0);'>Another action</a>
                      </li>
                      <li>
                        <a href='javascript:void(0);'>Something else</a>
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
                <div className='row clearfix'>
                  <div className='col-sm-4'>
                    <div className='form-group'>
                      <input type='text' className='form-control' placeholder='First Name' />
                    </div>
                  </div>
                  <div className='col-sm-4'>
                    <div className='form-group'>
                      <input type='text' className='form-control' placeholder='Last Name' />
                    </div>
                  </div>
                  <div className='col-sm-4'>
                    <div className='form-group'>
                      <input type='text' className='form-control' placeholder='Phone No.' />
                    </div>
                  </div>
                  <div className='col-sm-3'>
                    <div className='form-group'>
                      <input type='text' className='form-control' placeholder='Date of Birth' />
                    </div>
                  </div>
                  <div className='col-sm-3'>
                    <div className='form-group'>
                      <input type='text' className='form-control' placeholder='Age' />
                    </div>
                  </div>
                  <div className='col-sm-3'>
                    <select className='form-control show-tick'>
                      <option value>-- Gender --</option>
                      <option value={10}>Male</option>
                      <option value={20}>Female</option>
                    </select>
                  </div>
                  <div className='col-sm-3'>
                    <div className='form-group'>
                      <input type='text' className='form-control' placeholder='Enter Your Email' />
                    </div>
                  </div>
                </div>
                <h6 className='mt-4'>Account Information</h6>
                <div className='row clearfix'>
                  <div className='col-md-3 col-sm-6'>
                    <div className='form-group'>
                      <input type='text' className='form-control' placeholder='Email' />
                    </div>
                  </div>
                  <div className='col-md-3 col-sm-6'>
                    <div className='form-group'>
                      <input type='text' className='form-control' placeholder='Phone' />
                    </div>
                  </div>
                  <div className='col-md-3 col-sm-6'>
                    <div className='form-group'>
                      <input type='text' className='form-control' placeholder='Password' />
                    </div>
                  </div>
                  <div className='col-md-3 col-sm-6'>
                    <div className='form-group'>
                      <input type='text' className='form-control' placeholder='Confirm Password' />
                    </div>
                  </div>
                </div>
                <h6 className='mt-4'>Account Information</h6>
                <div className='row clearfix'>
                  <div className='col-md-3 col-sm-6'>
                    <div className='form-group'>
                      <input type='text' className='form-control' placeholder='Facebook' />
                    </div>
                  </div>
                  <div className='col-md-3 col-sm-6'>
                    <div className='form-group'>
                      <input type='text' className='form-control' placeholder='Twitter' />
                    </div>
                  </div>
                  <div className='col-md-3 col-sm-6'>
                    <div className='form-group'>
                      <input type='text' className='form-control' placeholder='Google' />
                    </div>
                  </div>
                  <div className='col-md-3 col-sm-6'>
                    <div className='form-group'>
                      <input type='text' className='form-control' placeholder='Linkdin' />
                    </div>
                  </div>
                  <div className='col-sm-12'>
                    {/* <form action="https://thememakker.com/" id="frmFileUpload" className="dropzone" method="post" encType="multipart/form-data">
                <div className="dz-message">
                  <div className="drag-icon-cph"> <i className="material-icons">touch_app</i> </div>
                  <h3>Drop files here or click to upload.</h3>
                  <em>(This is just a demo dropzone. Selected files are <strong>not</strong> actually uploaded.)</em> </div>
                <div className="fallback">
                  <input name="file" type="file" multiple />
                </div>
              </form> */}
                  </div>
                  <div className='col-sm-12 mt-4'>
                    <button type='submit' className='btn btn-primary btn-round'>
                      Submit
                    </button>
                    <button type='submit' className='btn btn-default btn-round btn-simple'>
                      Cancel
                    </button>
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
