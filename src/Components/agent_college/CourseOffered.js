import React, { useEffect, useState } from 'react'
import SearchSelectBox from '../../utils/CommonComponents/SearchSelectBox'
import CustomCard from '../../utils/CommonComponents/CustomCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCourseDetails } from '../../utils/reduxThunk/courseThunk'
import { constants } from '../../utils/constants'
import { updateError } from '../../features/commonSlice'
import { resetCourse } from '../../features/courseSlice'
import { updateCollegeInfo } from '../../features/collegeSlice'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Slider from '@mui/material/Slider'
import MuiInput from '@mui/material/Input'
import VolumeUp from '@mui/icons-material/VolumeUp'
import useCourseDetails from '../../hooks/useCourseDetails'
import InputFieldText from '../../utils/CommonComponents/InputFieldText'
import CustomButton from '../../utils/CommonComponents/CustomButton'
import { v4 as uuid } from 'uuid'
import ItemList from '../ItemList'
import DataToDisplay from '../course_list/DataToDisplay'
import { addCollegeBasicDetails, fetchCollegeById } from '../../utils/reduxThunk/collegeThunk'

const Input = styled(MuiInput)`
  width: 42px;
`

export default function CourseOffered({ collegeId }) {
  useCourseDetails()
  const { allCourseDetails, courseOffered, courseOfferedList, isEdit } = useSelector((state) => state.college)
  const { isValitadeError, college_id, course_name, course_fee_min, course_fee_max, course_accepting_exam, sub_course_fee, sub_course_duration } =
    useSelector((state) => state.college.courseOffered)
  const dispatch = useDispatch()
  const [value, setValue] = useState(Number(course_fee_min))
  const [isDisabled, setisDisabled] = useState(true)
  const [componentCourse, setComponentCourse] = useState('')
  const id = uuid()

  const handleSliderChange = (event, newValue) => {
    if (Number(newValue) < Number(course_fee_min)) {
      setValue(Number(course_fee_min))
      dispatch(updateCollegeInfo({ classKey: 'courseOffered', key: 'sub_course_fee', value: Number(course_fee_min) }))
    } else if (Number(newValue) > Number(course_fee_max)) {
      setValue(Number(course_fee_max))
      dispatch(updateCollegeInfo({ classKey: 'courseOffered', key: 'sub_course_fee', value: Number(course_fee_max) }))
    } else {
      setValue(Number(newValue))
      dispatch(updateCollegeInfo({ classKey: 'courseOffered', key: 'sub_course_fee', value: Number(newValue) }))
    }
  }

  const handleInputChange = (event) => {
    if (Number(event.target.value) < Number(course_fee_min)) {
      setValue(Number(course_fee_min))
      dispatch(updateCollegeInfo({ classKey: 'courseOffered', key: 'sub_course_fee', value: Number(course_fee_min) }))
    } else if (Number(event.target.value) > Number(course_fee_max)) {
      setValue(Number(course_fee_max))
      dispatch(updateCollegeInfo({ classKey: 'courseOffered', key: 'sub_course_fee', value: Number(course_fee_max) }))
    } else {
      setValue(Number(event.target.value))
      dispatch(updateCollegeInfo({ classKey: 'courseOffered', key: 'sub_course_fee', value: Number(event.target.value) }))
    }
  }

  const handleBlur = () => {
    if (value < Number(course_fee_min)) {
      setValue(Number(course_fee_min))
      dispatch(updateCollegeInfo({ classKey: 'courseOffered', key: 'sub_course_fee', value: Number(course_fee_min) }))
    } else if (value > Number(course_fee_max)) {
      setValue(Number(course_fee_max))
      dispatch(updateCollegeInfo({ classKey: 'courseOffered', key: 'sub_course_fee', value: Number(course_fee_max) }))
    }
  }

  const setDetails = (e, value) => {
    if (value !== '' && value !== undefined && value !== null) {
      const index = allCourseDetails.findIndex((i) => i.course_id === value.course_id)
      dispatch(updateCollegeInfo({ classKey: 'courseOffered', key: 'course_name', value: value.label }))
      dispatch(updateCollegeInfo({ classKey: 'courseOffered', key: 'course_fee_min', value: allCourseDetails[index].course_fee_min }))
      dispatch(updateCollegeInfo({ classKey: 'courseOffered', key: 'course_fee_max', value: allCourseDetails[index].course_fee_max }))
      dispatch(
        updateCollegeInfo({ classKey: 'courseOffered', key: 'course_accepting_exam', value: allCourseDetails[index].course_accepting_exam })
      )
      dispatch(updateCollegeInfo({ classKey: 'courseOffered', key: 'sub_course_duration', value: allCourseDetails[index].course_duration }))
    } else {
      dispatch(updateCollegeInfo({ classKey: 'courseOffered', key: 'course_name', value: '' }))
      dispatch(updateCollegeInfo({ classKey: 'courseOffered', key: 'course_fee_min', value: '' }))
      dispatch(updateCollegeInfo({ classKey: 'courseOffered', key: 'course_fee_max', value: '' }))
      dispatch(updateCollegeInfo({ classKey: 'courseOffered', key: 'course_accepting_exam', value: '' }))
      dispatch(updateCollegeInfo({ classKey: 'courseOffered', key: 'sub_course_duration', value: '' }))
    }
  }

  const createCourseOfferedList = () => {
    dispatch(
      updateCollegeInfo({
        classKey: 'courseOfferedList',
        value: [...courseOfferedList, { id, course_name, course_accepting_exam, sub_course_fee, sub_course_duration }]
      })
    )
  }

  const addNewColumns = [
    {
      label: 'Delete',
      handleDeleteItem: (rowData) => {
        deleteCourse(rowData.id)
      },
      classname: 'deleteButton'
    }
  ]

  const deleteCourse = (id) => {
    const filteredData = courseOfferedList.filter((data) => data.id !== id)
    dispatch(updateCollegeInfo({ classKey: 'courseOfferedList', value: filteredData }))
  }

  const updateCollege = async () => {
    try {
      const collegeInfoPayload = await {
        college_id: college_id,
        course_name: courseOffered.course_name,
        course_accepting_exam: courseOffered.course_accepting_exam,
        sub_course_fee: courseOffered.sub_course_fee,
        sub_course_duration: courseOffered.sub_course_duration
      }
      const response = await dispatch(
        addCollegeBasicDetails({
          url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=basicCollegeListing',
          header: constants.apiHeaders.HEADER,
          method: constants.httpMethod.PUT,
          payload: collegeInfoPayload
        })
      )
      if (response.payload.status === constants.apiResponseStatus.SUCCESS) {
        dispatch(
          updateError({
            errorType: constants.apiResponseStatus.ERROR,
            errorMessage: 'College Basic Details Updated Sucessfully',
            flag: true
          })
        )
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

  const handleCancle = async () => {
    try {
      const response = await dispatch(
        fetchCollegeById({
          url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=basicCollegeListing&college_id=' + collegeId,
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

  useEffect(() => {
    setValue(Number(course_fee_min))
    dispatch(updateCollegeInfo({ classKey: 'courseOffered', key: 'sub_course_fee', value: course_fee_min }))
  }, [course_fee_min])

  useEffect(() => {
    if (course_name !== '' && course_accepting_exam !== '' && sub_course_fee !== '' && sub_course_duration !== '') {
      dispatch(updateCollegeInfo({ classKey: 'courseOffered', key: 'isValitadeError', value: false }))
      setisDisabled(false)
    } else {
      dispatch(updateCollegeInfo({ classKey: 'courseOffered', key: 'isValitadeError', value: true }))
      setisDisabled(true)
    }
  }, [course_name, course_accepting_exam, sub_course_fee, sub_course_duration])

  const collegeInfoData = courseOfferedList.map((data) => Object.keys(data).filter((key) => key.toLowerCase() !== 'college_id').map((lable) => { return { 'lable': lable.split('_').map((str) => { return str.charAt(0).toUpperCase() + str.slice(1) }).join(' '), 'value': data[lable] } }))

  return (
    <>
      {!isEdit && collegeId ? (
        <DataToDisplay dataToDisplay={collegeInfoData} type={'college'} switchClass={true} />
      ) : (
        <div style={{ gap: '20px', display: 'flex', margin: '2.5rem 0px', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <SearchSelectBox
            label='Course Name'
            options={allCourseDetails.map((course) => {
              return { label: course.course_name, course_id: course.course_id }
            })}
            onChange={(e, value) => setDetails(e, value)}
            onInputChange={(e, value) => setComponentCourse(value)}
            inputValue={componentCourse ? componentCourse : courseOffered.course_name}
          />

          {courseOffered.course_name && (
            <>
              <Box sx={{ width: 250 }}>
                <Typography id='input-slider' gutterBottom>
                  Course Fee (min : {courseOffered.course_fee_min} , max : {courseOffered.course_fee_max})
                </Typography>
                <Grid container spacing={2} alignItems='center'>
                  <Grid item></Grid>
                  <Grid item xs>
                    <Slider value={typeof value === 'number' ? value : 0} onChange={handleSliderChange} aria-labelledby='input-slider' />
                  </Grid>
                  <Grid item>
                    <Input
                      value={value}
                      size='small'
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      inputProps={{
                        step: 1,
                        min: Number(course_fee_min),
                        max: Number(course_fee_max),
                        type: 'number',
                        'aria-labelledby': 'input-slider'
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
              {/* <div className='full-contain'>
              <div className='grid-parent'> */}
              <InputFieldText
                placeholder='Exam Accepted'
                inputValue={courseOffered.course_accepting_exam}
                inputType='text'
                styles={{ width: '280px' }}
                disabled={true}
              />
              <InputFieldText
                placeholder='Course Duration'
                inputValue={courseOffered.sub_course_duration}
                inputType='text'
                styles={{ width: '280px' }}
                disabled={true}
              />
              <CustomButton
                isDisabled={isDisabled}
                lable={'Add to Course Offered'}
                onClick={() => createCourseOfferedList()}
                styles={{ margin: '0px 30px', padding: '0px 20px', width: '300px', height: '40px' }}
              />
              {/* </div>
            </div> */}
            </>
          )}

          {courseOfferedList.length > 0 && (
            <div>
              <ItemList
                userColumns={constants.courseOfferedUserColumns}
                categoryData={courseOfferedList}
                addNewColumns={addNewColumns}
                labe={'Course Offered Listing'}
                // path={'/add-new-course/'}
                // id={'course_id'}
                isVewdetails={false}
              />
            </div>
          )}
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {isEdit && collegeId && (
              <>
                <CustomButton isDisabled={isValitadeError} lable={'Update'} onClick={() => updateCollege()} />
                <CustomButton isDisabled={isValitadeError} lable={'Cancle'} onClick={() => handleCancle()} />
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
