import React, { memo, useEffect } from 'react'
import { constants } from '../../../utils/constants'
import TextArea from '../../../utils/CommonComponents/TextArea'
import { useDispatch, useSelector } from 'react-redux'
import { updateCollegeInfo } from '../../../features/newCollegeSlice'

const CollegeDescription = ({ collegeId }) => {
  const { collegeDescriptions, isEdit } = useSelector((state) => state.newCollege)
  const {
    college_description,
    college_course_description,
    college_highlights_description,
    college_campus_description,
    college_admission_description
  } = useSelector((state) => state.newCollege.collegeDescriptions)
  const dispatch = useDispatch()

  const handleFormData = (value, classKey, key) => {
    if (collegeId) {
      dispatch(updateCollegeInfo({ classKey: classKey, key: key, value: value }))
    } else {
      let formData = {}
      if (localStorage.getItem('formData')) {
        formData = JSON.parse(localStorage.getItem('formData'))
      }
      const updatedDiscription = {
        ...(formData[classKey] || {}),
        [key]: value
      }
      const updatedFormData = {
        ...formData,
        [classKey]: updatedDiscription
      }
      dispatch(updateCollegeInfo({ classKey: classKey, key: key, value: value }))
      localStorage.setItem('formData', JSON.stringify(updatedFormData))
    }
  }

  useEffect(() => {
    if (
      college_description !== '' &&
      college_course_description !== '' &&
      college_highlights_description !== '' &&
      college_campus_description !== '' &&
      college_admission_description !== ''
    ) {
      dispatch(updateCollegeInfo({ classKey: 'collegeDescriptions', key: 'isValitadeError', value: false }))
    } else {
      dispatch(updateCollegeInfo({ classKey: 'collegeDescriptions', key: 'isValitadeError', value: true }))
    }
  }, [
    college_description,
    college_course_description,
    college_highlights_description,
    college_campus_description,
    college_admission_description
  ])

  return (
    <div style={{ display: ' flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '3rem', margin: 'auto', padding: 'auto' }}>
      {constants.collegeDescriptionInputFieldList.map((description, index) => (
        <TextArea
          placeholder={description.label}
          noOfROws={6}
          noOfCols={55}
          fieldName={description.label}
          styles={{ border: 'solid #e83e8c 1px', borderRadius: '1rem' }}
          onChange={(e) => handleFormData(e.target.value, description.classKey, description.key)}
          inputValue={collegeDescriptions[description.key]}
          disabled={collegeId && !isEdit ? true : false}
        />
      ))}
    </div>
  )
}

export default memo(CollegeDescription)
