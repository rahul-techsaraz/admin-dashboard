import React, { useEffect, useState } from 'react'
import TextArea from '../../utils/CommonComponents/TextArea'
import { useDispatch, useSelector } from 'react-redux'
import { updateCollegeInfo } from '../../features/collegeSlice'
import InputFieldText from '../../utils/CommonComponents/InputFieldText'
import CustomButton from '../../utils/CommonComponents/CustomButton'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'

export default function CollegeCommon({ collegeId }) {
  const dispatch = useDispatch()
  const [isDisabled, setisDisabled] = useState(true)
  const { common, facultyList } = useSelector((state) => state.college)

  const createFacultyList = () => {
    const faculty_name = common.faculty_name.concat('-', common.department)
    dispatch(updateCollegeInfo({ classKey: 'facultyList', value: [...facultyList, faculty_name] }))
  }

  const handleDelete = (value) => {
    const filteredData = facultyList.filter((data) => data !== value)
    dispatch(updateCollegeInfo({ classKey: 'facultyList', value: filteredData }))
  }

  useEffect(() => {
    if (common.faculty_name !== '' && common.department !== '') {
      setisDisabled(false)
    } else {
      setisDisabled(true)
    }
  }, [common.faculty_name, common.department])

  useEffect(() => {
    if (facultyList.length > 0 && common.facilities !== '') {
      dispatch(updateCollegeInfo({ classKey: 'common', key: 'isValitadeError', value: false }))
    } else {
      dispatch(updateCollegeInfo({ classKey: 'common', key: 'isValitadeError', value: true }))
    }
  }, [facultyList, common.facilities])

  return (
    <>
      <div style={{ display: ' flex', flexWrap: 'wrap', alignItems: 'center', gap: '3rem', margin: 'auto', padding: 'auto' }}>
        <InputFieldText
          placeholder='Faculty Name'
          inputValue={common.faculty_name}
          inputType='text'
          onChange={(e) => dispatch(updateCollegeInfo({ classKey: 'common', key: 'faculty_name', value: e.target.value }))}
          styles={{ width: '280px' }}
        />
        <InputFieldText
          placeholder='Department'
          inputValue={common.department}
          inputType='text'
          onChange={(e) => dispatch(updateCollegeInfo({ classKey: 'common', key: 'department', value: e.target.value }))}
          styles={{ width: '280px' }}
        />
        <CustomButton
          isDisabled={isDisabled}
          lable={'Submit'}
          onClick={() => createFacultyList()}
          styles={{ margin: '0px 30px', padding: '0px 20px', width: '300px', height: '40px' }}
        />
        <div
          className='form-group'
          style={
            facultyList.length > 0
              ? {
                  border: 'solid #e83e8c 1px',
                  borderRadius: '1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  maxWidth: '400px',
                  padding: '7px'
                }
              : { border: 'solid #e83e8c 1px', borderRadius: '1rem', display: 'none' }
          }
        >
          <Stack direction='row' spacing={0}>
            {facultyList.map((value) => (
              <Chip label={value} variant='outlined' onDelete={(e) => handleDelete(value)} />
            ))}
          </Stack>
        </div>
        <TextArea
          placeholder={'Facilities'}
          noOfROws={6}
          noOfCols={55}
          fieldName={'Facilities'}
          styles={{ border: 'solid #e83e8c 1px', borderRadius: '1rem' }}
          onChange={(e) => dispatch(updateCollegeInfo({ classKey: 'common', key: 'facilities', value: e.target.value }))}
          inputValue={common.facilities}
        />
      </div>
    </>
  )
}
