import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UpdateAdminData } from '../../features/userSlice'
import { Box, Grid, Modal, TextField, Typography } from '@mui/material'
import { constants } from '../../utils/constants'
import { updateError } from '../../features/commonSlice'
import usePasswordManage from '../../hooks/usePasswordManage'
import '../../modal/forgotmodal.css'
import { useNavigate } from 'react-router-dom'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #9b6fc1',
    boxShadow: 24,
    p: 4,
    gap: 2
}

const ChangePassword = () => {
    const [isVerify, setIsVerify] = useState(false)
    const [password, setPassword] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    })
    const OTP_LENGTH = 4
    const inputRefs = useRef([])
    const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''))
    const [otp4Digit, set4digitOtp] = useState('')
    const { isChangePassword, userInfo } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const { changePassword } = usePasswordManage()
    const { generate4DigitOTP, manageFoegotPassword, sendEmail, modifyCurrentPassword } = usePasswordManage()
    const navigate = useNavigate()

    const handleChange = (e, index) => {
        const value = e.target.value.replace(/\D/g, '')
        if (!value) return

        const newOtp = [...otp]
        newOtp[index] = value[0] // Only take first digit
        setOtp(newOtp)

        if (index < OTP_LENGTH - 1) {
            inputRefs.current[index + 1].focus()
        }
    }

    const handlePaste = (e) => {
        e.preventDefault()
        const pasted = e.clipboardData.getData('Text').replace(/\D/g, '')
        const newOtp = [...otp]

        for (let i = 0; i < OTP_LENGTH; i++) {
            newOtp[i] = pasted[i] || ''
            if (inputRefs.current[i]) {
                inputRefs.current[i].value = pasted[i] || ''
            }
        }

        setOtp(newOtp)

        const lastFilled = Math.min(pasted.length, OTP_LENGTH) - 1
        inputRefs.current[lastFilled]?.focus()
    }

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            e.preventDefault()
            const newOtp = [...otp]

            if (otp[index]) {
                newOtp[index] = ''
                setOtp(newOtp)
                inputRefs.current[index].value = ''
            } else if (index > 0) {
                inputRefs.current[index - 1].focus()
                newOtp[index - 1] = ''
                setOtp(newOtp)
                inputRefs.current[index - 1].value = ''
            }
        }
    }

    const handleVerify = () => {
        const enteredOtp = otp.join('')
        console.log('Entered OTP:', enteredOtp)
        // Add your verify logic here

        if (password.newPassword !== password.confirmPassword) {
            dispatch(
                updateError({
                    errorType: constants.apiResponseStatus.WARNING,
                    errorMessage: 'Password and confirm password is not same',
                    flag: true
                })
            )
            return
        }
        if (password.newPassword.length < 8) {
            dispatch(
                updateError({
                    errorType: constants.apiResponseStatus.WARNING,
                    errorMessage: 'Please use strong password and length should be more than 8 ',
                    flag: true
                })
            )
            return
        }

        //Call API to update Password
        modifyCurrentPassword({ email: userInfo.email, previous_password: password.oldPassword, new_password: password.newPassword, otp: enteredOtp })
            .then((res) => {
                if (res.payload.success === 1) {
                    dispatch(
                        updateError({
                            errorType: constants.apiResponseStatus.SUCCESS,
                            errorMessage: 'Your Password update successfully',
                            flag: true
                        })
                    )
                    setIsVerify(false)
                    handleClose()
                    localStorage.removeItem('token')
                    localStorage.removeItem('userData')
                    dispatch(UpdateAdminData({ classKey: 'isUserAuthenticated', value: false }))
                    navigate('/')
                    return
                } else {
                    throw new Error(res?.payload?.message ?? 'Something went wrong please try again')
                }
            })
            .catch((err) => console.error(err))
    }

    const handleClose = () => {
        dispatch(UpdateAdminData({ classKey: 'isChangePassword', value: !isChangePassword }))
    }

    const handleSubmit = async () => {
        let Newotp = generate4DigitOTP()
        while (Newotp === '0000') {
            Newotp = generate4DigitOTP()
        }

        set4digitOtp(Newotp) // Save OTP for modal
        console.log(Newotp)

        const subject = 'Use This OTP to Complete Your Action'
        const fromEmail = 'rahul.tech.mastery@gmail.com'
        const fromEmailName = 'AdmissionKartTeam'

        const otpEmailTemplate = `
            <!DOCTYPE html>
            <html>
            <head><meta charset="UTF-8" /><title>Your OTP Code</title></head>
            <body style="font-family:Arial,sans-serif;background:#f4f6f8;padding:20px;">
            <div style="max-width:500px;margin:auto;background:#fff;padding:30px;text-align:center;border-radius:8px;">
                <h2>🔐 Your OTP Code</h2>
                <p>This code is valid for 10 minutes.</p>
                <div style="font-size:32px;font-weight:bold;color:#2c3e50;margin:20px 0;">${Newotp}</div>
                <p>Please do not share this with anyone.</p>
                <div style="font-size:12px;color:#777;margin-top:30px;">If you did not request this, ignore the email.</div>
            </div>
            </body>
            </html>
        `

        const mailPayload = {
            toEmail: userInfo.email,
            subject,
            fromEmail,
            htmlTemplate: otpEmailTemplate,
            fromEmailName
        }
        try {
            const response = await manageFoegotPassword(userInfo.email)
            if (response.payload.success === 1) {
                dispatch(
                    updateError({
                        errorType: constants.apiResponseStatus.ERROR,
                        errorMessage: 'OTP send to Email Sucessfully',
                        flag: true
                    })
                )
                setIsVerify(true)
            } else {
                dispatch(
                    updateError({
                        errorType: constants.apiResponseStatus.ERROR,
                        errorMessage: 'Failed to send OTP or reset password. Please try again.',
                        flag: true
                    })
                )
            }
        } catch (err) {
            console.error('Forgot password error:', err)
            dispatch(
                updateError({
                    errorType: constants.apiResponseStatus.ERROR,
                    errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
                    flag: true
                })
            )
        }
    }

    useEffect(() => {
        console.log(password)
    }, [password])
    return (
        <Modal open={isChangePassword} onClose={handleClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
            <Box sx={style}>
                <div className='admin-role-modal'>
                    {isVerify &&
                        <div className='otp-model-form-filed-mail-icon-box-text'>
                            <h3>Check your email</h3>
                            <p>We sent a code to {userInfo.email}</p>
                        </div>}
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} className='gridItem'>
                            <TextField
                                label='Old Password'
                                variant='outlined'
                                fullWidth
                                value={password.oldPassword}
                                onChange={(e) => setPassword({ ...password, oldPassword: e.target.value })}
                                className='inputField'
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} className='gridItem'>
                            <TextField
                                label='New Password'
                                variant='outlined'
                                fullWidth
                                value={password.newPassword}
                                onChange={(e) => setPassword({ ...password, newPassword: e.target.value })}
                                className='inputField'
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} className='gridItem'>
                            <TextField
                                label='Confirm Password'
                                variant='outlined'
                                fullWidth
                                value={password.confirmPassword}
                                onChange={(e) => setPassword({ ...password, confirmPassword: e.target.value })}
                                className='inputField'
                            />
                        </Grid>
                    </Grid>
                    {isVerify &&
                        <div className='otp-code-main-box' onPaste={handlePaste}>
                            {otp.map((digit, i) => (
                                <input
                                    key={i}
                                    type='text'
                                    maxLength={1}
                                    className='otp-input'
                                    ref={(el) => (inputRefs.current[i] = el)}
                                    value={otp[i]}
                                    onChange={(e) => handleChange(e, i)}
                                    onKeyDown={(e) => handleKeyDown(e, i)}
                                    inputMode='numeric'
                                    autoComplete='one-time-code'
                                />
                            ))}
                        </div>}

                    {isVerify &&
                        <div className='otp-get-code-text'>
                            Didn’t get a code? <span>click to send</span>
                        </div>}

                    <div className='Change-password-btn-containor'>
                        <button className='btn btn-primary btn-round' onClick={() => handleClose()}>
                            Close
                        </button>
                        {isVerify ? <button className='btn btn-primary btn-round' onClick={() => handleVerify()}>
                            Verify
                        </button> :
                            <button className='btn btn-primary btn-round' onClick={() => handleSubmit()}>
                                Submit
                            </button>
                        }
                    </div>
                </div>
            </Box>
        </Modal>
    )
}

export default ChangePassword