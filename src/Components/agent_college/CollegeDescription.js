import React, { useEffect } from 'react'
import { constants } from '../../utils/constants'
import TextArea from '../../utils/CommonComponents/TextArea'
import { useDispatch, useSelector } from 'react-redux'
import { updateCollegeInfo } from '../../features/collegeSlice'

export default function CollegeDescription() {
  const {collegeDescriptions} = useSelector(state=>state.college)
  const {
    isValitadeError,
    college_description,
		college_course_description,
		college_highlights_description,
		college_campus_description,
  } = useSelector(state=>state.college.collegeDescriptions)
  const dispatch = useDispatch()

  useEffect(()=>{
    if(college_description !== '' && college_course_description !== '' && college_highlights_description !== '' && college_campus_description !== ''){
      dispatch(updateCollegeInfo({classKey : "collegeDescriptions", key : 'isValitadeError', value : false}))
    }else{
      dispatch(updateCollegeInfo({classKey : "collegeDescriptions", key : 'isValitadeError', value : true}))
    }
  },[college_description, college_course_description, college_highlights_description, college_campus_description])

  return (
    <>
      <div style={{ display: " flex", flexWrap: "wrap", justifyContent: "space-between", gap: '3rem', margin: 'auto', padding: 'auto' }}>
            {constants.collegeDescriptionInputFieldList.map((description,index)=>(
                <TextArea
                    placeholder={description.label}
                    noOfROws={6}
                    noOfCols={55}
                    fieldName={description.label}
                    styles={{border:'solid #e83e8c 1px',borderRadius:"1rem"}}
                    onChange={(e)=>dispatch(updateCollegeInfo({classKey : description.classKey, key : description.key, value : e.target.value}))}
                    inputValue={collegeDescriptions[description.key]}
                />
            ))}
        </div>
    </>
  )
}
