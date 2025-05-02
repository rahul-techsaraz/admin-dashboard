import React, { memo, useEffect, useState } from 'react'
import SearchSelectBox from '../../../utils/CommonComponents/SearchSelectBox'
import CustomCard from '../../../utils/CommonComponents/CustomCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCourseDetails } from '../../../utils/reduxThunk/courseThunk'
import { constants } from '../../../utils/constants'
import { updateError } from '../../../features/commonSlice'
import { resetCourse } from '../../../features/courseSlice'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Slider from '@mui/material/Slider'
import MuiInput from '@mui/material/Input'
import VolumeUp from '@mui/icons-material/VolumeUp'
import useCourseDetails from '../../../hooks/useCourseDetails'
import InputFieldText from '../../../utils/CommonComponents/InputFieldText'
import CustomButton from '../../../utils/CommonComponents/CustomButton'
import { v4 as uuid } from 'uuid'
import ItemList from '../../ItemList'
import { addCollegeBasicDetails, addCollegeCourseOffered, deleteCollegeCourseOffered, fetchCollegeById, fetchCourseOfferedById } from '../../../utils/reduxThunk/collegeThunk'
import { useNavigate } from 'react-router-dom'
import DataToDisplay from '../../course_list/DataToDisplay'
import MultySelect from '../../../utils/CommonComponents/MultySelect'
import { Chip, Stack, Switch, Tooltip } from '@mui/material'
import { updateCollegeInfo } from '../../../features/newCollegeSlice'

