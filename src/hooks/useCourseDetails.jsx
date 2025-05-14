import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { constants } from '../utils/constants'
import { addNewCourse, deleteCourseById, fetchAllCourse, fetchCourseDetails, updateCourseDetails } from '../utils/reduxThunk/courseThunk'
import { deepParseTypedJSON } from '../utils/deepParseTypedJSON'
import { resetCourseForm, setCourseDataFromApi } from '../features/newCoursesSlice'
import { updateError } from '../features/commonSlice'
import { useNavigate } from 'react-router-dom'

export default function useCourseDetails() {
  const { userInfo } = useSelector((state) => state.user, shallowEqual)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const customHeader = constants.apiHeaders.customHeader(userInfo.token)

  const getAllCourses = () => {
    dispatch(
      fetchAllCourse({
        url: constants.apiEndPoint.COURSE,
        header: constants.apiHeaders.HEADER,
        method: constants.httpMethod.GET
      })
    )
  }
  const getCourseById = (courseId) => {
    dispatch(
      fetchCourseDetails({
        url: constants.apiEndPoint.COURSE + '?course_id=' + courseId,
        header: constants.apiHeaders.HEADER,
        method: constants.httpMethod.GET
      })
    )
      .then((res) => {
        const courseData = deepParseTypedJSON(res.payload.data)
        dispatch(setCourseDataFromApi(courseData))
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const editCourseDetails = (courseData) => {
    //CALL API
    dispatch(
      updateCourseDetails({
        url: constants.apiEndPoint.COURSE,
        header: { ...constants.apiHeaders.HEADER, ...customHeader },
        method: constants.httpMethod.PUT,
        payload: courseData
      })
    )
      .unwrap()
      .then((res) => {
        dispatch(
          updateError({
            errorType: res?.payload?.status,
            errorMessage: res?.payload?.message ?? 'Course updated successfully.',
            flag: true
          })
        )
        // navigate('/course-list')
        getCourseById(courseData?.course_id)
        // localStorage.removeItem('courseFormData')
        // dispatch(resetCourseForm())
      })
      .catch((err) => {
        console.error(err)
      })
  }
  const removeCourse = (payload) => {
    dispatch(
      deleteCourseById({
        url: constants.apiEndPoint.COURSE,
        header: { ...constants.apiHeaders.HEADER, ...customHeader },
        method: constants.httpMethod.DELETE,
        payload
      })
    )
      .then((res) => {
        if (res?.payload?.status === constants.apiResponseStatus.SUCCESS) {
          getAllCourses()
          dispatch(
            updateError({
              errorType: constants.apiResponseStatus.SUCCESS,
              errorMessage: res?.payload?.message || 'Course deleted successfully!',
              flag: true
            })
          )
        } else {
          dispatch(
            updateError({
              errorType: constants.apiResponseStatus.WARNING,
              errorMessage: res?.payload?.message || constants.apiResponseMessage.ERROR_MESSAGE,
              flag: true
            })
          )
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }
  const createCourse = (courseData) => {
    dispatch(
      addNewCourse({
        url: constants.apiEndPoint.COURSE,
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

  return { getAllCourses, getCourseById, editCourseDetails, removeCourse, createCourse }
}
