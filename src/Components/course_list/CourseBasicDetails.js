import React, { useEffect, useState } from 'react'
import InputFieldText from '../../utils/CommonComponents/InputFieldText'
import SelectBox from '../../utils/CommonComponents/SelectBox'
import { constants } from '../../utils/constants'
import TextArea from '../../utils/CommonComponents/TextArea'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux'
import { updateCourseInfo } from '../../features/courseSlice'
import { updateError } from '../../features/commonSlice'
import CustomButton from '../../utils/CommonComponents/CustomButton'
import { addNewCourse, fetchCourseBasicDetailsById } from '../../utils/reduxThunk/courseThunk'
import DataToDisplay from './DataToDisplay'

function valuetext(value) {
  return value;
}

export default function CourseBasicDetails({courseId}) {
  const [examName, setExamName] = useState(constants.courseBasicDetailsExamNameSelectBox)
  const dispatch = useDispatch()
  const { examList } = useSelector(state => state.exam)
  
  const {
    isValidationError,
    course_id,
    course_name,
    sub_course_name,
    course_mode,
    course_duration,
    course_fee_min,
    course_fee_max,
    course_description,
    course_accepting_exam,
  }= useSelector(state=>state.course.courseInfo)
  const {isEdit} = useSelector(state=>state.course)

  const handleDelete = (value) => {
    const filteredData = course_accepting_exam.filter((data)=>data !== value)
    dispatch(updateCourseInfo({classKey : "courseInfo", key : "course_accepting_exam", value : filteredData}))
  };
  const handleChange = (event, newValue) => {
    dispatch(updateCourseInfo({classKey : "courseInfo", key : "course_fee_min", value : newValue[0]}))
    dispatch(updateCourseInfo({classKey : "courseInfo", key : "course_fee_max", value : newValue[1]}))
  };
  const handleValidate = (e)=>{
    if(e.target.value !== '' && !JSON.stringify(course_accepting_exam).includes(e.target.value)){
      dispatch(updateCourseInfo({classKey : 'courseInfo', key : 'course_accepting_exam', value : [...course_accepting_exam, e.target.value]}))
    }else{
      dispatch(updateError({
        errorType: constants.apiResponseStatus.WARNING,
        errorMessage: "Invalid Option Selected or Exam already Selected",
        flag:true
      }))
    }
  }
  const updateCourse = async()=>{
    try{
      const courseInfoPayload = await{
        course_id : course_id,
        course_name : course_name +' - '+ sub_course_name,
        course_mode : course_mode,
        course_duration : parseInt(course_duration),
        course_fee_min : course_fee_min,
        course_fee_max : course_fee_max,
        course_description : course_description,
        course_accepting_exam : course_accepting_exam.join(','),
        is_publish : constants.courseIsPublished.published,
      }
      const response = await dispatch(addNewCourse({
        url : constants.apiEndPoint.COURSE_DETAILS+"?requestType=basicCourseListing",
        header : constants.apiHeaders.HEADER,
        method : constants.httpMethod.PUT,
        payload : courseInfoPayload,
      }))
      if(response.payload.status === constants.apiResponseStatus.SUCCESS){
        dispatch(updateError({
            errorType : constants.apiResponseStatus.ERROR,
            errorMessage : "Course Basic Details Updated Sucessfully",
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
      const response = await dispatch(fetchCourseBasicDetailsById({
        url : constants.apiEndPoint.COURSE_DETAILS+"?requestType=basicCourseListing&course_id="+courseId,
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
    if(course_name !== '' && sub_course_name !== '' && course_mode !== '' && course_duration !== '' && course_fee_min !== '' && course_fee_max !== '' && course_description!=='' && course_accepting_exam.length > 0){
      dispatch(updateCourseInfo({classKey : "courseInfo", key : 'isValidationError', value : false}))
    }else{
      dispatch(updateCourseInfo({classKey : "courseInfo", key : 'isValidationError', value : true}))
    }
  },[course_name, sub_course_name, course_mode, course_duration, course_fee_min, course_fee_max, course_description, course_accepting_exam])
  useEffect(()=>{
    const examNameList = examList.map((data)=>{return {'label' : data.exam_name, 'value' : data.exam_name}})
    const newExamList = [...examName, ...examNameList ]
    setExamName(newExamList)
  },[])
  const courseInfoData = [
        { lable: 'Course Name', value:course_name +' - '+ sub_course_name},
        { lable: 'Course Mode', value:course_mode },
        { lable: 'Course Duration', value:course_duration },
        { lable: 'Course Fee Min', value:course_fee_min },
        { lable: 'Course Fee Max', value:course_fee_max },
        { lable: 'Course Description', value:course_description },
        { lable: 'Course Accepting Exam', value:course_accepting_exam.join(', ') },
    ]
  return (
    <>
      {!isEdit && courseId ? <DataToDisplay dataToDisplay={courseInfoData} />
        : <div>
        <div style={{gap: "20px", display: 'flex', margin: "2.5rem 0px", flexWrap: "wrap", justifyContent: "space-between"}}>
          <InputFieldText
              inputType="text"
              placeholder="Course Name"
              styles={{width: '280px'}}
              onChange={(e)=>dispatch(updateCourseInfo({classKey : "courseInfo", key : "course_name", value : e.target.value}))}
              inputValue={course_name}
              disabled={isEdit}
          />
          <InputFieldText
              inputType="text"
              placeholder="Sub Course Name"
              styles={{width: '280px'}}
              onChange={(e)=>dispatch(updateCourseInfo({classKey : "courseInfo", key : "sub_course_name", value : e.target.value}))}
              inputValue={sub_course_name}
              disabled={isEdit}
          />
          <SelectBox
              label={'Course Mode'}
              options={constants.courseBasicDetailsCourseModeSelectBox}
              styles={{width: '280px', height: '38px'}}
              onChange={(e)=>dispatch(updateCourseInfo({classKey : "courseInfo", key : "course_mode", value : e.target.value}))}
              inputValue={course_mode}
          />
          <TextArea
            placeholder={"Course Description"}
            noOfROws={6}
            noOfCols={55}
            fieldName={"Course Description"}
            styles={{border:'solid #e83e8c 1px',borderRadius:"1rem"}}
            onChange={(e)=>dispatch(updateCourseInfo({classKey : "courseInfo", key : "course_description", value : e.target.value}))}
            inputValue={course_description}
          />
          <div className="form-group">
            <label>{"Course Fee" }</label>
            <div className='form-control'>
              <Box sx={{ width: 400 }}>
                  <Slider
                    getAriaLabel={() => 'Course Fee Range'}
                    value={[course_fee_min, course_fee_max]}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                  />
                </Box>
                <div style={{display:'flex', justifyContent:"space-between"}}>
                  <label>{"Min Fees : " + course_fee_min }</label>
                  <label>{"Max Fees : " + course_fee_max }</label>
                </div>
            </div>
          </div>
          <InputFieldText
            inputType={"text"}
            placeholder={"Course Duration"}
            styles={{width: '280px'}}
            onChange={(e)=>dispatch(updateCourseInfo({classKey : "courseInfo", key : "course_duration", value : e.target.value}))}
            inputValue={course_duration}
          />
          <div style={{display:'flex', gap:"1.5rem"}}>
            <SelectBox
              label={"Course Accepting Exam"}
              styles={{width: '280px', height: '38px'}}
              options={examName}
              onChange={(e)=>handleValidate(e)}
              inputValue={course_accepting_exam}
            />
            <div className="form-group"  style={course_accepting_exam.length > 0 ?  {border:'solid #e83e8c 1px',borderRadius:"1rem", display:"flex", justifyContent:"space-between", flexWrap:"wrap", maxWidth:"400px", padding:"7px"} : {border:'solid #e83e8c 1px',borderRadius:"1rem", display:"none"}}>
              <Stack direction="row" spacing={0}>
                {course_accepting_exam.map((value)=>(
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
      </div>
      }
     
      
    </>
  )
}
