import React, { memo, useEffect } from 'react'
import { constants } from '../../../utils/constants'
import TextArea from '../../../utils/CommonComponents/TextArea'
import { useDispatch, useSelector } from 'react-redux'
import { addCollegeDescription, fetchCollegeDiscriptionById } from '../../../utils/reduxThunk/collegeThunk'
import { updateError } from '../../../features/commonSlice'
import { useNavigate } from 'react-router-dom'
import { updateCollegeInfo } from '../../../features/newCollegeSlice'

const CollegeDescription = ({ collegeId, admin }) => {
    const { collegeDescriptions, isEdit } = useSelector((state) => state.newCollege)
    const { isValitadeError, college_description, college_course_description, college_highlights_description, college_campus_description, college_admission_description } =
        useSelector((state) => state.newCollege.collegeDescriptions)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const updateCollege = async () => {
        try {
            const collegeDescriptionPayload = await {
                college_id: collegeId,
                college_description: college_description,
                college_course_description: college_course_description,
                college_highlights_description: college_highlights_description,
                college_campus_description: college_campus_description,
                college_admission_description: college_admission_description,
            }
            const response = await dispatch(
                addCollegeDescription({
                    url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=basicCollegeDescriptionsDetails',
                    header: constants.apiHeaders.HEADER,
                    method: constants.httpMethod.PUT,
                    payload: collegeDescriptionPayload
                })
            )
            if (response.payload.status === constants.apiResponseStatus.SUCCESS) {
                dispatch(
                    updateError({
                        errorType: constants.apiResponseStatus.SUCCESS,
                        errorMessage: 'College Description Details Updated Sucessfully',
                        flag: true
                    })
                )
                dispatch(
                    fetchCollegeDiscriptionById({
                        url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=basicCollegeDescriptionsDetails&college_id=' + collegeId,
                        header: constants.apiHeaders.HEADER,
                        method: constants.httpMethod.GET
                    })
                )
                dispatch(updateCollegeInfo({ classKey: 'isEdit', value: false }))
            } else {
                dispatch(
                    updateError({
                        errorType: constants.apiResponseStatus.ERROR,
                        errorMessage: 'College Description Details cannot be Updated... Please try again',
                        flag: true
                    })
                )
            }
        }
        catch (error) {
            dispatch(
                updateError({
                    errorType: constants.apiResponseStatus.ERROR,
                    errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
                    flag: true
                })
            )
        }
    }

    const handleCancle = async () => {
        try {
            const response = await dispatch(
                fetchCollegeDiscriptionById({
                    url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=basicCollegeDescriptionsDetails&college_id=' + collegeId,
                    header: constants.apiHeaders.HEADER,
                    method: constants.httpMethod.GET
                })
            )
            if (response.payload.status === constants.apiResponseStatus.SUCCESS) {
                dispatch(updateCollegeInfo({ classKey: 'isEdit', value: false }))
            } else {
                dispatch(
                    updateError({
                        errorType: constants.apiResponseStatus.ERROR,
                        errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
                        flag: true
                    })
                )
            }
        } catch (error) {
            dispatch(
                updateError({
                    errorType: constants.apiResponseStatus.ERROR,
                    errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
                    flag: true
                })
            )
        }
    }

    const handleFormData = (value, classKey, key) => {
        if (collegeId) {
            dispatch(updateCollegeInfo({ classKey: classKey, key: key, value: value }))
        } else {
            let formData = {}
            if (localStorage.getItem('formData')) {
                formData = JSON.parse(localStorage.getItem('formData'))
            }
            const updatedDiscription = {
                ...(formData[classKey] || {}),
                [key]: value
            };
            const updatedFormData = {
                ...formData,
                [classKey]: updatedDiscription
            };
            dispatch(updateCollegeInfo({ classKey: classKey, key: key, value: value }))
            localStorage.setItem('formData', JSON.stringify(updatedFormData))
        }
    }

    // const saveDraft = async () => {
    //     try {
    //         const collegeDescriptionPayload = await {
    //             college_id: collegeId,
    //             college_description: college_description,
    //             college_course_description: college_course_description,
    //             college_highlights_description: college_highlights_description,
    //             college_campus_description: college_campus_description,
    //             college_admission_description: college_admission_description,
    //         }
    //         const response = await dispatch(
    //             addCollegeDescription({
    //                 url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=basicCollegeDescriptionsDetails',
    //                 header: constants.apiHeaders.HEADER,
    //                 method: collegeDescriptions.college_id ? constants.httpMethod.PUT : constants.httpMethod.POST,
    //                 payload: collegeDescriptionPayload
    //             })
    //         )
    //         if (response.payload.status === constants.apiResponseStatus.SUCCESS) {
    //             dispatch(
    //                 updateError({
    //                     errorType: constants.apiResponseStatus.SUCCESS,
    //                     errorMessage: 'Draft Saved Sucessfully',
    //                     flag: true
    //                 })
    //             )
    //             navigate('/list-agent-college')
    //         } else {
    //             dispatch(
    //                 updateError({
    //                     errorType: constants.apiResponseStatus.ERROR,
    //                     errorMessage: 'Can not Save the draft... Please try again',
    //                     flag: true
    //                 })
    //             )
    //         }
    //     }
    //     catch (error) {
    //         dispatch(
    //             updateError({
    //                 errorType: constants.apiResponseStatus.ERROR,
    //                 errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
    //                 flag: true
    //             })
    //         )
    //     }
    // }

    useEffect(() => {
        if (
            college_description !== '' &&
            college_course_description !== '' &&
            college_highlights_description !== '' &&
            college_campus_description !== '' &&
            college_admission_description !== ''
        ) {
            dispatch(updateCollegeInfo({ classKey: 'collegeDescriptions', key: 'isValitadeError', value: false }))
        } else {
            dispatch(updateCollegeInfo({ classKey: 'collegeDescriptions', key: 'isValitadeError', value: true }))
        }
    }, [college_description, college_course_description, college_highlights_description, college_campus_description, college_admission_description])

    return (
        <div style={{ display: ' flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '3rem', margin: 'auto', padding: 'auto' }}>
            {constants.collegeDescriptionInputFieldList.map((description, index) => (
                <TextArea
                    placeholder={description.label}
                    noOfROws={6}
                    noOfCols={55}
                    fieldName={description.label}
                    styles={{ border: 'solid #e83e8c 1px', borderRadius: '1rem' }}
                    onChange={(e) => handleFormData(e.target.value, description.classKey, description.key)}
                    inputValue={collegeDescriptions[description.key]}
                    disabled={collegeId && !isEdit ? true : false}
                />
            ))}
        </div>
    )
}

export default memo(CollegeDescription)