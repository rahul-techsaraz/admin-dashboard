import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  bgcolor: 'background.paper',
  border: '2px solid #9b6fc1',
  boxShadow: 24,
  p: 4
}
const divBoxStyle = {
  color: '#fff',
  width: 25,
  position: 'absolute',
  top: 0,
  left: '97%',
  bgcolor: '#9b6fc1',
  border: '2px solid #9b6fc1',
  boxShadow: 24
  // p: 1.5,
}

export default function CustomModal({ open, handleClose, imgUrl }) {
  return (
    <div>
      <Modal open={open} onClose={handleClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <img src={imgUrl} alt='Certificate' />
          <Box>
            <button class='btn btn-primary btn-round' onClick={() => handleClose()}>
              Close
            </button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}
