import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { constants } from '../../utils/constants'
import ItemList from '../../Components/ItemList'
import useCourseDetails from '../../hooks/useCourseDetails'

export default function CourseList() {
  const { allCourseDetails } = useSelector((state) => state.newCourses)
  const { getAllCourses, removeCourse } = useCourseDetails()

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
    removeCourse(payload)
  }

  useEffect(() => {
    getAllCourses()
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
