import React, { useEffect } from 'react'
import { constants } from '../../utils/constants'
import TextArea from '../../utils/CommonComponents/TextArea'
import { useDispatch, useSelector } from 'react-redux'
import { updateCourseInfo } from '../../features/courseSlice'
import CustomButton from '../../utils/CommonComponents/CustomButton'
import { addCourseDescription, fetchCourseDescriptionById } from '../../utils/reduxThunk/courseThunk'
import { updateError } from '../../features/commonSlice'
import DataToDisplay from './DataToDisplay'

export default function CourseDescriptionDetails({ courseId }) {
  const {
    isValidationError,
    course_id,
    course_overview_description,
    course_entrance_exam_description,
    course_fee_description,
    course_placement_description,
    course_admission_process_description,
    course_eligibility_criteria_description
  } = useSelector((state) => state.course.courseDescriptions)
  const { courseDescriptions, isEdit } = useSelector((state) => state.course)
  const dispatch = useDispatch()
  const updateCourse = async () => {
    try {
      const courseDescriptionsPayload = await {
        course_id: course_id,
        course_overview_description: course_overview_description,
        course_entrance_exam_description: course_entrance_exam_description,
        course_fee_description: course_fee_description,
        course_placement_description: course_placement_description,
        course_admission_process_description: course_admission_process_description,
        course_eligibility_criteria_description: course_eligibility_criteria_description
      }
      const response = await dispatch(
        addCourseDescription({
          url: constants.apiEndPoint.COURSE_DETAILS + '?requestType=basicCourseDescriptionsDetails',
          header: constants.apiHeaders.HEADER,
          method: constants.httpMethod.PUT,
          payload: courseDescriptionsPayload
        })
      )
      if (response.payload.status === constants.apiResponseStatus.SUCCESS) {
        dispatch(
          updateError({
            errorType: constants.apiResponseStatus.ERROR,
            errorMessage: 'Course Description Details Updated Sucessfully',
            flag: true
          })
        )
        dispatch(updateCourseInfo({ classKey: 'isEdit', value: false }))
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
        fetchCourseDescriptionById({
          url: constants.apiEndPoint.COURSE_DETAILS + '?requestType=basicCourseDescriptionsDetails&course_id=' + courseId,
          header: constants.apiHeaders.HEADER,
          method: constants.httpMethod.GET
        })
      )
      if (response.payload.status === constants.apiResponseStatus.SUCCESS) {
        dispatch(updateCourseInfo({ classKey: 'isEdit', value: false }))
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
  useEffect(() => {
    if (
      course_overview_description !== '' &&
      course_entrance_exam_description !== '' &&
      course_fee_description !== '' &&
      course_placement_description !== '' &&
      course_admission_process_description !== '' &&
      course_eligibility_criteria_description !== ''
    ) {
      dispatch(updateCourseInfo({ classKey: 'courseDescriptions', key: 'isValidationError', value: false }))
    } else {
      dispatch(updateCourseInfo({ classKey: 'courseDescriptions', key: 'isValidationError', value: true }))
    }
  }, [
    course_overview_description,
    course_entrance_exam_description,
    course_fee_description,
    course_placement_description,
    course_admission_process_description,
    course_eligibility_criteria_description
  ])
  const courseDescriptionData = [
    { lable: 'Course Overview Description', value: course_overview_description },
    { lable: 'Course Entrance Exam Description', value: course_entrance_exam_description },
    { lable: 'Course Fee Description', value: course_fee_description },
    { lable: 'Course Placement Description', value: course_placement_description },
    { lable: 'Course Admission Process Description', value: course_admission_process_description },
    { lable: 'Course Eligibility Criteria Description', value: course_eligibility_criteria_description }
  ]
  return (
    <>
      {!isEdit && courseId ? (
        <DataToDisplay dataToDisplay={courseDescriptionData} />
      ) : (
        <div style={{ display: ' flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '3rem', margin: 'auto', padding: 'auto' }}>
          {constants.courseDescriptionInputFieldList.map((description, index) => (
            <TextArea
              placeholder={description.label}
              noOfROws={6}
              noOfCols={55}
              fieldName={description.label}
              styles={{ border: 'solid #e83e8c 1px', borderRadius: '1rem' }}
              onChange={(e) => dispatch(updateCourseInfo({ classKey: description.classKey, key: description.key, value: e.target.value }))}
              inputValue={courseDescriptions[description.key]}
            />
          ))}
        </div>
      )}

      <div style={{ display: 'flex', gap: '1.5rem' }}>
        {isEdit && courseId && (
          <>
            <CustomButton isDisabled={isValidationError} lable={'Update'} onClick={() => updateCourse()} />
            <CustomButton isDisabled={isValidationError} lable={'Cancle'} onClick={() => handleCancle()} />
          </>
        )}
      </div>
    </>
  )
}
