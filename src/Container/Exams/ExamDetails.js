import React, { useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import AddItemForm from '../../Components/AddItemForm'
import { Box, Button } from '@mui/material'
import { updateError } from '../../features/commonSlice'
import ExamInfo from '../../Components/Exams/ExamInfo'
import ExamDescription from '../../Components/Exams/ExamDescription'
import ExamHighlights from '../../Components/Exams/ExamHighlights'
import ExamConfig from '../../Components/Exams/ExamConfig'
import CollapsibleSection from '../../Components/CollapsibleSection'

const ExamDetails = () => {
    const [viewMode, setViewMode] = useState(true)
    const exams = useSelector((state) => state.newExam, shallowEqual)
    const { examId } = useParams()
    const dispatch = useDispatch()

    const handleEditToggle = () => {
        setViewMode((prev) => !prev)
    }
    // const fetchCourse = () => {
    //     dispatch(
    //         fetchCourseDetails({
    //             url: constants.apiEndPoint.COURSE_DETAILS + '?course_id=' + courseId,
    //             header: constants.apiHeaders.HEADER,
    //             method: constants.httpMethod.GET
    //         })
    //     )
    //         .then((res) => {
    //             const courseData = deepParseTypedJSON(res.payload.data)
    //             dispatch(setCourseDataFromApi(courseData))
    //             console.log({ courseData })
    //         })
    //         .catch((err) => {
    //             console.error(err)
    //             updateError({
    //                 errorType: constants.apiResponseStatus.ERROR,
    //                 errorMessage: err?.payload?.message ?? 'Something went wrong . Please try again',
    //                 flag: true
    //             })
    //         })
    // }
    // useEffect(() => {
    //     fetchCourse()
    //     // Cleanup function to reset state on unmount
    //     return () => {
    //         localStorage.removeItem('examFormData')
    //         dispatch(resetCourseForm())
    //     }
    // }, [dispatch, courseId])

    const handleUpdate = () => {
        console.log('update called')
        // // prepare payload
        // const courseData = {
        //     course_id: courseId,
        //     course_name: courses.basicDetails[FIELDS.COURSE_NAME],
        //     sub_course_name: courses.basicDetails[FIELDS.SUB_COURSE_NAME],
        //     course_mode: courses.basicDetails[FIELDS.COURSE_MODE],
        //     course_fee_min: courses.basicDetails[FIELDS.COURSE_FEE_MIN],
        //     course_fee_max: courses.basicDetails[FIELDS.COURSE_FEE_MAX],
        //     course_duration: courses.basicDetails[FIELDS.COURSE_DURATION],
        //     course_categories: courses.basicDetails[FIELDS.CATEGORY],
        //     course_accepting_exam: courses.basicDetails[FIELDS.COURSE_ACCEPTING_EXAM],
        //     course_descriptions: {
        //         [FIELDS.COURSE_PLACEMENT_DESCRIPTION]: courses.description[FIELDS.COURSE_PLACEMENT_DESCRIPTION],
        //         [FIELDS.COURSE_ADMISSION_PROCESS_DESCRIPTION]: courses.description[FIELDS.COURSE_ADMISSION_PROCESS_DESCRIPTION],
        //         [FIELDS.COURSE_ELIGIBILITY_CRITERIA_DESCRIPTION]: courses.description[FIELDS.COURSE_ELIGIBILITY_CRITERIA_DESCRIPTION],
        //         [FIELDS.COURSE_DESCRIPTION]: courses.description[FIELDS.COURSE_DESCRIPTION]
        //     },
        //     exam_frequency: courses.otherInfo[FIELDS.EXAM_TYPE],
        //     course_standard: courses.otherInfo[FIELDS.COURSE_CATEGORY_LEVEL],
        //     eligibility_criteria: courses.otherInfo[FIELDS.ELIGIBILITY_CRITERIA],
        //     syllabus_details: courses.syllabusDetails[FIELDS.SYLLABUS]
        // }
        // //CALL API
        // dispatch(
        //     updateCourseDetails({
        //         url: constants.apiEndPoint.COURSE_DETAILS,
        //         headers: constants.apiHeaders.customHeader,
        //         method: constants.httpMethod.PUT,
        //         payload: courseData
        //     })
        // )
        //     .then((res) => {
        //         dispatch(
        //             updateError({
        //                 errorType: res?.payload?.status,
        //                 errorMessage: res?.payload?.message,
        //                 flag: true
        //             })
        //         )
        //         // navigate('/course-list')
        //         fetchCourse()
        //         setViewMode(true)
        //         // localStorage.removeItem('courseFormData')
        //         // dispatch(resetCourseForm())
        //     })
        //     .catch((err) => {
        //         console.error(err)
        //         updateError({
        //             errorType: constants.apiResponseStatus.ERROR,
        //             errorMessage: err?.payload?.message ?? 'Something went wrong . Please try again',
        //             flag: true
        //         })
        //     })
    }
    return (
        <AddItemForm label={'Course View'} style={{ flexDirection: 'column' }}>
            <Box display='flex' justifyContent='flex-end' gap={2} mb={2}>
                {viewMode ? (
                    <Button variant='contained' onClick={handleEditToggle}>
                        Switch to Edit Mode
                    </Button>
                ) : (
                    <>
                        <Button variant='outlined' color='secondary' onClick={() => setViewMode(true)}>
                            Cancel
                        </Button>
                        <Button variant='contained' color='primary' onClick={handleUpdate}>
                            Update
                        </Button>
                    </>
                )}
            </Box>

            <Box display='flex' flexDirection='column' gap={2}>
                <CollapsibleSection title='Basic Details' defaultExpand={true}>
                    <ExamInfo isEdit={viewMode} />
                </CollapsibleSection>

                <CollapsibleSection title='Description' defaultExpand={false}>
                    <ExamDescription isEdit={viewMode} />
                </CollapsibleSection>

                <CollapsibleSection title='Other Information' defaultExpand={false}>
                    <ExamHighlights isEdit={viewMode} />
                </CollapsibleSection>

                <CollapsibleSection title='Syllabus Details' defaultExpand={false}>
                    <ExamConfig isEdit={viewMode} />
                </CollapsibleSection>
            </Box>
        </AddItemForm>
    )
}

export default ExamDetails