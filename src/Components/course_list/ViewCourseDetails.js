import React, { useEffect } from 'react'
import AddItemForm from '../AddItemForm'
import AddCourse from './AddCourse'
import { useDispatch, useSelector } from 'react-redux'
import { resetCourse, updateCourseInfo } from '../../features/courseSlice'
import {  fetchCourseBasicDetailsById, fetchCourseDescriptionById, fetchCourseDetailsById, fetchSyllabusDetailsById } from '../../utils/reduxThunk/courseThunk'
import { constants } from '../../utils/constants'
import {  useParams } from 'react-router-dom'

export default function ViewCourseDetails() {
  const dispatch = useDispatch()
  const { courseInfo, courseDescriptions, courseDetails, syllabusDetails} = useSelector(state=>state.course)
    const { courseId } = useParams();
  useEffect(()=>{
    if(!courseInfo.isValidationError && !courseDescriptions.isValidationError && !courseDetails.isValidationError && !syllabusDetails.isValidationError){
      dispatch(updateCourseInfo({classKey : 'isDisabled', value : false}))
    }else{
      dispatch(updateCourseInfo({classKey : 'isDisabled', value : true}))
    }
  },[courseInfo.isValidationError, courseDescriptions.isValidationError, courseDetails.isValidationError, syllabusDetails.isValidationError])
  useEffect(()=>{
    if(courseId){
      dispatch(fetchCourseBasicDetailsById({
        url : constants.apiEndPoint.COURSE_DETAILS+"?requestType=basicCourseListing&course_id="+courseId,
        header : constants.apiHeaders.HEADER,
        method : constants.httpMethod.GET,
      }))
      dispatch(fetchCourseDescriptionById({
        url : constants.apiEndPoint.COURSE_DETAILS+"?requestType=basicCourseDescriptionsDetails&course_id="+courseId,
        header : constants.apiHeaders.HEADER,
        method : constants.httpMethod.GET,
      }))
      dispatch(fetchCourseDetailsById({
        url : constants.apiEndPoint.COURSE_DETAILS+"?requestType=basicCourseDetails&course_id="+courseId,
        header : constants.apiHeaders.HEADER,
        method : constants.httpMethod.GET,
      }))
      dispatch(fetchSyllabusDetailsById({
        url : constants.apiEndPoint.COURSE_DETAILS+"?requestType=basicSyllabusDetails&course_id="+courseId,
        header : constants.apiHeaders.HEADER,
        method : constants.httpMethod.GET,
      }))
    }
  },[courseId])
    useEffect(() => {
      return () => dispatch(resetCourse())
  },[])
  return (
    <>
      <AddItemForm label={'Update Course'}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <AddCourse courseId={courseId}/>
        </div>
      </AddItemForm>
    </>
  )
}
