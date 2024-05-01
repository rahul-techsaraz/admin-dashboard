import React, { useEffect } from 'react'
import SelectBox from '../../utils/CommonComponents/SelectBox'
import { constants } from '../../utils/constants'
import TextArea from '../../utils/CommonComponents/TextArea'
import { useDispatch, useSelector } from 'react-redux'
import { updateCourseInfo } from '../../features/courseSlice'
import { Chip, Stack } from '@mui/material'
import { updateError } from '../../features/commonSlice'
import CustomButton from '../../utils/CommonComponents/CustomButton'
import { addCourseDetails, fetchCourseDetailsById } from '../../utils/reduxThunk/courseThunk'

export default function CourseDetails({courseId}) {
    const {
        isValidationError,
        course_id,
        course_level,
        course_duration,
        exam_type,
        eligiblity_criteria,
        top_course_colleges,
    } = useSelector(state=>state.course.courseDetails)
    const {courseDetails, isEdit} = useSelector(state=>state.course)
    const dispatch = useDispatch()

    const handleValidate = (e)=>{
        if(e.target.value !== '' && !JSON.stringify(top_course_colleges).includes(e.target.value)){
            dispatch(updateCourseInfo({classKey : "courseDetails", key : "top_course_colleges", value : [...top_course_colleges, e.target.value]}))
        }else{
            dispatch(updateError({
                errorType: constants.apiResponseStatus.WARNING,
                errorMessage: "Invalid Option Selected or College already Selected",
                flag:true
            }))
        }
    }

    const handleDelete = (value) => {
        const filteredData = top_course_colleges.filter((data)=>data !== value)
        dispatch(updateCourseInfo({classKey : "courseDetails", key : "top_course_colleges", value : filteredData}))
      };
    const updateCourse = async()=>{
        try{
            const courseDetailsPayload = await{
                course_id : course_id,
                course_level : course_level,
                course_duration : course_duration,
                exam_type : exam_type,
                eligiblity_criteria : eligiblity_criteria,
                top_course_colleges : top_course_colleges.join(','),
            };
            const response = await dispatch(addCourseDetails({
                url : constants.apiEndPoint.COURSE_DETAILS+"?requestType=basicCourseDetails",
                header : constants.apiHeaders.HEADER,
                method : constants.httpMethod.PUT,
                payload : courseDetailsPayload
            }))
            if(response.payload.status === constants.apiResponseStatus.SUCCESS){
                dispatch(updateError({
                    errorType : constants.apiResponseStatus.ERROR,
                    errorMessage : "Course Details Updated Sucessfully",
                    flag : true
                }))
                dispatch(updateCourseInfo({classKey : 'isEdit', value : false}))
            }else{
                dispatch(updateError({
                    errorType : constants.apiResponseStatus.ERROR,
                    errorMessage : constants.apiResponseMessage.ERROR_MESSAGE,
                    flag : true
                }))
            }
        }
        catch(error){
            dispatch(updateError({
                errorType : constants.apiResponseStatus.ERROR,
                errorMessage : constants.apiResponseMessage.ERROR_MESSAGE,
                flag : true
            }))
        }
    }
    const handleCancle = async ()=>{
        try{
          const response = await dispatch(fetchCourseDetailsById({
            url : constants.apiEndPoint.COURSE_DETAILS+"?requestType=basicCourseDetails&course_id="+courseId,
            header : constants.apiHeaders.HEADER,
            method : constants.httpMethod.GET,
          }))
          if(response.payload.status === constants.apiResponseStatus.SUCCESS){
            dispatch(updateCourseInfo({classKey : 'isEdit', value : false}))
          }else{
            dispatch(updateError({
              errorType : constants.apiResponseStatus.ERROR,
              errorMessage : constants.apiResponseMessage.ERROR_MESSAGE,
              flag : true
            }))
          }
        }
        catch(error){
          dispatch(updateError({
            errorType : constants.apiResponseStatus.ERROR,
            errorMessage : constants.apiResponseMessage.ERROR_MESSAGE,
            flag : true
          }))
        }
      }
    
    useEffect(()=>{
        if(course_level !== '' && course_duration !== '' && exam_type !== '' && eligiblity_criteria !== '' && top_course_colleges !== ''){
            dispatch(updateCourseInfo({classKey : "courseDetails", key : "isValidationError", value : false}))
        }else{
            dispatch(updateCourseInfo({classKey : "courseDetails", key : "isValidationError", value : true}))
        }
    },[course_level, course_duration, exam_type, eligiblity_criteria, top_course_colleges])
    
    
  return (
    <>
        <div style={{gap: "20px", display: 'flex', margin: "2.5rem 0px", flexWrap: "wrap"}}>
            <SelectBox
                label={constants.courseLevelSelectBox[0].label}
                options={constants.courseLevelSelectBox}
                styles={{width: '280px', height: '38px'}}
                onChange={(e)=>dispatch(updateCourseInfo({classKey : "courseDetails", key : "course_level", value : e.target.value}))}
                inputValue={course_level}
            />
            <SelectBox
                label={'Course Duration'}
                options={constants.courseDurationSelectBox}
                styles={{width: '280px', height: '38px'}}
                onChange={(e)=>dispatch(updateCourseInfo({classKey : "courseDetails", key : "course_duration", value : e.target.value}))}
                inputValue={course_duration}
            />
            <SelectBox
                label={'Exam Type'}
                options={constants.courseExamTypeSelectBox}
                styles={{width: '280px', height: '38px'}}
                onChange={(e)=>dispatch(updateCourseInfo({classKey : "courseDetails", key : "exam_type", value : e.target.value}))}
                inputValue={exam_type}
            />
            {constants.courseDetailsInputFieldList.map((description)=>(
                <TextArea
                    placeholder={description.label}
                    noOfROws={6}
                    noOfCols={55}
                    fieldName={description.label}
                    styles={{border:'solid #e83e8c 1px',borderRadius:"1rem"}}
                    onChange={(e)=>dispatch(updateCourseInfo({classKey : description.classKey, key : description.key, value : e.target.value}))}
                    inputValue={courseDetails[description.key]}
                />  
            ))}
            <div style={{display:'flex', flexDirection:'column', gap:"1.5rem"}}>
                <SelectBox
                    label={'Top Course Colleges'}
                    options={constants.courseTopCourseCollegesSelectBox}
                    styles={{width: '280px', height: '38px'}}
                    onChange={(e)=>handleValidate(e)}
                    inputValue={top_course_colleges}
                />
                <div className="form-group"  style={top_course_colleges.length > 0 ?  {border:'solid #e83e8c 1px',borderRadius:"1rem", display:"flex", justifyContent:"space-between", flexWrap:"wrap", maxWidth:"400px", padding:"7px"} : {border:'solid #e83e8c 1px',borderRadius:"1rem", display:"none"}}>
                    <Stack direction="row" spacing={0}>
                        {top_course_colleges.map((value)=>(
                        <Chip label={value} variant="outlined" onDelete={(e)=>handleDelete(value)} />
                        ))}
                    </Stack>
                </div>
            </div>
            
        </div>
        <div style={{display:'flex', gap:"1.5rem"}}>
          {isEdit && courseId &&
          <>
            <CustomButton
              isDisabled={isValidationError}
              lable={'Update'}
              onClick={() => updateCourse()}
            />
            <CustomButton
              isDisabled={isValidationError}
              lable={'Cancle'}
              onClick={() => handleCancle()}
            />
          </> 
          }
        </div>
    </>
  )
}
