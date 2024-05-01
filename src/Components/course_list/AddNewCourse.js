import React, { useEffect } from 'react'
import AddItemForm from '../AddItemForm'
import AddCourse from './AddCourse'
import CustomButton from '../../utils/CommonComponents/CustomButton'
import { useDispatch, useSelector } from 'react-redux'
import { resetCourse, updateCourseInfo } from '../../features/courseSlice'
import { v4 as uuid } from 'uuid';
import { addCourseDescription, addCourseDetails, addNewCourse, addSyllabusDetails, deleteCourseBasicDetails, fetchCourseBasicDetailsById, fetchCourseDescriptionById, fetchCourseDetailsById, fetchSyllabusDetailsById } from '../../utils/reduxThunk/courseThunk'
import { constants } from '../../utils/constants'
import { updateError } from '../../features/commonSlice'
import { useNavigate, useParams } from 'react-router-dom'

export default function AddNewCourse() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {isDisabled, isValidationError, courseInfo, courseDescriptions, courseDetails, syllabusDetails, isEdit} = useSelector(state=>state.course)
  const {courseId} = useParams()
  const createNewCourse = async ()=>{
    try{
      const courseID = await uuid();  
      const courseDeletePayload = await{
        course_id : courseID
      }
      const courseInfoPayload = await{
        course_id : courseID,
        course_name : courseInfo.course_name,
        course_mode : courseInfo.course_mode,
        course_duration : parseInt(courseInfo.course_duration),
        course_fee_min : courseInfo.course_fee_min,
        course_fee_max : courseInfo.course_fee_max,
        course_description : courseInfo.course_description,
        course_accepting_exam : courseInfo.course_accepting_exam.join(','),
        is_publish : constants.courseIsPublished.notPublished,
      };
      const courseInfoUpdatePayload = await{
        course_id : courseID,
        course_name : courseInfo.course_name,
        course_mode : courseInfo.course_mode,
        course_duration : courseInfo.course_duration,
        course_fee_min : courseInfo.course_fee_min,
        course_fee_max : courseInfo.course_fee_max,
        course_description : courseInfo.course_description,
        course_accepting_exam : courseInfo.course_accepting_exam.join(','),
        is_publish : constants.courseIsPublished.published,
      };
      const courseDescriptionsPayload = await{
        course_id : courseID,
        course_overview_description : courseDescriptions.course_overview_description,
        course_entrance_exam_description : courseDescriptions.course_entrance_exam_description,
        course_fee_description : courseDescriptions.course_fee_description,
        course_placement_description : courseDescriptions.course_placement_description,
        course_admission_process_description : courseDescriptions.course_admission_process_description,
        course_eligibility_criteria_description : courseDescriptions.course_eligibility_criteria_description,
      };
      const courseDetailsPayload = await{
        course_id : courseID,
        course_level : courseDetails.course_level,
        course_duration : courseDetails.course_duration,
        exam_type : courseDetails.exam_type,
        eligiblity_criteria : courseDetails.eligiblity_criteria,
        top_course_colleges : courseDetails.top_course_colleges.join(','),
      };
      const syllabusDetailsPayload = await{
        data : syllabusDetails.accumulated_data.map((data) => {return {...data, course_id:courseID}})
      }
      const addNewCourseResponse = await dispatch(addNewCourse({
        url : constants.apiEndPoint.COURSE_DETAILS+"?requestType=basicCourseListing",
        header : constants.apiHeaders.HEADER,
        method : constants.httpMethod.POST,
        payload : courseInfoPayload,
      }))
      if(addNewCourseResponse.payload.status === constants.apiResponseStatus.SUCCESS){
        const isResolved = await Promise.all([
          dispatch(addCourseDescription({
            url : constants.apiEndPoint.COURSE_DETAILS+"?requestType=basicCourseDescriptionsDetails",
            header : constants.apiHeaders.HEADER,
            method : constants.httpMethod.POST,
            payload : courseDescriptionsPayload,
          })),
          dispatch(addCourseDetails({
            url : constants.apiEndPoint.COURSE_DETAILS+"?requestType=basicCourseDetails",
            header : constants.apiHeaders.HEADER,
            method : constants.httpMethod.POST,
            payload : courseDetailsPayload
          })),
          dispatch(addSyllabusDetails({
            url : constants.apiEndPoint.COURSE_DETAILS+'?requestType=basicSyllabusDetails',
            header : constants.apiHeaders.HEADER,
            method : constants.httpMethod.POST,
            payload : syllabusDetailsPayload
          }))
        ])
        isResolved.map(resolve=>{
          if(resolve.payload.status !== constants.apiResponseStatus.SUCCESS){
            dispatch(updateError({
              errorType : constants.apiResponseStatus.ERROR,
              errorMessage : "Resolve Unsuccessful",
              flag : true
            }))
            dispatch(deleteCourseBasicDetails({
              url : constants.apiEndPoint.COURSE_DETAILS+"?requestType=basicCourseListing",
              header : constants.apiHeaders.HEADER,
              method : constants.httpMethod.DELETE,
              payload : courseDeletePayload,
            }))
            dispatch(resetCourse())
            return false;
          }else{
            dispatch(addNewCourse({
              url : constants.apiEndPoint.COURSE_DETAILS+"?requestType=basicCourseListing",
              header : constants.apiHeaders.HEADER,
              method : constants.httpMethod.PUT,
              payload : courseInfoUpdatePayload,
            }))
            dispatch(updateError({
              errorType : constants.apiResponseStatus.ERROR,
              errorMessage : "Course Added Sucessfully",
              flag : true
            }))
            dispatch(resetCourse())
            navigate('/course-list')
          }
        })
      }else if(addNewCourseResponse.payload.data.message.toLowerCase().includes('duplicate')){
        dispatch(updateError({
          errorType : constants.apiResponseStatus.ERROR,
          errorMessage : "Duplicate Records",
          flag : true
        }))
      }
      else{
        dispatch(updateError({
          errorType : constants.apiResponseStatus.ERROR,
          errorMessage : "Add New Course Unsuccessfull",
          flag : true
        }))
        dispatch(deleteCourseBasicDetails({
          url : constants.apiEndPoint.COURSE_DETAILS+"?requestType=basicCourseListing",
          header : constants.apiHeaders.HEADER,
          method : constants.httpMethod.DELETE,
          payload : courseDeletePayload,
        }))
        dispatch(resetCourse())
      }
    }
    catch(err){
      dispatch(updateError({
        errorType : constants.apiResponseStatus.ERROR,
        errorMessage : constants.apiResponseMessage.ERROR_MESSAGE,
        flag : true
      }))
    }
  }
  useEffect(()=>{
    if(courseInfo.isValidationError === false && courseDescriptions.isValidationError === false && courseDetails.isValidationError === false && syllabusDetails.isValidationError === false){
      dispatch(updateCourseInfo({classKey : 'isDisabled', value : false}))
    }else{
      dispatch(updateCourseInfo({classKey : 'isDisabled', value : true}))
    }
  },[courseInfo.isValidationError, courseDescriptions.isValidationError, courseDetails.isValidationError, syllabusDetails.isValidationError])
  useEffect(()=>{
    if(courseId !== ''){
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
  
  return (
    <>
      <AddItemForm label={courseId ? 'Update Course' : 'Add New Course'}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <AddCourse courseId={courseId}/>
          <div style={{display:'flex'}}>
            {!courseId && 
            <CustomButton
              isDisabled={isDisabled}
              lable={'Submit'}
              onClick={() => createNewCourse()}
            />}
          </div>
        </div>
      </AddItemForm>
    </>
  )
}
