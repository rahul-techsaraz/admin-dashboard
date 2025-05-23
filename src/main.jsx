import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { RouterProvider } from 'react-router-dom'
import { appRouter } from './Routes/router'
import { Provider } from 'react-redux'
import store from './state/store'
import 'react-toastify/dist/ReactToastify.css'
import ErrorBoundary from './Components/ErrorBoundary'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <RouterProvider router={appRouter} />
        </LocalizationProvider>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
