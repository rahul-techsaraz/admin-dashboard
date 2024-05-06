import React, { useEffect, useState } from 'react'
import TextArea from '../../utils/CommonComponents/TextArea'
import { useDispatch, useSelector } from 'react-redux'
import { resetCourse, updateCourseInfo } from '../../features/courseSlice'
import CustomButton from '../../utils/CommonComponents/CustomButton'
import ItemList from '../ItemList'
import SelectBox from '../../utils/CommonComponents/SelectBox'
import { constants } from '../../utils/constants'
import { v4 as uuid } from 'uuid'
import { updateError } from '../../features/commonSlice'
import { addSyllabusDetails, fetchSyllabusDetailsById } from '../../utils/reduxThunk/courseThunk'

export default function SyllabusDetails({courseId}) {
    const [isEditSyllabusDetails, setIsEditSyllabusDetails] = useState(false)
    const id = uuid();
    const dispatch = useDispatch()
    const {
        isValidationError,
        course_id,
        year_name,
        semester_name,
        list_of_subject,
        accumulated_data,
    } = useSelector(state=>state.course.syllabusDetails)
    const {isEdit, isEditSyllabus} = useSelector(state=>state.course)
    
    const addNewColumns = [
        {
            label:'Delete',
            handleDeleteItem: (rowData) => {
                deleteSyllabus(rowData.id)
            },
            classname:'deleteButton'
        },
        {
            label:'Edit',
            handleDeleteItem: (rowData) => {
                editSyllabus(rowData.semester_name)
            },
            classname:'deleteButton'
        },
    ]
    const deleteSyllabus = (id)=>{
        const filteredData = accumulated_data.filter(data=>data.id !== id)
        dispatch(updateCourseInfo({classKey : "syllabusDetails", key : 'accumulated_data', value : filteredData}))
    }
    const editSyllabus = (semesterName)=>{
        const filteredData = accumulated_data.filter(data=>data.semester_name === semesterName)
        dispatch(updateCourseInfo({classKey : "syllabusDetails", key : 'course_id', value : filteredData[0].course_id}))
        dispatch(updateCourseInfo({classKey : "syllabusDetails", key : 'year_name', value : filteredData[0].year_name}))
        dispatch(updateCourseInfo({classKey : "syllabusDetails", key : 'semester_name', value : filteredData[0].semester_name}))
        dispatch(updateCourseInfo({classKey : "syllabusDetails", key : 'list_of_subject', value : filteredData[0].list_of_subject}))
        dispatch(updateCourseInfo({classKey : "isEditSyllabus", value : true}))
        console.log(isEditSyllabus)
    }
    
    const addSylabusDetails = ()=>{
        if(year_name !== '' && semester_name !== '' && list_of_subject !== ''){
            dispatch(updateCourseInfo({classKey : 'syllabusDetails', key : 'accumulated_data', value : [...accumulated_data, {id, year_name, semester_name, list_of_subject}]}))
            dispatch(updateCourseInfo({classKey : "isEditSyllabus", value : false}))
        }
    }
    const updateCourse = async()=>{
        try{
            const syllabusDetailsPayload = await{
                id : id,
                course_id : course_id,
                year_name : year_name,
                semester_name : semester_name,
                list_of_subject : list_of_subject,
            }
            const response = await dispatch(addSyllabusDetails({
                url : constants.apiEndPoint.COURSE_DETAILS+'?requestType=basicSyllabusDetails',
                header : constants.apiHeaders.HEADER,
                method : constants.httpMethod.PUT,
                payload : syllabusDetailsPayload
            }))
            if(response.payload.status === constants.apiResponseStatus.SUCCESS){
                const response = await dispatch(fetchSyllabusDetailsById({
                    url : constants.apiEndPoint.COURSE_DETAILS+"?requestType=basicSyllabusDetails&course_id="+course_id,
                    header : constants.apiHeaders.HEADER,
                    method : constants.httpMethod.GET,
                  }))
                if(response.payload.status === constants.apiResponseStatus.SUCCESS){
                    dispatch(updateError({
                        errorType : constants.apiResponseStatus.ERROR,
                        errorMessage : "Syllabus Details Updated Sucessfully",
                        flag : true
                    }))
                    dispatch(updateCourseInfo({classKey : 'isEdit', value : false}))
                }
                else{
                    dispatch(updateError({
                        errorType : constants.apiResponseStatus.ERROR,
                        errorMessage : constants.apiResponseMessage.ERROR_MESSAGE,
                        flag : true
                    }))
                }
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
          const response = await dispatch(fetchSyllabusDetailsById({
            url : constants.apiEndPoint.COURSE_DETAILS+"?requestType=basicSyllabusDetails&course_id="+courseId,
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
        if(year_name !== '' && semester_name !== '' && list_of_subject !== ''){
            dispatch(updateCourseInfo({classKey : 'syllabusDetails', key : 'isValidationError', value : false}))
        }else{
            dispatch(updateCourseInfo({classKey : 'syllabusDetails', key : 'isValidationError', value : true}))
        }
    },[year_name, semester_name, list_of_subject])
    
    
  return (
    <>
    {!isEdit && !courseId && !isEditSyllabus ?
    <>
        <div style={{ gap: "20px", display: 'flex', margin: "2.5rem 0px", flexWrap: "wrap", alignItems: "center" }}>
            <SelectBox
                label={'Year'}
                options={constants.courseSyllabusDetailsYearSelectBox}
                onChange={(e)=>dispatch(updateCourseInfo({classKey : 'syllabusDetails', key : 'year_name', value : e.target.value}))}
                styles={{width: '280px', height: '38px'}}
                inputValue={year_name}
            />
            <SelectBox
                label={'Semester'}
                options={constants.courseSyllabusDetailsSemesterSelectBox}
                onChange={(e)=>dispatch(updateCourseInfo({classKey : 'syllabusDetails', key : 'semester_name', value : e.target.value}))}
                styles={{width: '280px', height: '38px'}}
                inputValue={semester_name}
            />
            <TextArea
                placeholder="List of Subjects"
                noOfROws={6}
                noOfCols={55}
                fieldName="List of Subjects"
                styles={{border:'solid #e83e8c 1px',borderRadius:"1rem"}}
                onChange={(e)=>dispatch(updateCourseInfo({classKey : 'syllabusDetails', key : 'list_of_subject', value : e.target.value}))}
                inputValue={list_of_subject}
            />
            <CustomButton
                isDisabled={isValidationError}
                lable={'Submit'}
                onClick={() => addSylabusDetails()}
                styles={{margin:"0px !important", }}
            />
        </div>
        <div>
            <ItemList
                userColumns={constants.SyllabusDetailsUserColumns}
                categoryData={accumulated_data}
                addNewColumns={addNewColumns}
                labe={'Syllabus Listing'}
                path={'/add-new-course/'}
                id={'semester_name'}
                isVewdetails={false}
            />
        </div>
    </> 
    :
    isEdit && courseId && !isEditSyllabus ? 
        <>
        <div>
            <ItemList
                userColumns={constants.SyllabusDetailsUserColumns}
                categoryData={accumulated_data}
                addNewColumns={addNewColumns}
                labe={'Syllabus Listing'}
                path={'/add-new-course/'}
                id={'semester_name'}
            />
        </div>
    </>
    :
    <>
        <div style={{ gap: "20px", display: 'flex', margin: "2.5rem 0px", flexWrap: "wrap", alignItems: "center" }}>
            <SelectBox
                label={'Year'}
                options={[{"label":year_name, "value":year_name}]}
                styles={{width: '280px', height: '38px'}}
                inputValue={year_name}
            />
            <SelectBox
                label={'Semester'}
                options={[{"label":semester_name, "value":semester_name}]}
                styles={{width: '280px', height: '38px'}}
                inputValue={semester_name}
            />
            <TextArea
                placeholder="List of Subjects"
                noOfROws={6}
                noOfCols={55}
                fieldName="List of Subjects"
                styles={{border:'solid #e83e8c 1px',borderRadius:"1rem"}}
                onChange={(e)=>dispatch(updateCourseInfo({classKey : 'syllabusDetails', key : 'list_of_subject', value : e.target.value}))}
                inputValue={list_of_subject}
            />
            <CustomButton
                isDisabled={isValidationError}
                lable={'Update'}
                onClick={() => updateCourse()}
                styles={{margin:"0px !important", }}
            />
            <CustomButton
                lable={'Cancle'}
                onClick={() => dispatch(updateCourseInfo({classKey : "isEditSyllabus", value : false}))}
                styles={{margin:"0px !important", }}
            />
        </div>
    </>
    
    }        
        
        <div style={{display:'flex', gap:"1.5rem"}}>
          {isEdit && courseId && !isEditSyllabus &&
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
