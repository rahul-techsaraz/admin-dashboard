import React from 'react'
import { Alert, AlertTitle, Box, Button, Typography } from '@mui/material'
const ErrorBoundary = () => {
  const handleReload = () => {
    window.location.reload()
  }
  return (
    <Box
      sx={{
        margin: '6rem 18rem',
        padding: '2rem 4rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 3
      }}
    >
      <Alert severity='error' sx={{ mb: 2, width: '100%' }}>
        <AlertTitle>
          <strong>Something went wrong</strong>
        </AlertTitle>
        <Typography variant='body2' sx={{ whiteSpace: 'pre-wrap' }}>
          {'Something went wrong , Please connect with your technical team.'}
        </Typography>
      </Alert>

      <Button variant='contained' color='primary' onClick={handleReload}>
        Reload Page
      </Button>
    </Box>
  )
}

export default ErrorBoundary
