import React, { useEffect } from 'react'
import { constants } from '../../utils/constants'
import TextArea from '../../utils/CommonComponents/TextArea'
import { useDispatch, useSelector } from 'react-redux'
import { updateCollegeInfo } from '../../features/collegeSlice'
import DataToDisplay from '../course_list/DataToDisplay'
import { addCollegeDescription, fetchCollegeDiscriptionById } from '../../utils/reduxThunk/collegeThunk'
import CustomButton from '../../utils/CommonComponents/CustomButton'
import { updateError } from '../../features/commonSlice'

export default function CollegeDescription({ collegeId, admin }) {
  const { collegeDescriptions, isEdit } = useSelector((state) => state.college)
  const { isValitadeError, college_description, college_course_description, college_highlights_description, college_campus_description } =
    useSelector((state) => state.college.collegeDescriptions)
  const dispatch = useDispatch()

  const updateCollege = async () => {
    try {
      const collegeDescriptionPayload = await {
        college_id: collegeId,
        college_description: college_description,
        college_course_description: college_course_description,
        college_highlights_description: college_highlights_description,
        college_campus_description: college_campus_description
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

  useEffect(() => {
    if (
      college_description !== '' &&
      college_course_description !== '' &&
      college_highlights_description !== '' &&
      college_campus_description !== ''
    ) {
      dispatch(updateCollegeInfo({ classKey: 'collegeDescriptions', key: 'isValitadeError', value: false }))
    } else {
      dispatch(updateCollegeInfo({ classKey: 'collegeDescriptions', key: 'isValitadeError', value: true }))
    }
  }, [college_description, college_course_description, college_highlights_description, college_campus_description])

  const collegeInfoData = [
    { lable: 'College Description', value: college_description },
    { lable: 'Course Description', value: college_course_description },
    { lable: 'Highlights Description', value: college_highlights_description },
    { lable: 'Campus Description', value: college_campus_description }
  ]

  return (
    <>
      {!isEdit && collegeId ? (
        <DataToDisplay dataToDisplay={collegeInfoData} type={'college'} admin={admin} />
      ) : (
        <>
          <div style={{ display: ' flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '3rem', margin: 'auto', padding: 'auto' }}>
            {constants.collegeDescriptionInputFieldList.map((description, index) => (
              <TextArea
                placeholder={description.label}
                noOfROws={6}
                noOfCols={55}
                fieldName={description.label}
                styles={{ border: 'solid #e83e8c 1px', borderRadius: '1rem' }}
                onChange={(e) => dispatch(updateCollegeInfo({ classKey: description.classKey, key: description.key, value: e.target.value }))}
                inputValue={collegeDescriptions[description.key]}
              />
            ))}
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {isEdit && collegeId && (
              <>
                <CustomButton isDisabled={isValitadeError} lable={'Update'} onClick={() => updateCollege()} />
                <CustomButton lable={'Cancle'} onClick={() => handleCancle()} />
              </>
            )}
          </div>
        </>
      )}
    </>
  )
}
