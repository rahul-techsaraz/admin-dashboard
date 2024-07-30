import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateError } from '../features/commonSlice'
import { constants } from '../utils/constants'
import { resetCourse } from '../features/courseSlice'
import { fetchCourseList } from '../utils/reduxThunk/collegeThunk'

export default function useCourseDetails() {
  const { allCourseDetails } = useSelector((state) => state.college)
  const dispatch = useDispatch()
  const fetchAllCourseDetails = async () => {
    try {
      dispatch(resetCourse())
      const response = await dispatch(
        fetchCourseList({
          url: constants.apiEndPoint.COURSE_DETAILS_COLLEGE,
          header: constants.apiHeaders.HEADER,
          method: constants.httpMethod.GET
        })
      )
      if (response.payload.status === constants.apiResponseStatus.SUCCESS) {
        dispatch(
          updateError({
            errorType: constants.apiResponseStatus.SUCCESS,
            errorMessage: 'Course List Fetched Successfully',
            flag: true
          })
        )
      } else {
        dispatch(
          updateError({
            errorType: constants.apiResponseStatus.ERROR,
            errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
            flag: true
          })
        )
      }
    } catch (err) {
      dispatch(
        updateError({
          errorType: constants.apiResponseStatus.ERROR,
          errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
          flag: true
        })
      )
    }
  }

  if (allCourseDetails.length < 1) {
    fetchAllCourseDetails()
  }
}
