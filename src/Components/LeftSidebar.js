import React, { useEffect, useState } from 'react'
import leftLogo from '../assets/images/profile_avatar.jpg'
import { Link, useNavigate, useNavigation } from 'react-router-dom'
import { constants } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { updateActiveSubHeader } from '../features/subHeaderMenuSlice'

export default function LeftSidebar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [activeOption, setActiveOption] = useState(0)
  const [isOpen, setOpen] = useState(false)
  const { userInfo } = useSelector((state) => state.user)
  const handleNavigation = (path, categoryName) => {
    if (categoryName) {
      const filterSubHeaderArr = constants.subHeaderMenu.filter((data) => data.name.toLowerCase() === categoryName.toLowerCase())
      dispatch(updateActiveSubHeader({ subHeaderArr: filterSubHeaderArr }))
    }
  }
  const handleClick = (i) => {
    if (i === activeOption) {
      setOpen(!isOpen)
    } else {
      setOpen(false)
      setActiveOption(i)
      setOpen(true)
    }
  }

  return (
    <>
      <aside id='leftsidebar' className='sidebar'>
        <ul className='nav nav-tabs'>
          <li className='nav-item'>
            <span className='nav-link active' data-toggle='tab'>
              <i className='zmdi zmdi-home m-r-5' />
              Admission Kart
            </span>
          </li>
        </ul>
        <div className='tab-content'>
          <div className='tab-pane stretchRight active' id='dashboard'>
            <div className='menu'>
              <ul className='list'>
                <li>
                  <div className='user-info'>
                    <div className='image'>
                      <Link to={'/'}>
                        <img src={leftLogo} alt='User' />
                      </Link>
                    </div>
                    <div className='detail'>
                      <h4>{userInfo.first_name}</h4>
                      <small>{userInfo.user_role}</small>
                    </div>
                  </div>
                </li>
                <li className='header'>MAIN</li>
                {constants.sideBarMenu
                  .filter((menu) => menu.role === userInfo.user_role)
                  .map((data, i) => (
                    <li>
                      <Link
                        className='menu-toggle'
                        onClick={() => {
                          handleClick(i)
                        }}
                      >
                        <i className='zmdi zmdi-city' />
                        <span>{data.heading}</span>
                      </Link>
                      <ul className='ml-menu' style={activeOption === i && isOpen ? { display: 'block' } : { display: 'none' }}>
                        {data.list &&
                          data?.list.map((listName) => (
                            <li>
                              <Link onClick={() => handleNavigation(listName.option_path, listName?.name)} to={listName.option_path}>
                                {listName.option_name}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className='tab-pane stretchLeft' id='user'>
            <div className='menu'>
              <ul className='list'>
                <li>
                  <div className='user-info m-b-20 p-b-15'>
                    <div className='image'>
                      <Link href='profile.html'>
                        <img src={leftLogo} alt='User' />
                      </Link>
                    </div>
                    <div className='detail'>
                      <h4>Michael</h4>
                      <small>Agent</small>
                    </div>
                    <Link title='facebook' href='javascript:void(0);'>
                      <i className='zmdi zmdi-facebook' />
                    </Link>
                    <Link title='twitter' href='javascript:void(0);'>
                      <i className='zmdi zmdi-twitter' />
                    </Link>
                    <Link title='instagram' href='javascript:void(0);'>
                      <i className='zmdi zmdi-instagram' />
                    </Link>
                    <p className='text-muted'>795 Folsom Ave, Suite 600 San Francisco, CADGE 94107</p>
                    <div className='row'>
                      <div className='col-4'>
                        <h6 className='mb-1'>852</h6>
                        <small>Deals</small>
                      </div>
                      <div className='col-4'>
                        <h6 className='mb-1'>13k</h6>
                        <small>Sales</small>
                      </div>
                      <div className='col-4'>
                        <h6 className='mb-1'>234</h6>
                        <small>Clients</small>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <small className='text-muted'>Email address: </small>
                  <p>michael@gmail.com</p>
                  <hr />
                  <small className='text-muted'>Phone: </small>
                  <p>+ 202-555-0191</p>
                  <hr />
                  <ul className='list-unstyled'>
                    <li>
                      <div>Honesty &amp; Integrity</div>
                      <div className='progress m-b-20'>
                        <div
                          className='progress-bar l-blue '
                          role='progressbar'
                          aria-valuenow={89}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          style={{ width: '89%' }}
                        >
                          {' '}
                          <span className='sr-only'>62% Complete</span>{' '}
                        </div>
                      </div>
                    </li>
                    <li>
                      <div>Responsiveness</div>
                      <div className='progress m-b-20'>
                        <div
                          className='progress-bar l-green '
                          role='progressbar'
                          aria-valuenow={56}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          style={{ width: '56%' }}
                        >
                          {' '}
                          <span className='sr-only'>87% Complete</span>{' '}
                        </div>
                      </div>
                    </li>
                    <li>
                      <div>Local Knowledge</div>
                      <div className='progress m-b-20'>
                        <div
                          className='progress-bar l-amber'
                          role='progressbar'
                          aria-valuenow={78}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          style={{ width: '78%' }}
                        >
                          {' '}
                          <span className='sr-only'>32% Complete</span>{' '}
                        </div>
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
