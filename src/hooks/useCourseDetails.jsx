import { useDispatch, useSelector } from 'react-redux'
import { updateError } from '../features/commonSlice'
import { constants } from '../utils/constants'
import { resetCourseForm } from '../features/newCoursesSlice'
import { fetchAllCourse } from '../utils/reduxThunk/courseThunk'

export default function useCourseDetails() {
  const { allCourseDetails } = useSelector((state) => state.college)
  const dispatch = useDispatch()
  const fetchAllCourseDetails = async () => {
    try {
      dispatch(resetCourseForm())
      const response = await dispatch(
        fetchAllCourse({
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
      console.error(err)
    }
  }

  if (allCourseDetails.length < 1) {
    fetchAllCourseDetails()
  }
}
