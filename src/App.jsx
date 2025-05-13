import React, { useEffect, useState } from 'react'
import Header from './Components/Header'
import './assets/css/authentication.css'
import './assets/css/blog.css'
import './assets/css/chatapp.css'
import './assets/css/bootstrap-select.css'
import './assets/css/color_skins.css'

import './assets/css/dropzone.css'
import './assets/css/inbox.css'
import './assets/css/jquery-jvectormap-2.0.3.min.css'
import './assets/css/main.css'
import './assets/css/plugin.css'
import './assets/css/timeline.css'
import './assets/fonts/Material-Design-Iconic-Fontd1f1.ttf'
import './assets/fonts/Material-Design-Iconic-Fontd1f1.woff'
import './assets/fonts/Material-Design-Iconic-Fontd1f1.woff2'
import './assets/fonts/nucleo-outline.eot'
import './assets/fonts/nucleo-outline.ttf'
import './assets/fonts/nucleo-outline.woff'
import './assets/fonts/nucleo-outline.woff2'
import LeftSidebar from './Components/LeftSidebar'
import { Link, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loader from './Components/Loader/Loader'
import CustomAllert from './utils/CommonComponents/CustomAllert'

function App() {
  const [isSnackBarOpen, setSnackBarOpen] = useState(false)
  const { activeSubHeader } = useSelector((state) => state.subheadermenu)
  const { isLoading, isError, isOpenToast, errorMessage, errorType } = useSelector((state) => state.common)
  console.log(isSnackBarOpen, isError, isOpenToast)
  useEffect(() => {
    const isOpen = isError || isOpenToast
    setSnackBarOpen(isOpen)
  }, [isOpenToast, isError])
  return (
    <>
      {isLoading && <Loader />}
      {isSnackBarOpen && <CustomAllert isError={isError} errorMessage={errorMessage} errorType={errorType} />}

      <body className='theme-purple'>
        <Header />
        <LeftSidebar />
        <section className='content'>
          <div className='block-header'>
            <div className='row'>
              <div className='col-lg-3 col-md-3 col-sm-12'>
                <h2>
                  <small>Welcome to Admission Kart</small>
                </h2>
              </div>
              <div className='col-lg-9 col-md-9 col-sm-12 text-md-right'>
                {activeSubHeader.length > 0
                  ? activeSubHeader[0]?.navMenu.map((itemsName) => (
                      <ul className='breadcrumb float-md-right' style={{ marginRight: '16px' }} key={itemsName.labelName}>
                        <li className='breadcrumb-item'>
                          <Link to={itemsName.path}>
                            <i className='zmdi zmdi-home'></i> {itemsName.labelName}
                          </Link>
                        </li>
                      </ul>
                    ))
                  : ''}
              </div>
            </div>
          </div>
          <Outlet />
        </section>
      </body>
    </>
  )
}

export default App
