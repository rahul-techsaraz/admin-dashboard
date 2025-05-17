import React, { useContext } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { constants } from '../utils/constants'
import { createNewCollege, deleteNewCollegeById, fetchAgentCollegeList, fetchAllCollegeList, fetchCityList, fetchNewCollegeById, fetchStateList, updateNewCollegeById, updateNewMessage } from '../utils/reduxThunk/collegeThunk'
import { resetCollege, updateCollegeInfo } from '../features/newCollegeSlice'
import { updateError } from '../features/commonSlice'
import { FileUpload } from '../utils/FileUpload'

const useCollegeData = () => {
    const { userInfo } = useSelector((state) => state.user, shallowEqual)
    const { stateList } = useSelector((state) => state.newCollege, shallowEqual)
    const {
        setFacultyImage,
        setFacultyImageUrl,
        setCollegeLogo,
        setCollegeLogoUrl,
        setCollegeThumbnail,
        setCollegeThumbnailUrl,
        setCollegeBrochure,
        setCollegeBrochureUrl,
        setCollegeGallary,
        setCollegeGallaryUrl
    } = useContext(FileUpload)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const customHeader = constants.apiHeaders.customHeader(userInfo.token)

    const getAllCollege = () => {
        dispatch(
            fetchAllCollegeList({
                url: constants.apiEndPoint.NEW_COLLEGE,
                header: constants.apiHeaders.HEADER,
                method: constants.httpMethod.GET
            })
        )
    }

    const getAgentCollege = () => {
        dispatch(
            fetchAgentCollegeList({
                url: constants.apiEndPoint.NEW_COLLEGE,
                header: constants.apiHeaders.HEADER,
                method: constants.httpMethod.GET
            })
        )
    }

    const getCollegeByID = (collegeId) => {
        dispatch(
            fetchNewCollegeById({
                url: `${constants.apiEndPoint.NEW_COLLEGE}?college_id=${collegeId}`,
                header: constants.apiHeaders.HEADER,
                method: constants.httpMethod.GET
            })
        )
    }

    const deleteCollegebyId = (collegeId, collegeName) => {
        dispatch(
            deleteNewCollegeById({
                url: constants.apiEndPoint.NEW_COLLEGE + `?college_id=${collegeId}&college_name=${collegeName}`,
                header: { ...constants.apiHeaders.HEADER, ...customHeader },
                method: constants.httpMethod.DELETE
            })
        )
    }

    const getAllState = () => {
        dispatch(
            fetchStateList({
                url: constants.apiEndPoint.STATE_LIST,
                header: { 'X-CSCAPI-KEY': import.meta.env.VITE_STATE_CITY_KEY },
                method: constants.httpMethod.GET
            })
        )
    }

    const getAllCity = async (state) => {
        if (!state || stateList.length < 1) {
            return
        }
        const stateISO = stateList.filter((data) => data.name === state)[0].iso2
        const response = await dispatch(
            fetchCityList({
                url: `${constants.apiEndPoint.CITY_LIST}${stateISO}/cities`,
                header: { 'X-CSCAPI-KEY': import.meta.env.VITE_STATE_CITY_KEY },
                method: constants.httpMethod.GET
            })
        )
        console.log(response)
        if (response.payload.length < 1) {
            dispatch(
                updateError({
                    errorType: constants.apiResponseStatus.ERROR,
                    errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
                    flag: true
                })
            )
            dispatch(
                updateCollegeInfo({ classKey: 'searchSelectCity', value: true })
            )
        } else {
            dispatch(
                updateCollegeInfo({ classKey: 'searchSelectCity', value: false })
            )
        }
    }

    const createCollege = async (payload) => {
        const response = await dispatch(
            createNewCollege({
                url: constants.apiEndPoint.NEW_COLLEGE,
                payload: payload,
                header: { ...customHeader, ...constants.apiHeaders.HEADER_FORM_DATA }
            })
        )
        if (response.payload.data.status === constants.apiResponseStatus.SUCCESS) {
            localStorage.removeItem('formData')
            dispatch(resetCollege())
            setCollegeLogo([])
            setCollegeLogoUrl([])
            setCollegeThumbnail([])
            setCollegeThumbnailUrl([])
            setCollegeBrochure([])
            setCollegeBrochureUrl([])
            setCollegeGallary([])
            setCollegeGallaryUrl([])
            setFacultyImage([])
            setFacultyImageUrl([])
            navigate('/list-agent-college')
        }
    }

    const updateCollegeDataByID = async (payload, collegeId) => {
        const response = await dispatch(
            updateNewCollegeById({
                url: `${constants.apiEndPoint.NEW_COLLEGE}?college_id=${collegeId}`,
                payload: payload,
                header: { ...customHeader, ...constants.apiHeaders.HEADER_FORM_DATA }
            })
        )
        if (response.payload.data.status === constants.apiResponseStatus.SUCCESS) {
            localStorage.removeItem('formData')
            dispatch(resetCollege())
            setCollegeLogo([])
            setCollegeLogoUrl([])
            setCollegeThumbnail([])
            setCollegeThumbnailUrl([])
            setCollegeBrochure([])
            setCollegeBrochureUrl([])
            setCollegeGallary([])
            setCollegeGallaryUrl([])
            setFacultyImage([])
            setFacultyImageUrl([])
            navigate('/list-agent-college')
        }
    }

    const updateMessage = async (payload) => {
        const response = await dispatch(
            updateNewMessage({
                url: constants.apiEndPoint.NEW_COLLEGE,
                header: { ...customHeader, ...constants.apiHeaders.HEADER },
                method: constants.httpMethod.PUT,
                payload: payload
            })
        )
        if (response.payload.status === constants.apiResponseStatus.SUCCESS) {
            getAllCollege()
            navigate('/list-college')
        }
    }
    return { getAllCollege, getAgentCollege, getCollegeByID, deleteCollegebyId, getAllState, getAllCity, createCollege, updateCollegeDataByID, updateMessage }
}

export default useCollegeData