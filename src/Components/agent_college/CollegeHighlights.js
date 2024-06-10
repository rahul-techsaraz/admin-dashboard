import React, { useEffect, useState } from 'react'
import SearchSelectBox from '../../utils/CommonComponents/SearchSelectBox'
import { useDispatch, useSelector } from 'react-redux'
import { updateCollegeInfo } from '../../features/collegeSlice'
import InputFieldText from '../../utils/CommonComponents/InputFieldText'
import useCourseDetails from '../../hooks/useCourseDetails'
import CustomButton from '../../utils/CommonComponents/CustomButton'
import { constants } from '../../utils/constants'
import ItemList from '../ItemList'
import { v4 as uuid } from 'uuid'

export default function CollegeHighlights() {
  useCourseDetails();
  const dispatch = useDispatch()
  const {allCourseDetails, collegeHighlights, highlightList} = useSelector(state=>state.college)
  const {isValitadeError, course_name, fees_annually, eligibility_criteria, course_duration} = useSelector(state=>state.college.collegeHighlights)
  const [isDisabled, setisDisabled] = useState(true)
  const id = uuid();

  const setDetails = (e,value)=>{
    if(value !== '' && value !== undefined && value !== null){
      const index = allCourseDetails.findIndex((i)=>i.course_id === value.course_id)
      dispatch(updateCollegeInfo({classKey : 'collegeHighlights', key : 'course_name', value : value.label}))
      dispatch(updateCollegeInfo({classKey : 'collegeHighlights', key : 'fees_annually', value : allCourseDetails[index].course_fee_min+' - '+allCourseDetails[index].course_fee_max}))
      dispatch(updateCollegeInfo({classKey : 'collegeHighlights', key : 'eligibility_criteria', value : allCourseDetails[index].eligiblity_criteria}))
      dispatch(updateCollegeInfo({classKey : 'collegeHighlights', key : 'course_duration', value : allCourseDetails[index].course_duration}))
    }else{
      dispatch(updateCollegeInfo({classKey : 'collegeHighlights', key : 'course_name', value : ''}))
      dispatch(updateCollegeInfo({classKey : 'collegeHighlights', key : 'fees_annually', value : ''}))
      dispatch(updateCollegeInfo({classKey : 'collegeHighlights', key : 'eligibility_criteria', value : ''}))
      dispatch(updateCollegeInfo({classKey : 'collegeHighlights', key : 'course_duration', value : ''}))
    }
  }

  const createHighlightsList = () =>{
    dispatch(updateCollegeInfo({classKey : 'highlightList', value : [...highlightList, {id, course_name, fees_annually, eligibility_criteria, course_duration}]}))
  }

  const addNewColumns = [
    {
        label:'Delete',
        handleDeleteItem: (rowData) => {
            deleteHighlight(rowData.id)
        },
        classname:'deleteButton'
    },
  ]

  const deleteHighlight = (id)=>{
    const filteredData = highlightList.filter(data=>data.id !== id)
    dispatch(updateCollegeInfo({classKey : "highlightList", value : filteredData}))
  }
  useEffect(()=>{
    if(collegeHighlights.course_name !== '' && collegeHighlights.fees_annually !== '' && collegeHighlights.eligibility_criteria !== '' && collegeHighlights.course_duration !== ''){
      setisDisabled(false)
    }
    else{
      setisDisabled(true)
    }
  },[collegeHighlights.course_name, collegeHighlights.fees_annually, collegeHighlights.eligibility_criteria, collegeHighlights.course_duration])

  useEffect(()=>{
    if(highlightList.length > 0){
      dispatch(updateCollegeInfo({classKey : 'collegeHighlights', key : 'isValitadeError', value : false}))
    }else{
      dispatch(updateCollegeInfo({classKey : 'collegeHighlights', key : 'isValitadeError', value : true}))
    }
  },[highlightList])

  return (
    <>
      <div style={{ display: " flex", flexWrap: "wrap", alignItems:'center', gap: '3rem', margin: 'auto', padding: 'auto' }}>
        <SearchSelectBox
          label='Course Name'
          options={allCourseDetails.map(course=> {return {'label' : course.course_name, 'course_id' : course.course_id}})}
          onChange={(e,value)=>setDetails(e,value)}
          inputValue={collegeHighlights.course_name}
        />
        <InputFieldText
        placeholder='Course Duration'
        inputValue={collegeHighlights.course_duration}
        inputType='text'
        styles={{width: '280px'}}
        disabled={true}
        />
        <InputFieldText
        placeholder='Fees Annually'
        inputValue={collegeHighlights.fees_annually}
        inputType='text'
        styles={{width: '280px'}}
        disabled={true}
        />
        <InputFieldText
        placeholder='Eligibility Criteria'
        inputValue={collegeHighlights.eligibility_criteria}
        inputType='text'
        styles={{width: '280px'}}
        disabled={true}
        />
        <CustomButton
        isDisabled={isDisabled}
        lable={'Add to Highlights'}
        onClick={() => createHighlightsList()}
        styles={{margin:'0px 30px',padding:'0px 20px', width:"300px",height:"40px"}}
        />
      </div>
      {highlightList.length > 0 && (
        <div>
          <ItemList
            userColumns={constants.highlightsUserColumns}
            categoryData={highlightList}
            addNewColumns={addNewColumns}
            labe={'Highlights Listing'}
            // path={'/add-new-course/'}
            // id={'course_id'}
            isVewdetails={false}
          />
        </div>
      ) 
        }
    </>
  )
}
