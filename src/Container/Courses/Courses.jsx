import React from 'react'
import CustomStepper from '../../Components/CustomStepper'
import CourseBasicDetails from '../../Components/Courses/CourseBasicDetails'
import CourseDescription from '../../Components/Courses/CourseDescription'
import CourseOtherDetails from '../../Components/Courses/CourseOtherDetails'
import CourseSyllabus from '../../Components/Courses/CourseSyllabus'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { FIELDS } from '../../Constants/redux/courseFieldName'
import { constants } from '../../utils/constants'
import { addNewCourse } from '../../utils/reduxThunk/courseThunk'
import { v4 as uuid } from 'uuid'
import { updateError } from '../../features/commonSlice'
import { resetCourseForm } from '../../features/newCoursesSlice'
import { useNavigate } from 'react-router-dom'

const Courses = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const courses = useSelector((state) => state.newCourses, shallowEqual)
  const { userInfo } = useSelector((state) => state.user, shallowEqual)

  const isCompleteEnable =
    !courses.basicDetails[FIELDS.IS_VALIDATION_ERROR] &&
    !courses.description[FIELDS.IS_VALIDATION_ERROR] &&
    !courses.otherInfo[FIELDS.IS_VALIDATION_ERROR] &&
    !courses.syllabusDetails[FIELDS.IS_VALIDATION_ERROR]

  const handleFinish = () => {
    // prepare payload
    const courseData = {
      course_id: uuid(),
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
    const customHeader = constants.apiHeaders.customHeader(userInfo.token)

    //CALL API
    dispatch(
      addNewCourse({
        url: constants.apiEndPoint.COURSE_DETAILS,
        header: { ...constants.apiHeaders.HEADER, ...customHeader },
        method: constants.httpMethod.POST,
        payload: courseData
      })
    )
      .unwrap()
      .then((res) => {
        dispatch(
          updateError({
            errorType: res?.payload?.status,
            errorMessage: res?.payload?.message,
            flag: true
          })
        )
        navigate('/course-list')
        localStorage.removeItem('courseFormData')
        dispatch(resetCourseForm())
      })
      .catch((err) => {
        console.error(err)
      })
  }
  const steps = [
    {
      label: 'Basic Info',
      component: CourseBasicDetails,
      isNextDisabled: courses.basicDetails[FIELDS.IS_VALIDATION_ERROR]
    },
    {
      label: 'Descriptions',
      component: CourseDescription,
      isNextDisabled: courses.description[FIELDS.IS_VALIDATION_ERROR]
    },
    {
      label: 'Additional Info',
      component: CourseOtherDetails,
      isNextDisabled: courses.otherInfo[FIELDS.IS_VALIDATION_ERROR]
    },
    {
      label: 'Syllabus',
      component: CourseSyllabus,
      isNextDisabled: courses.syllabusDetails[FIELDS.IS_VALIDATION_ERROR]
    }
  ]
  return <CustomStepper steps={steps} onComplete={handleFinish} formName={'Add New Course'} isCompleteEnable={isCompleteEnable} />
}

export default Courses
