import React, { useEffect, useState } from 'react'
import { Box, Button } from '@mui/material'

import CourseBasicDetails from '../../Components/Courses/CourseBasicDetails'
import CourseDescription from '../../Components/Courses/CourseDescription'
import CourseOtherDetails from '../../Components/Courses/CourseOtherDetails'
import CourseSyllabus from '../../Components/Courses/CourseSyllabus'
import AddItemForm from '../../Components/AddItemForm'
import CollapsibleSection from '../../Components/CollapsibleSection'
import { useParams } from 'react-router-dom'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { resetCourseForm } from '../../features/newCoursesSlice'
import { FIELDS } from '../../Constants/redux/courseFieldName'
import useCourseDetails from '../../hooks/useCourseDetails'

const CourseDetailsContainer = () => {
  const [viewMode, setViewMode] = useState(true)
  const courses = useSelector((state) => state.newCourses, shallowEqual)
  const { courseId } = useParams()
  const dispatch = useDispatch()
  const { getCourseById, editCourseDetails } = useCourseDetails()
  const handleEditToggle = () => {
    setViewMode((prev) => !prev)
  }

  useEffect(() => {
    getCourseById(courseId)
    // Cleanup function to reset state on unmount
    return () => {
      localStorage.removeItem('courseFormData')
      dispatch(resetCourseForm())
    }
  }, [dispatch, courseId])

  const handleUpdate = async () => {
    // prepare payload
    const courseData = {
      course_id: courseId,
      course_name: courses.basicDetails[FIELDS.COURSE_NAME],
      sub_course_name: courses.basicDetails[FIELDS.SUB_COURSE_NAME],
      course_mode: courses.basicDetails[FIELDS.COURSE_MODE],
      course_fee_min: courses.basicDetails[FIELDS.COURSE_FEE_MIN],
      course_fee_max: courses.basicDetails[FIELDS.COURSE_FEE_MAX],
      course_duration: courses.basicDetails[FIELDS.COURSE_DURATION],
      course_categories: courses.basicDetails[FIELDS.CATEGORY],
      course_accepting_exam: courses.basicDetails[FIELDS.COURSE_ACCEPTING_EXAM],
      course_descriptions: {
        [FIELDS.COURSE_PLACEMENT_DESCRIPTION]: courses.description[FIELDS.COURSE_PLACEMENT_DESCRIPTION],
        [FIELDS.COURSE_ADMISSION_PROCESS_DESCRIPTION]: courses.description[FIELDS.COURSE_ADMISSION_PROCESS_DESCRIPTION],
        [FIELDS.COURSE_ELIGIBILITY_CRITERIA_DESCRIPTION]: courses.description[FIELDS.COURSE_ELIGIBILITY_CRITERIA_DESCRIPTION],
        [FIELDS.COURSE_DESCRIPTION]: courses.description[FIELDS.COURSE_DESCRIPTION]
      },
      exam_frequency: courses.otherInfo[FIELDS.EXAM_TYPE],
      course_standard: courses.otherInfo[FIELDS.COURSE_CATEGORY_LEVEL],
      eligibility_criteria: courses.otherInfo[FIELDS.ELIGIBILITY_CRITERIA],
      syllabus_details: courses.syllabusDetails[FIELDS.SYLLABUS]
    }
    //CALL API
    await editCourseDetails(courseData)
    setViewMode(true)
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
          <CourseBasicDetails isEdit={viewMode} />
        </CollapsibleSection>

        <CollapsibleSection title='Description' defaultExpand={false}>
          <CourseDescription isEdit={viewMode} />
        </CollapsibleSection>

        <CollapsibleSection title='Other Information' defaultExpand={false}>
          <CourseOtherDetails isEdit={viewMode} />
        </CollapsibleSection>

        <CollapsibleSection title='Syllabus Details' defaultExpand={false}>
          <CourseSyllabus isEdit={viewMode} />
        </CollapsibleSection>
      </Box>
    </AddItemForm>
  )
}

export default CourseDetailsContainer
