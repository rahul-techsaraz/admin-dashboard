import React from 'react'
import CustomStepper from '../../Components/CustomStepper'
import CourseBasicDetails from '../../Components/Courses/CourseBasicDetails'
import CourseDescription from '../../Components/Courses/CourseDescription'
import CourseOtherDetails from '../../Components/Courses/CourseOtherDetails'
import CourseSyllabus from '../../Components/Courses/CourseSyllabus'
import { shallowEqual, useSelector } from 'react-redux'
import { FIELDS } from '../../Constants/redux/courseFieldName'

const Courses = () => {
  const courses = useSelector((state) => state.newCourses, shallowEqual)

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

  const handleComplete = () => {
    console.log('steps completed')
  }
  return <CustomStepper steps={steps} onComplete={handleComplete} formName={'Add New Course'} />
}

export default Courses