const CourseOffered = ({ collegeId, admin }) => {
    const { allCourseDetails, courseOffered, isEdit } = useSelector((state) => state.newCollege)
    const dispatch = useDispatch()
    const [isDisabled, setIsDisabled] = useState(true)
    const [allCourseDetailsIndex, setAllCourseDetailsIndex] = useState(0)
    const [courseOfferedList, setCourseOfferedList] = useState(
        {
            college_id: '',
            course_id: '',
            course_name: '',
            course_accepting_exam: [],
            sub_course_fee: '',
            sub_course_duration: '',
            eligibility_criteria: [],
            isHighlighted: false
        }
    )
    const [eligiblity, setEligibility] = useState('')
    const navigate = useNavigate()

    const handleFormData = () => {
        if (collegeId) {
            return
        } else {
            let formData = {}
            if (localStorage.getItem('formData')) {
                formData = JSON.parse(localStorage.getItem('formData'))
            }
            localStorage.setItem('formData', JSON.stringify({ ...formData, courseOffered: courseOffered.courses_offered }))
        }
    }

    const createEligibilityList = () => {
        if (courseOfferedList.eligibility_criteria.includes(eligiblity)) {
            dispatch(updateError({
                errorType: constants.apiResponseStatus.ERROR,
                errorMessage: 'Eligibility Criteria already added',
                flag: true
            }))
        } else {
            const data = [...courseOfferedList?.eligibility_criteria, eligiblity]
            setCourseOfferedList({ ...courseOfferedList, eligibility_criteria: data })
            setEligibility('')
        }
    }

    const handleDelete = (value) => {
        const filteredData = courseOfferedList?.eligibility_criteria.filter((data) => data !== value)
        setCourseOfferedList({ ...courseOfferedList, eligibility_criteria: filteredData })
    }

    // const handleSubCourseFee = () => {
    //     if (Number(sub_course_fee) >= course_fee_min && Number(sub_course_fee) <= course_fee_max) {
    //         dispatch(updateCollegeInfo({ classKey: 'courseOffered', key: 'sub_course_fee', value: Number(sub_course_fee) }))
    //     } else {
    //         dispatch(updateError({
    //             errorType: constants.apiResponseStatus.ERROR,
    //             errorMessage: 'Course Fee should be within the given range',
    //             flag: true
    //         }))
    //         dispatch(updateCollegeInfo({ classKey: 'courseOffered', key: 'sub_course_fee', value: Number(course_fee_min) }))
    //     }
    // }

    const setindex = (value) => {
        if (value !== '' && value !== undefined && value !== null) {
            const index = allCourseDetails.findIndex((i) => i.course_name === value)
            setAllCourseDetailsIndex(index)
        }
    }

    const setDetails = () => {

        const details = {
            college_id: '',
            course_id: allCourseDetails[allCourseDetailsIndex]?.course_id,
            course_name: allCourseDetails[allCourseDetailsIndex]?.course_name,
            course_accepting_exam: allCourseDetails[allCourseDetailsIndex]?.course_accepting_exam.split(','),
            sub_course_fee: allCourseDetails[allCourseDetailsIndex]?.course_fee_min,
            sub_course_duration: allCourseDetails[allCourseDetailsIndex]?.course_duration,
            eligibility_criteria: allCourseDetails[allCourseDetailsIndex]?.eligiblity_criteria.split(','),
            isHighlighted: false
        }
        setCourseOfferedList(details)
    }

    const createCourseOfferedList = async () => {
        // if (!isEdit && admin !== 'draft') {
        if (!JSON.stringify(courseOffered?.courses_offered).includes(courseOfferedList?.course_name)) {
            dispatch(
                updateCollegeInfo({
                    classKey: 'courseOffered',
                    key: 'courses_offered',
                    value: [...courseOffered?.courses_offered, courseOfferedList]
                })
            )
            handleFormData()
            setCourseOfferedList(
                {
                    college_id: '',
                    course_id: '',
                    course_name: '',
                    course_accepting_exam: [],
                    sub_course_fee: '',
                    sub_course_duration: '',
                    eligibility_criteria: [],
                    isHighlighted: false
                }
            )
            return
        } else {
            dispatch(updateError({
                errorType: constants.apiResponseStatus.ERROR,
                errorMessage: 'Course already added',
                flag: true
            }))
        }
        // } else {
        //     if (!JSON.stringify(courseOfferedList).includes(course_name)) {
        //         const singleCourseOfferedPayload = {
        //             college_id: collegeId,
        //             course_id: course_id,
        //             course_name: course_name,
        //             course_accepting_exam: course_accepting_exam,
        //             sub_course_fee: sub_course_fee,
        //             sub_course_duration: sub_course_duration
        //         }
        //         const response = await dispatch(
        //             addCollegeCourseOffered({
        //                 url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=collegeCourseOffered&addSingleCollege=yes',
        //                 header: constants.apiHeaders.HEADER,
        //                 method: constants.httpMethod.POST,
        //                 payload: singleCourseOfferedPayload
        //             })
        //         )
        //         if (response.payload.status === constants.apiResponseStatus.SUCCESS) {
        //             dispatch(updateError({
        //                 errorType: constants.apiResponseStatus.SUCCESS,
        //                 errorMessage: 'Course added Successfully',
        //                 flag: true
        //             }))
        //             dispatch(
        //                 fetchCourseOfferedById({
        //                     url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=collegeCourseOffered&college_id=' + collegeId,
        //                     header: constants.apiHeaders.HEADER,
        //                     method: constants.httpMethod.GET
        //                 })
        //             )
        //         } else {
        //             dispatch(updateError({
        //                 errorType: constants.apiResponseStatus.ERROR,
        //                 errorMessage: 'Course cannot be added... Please try again',
        //                 flag: true
        //             }))
        //         }
        //     } else {
        //         dispatch(updateError({
        //             errorType: constants.apiResponseStatus.ERROR,
        //             errorMessage: 'Course already added',
        //             flag: true
        //         }))
        //     }
        // }

    }

    const addNewColumns = [
        {
            label: 'Delete',
            handleDeleteItem: (rowData) => {
                deleteCourse(rowData)
            },
            classname: 'deleteButton'
        }
    ]

    const deleteCourse = async (rowData) => {
        if (!isEdit && admin !== 'draft') {
            let filteredData = []
            filteredData = courseOffered?.courses_offered.filter((data) => data.course_id !== rowData.course_id)
            dispatch(updateCollegeInfo({ classKey: 'courseOffered', key: 'courses_offered', value: filteredData }))
        } else {
            const deleteCourseOfferedPayload = {
                college_id: rowData.college_id,
                course_id: rowData.course_id,
            }
            const response = await dispatch(
                deleteCollegeCourseOffered({
                    url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=collegeCourseOffered',
                    header: constants.apiHeaders.HEADER,
                    method: constants.httpMethod.DELETE,
                    payload: deleteCourseOfferedPayload
                })
            )
            if (response?.payload?.status === constants.apiResponseStatus.SUCCESS) {
                dispatch(
                    fetchCourseOfferedById({
                        url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=collegeCourseOffered&college_id=' + collegeId,
                        header: constants.apiHeaders.HEADER,
                        method: constants.httpMethod.GET
                    })
                )
                dispatch(updateError({
                    errorType: constants.apiResponseStatus.SUCCESS,
                    errorMessage: 'Course deleted Successfully',
                    flag: true
                }))
            } else {
                dispatch(updateError({
                    errorType: constants.apiResponseStatus.ERROR,
                    errorMessage: 'Course deletion unsuccessful... Please try again',
                    flag: true
                }))
            }
        }
    }

    const updateCollege = async () => {
        try {
            const courseOfferedPayload = await {
                data: courseOfferedList.map((data) => { return { ...data, college_id: collegeId } }).map((value) => {
                    delete value.id
                    return value
                })
            }
            const response = await dispatch(
                addCollegeCourseOffered({
                    url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=collegeCourseOffered',
                    header: constants.apiHeaders.HEADER,
                    method: constants.httpMethod.PUT,
                    payload: courseOfferedPayload
                })
            )
            if (response.payload.status === constants.apiResponseStatus.SUCCESS) {
                dispatch(
                    updateError({
                        errorType: constants.apiResponseStatus.SUCCESS,
                        errorMessage: 'College Course Offered Details Updated Sucessfully',
                        flag: true
                    })
                )
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

    const handleCancle = async () => {
        try {
            const response = await dispatch(
                fetchCourseOfferedById({
                    url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=collegeCourseOffered&college_id=' + collegeId,
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

    // const saveDraft = async () => {
    //   try {
    //     const courseOfferedPayload = await {
    //       data: courseOfferedList.map((data) => {
    //         return { ...data, college_id: collegeId }
    //       })
    //     }
    //     const response = await dispatch(addCollegeCourseOffered({
    //       url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=collegeCourseOffered',
    //       header: constants.apiHeaders.HEADER,
    //       method: admin === 'draft' ? constants.httpMethod.PUT : constants.httpMethod.POST,
    //       payload: courseOfferedPayload
    //     })
    //     )
    //     console.log(response)
    //     if (response.payload.status === constants.apiResponseStatus.SUCCESS || response.payload.status === constants.apiResponseStatus.WARNING) {
    //       dispatch(updateError({
    //         errorType: constants.apiResponseStatus.SUCCESS,
    //         errorMessage: 'Draft Saved Successfully',
    //         flag: true
    //       })
    //       )
    //       navigate('/list-agent-college')
    //     } else {
    //       dispatch(updateError({
    //         errorType: constants.apiResponseStatus.ERROR,
    //         errorMessage: 'Can not Save the draft... Please try again',
    //         flag: true
    //       })
    //       )
    //     }
    //   }
    //   catch (error) {
    //     dispatch(updateError({
    //       errorType: constants.apiResponseStatus.ERROR,
    //       errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
    //       flag: true
    //     })
    //     )
    //   }
    // }

    useEffect(() => {
        if (allCourseDetailsIndex > -1 && allCourseDetails.length > 0) {
            setDetails('courseOffered', 'courses_offered')
        }
    }, [allCourseDetailsIndex])

    useEffect(() => {
        if (courseOffered.courses_offered.length > 0) {
            dispatch(updateCollegeInfo({ classKey: 'courseOffered', key: 'isValitadeError', value: false }))
            handleFormData()
        } else {
            dispatch(updateCollegeInfo({ classKey: 'courseOffered', key: 'isValitadeError', value: true }))
            handleFormData()
        }
    }, [courseOffered.courses_offered])

    useEffect(() => {
        if (courseOfferedList.course_id !== '' && courseOfferedList.course_name !== '' && courseOfferedList.course_accepting_exam.length > 0 && courseOfferedList.sub_course_fee !== '' && courseOfferedList.sub_course_duration !== '' && courseOfferedList.eligibility_criteria.length > 0 && courseOfferedList.isHighlighted !== '') {
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    }, [
        courseOfferedList.course_id,
        courseOfferedList.course_name,
        courseOfferedList.course_accepting_exam,
        courseOfferedList.sub_course_fee,
        courseOfferedList.sub_course_duration,
        courseOfferedList.eligibility_criteria,
        courseOfferedList.isHighlighted])

    return (
        <>
            <div style={collegeId && !isEdit ? { display: 'none' } : { gap: '20px', display: 'flex', margin: '2.5rem 0px', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                <SearchSelectBox
                    label='Course Name'
                    options={allCourseDetails.length > 0 ? allCourseDetails.map((course) => course.course_name) : []}
                    onChange={(e, value) => setindex(value)}
                    value={courseOfferedList?.course_name}
                    disabled={collegeId && !isEdit ? true : false}
                />

                {allCourseDetailsIndex > -1 && (
                    <>
                        <InputFieldText
                            placeholder='Course Duration'
                            inputValue={courseOfferedList?.sub_course_duration}
                            inputType='text'
                            styles={{ width: '280px' }}
                            onChange={(e) => setCourseOfferedList({ ...courseOfferedList, sub_course_duration: e.target.value })}
                        />
                        <InputFieldText
                            placeholder={`Course Fee (Annual)`}
                            inputValue={courseOfferedList?.sub_course_fee}
                            inputType='text'
                            styles={{ width: '280px' }}
                            onChange={(e) => setCourseOfferedList({ ...courseOfferedList, sub_course_fee: e.target.value })}
                        />
                        <MultySelect
                            label='Exam Accepted'
                            options={allCourseDetails.length > 0 ? allCourseDetails[allCourseDetailsIndex]?.course_accepting_exam.split(',') : []}
                            onChange={(e, value) => setCourseOfferedList({ ...courseOfferedList, course_accepting_exam: value })}
                            value={courseOfferedList?.course_accepting_exam}
                        />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', gap: '40px' }}>
                                <InputFieldText
                                    placeholder={`Eligibility Criteria`}
                                    inputValue={eligiblity}
                                    inputType='text'
                                    styles={{ width: '280px' }}
                                    onChange={(e) => setEligibility(e.target.value)}
                                />
                                <CustomButton
                                    isDisabled={eligiblity ? false : true}
                                    lable={'Add Eligibility Criteria'}
                                    onClick={() => createEligibilityList()}
                                    styles={{ margin: '0px 30px', padding: '0px 20px', width: '300px', height: '40px' }}
                                />
                            </div>
                            {courseOfferedList?.eligibility_criteria.length > 0 &&
                                <div className='form-group' style={{ border: 'solid #e83e8c 1px', borderRadius: '1rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: "10px", maxWidth: '400px', padding: '7px' }}>
                                    {courseOfferedList?.eligibility_criteria.length > 0 &&
                                        courseOfferedList?.eligibility_criteria.map((value, index) => (
                                            <Tooltip title={value} arrow>
                                                <Chip key={index} label={value.length < 40 ? value : `${value.slice(0, 40)}...`} variant='outlined' onDelete={(e) => handleDelete(value)} />
                                            </Tooltip>
                                        ))}
                                </div>}
                        </div>
                        <div>
                            <label>{'Add to Highlight List'}</label>
                            <Switch
                                checked={courseOfferedList?.isHighlighted}
                                onChange={(e) => setCourseOfferedList({ ...courseOfferedList, isHighlighted: !courseOfferedList?.isHighlighted })}
                            />
                        </div>

                        <CustomButton
                            isDisabled={isDisabled}
                            lable={'Add to Course Offered'}
                            onClick={() => createCourseOfferedList()}
                            styles={{ margin: '0px 30px', padding: '0px 20px', width: '300px', height: '40px' }}
                        />
                    </>
                )}
            </div>
            {courseOffered?.courses_offered.length > 0 && (
                <div>
                    <ItemList
                        userColumns={constants.courseOfferedUserColumns}
                        categoryData={courseOffered?.courses_offered.map((data) => { return { ...data, id: data.course_id } })}
                        addNewColumns={(collegeId && !isEdit) ? [] : addNewColumns}
                        labe={'Course Offered Listing'}
                        id={'course_id'}
                        isVewdetails={false}
                    />
                </div>
            )}
        </>
    )
}

export default memo(CourseOffered)