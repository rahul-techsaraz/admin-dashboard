import { Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { UpdateAdminData } from '../../features/userSlice'
import AddItemForm from '../AddItemForm'
import { constants } from '../../utils/constants'
import CustomButton from '../../utils/CommonComponents/CustomButton'
import useValidation from '../../hooks/useValidation'
import useUserData from '../../hooks/useUserData'

const CreateNewAdmin = () => {
    const {
        first_name,
        last_name,
        phone_number,
        email,
        password,
        account_name,
        institute_name,
        designation,
        user_role
    } = useSelector((state) => state.user.newAdmin, shallowEqual)
    const { userInfo } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const { validateName, validatePhone, validateEmail, validatePassword } = useValidation()
    const { addNewAdminData } = useUserData()

    const handleSubmit = () => {
        if (
            validateName(first_name, last_name) &&
            validatePhone(phone_number) &&
            validateEmail(email) &&
            validatePassword(password) &&
            account_name !== '' &&
            user_role !== '') {
            const payload = {
                first_name: first_name,
                last_name: last_name,
                phone_number: phone_number,
                email: email,
                password: password,
                account_name: account_name,
                institute_name: 'dummy',
                designation: 'dummy',
                user_role: user_role,
                user_status: 'Active',
                approvedBy: `${userInfo.first_name} ${userInfo.last_name}`
            }
            addNewAdminData(payload)
        }
    }
    return (
        <AddItemForm label={'Add New Admin'} style={{ flexDirection: 'column', gap: '16px', justifyContent: 'center', alignItems: 'center' }}>
            <Box className='container'>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} className='gridItem'>
                        <TextField
                            label='First Name'
                            variant='outlined'
                            fullWidth
                            value={first_name}
                            onChange={(e) => dispatch(UpdateAdminData({ classKey: 'newAdmin', key: 'first_name', value: e.target.value }))}
                            className='inputField'
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} className='gridItem'>
                        <TextField
                            label='Last Name'
                            variant='outlined'
                            fullWidth
                            value={last_name}
                            onChange={(e) => dispatch(UpdateAdminData({ classKey: 'newAdmin', key: 'last_name', value: e.target.value }))}
                            className='inputField'
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} className='gridItem'>
                        <TextField
                            label='Phone'
                            variant='outlined'
                            fullWidth
                            value={phone_number}
                            onChange={(e) => dispatch(UpdateAdminData({ classKey: 'newAdmin', key: 'phone_number', value: e.target.value }))}
                            className='inputField'
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} className='gridItem'>
                        <TextField
                            label='Email'
                            variant='outlined'
                            fullWidth
                            value={email}
                            onChange={(e) => dispatch(UpdateAdminData({ classKey: 'newAdmin', key: 'email', value: e.target.value }))}
                            className='inputField'
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} className='gridItem'>
                        <TextField
                            label='Password'
                            variant='outlined'
                            fullWidth
                            value={password}
                            onChange={(e) => dispatch(UpdateAdminData({ classKey: 'newAdmin', key: 'password', value: e.target.value }))}
                            className='inputField'
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} className='gridItem'>
                        <TextField
                            label='Account Name'
                            variant='outlined'
                            fullWidth
                            value={account_name}
                            onChange={(e) => dispatch(UpdateAdminData({ classKey: 'newAdmin', key: 'account_name', value: e.target.value }))}
                            className='inputField'
                        />
                    </Grid>

                    {/* <Grid item xs={12} sm={6} className='gridItem'>
                            <TextField
                                label='Institute Name'
                                variant='outlined'
                                fullWidth
                                value={institute_name}
                                onChange={(e) => dispatch(UpdateAdminData({ classKey: 'newAdmin', key: 'institute_name', value: e.target.value }))}
                                className='inputField'
                            />
                        </Grid> */}

                    {/* <Grid item xs={12} sm={6} className='gridItem'>
                            <TextField
                                label='Designation'
                                variant='outlined'
                                fullWidth
                                value={designation}
                                onChange={(e) => dispatch(UpdateAdminData({ classKey: 'newAdmin', key: 'designation', value: e.target.value }))}
                                className='inputField'
                            />
                        </Grid> */}

                    {/* <Grid item xs={12} sm={6} className='gridItem'>
                            <TextField
                                label='Designation'
                                variant='outlined'
                                fullWidth
                                value={designation}
                                onChange={(e) => dispatch(UpdateAdminData({ classKey: 'newAdmin', key: 'designation', value: 'Designation' }))}
                                className='inputField'
                            />
                        </Grid> */}

                    <Grid item xs={12} sm={6} className='gridItem'>
                        <FormControl fullWidth>
                            <InputLabel id='user-role'>User Role</InputLabel>
                            <Select
                                labelId='user-role'
                                value={user_role}
                                onChange={(e) => dispatch(UpdateAdminData({ classKey: 'newAdmin', key: 'user_role', value: e.target.value }))}
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


                </Grid>
            </Box>
            <CustomButton
                lable={'Submit'}
                onClick={() => handleSubmit()}
                styles={{ margin: '0px 30px', padding: '0px 20px', width: '500px', height: '40px' }}
            />
        </AddItemForm>
    )
}

export default CreateNewAdmin