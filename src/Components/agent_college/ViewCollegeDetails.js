import React, { useEffect } from 'react'
import AddCollege from './AddCollege'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { resetCollege, updateCollegeInfo } from '../../features/collegeSlice'
import AddItemForm from '../AddItemForm'
import {
  fetchCollegeById,
  fetchCollegeCommonById,
  fetchCollegeDiscriptionById,
  fetchCollegeGallaryById,
  fetchCollegeHighlightsById,
  fetchCourseOfferedById
} from '../../utils/reduxThunk/collegeThunk'
import { constants } from '../../utils/constants'

export default function ViewCollegeDetails() {
  const { collegeId } = useParams()
  const { collegeBasicDetails, courseOffered, collegeDescriptions, collegeHighlights, common, gallary } = useSelector(
    (state) => state.college
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if (
      !collegeBasicDetails.isValidationError &&
      !courseOffered.isValidationError &&
      !collegeDescriptions.isValidationError &&
      !collegeHighlights.isValidationError &&
      !common.isValidationError &&
      !gallary.isValidationError
    ) {
      dispatch(updateCollegeInfo({ classKey: 'isDisabled', value: false }))
    } else {
      dispatch(updateCollegeInfo({ classKey: 'isDisabled', value: true }))
    }
  }, [
    collegeBasicDetails.isValidationError,
    courseOffered.isValidationError,
    collegeDescriptions.isValidationError,
    collegeHighlights.isValidationError,
    gallary.isValidationError
  ])

  useEffect(() => {
    if (collegeId) {
      dispatch(
        fetchCollegeById({
          url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=basicCollegeListing&college_id=' + collegeId,
          header: constants.apiHeaders.HEADER,
          method: constants.httpMethod.GET
        })
      )
      dispatch(
        fetchCourseOfferedById({
          url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=collegeCourseOffered&college_id=' + collegeId,
          header: constants.apiHeaders.HEADER,
          method: constants.httpMethod.GET
        })
      )
      dispatch(
        fetchCollegeDiscriptionById({
          url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=basicCollegeDescriptionsDetails&college_id=' + collegeId,
          header: constants.apiHeaders.HEADER,
          method: constants.httpMethod.GET
        })
      )
      dispatch(
        fetchCollegeHighlightsById({
          url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=collegeHighlightsDetails&college_id=' + collegeId,
          header: constants.apiHeaders.HEADER,
          method: constants.httpMethod.GET
        })
      )
      dispatch(
        fetchCollegeCommonById({
          url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=collegeFacilities&college_id=' + collegeId,
          header: constants.apiHeaders.HEADER,
          method: constants.httpMethod.GET
        })
      )
      dispatch(
        fetchCollegeGallaryById({
          url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=collegeGallary&college_id=' + collegeId,
          header: constants.apiHeaders.HEADER,
          method: constants.httpMethod.GET
        })
      )
    }
  }, [collegeId])

  useEffect(() => {
    return () => dispatch(resetCollege())
  }, [])
  return (
    <>
      <AddItemForm label={'Update College'}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <AddCollege collegeId={collegeId} />
        </div>
      </AddItemForm>
    </>
  )
}
