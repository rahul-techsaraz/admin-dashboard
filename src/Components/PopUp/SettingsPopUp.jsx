import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleUserAuthentication, UpdateAdminData, updateUserInfo, updateUserToken } from '../../features/userSlice'
import './settingsPopUp.css'
import { Link } from 'react-router-dom'
import CustomButton from '../../utils/CommonComponents/CustomButton'

const SettingsPopUp = () => {
    const { isSettingPopup, isChangePassword, userInfo } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const handleSignout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('token')
            localStorage.removeItem('userData')
            dispatch(handleUserAuthentication({ flag: false }))
            dispatch(updateUserToken({ token: '' }))
            dispatch(updateUserInfo({ userInfo: {} }))
            dispatch(UpdateAdminData({ classKey: 'isSettingPopup', value: !isSettingPopup }))
        }
    }

    return (
        <div className="settings-popup-parent" onClick={(e) => dispatch(UpdateAdminData({ classKey: 'isSettingPopup', value: !isSettingPopup }))}>
            <div className="settings-popup-card" onClick={(e) => e.stopPropagation()}>
                <div className="settings-popup-card-inner">
                    <p className="settings-popup-card-p settings-popup-card-heading">{`${userInfo.first_name} ${userInfo.last_name}`}</p>
                    <p className="settings-popup-card-p">{userInfo.email}</p>
                    <hr></hr>
                    <div className="settings-popup-card-link" onClick={(e) => {
                        dispatch(UpdateAdminData({ classKey: 'isChangePassword', value: !isChangePassword }));
                        dispatch(UpdateAdminData({ classKey: 'isSettingPopup', value: !isSettingPopup }));
                    }}>
                        <i className="zmdi zmdi-account-circle zmdi-hc-3x"></i>
                        <span>Change Password</span>
                    </div>
                    <hr></hr>
                    <div className="settings-popup-card-btn">
                        <CustomButton
                            lable={'Signout'}
                            styles={{ padding: '0px 20px', height: '40px' }}
                            onClick={(e) => handleSignout()}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingsPopUp