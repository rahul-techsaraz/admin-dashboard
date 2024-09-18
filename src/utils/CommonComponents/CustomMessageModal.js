import React from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextArea from './TextArea';
import { useSelector } from 'react-redux';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #9b6fc1',
    boxShadow: 24,
    p: 4,
};
const BtnBoxStyle = {
    display: 'flex',
    justifyContent: 'center'
}

export default function CustomMessageModal({ open, handleClose, handleEdit, message, setOpen }) {
    const { collegeBasicDetails } = useSelector(state => state.college)
    return (
        <div>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <TextArea
                        placeholder={'Enter the Reason'}
                        noOfROws={6}
                        noOfCols={55}
                        fieldName={'Message'}
                        styles={{ border: 'solid #e83e8c 1px', borderRadius: '1rem' }}
                        onChange={(e) => handleEdit(e)}
                        inputValue={message ? message : collegeBasicDetails.message}
                    />
                    <Box sx={BtnBoxStyle}>
                        <button class="btn btn-primary btn-round" onClick={() => handleClose()}>Submit</button>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}
