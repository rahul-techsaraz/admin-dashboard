import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCourseDetails } from '../../features/newCoursesSlice'
import { deepParseTypedJSON } from '../../utils/deepParseTypedJSON'
import { deleteCourseBasicDetails, deleteCourseById, fetchAllCourse } from '../../utils/reduxThunk/courseThunk'
import { constants } from '../../utils/constants'
import ItemList from '../../Components/ItemList'
import { updateError } from '../../features/commonSlice'

export default function CourseList() {
  const dispatch = useDispatch()
  const { allCourseDetails } = useSelector((state) => state.newCourses)
  console.log({ allCourseDetails })

  const addNewColumns = [
    {
      label: 'Delete',
      handleDeleteItem: (rowData) => {
        deleteCourseListById(rowData.course_id)
      },
      classname: 'deleteButton'
    }
  ]
  const deleteCourseListById = (courseId) => {
    const payload = { course_id: courseId }
    dispatch(
      deleteCourseById({
        url: constants.apiEndPoint.COURSE_DETAILS,
        header: constants.apiHeaders.customHeader,
        method: constants.httpMethod.DELETE,
        payload
      })
    )
      .then((res) => {
        if (res.payload.status === constants.apiResponseStatus.SUCCESS) {
          dispatch(
            updateError({
              errorType: constants.apiResponseStatus.SUCCESS,
              errorMessage: res.payload.message || 'Course deleted successfully!',
              flag: true
            })
          )
          fetchAllCourseDetails()
        } else {
          dispatch(
            updateError({
              errorType: constants.apiResponseStatus.WARNING,
              errorMessage: res.payload.message || constants.apiResponseMessage.ERROR_MESSAGE,
              flag: true
            })
          )
        }
      })
      .catch((err) => {
        console.error(err)
        dispatch(
          updateError({
            errorType: constants.apiResponseStatus.WARNING,
            errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
            flag: true
          })
        )
      })
  }
  const fetchAllCourseDetails = () => {
    dispatch(
      fetchAllCourse({
        url: constants.apiEndPoint.COURSE_DETAILS,
        header: constants.apiHeaders.HEADER,
        method: constants.httpMethod.GET
      })
    )
      .then((res) => {
        const courseData = res.payload.data.map((course) => deepParseTypedJSON(course))
        dispatch(setCourseDetails({ data: courseData }))
        console.log({ courseData })
      })
      .catch((err) => {
        console.error(err)
        updateError({
          errorType: constants.apiResponseStatus.ERROR,
          errorMessage: err?.payload?.message ?? 'Something went wrong . Please try again',
          flag: true
        })
      })
  }

  useEffect(() => {
    fetchAllCourseDetails()
  }, [])

  return (
    <>
      <ItemList
        userColumns={constants.courseListUserColumns}
        categoryData={allCourseDetails || []}
        addNewColumns={addNewColumns}
        labe={'Course Details'}
        path={'/add-new-course/'}
        id={'course_id'}
        isVewdetails={true}
      />
    </>
  )
}
