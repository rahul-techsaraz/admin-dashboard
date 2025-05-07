import React, { useEffect } from 'react'
import { deleteCourseBasicDetails, fetchCourseDetails } from '../../utils/reduxThunk/courseThunk'
import { constants } from '../../utils/constants'
import ItemList from '../ItemList'
import { useDispatch, useSelector } from 'react-redux'
import { resetCourse } from '../../features/courseSlice'
import { fetchExamList } from '../../utils/reduxThunk/examThunk'
import { toast } from 'react-toastify'
import { reset } from '../../features/examSlice'
import { updateError } from '../../features/commonSlice'

export default function CourseList() {
  const dispatch = useDispatch()
  const { allCourseDetails } = useSelector((state) => state.course)
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
  const deleteCourseListById = async (courseId) => {
    try {
      const payload = { course_id: courseId }
      const data = await dispatch(
        deleteCourseBasicDetails({
          url: constants.apiEndPoint.COURSE_DETAILS + '?requestType=basicCourseListing',
          header: constants.apiHeaders.HEADER,
          method: constants.httpMethod.DELETE,
          payload
        })
      )
      if (data.payload.status === constants.apiResponseStatus.SUCCESS) {
        dispatch(
          updateError({
            errorType: constants.apiResponseStatus.SUCCESS,
            errorMessage: 'Course deleted successfully!',
            flag: true
          })
        )
        await fetchAllCourseDetails()
      } else {
        dispatch(
          updateError({
            errorType: constants.apiResponseStatus.WARNING,
            errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
            flag: true
          })
        )
      }
    } catch (error) {
      dispatch(
        updateError({
          errorType: constants.apiResponseStatus.WARNING,
          errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
          flag: true
        })
      )
    }
  }
  const fetchAllCourseDetails = async () => {
    try {
      dispatch(resetCourse())
      dispatch(
        fetchCourseDetails({
          url: constants.apiEndPoint.COURSE_DETAILS,
          header: constants.apiHeaders.HEADER,
          method: constants.httpMethod.GET
        })
      )
    } catch (err) {
      toast.error('Something Went wrong . Please try again !')
    }
  }
  const fetchAllExamList = async () => {
    try {
      dispatch(reset())
      dispatch(
        fetchExamList({
          url: constants.apiEndPoint.EXAM_LIST + '?requestType=basicExamDetails',
          header: constants.apiHeaders.HEADER,
          method: constants.httpMethod.GET
        })
      )
    } catch (err) {
      toast.error('Something Went wrong . Please try again !')
    }
  }
  useEffect(() => {
    fetchAllCourseDetails()
    fetchAllExamList()
  }, [])

  return (
    <>
      <ItemList
        userColumns={constants.courseListUserColumns}
        categoryData={allCourseDetails}
        addNewColumns={addNewColumns}
        labe={'Course Details'}
        path={'/add-new-course/'}
        id={'course_id'}
        isVewdetails={true}
      />
    </>
  )
}
