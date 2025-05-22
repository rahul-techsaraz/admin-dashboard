import React from 'react'
import logo1 from '../assets/images/imgpsh_fullsize_anim.jpeg'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { UpdateAdminData } from '../features/userSlice'

export default function Header() {
  const { isSettingPopup } = useSelector((state) => state.user)
  const dispatch = useDispatch()


  return (
    <>
      <nav className='navbar p-l-5 p-r-5'>
        <ul className='nav navbar-nav navbar-left'>
          <li>
            <div className='navbar-header'>
              <Link className='navbar-brand' to={'/'}>
                <img src={logo1} width='80' alt='Admission Kart' />
              </Link>
            </div>
          </li>

          <li className='dropdown'>
            <ul className='dropdown-menu pullDown'>
              <li className='body'>
                <ul className='menu list-unstyled'>
                  <li>
                    <Link to={'/'}>
                      <div className='media'>
                        <img className='media-object w60' src='assets/images/image-gallery/1.jpg' alt='' />
                        <div className='media-body'>
                          <span className='name'>
                            Sophia <span className='time'>For Sale</span>
                          </span>
                          <span className='message'>Relaxing Apartment</span>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to={'/'}>
                      <div className='media'>
                        <img className='media-object w60' src='assets/images/image-gallery/2.jpg' alt='' />
                        <div className='media-body'>
                          <span className='name'>
                            Sophia <span className='time'>For Rent</span>
                          </span>
                          <span className='message'>Co-op Apartment in Bay Terrace</span>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to={'/'}>
                      <div className='media'>
                        <img className='media-object w60' src='assets/images/image-gallery/3.jpg' alt='' />
                        <div className='media-body'>
                          <span className='name'>
                            Isabella <span className='time'>For Rent</span>
                          </span>
                          <span className='message'>A must see Villa on Chicago Ave</span>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to={'/'}>
                      <div className='media'>
                        <img className='media-object w60' src='assets/images/image-gallery/4.jpg' alt='' />
                        <div className='media-body'>
                          <span className='name'>
                            Alexander <span className='time'>For Sale</span>
                          </span>
                          <span className='message'>5 Room Apartment Special Deal</span>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to={'/'}>
                      <div className='media'>
                        <img className='media-object w60' src='assets/images/image-gallery/5.jpg' alt='' />
                        <div className='media-body'>
                          <span className='name'>
                            Grayson <span className='time'>For Rent</span>
                          </span>
                          <span className='message'>Real House Luxury Villa</span>
                        </div>
                      </div>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className='footer'>
                {' '}
                <Link to={'/'}>View All</Link>{' '}
              </li>
            </ul>
          </li>

          <li className='float-right' style={{ padding: '1rem' }}>
            {/* <Link to={'/'} className='mega-menu' data-close='true'> */}
            <i className="zmdi zmdi-settings" style={{ color: '#FFFFFF' }} onClick={() => dispatch(UpdateAdminData({ classKey: 'isSettingPopup', value: !isSettingPopup }))}></i>
            {/* </Link> */}
          </li>
        </ul>
      </nav>
    </>
  )
}
