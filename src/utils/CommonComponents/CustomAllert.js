import { Alert, Snackbar } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux';
import { updateError } from '../../features/commonSlice';

export default function CustomAllert({isError, errorMessage, errorType}) {
    const dispatch = useDispatch()
    const vertical = 'top'
    const horizontal = 'right'
    const handleClose = (event) => {
        dispatch(updateError({
            errorType : '',
            errorMessage : '',
            flag : false
        }))
      };
  return (
    <div>
      <Snackbar open={isError} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}>
        <Alert
          onClose={handleClose}
          severity={errorType}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  )
}
