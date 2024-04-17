import React, { useEffect } from 'react'
import { fetchCourseDetails } from '../../utils/reduxThunk/courseThunk';
import { constants } from '../../utils/constants';
import ItemList from '../ItemList';
import { useDispatch, useSelector } from 'react-redux';


export default function CourseList() {
    const dispatch = useDispatch()
    const{allCourseDetails} = useSelector(state=>state.course)
    const userColumns = [
        {
            field: "course_name",
            headerName: "Course Name",
            width: 200,
        },
        {
            field: "course_mode",
            headerName: "Course Mode",
            width: 200,
        },
        {
            field: "course_duration",
            headerName: "Course Duration",
            width: 200,
        },
        {
            field: "course_fee",
            headerName: "Course Fee",
            width: 200,
        },
        {
            field: "course_accepting_exam",
            headerName: "Course Accepting Exam",
            width: 200,
        },
    ]
    const addNewColumns = [
        {
            label:'Delete',
            // handleDeleteItem: (rowData) => {
            //   // alert("Are you sure want to delete")
            //     deleteExamListById(rowData.exam_id)
            // },
            classname:'deleteButton'
        }
    ]
    useEffect(()=>{
        dispatch(fetchCourseDetails({
            url: constants.apiEndPoint.COURSE_DETAILS+"?requestType=basicCourseDetails",
            header: constants.apiHeaders.HEADER,
            method: constants.httpMethod.GET
    }))
    // console.log(courseDetails)
  },[])
    
  return (
    <>
        <ItemList
            userColumns={userColumns}
            categoryData={allCourseDetails}
            addNewColumns={addNewColumns}
            labe={'Course Details'}
        />
    </>
    
  )
}
