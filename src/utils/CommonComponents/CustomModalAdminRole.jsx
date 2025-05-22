import { Box, FormControl, Grid, InputLabel, MenuItem, Modal, Select, Typography } from '@mui/material'
import React from 'react'
import '../../assets/css/admin_modal.css'
import { constants } from '../constants'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    bgcolor: 'background.paper',
    border: '2px solid #9b6fc1',
    boxShadow: 24,
    p: 4,
    gap: 2
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

const CustomModalAdminRole = ({ open, handleClose, handleSubmit, data, roleChange, statusChange }) => {

    return (
        <div>
            <Modal open={open} onClose={handleClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
                <Box sx={style}>
                    <div className='admin-role-modal'>
                        <Typography variant='h5' className='title'>
                            {`${data?.first_name} ${data.last_name}`}
                        </Typography>
                        <Typography>
                            {data?.email}
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6} className='gridItem'>
                                <FormControl fullWidth>
                                    <InputLabel id='user-role-label'>User Role</InputLabel>
                                    <Select
                                        labelId='user-role-label'
                                        value={data.user_role}
                                        onChange={(e) => roleChange(e)}
                                        label='User Role'
                                        className='selectField'
                                    >
                                        {constants.rolesForSuperAdmin.map((role, index) => (
                                            <MenuItem key={index} value={role}>
                                                {role}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6} className='gridItem'>
                                <FormControl fullWidth>
                                    <InputLabel id='user-status-label'>User Status</InputLabel>
                                    <Select
                                        labelId='user-status-label'
                                        value={data.user_status}
                                        onChange={(e) => statusChange(e)}
                                        label='User Status'
                                        className='selectField'
                                    >
                                        <MenuItem value={'active'}>Active</MenuItem>
                                        <MenuItem value={'inactive'}>InActive</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <div className='admin-role-modal-btn-containor'>
                            <button class='btn btn-primary btn-round' onClick={() => handleClose()}>
                                Close
                            </button>

                            <button class='btn btn-primary btn-round' onClick={() => handleSubmit()}>
                                Submit
                            </button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default CustomModalAdminRole