import React, { memo, useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InputFieldText from '../../../utils/CommonComponents/InputFieldText'
import CustomButton from '../../../utils/CommonComponents/CustomButton'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { constants } from '../../../utils/constants'
import UploadFile from '../../../utils/CommonComponents/UploadFile'
import { FileUpload } from '../../../utils/FileUpload'
import { updateCollegeInfo } from '../../../features/newCollegeSlice'
import { v4 as uuid } from 'uuid'
import { Avatar } from '@mui/material'

const FacilitiesFaculties = ({ collegeId }) => {
  const dispatch = useDispatch()
  const [isDisabled, setisDisabled] = useState(true)
  const { facilities, isEdit } = useSelector((state) => state.newCollege)
  const [facultyData, setFacultyData] = useState({
    faculty_id: '',
    faculty_name: '',
    department: '',
    image_path: ''
  })
  const [facility, setFacility] = useState('')
  const { facultyImage, setFacultyImage, facultyImageUrl, setFacultyImageUrl } = useContext(FileUpload)

  const createFacultyList = async () => {
    if (facultyImage.length > 0 && facultyImageUrl.length - 1 > facilities?.faculty_data.length - 1) {
      const facultyId = facultyImage[facultyImage.length - 1].name.split('.')[0]
      const facultyDataWithId = { ...facultyData, faculty_id: facultyId, image_path: facultyImage[facultyImage.length - 1].name }
      dispatch(updateCollegeInfo({ classKey: 'facilities', key: 'faculty_data', value: [...facilities?.faculty_data, facultyDataWithId] }))
      setFacultyData({
        faculty_id: '',
        faculty_name: '',
        department: '',
        image_path: ''
      })
      return
    } else {
      const url = facultyImageUrl
      url.push('')
      setFacultyImageUrl(url)
      const facultyId = uuid()
      const facultyDataWithId = { ...facultyData, faculty_id: facultyId }
      dispatch(updateCollegeInfo({ classKey: 'facilities', key: 'faculty_data', value: [...facilities?.faculty_data, facultyDataWithId] }))
      setFacultyData({
        faculty_id: '',
        faculty_name: '',
        department: '',
        image_path: ''
      })
    }
  }

  const handleDelete = (value, indexToRemove) => {
    if (!collegeId) {
      if (!value?.image_path) {
        const filteredFacultyImageUrl = facultyImageUrl.filter((_, index) => index !== indexToRemove)
        setFacultyImageUrl(filteredFacultyImageUrl)
        const filteredData = facilities?.faculty_data.filter((data) => data.faculty_id !== value.faculty_id)
        dispatch(updateCollegeInfo({ classKey: 'facilities', key: 'faculty_data', value: filteredData }))
      } else {
        const filteredFacultyImage = facultyImage.filter((data) => data?.name !== value?.image_path)
        setFacultyImage(filteredFacultyImage)
        const filteredFacultyImageUrl = facultyImageUrl.filter((_, index) => index !== indexToRemove)
        setFacultyImageUrl(filteredFacultyImageUrl)
        const filteredData = facilities?.faculty_data.filter((data) => data.faculty_id !== value.faculty_id)
        dispatch(updateCollegeInfo({ classKey: 'facilities', key: 'faculty_data', value: filteredData }))
      }
    } else {
      const filteredData = facilities?.faculty_data.filter((data) => data.faculty_id !== value.faculty_id)
      dispatch(updateCollegeInfo({ classKey: 'facilities', key: 'faculty_data', value: filteredData }))
    }
  }

  const handleFacilityDelete = (value) => {
    const filteredData = facilities?.facilities.filter((data) => data !== value)
    dispatch(updateCollegeInfo({ classKey: 'facilities', key: 'facilities', value: filteredData }))
  }

  const createFacilityList = () => {
    dispatch(updateCollegeInfo({ classKey: 'facilities', key: 'facilities', value: [...facilities?.facilities, facility] }))
    setFacility('')
  }

  const handleFormData = () => {
    if (collegeId) {
      return
    } else {
      let formData = {}
      if (localStorage.getItem('formData')) {
        formData = JSON.parse(localStorage.getItem('formData'))
      }
      localStorage.setItem(
        'formData',
        JSON.stringify({ ...formData, facilities: { facilities: facilities?.facilities, faculty_data: facilities?.faculty_data } })
      )
    }
  }

  useEffect(() => {
    if (facultyData.faculty_name !== '' && facultyData.department !== '') {
      setisDisabled(false)
    } else {
      setisDisabled(true)
    }
  }, [facultyData.faculty_name, facultyData.department])

  useEffect(() => {
    if (facilities?.faculty_data.length > 0 && facilities?.facilities.length > 0) {
      dispatch(updateCollegeInfo({ classKey: 'facilities', key: 'isValitadeError', value: false }))
      handleFormData()
    } else {
      dispatch(updateCollegeInfo({ classKey: 'facilities', key: 'isValitadeError', value: true }))
      handleFormData()
    }
  }, [facilities?.faculty_data.length, facilities?.facilities.length])

  return (
    <div style={{ display: ' flex', flexWrap: 'wrap', alignItems: 'center', gap: '3rem', margin: 'auto', padding: 'auto' }}>
      <InputFieldText
        placeholder='Faculty Name'
        inputValue={facultyData?.faculty_name}
        inputType='text'
        onChange={(e) => setFacultyData({ ...facultyData, faculty_name: e.target.value })}
        styles={{ width: '280px' }}
        disabled={collegeId && !isEdit ? true : false}
      />
      <InputFieldText
        placeholder='Department'
        inputValue={facultyData?.department}
        inputType='text'
        onChange={(e) => setFacultyData({ ...facultyData, department: e.target.value })}
        styles={{ width: '280px' }}
        disabled={collegeId && !isEdit ? true : false}
      />
      <UploadFile
        label={'Faculty image'}
        styles={{ width: '300px', height: '45px', display: 'flex', justifyContent: 'spaceBetween' }}
        multiple={false}
        disabled={collegeId && !isEdit ? true : false}
      />
      <CustomButton
        isDisabled={isDisabled}
        lable={'Add to List'}
        onClick={() => createFacultyList()}
        styles={{ margin: '0px 30px', padding: '0px 20px', width: '300px', height: '40px' }}
      />
      {facilities?.faculty_data.length > 0 && (
        <div
          className='form-group'
          style={{
            border: 'solid #e83e8c 1px',
            borderRadius: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            maxWidth: '400px',
            padding: '7px'
          }}
        >
          <Stack direction='row' spacing={0}>
            {facilities?.faculty_data.map((value, index) => (
              <Chip
                avatar={<Avatar src={collegeId ? `${constants.newImageAbsolutePath}${value.image_path}` : facultyImageUrl[index]} />}
                label={`${value.faculty_name}-${value.department}`}
                variant='outlined'
                onDelete={() => (collegeId && !isEdit ? undefined : handleDelete(value, index))}
              />
            ))}
          </Stack>
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', gap: '20px' }}>
          <InputFieldText
            placeholder='Facilities'
            inputValue={facility}
            inputType='text'
            onChange={(e) => setFacility(e.target.value)}
            styles={{ width: '280px' }}
            disabled={collegeId && !isEdit ? true : false}
          />
          <CustomButton
            isDisabled={facility ? false : true}
            lable={'Add Facility'}
            onClick={() => createFacilityList()}
            styles={{ margin: '0px 30px', padding: '0px 20px', width: '300px', height: '40px' }}
          />
        </div>
        {facilities?.facilities.length > 0 && (
          <div
            className='form-group'
            style={{
              border: 'solid #e83e8c 1px',
              borderRadius: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              maxWidth: '400px',
              padding: '7px'
            }}
          >
            <Stack direction='row' spacing={0}>
              {facilities?.facilities.map((value, index) => (
                <Chip
                  key={index}
                  label={value}
                  variant='outlined'
                  onDelete={() => (collegeId && !isEdit ? undefined : handleFacilityDelete(value))}
                />
              ))}
            </Stack>
          </div>
        )}
      </div>
    </div>
  )
}

export default memo(FacilitiesFaculties)
