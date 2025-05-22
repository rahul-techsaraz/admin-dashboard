import React from 'react'
import { useDispatch } from 'react-redux'
import { addNewAdmin } from '../utils/reduxThunk/commonThunk'
import { constants } from '../utils/constants'

const useUserData = () => {
    const dispatch = useDispatch()
    const addNewAdminData = async (payload) => {
        dispatch(addNewAdmin({
            url: constants.apiEndPoint.ADMIN_REGISTER,
            header: constants.apiHeaders.HEADER,
            method: constants.httpMethod.POST,
            payload: payload
        }))
    }
    return { addNewAdminData }
}

export default useUserData