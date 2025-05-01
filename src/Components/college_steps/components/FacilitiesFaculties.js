import React, { useContext, useEffect, useState } from 'react'
import TextArea from '../../../utils/CommonComponents/TextArea'
import { useDispatch, useSelector } from 'react-redux'
// import { updateCollegeInfo } from '../../../features/collegeSlice'
import InputFieldText from '../../../utils/CommonComponents/InputFieldText'
import CustomButton from '../../../utils/CommonComponents/CustomButton'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import DataToDisplay from '../../course_list/DataToDisplay'
import { addCollegeFacilities, fetchCollegeCommonById } from '../../../utils/reduxThunk/collegeThunk'
import { constants } from '../../../utils/constants'
import { updateError } from '../../../features/commonSlice'
import { useNavigate } from 'react-router-dom'
import UploadFile from '../../../utils/CommonComponents/UploadFile'
import { FileUpload } from '../../../utils/FileUpload'
import { updateCollegeInfo } from '../../../features/newCollegeSlice'
import { v4 as uuid } from 'uuid'
import { Avatar } from '@mui/material'

const FacilitiesFaculties = ({ collegeId, admin }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
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
    let formData = {}
    if (localStorage.getItem('formData')) {
      formData = JSON.parse(localStorage.getItem('formData'))
    }
    localStorage.setItem(
      'formData',
      JSON.stringify({ ...formData, facilities: { facilities: facilities?.facilities, faculty_data: facilities?.faculty_data } })
    )
  }

  // const updateCollege = async () => {
  //     try {
  //         const commonPayload = await {
  //             college_id: collegeId,
  //             faculty_name: facultyList.map((data) => data).join(', '),
  //             facilities: common.facilities
  //         }
  //         const response = await dispatch(
  //             addCollegeFacilities({
  //                 url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=collegeFacilities',
  //                 header: constants.apiHeaders.HEADER,
  //                 method: constants.httpMethod.PUT,
  //                 payload: commonPayload
  //             })
  //         )
  //         if (response.payload.status === constants.apiResponseStatus.SUCCESS) {
  //             dispatch(
  //                 updateError({
  //                     errorType: constants.apiResponseStatus.SUCCESS,
  //                     errorMessage: 'College Facilities Updated Sucessfully',
  //                     flag: true
  //                 })
  //             )
  //             dispatch(
  //                 fetchCollegeCommonById({
  //                     url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=collegeFacilities&college_id=' + collegeId,
  //                     header: constants.apiHeaders.HEADER,
  //                     method: constants.httpMethod.GET
  //                 })
  //             )
  //             dispatch(updateCollegeInfo({ classKey: 'isEdit', value: false }))
  //         } else {
  //             dispatch(
  //                 updateError({
  //                     errorType: constants.apiResponseStatus.ERROR,
  //                     errorMessage: 'College Facilities cannot be added... Please try again',
  //                     flag: true
  //                 })
  //             )
  //         }
  //     }
  //     catch (error) {
  //         dispatch(
  //             updateError({
  //                 errorType: constants.apiResponseStatus.ERROR,
  //                 errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
  //                 flag: true
  //             })
  //         )
  //     }
  // }

  const handleCancle = async () => {
    try {
      const response = await dispatch(
        fetchCollegeCommonById({
          url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=collegeFacilities&college_id=' + collegeId,
          header: constants.apiHeaders.HEADER,
          method: constants.httpMethod.GET
        })
      )
      if (response.payload.status === constants.apiResponseStatus.SUCCESS) {
        dispatch(updateCollegeInfo({ classKey: 'isEdit', value: false }))
      } else {
        dispatch(
          updateError({
            errorType: constants.apiResponseStatus.ERROR,
            errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
            flag: true
          })
        )
      }
    } catch (error) {
      dispatch(
        updateError({
          errorType: constants.apiResponseStatus.ERROR,
          errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
          flag: true
        })
      )
    }
  }

  // const saveDraft = async () => {
  //     try {
  //         const commonPayload = await {
  //             college_id: collegeId,
  //             faculty_name: facultyList.map((data) => data).join(', '),
  //             facilities: common.facilities
  //         }
  //         const response = await dispatch(
  //             addCollegeFacilities({
  //                 url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=collegeFacilities',
  //                 header: constants.apiHeaders.HEADER,
  //                 method: common.college_id ? constants.httpMethod.PUT : constants.httpMethod.POST,
  //                 payload: commonPayload
  //             })
  //         )
  //         if (response.payload.status === constants.apiResponseStatus.SUCCESS) {
  //             dispatch(updateError({
  //                 errorType: constants.apiResponseStatus.SUCCESS,
  //                 errorMessage: 'Saved Draft Sucessfully',
  //                 flag: true
  //             })
  //             )
  //             navigate('/list-agent-college')
  //         } else {
  //             dispatch(
  //                 updateError({
  //                     errorType: constants.apiResponseStatus.ERROR,
  //                     errorMessage: 'Can not Save the draft... Please try again',
  //                     flag: true
  //                 })
  //             )
  //         }
  //     }
  //     catch (error) {
  //         dispatch(
  //             updateError({
  //                 errorType: constants.apiResponseStatus.ERROR,
  //                 errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
  //                 flag: true
  //             })
  //         )
  //     }
  // }

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

  // useEffect(() => {
  //     if (facultyList.length > 0 && common.facilities !== '') {
  //         dispatch(updateCollegeInfo({ classKey: 'common', key: 'isValitadeError', value: false }))
  //     } else {
  //         dispatch(updateCollegeInfo({ classKey: 'common', key: 'isValitadeError', value: true }))
  //     }
  // }, [facultyList, common.facilities])

  // const collegeInfoData = [
  //     { lable: 'Faculty Name & Department', value: facultyList.join(', ') },
  //     { lable: 'Facilities', value: facilities?.facilities }
  // ]
  return (
    <>
      {!isEdit && collegeId && admin !== 'draft' ? (
        // <DataToDisplay dataToDisplay={collegeInfoData} type={'college'} admin={admin} />
        <div></div>
      ) : (
        <>
          <div style={{ display: ' flex', flexWrap: 'wrap', alignItems: 'center', gap: '3rem', margin: 'auto', padding: 'auto' }}>
            <InputFieldText
              placeholder='Faculty Name'
              inputValue={facultyData?.faculty_name}
              inputType='text'
              onChange={(e) => setFacultyData({ ...facultyData, faculty_name: e.target.value })}
              styles={{ width: '280px' }}
            />
            <InputFieldText
              placeholder='Department'
              inputValue={facultyData?.department}
              inputType='text'
              onChange={(e) => setFacultyData({ ...facultyData, department: e.target.value })}
              styles={{ width: '280px' }}
            />
            <UploadFile
              label={'Faculty image'}
              styles={{ width: '300px', height: '45px', display: 'flex', justifyContent: 'spaceBetween' }}
              multiple={false}
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
                      avatar={<Avatar alt='Faculty Image' src={facultyImageUrl[index]} />}
                      label={`${value.faculty_name}-${value.department}`}
                      variant='outlined'
                      onDelete={(e) => handleDelete(value, index)}
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
                      <Chip key={index} label={value} variant='outlined' onDelete={(e) => handleFacilityDelete(value)} />
                    ))}
                  </Stack>
                </div>
              )}
            </div>
            {/* <TextArea
                            placeholder={'Facilities'}
                            noOfROws={6}
                            noOfCols={55}
                            fieldName={'Facilities'}
                            styles={{ border: 'solid #e83e8c 1px', borderRadius: '1rem' }}
                            onChange={(e) => dispatch(updateCollegeInfo({ classKey: 'common', key: 'facilities', value: e.target.value }))}
                            inputValue={common.facilities}
                        /> */}
            {/* {!isEdit &&
                            <div className='form-group'>
                                <CustomButton isDisabled={common.isValitadeError || collegeBasicDetails.isValitadeError} lable={'Save as Draft'} onClick={() => saveDraft()} />
                            </div>
                        } */}
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {isEdit && collegeId && !admin && (
              <>
                {/* <CustomButton isDisabled={common.isValitadeError} lable={'Update'} onClick={() => updateCollege()} /> */}
                <CustomButton lable={'Cancle'} onClick={() => handleCancle()} />
              </>
            )}
          </div>
        </>
      )}
    </>
  )
}

export default FacilitiesFaculties
