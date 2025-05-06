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
import {
  addCollegeBasicDetails,
  addCollegeCourseOffered,
  deleteCollegeCourseOffered,
  fetchCollegeById,
  fetchCourseOfferedById
} from '../../utils/reduxThunk/collegeThunk'
import { useNavigate } from 'react-router-dom'

const Input = styled(MuiInput)`
  width: 42px;
`

export default function CourseOffered({ collegeId, admin }) {
  useCourseDetails()
  const { allCourseDetails, collegeBasicDetails, courseOffered, courseOfferedList, isEdit } = useSelector((state) => state.college)
  const {
    isValitadeError,
    college_id,
    course_id,
    course_name,
    course_fee_min,
    course_fee_max,
    course_accepting_exam,
    sub_course_fee,
    sub_course_duration
  } = useSelector((state) => state.college.courseOffered)
  const dispatch = useDispatch()
  const [isDisabled, setisDisabled] = useState(true)
  const [componentCourse, setComponentCourse] = useState('')
  const navigate = useNavigate()

  const handleSubCourseFee = () => {
    if (Number(sub_course_fee) >= course_fee_min && Number(sub_course_fee) <= course_fee_max) {
      dispatch(updateCollegeInfo({ classKey: 'courseOffered', key: 'sub_course_fee', value: Number(sub_course_fee) }))
    } else {
      dispatch(
        updateError({
          errorType: constants.apiResponseStatus.ERROR,
          errorMessage: 'Course Fee should be within the given range',
          flag: true
        })
      )
      dispatch(updateCollegeInfo({ classKey: 'courseOffered', key: 'sub_course_fee', value: Number(course_fee_min) }))
    }
  }

  const setDetails = (e, value) => {
    if (value !== '' && value !== undefined && value !== null) {
      const index = allCourseDetails.findIndex((i) => i.course_name === value)
      dispatch(updateCollegeInfo({ classKey: 'courseOffered', key: 'course_name', value: value }))
      dispatch(updateCollegeInfo({ classKey: 'courseOffered', key: 'sub_course_fee', value: allCourseDetails[index].course_fee_min }))
      dispatch(updateCollegeInfo({ classKey: 'courseOffered', key: 'course_fee_min', value: allCourseDetails[index].course_fee_min }))
      dispatch(updateCollegeInfo({ classKey: 'courseOffered', key: 'course_fee_max', value: allCourseDetails[index].course_fee_max }))
      dispatch(
        updateCollegeInfo({ classKey: 'courseOffered', key: 'course_accepting_exam', value: allCourseDetails[index].course_accepting_exam })
      )
      dispatch(updateCollegeInfo({ classKey: 'courseOffered', key: 'sub_course_duration', value: allCourseDetails[index].course_duration }))
      dispatch(updateCollegeInfo({ classKey: 'courseOffered', key: 'course_id', value: allCourseDetails[index].course_id }))
    } else {
      dispatch(updateCollegeInfo({ classKey: 'courseOffered', key: 'course_name', value: '' }))
      dispatch(updateCollegeInfo({ classKey: 'courseOffered', key: 'course_fee_min', value: '' }))
      dispatch(updateCollegeInfo({ classKey: 'courseOffered', key: 'course_fee_max', value: '' }))
      dispatch(updateCollegeInfo({ classKey: 'courseOffered', key: 'course_accepting_exam', value: '' }))
      dispatch(updateCollegeInfo({ classKey: 'courseOffered', key: 'sub_course_duration', value: '' }))
      dispatch(updateCollegeInfo({ classKey: 'courseOffered', key: 'course_id', value: '' }))
    }
  }

  const createCourseOfferedList = async () => {
    if (!isEdit && admin !== 'draft') {
      if (!JSON.stringify(courseOfferedList).includes(course_name)) {
        dispatch(
          updateCollegeInfo({
            classKey: 'courseOfferedList',
            value: [
              ...courseOfferedList,
              { college_id, course_id, course_name, course_accepting_exam, sub_course_fee, sub_course_duration }
            ]
          })
        )
        return
      } else {
        dispatch(
          updateError({
            errorType: constants.apiResponseStatus.ERROR,
            errorMessage: 'Course already added',
            flag: true
          })
        )
      }
    } else {
      if (!JSON.stringify(courseOfferedList).includes(course_name)) {
        const singleCourseOfferedPayload = {
          college_id: collegeId,
          course_id: course_id,
          course_name: course_name,
          course_accepting_exam: course_accepting_exam,
          sub_course_fee: sub_course_fee,
          sub_course_duration: sub_course_duration
        }
        const response = await dispatch(
          addCollegeCourseOffered({
            url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=collegeCourseOffered&addSingleCollege=yes',
            header: constants.apiHeaders.HEADER,
            method: constants.httpMethod.POST,
            payload: singleCourseOfferedPayload
          })
        )
        if (response.payload.status === constants.apiResponseStatus.SUCCESS) {
          dispatch(
            updateError({
              errorType: constants.apiResponseStatus.SUCCESS,
              errorMessage: 'Course added Successfully',
              flag: true
            })
          )
          dispatch(
            fetchCourseOfferedById({
              url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=collegeCourseOffered&college_id=' + collegeId,
              header: constants.apiHeaders.HEADER,
              method: constants.httpMethod.GET
            })
          )
        } else {
          dispatch(
            updateError({
              errorType: constants.apiResponseStatus.ERROR,
              errorMessage: 'Course cannot be added... Please try again',
              flag: true
            })
          )
        }
      } else {
        dispatch(
          updateError({
            errorType: constants.apiResponseStatus.ERROR,
            errorMessage: 'Course already added',
            flag: true
          })
        )
      }
    }
  }

  const addNewColumns = [
    {
      label: 'Delete',
      handleDeleteItem: (rowData) => {
        deleteCourse(rowData)
      },
      classname: 'deleteButton'
    }
  ]

  const deleteCourse = async (rowData) => {
    if (!isEdit && admin !== 'draft') {
      let filteredData = []
      filteredData = courseOfferedList.filter((data) => data.course_id !== rowData.course_id)
      dispatch(updateCollegeInfo({ classKey: 'courseOfferedList', value: filteredData }))
    } else {
      const deleteCourseOfferedPayload = {
        college_id: rowData.college_id,
        course_id: rowData.course_id
      }
      const response = await dispatch(
        deleteCollegeCourseOffered({
          url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=collegeCourseOffered',
          header: constants.apiHeaders.HEADER,
          method: constants.httpMethod.DELETE,
          payload: deleteCourseOfferedPayload
        })
      )
      if (response?.payload?.status === constants.apiResponseStatus.SUCCESS) {
        dispatch(
          fetchCourseOfferedById({
            url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=collegeCourseOffered&college_id=' + collegeId,
            header: constants.apiHeaders.HEADER,
            method: constants.httpMethod.GET
          })
        )
        dispatch(
          updateError({
            errorType: constants.apiResponseStatus.SUCCESS,
            errorMessage: 'Course deleted Successfully',
            flag: true
          })
        )
      } else {
        dispatch(
          updateError({
            errorType: constants.apiResponseStatus.ERROR,
            errorMessage: 'Course deletion unsuccessful... Please try again',
            flag: true
          })
        )
      }
    }
  }

  // const updateCollege = async () => {
  //   try {
  //     const courseOfferedPayload = await {
  //       data: courseOfferedList.map((data) => { return { ...data, college_id: collegeId } }).map((value) => {
  //         delete value.id
  //         return value
  //       })
  //     }
  //     const response = await dispatch(
  //       addCollegeCourseOffered({
  //         url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=collegeCourseOffered',
  //         header: constants.apiHeaders.HEADER,
  //         method: constants.httpMethod.PUT,
  //         payload: courseOfferedPayload
  //       })
  //     )
  //     if (response.payload.status === constants.apiResponseStatus.SUCCESS) {
  //       dispatch(
  //         updateError({
  //           errorType: constants.apiResponseStatus.SUCCESS,
  //           errorMessage: 'College Course Offered Details Updated Sucessfully',
  //           flag: true
  //         })
  //       )
  //       dispatch(updateCollegeInfo({ classKey: 'isEdit', value: false }))
  //     } else {
  //       dispatch(
  //         updateError({
  //           errorType: constants.apiResponseStatus.ERROR,
  //           errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
  //           flag: true
  //         })
  //       )
  //     }
  //   } catch (error) {
  //     dispatch(
  //       updateError({
  //         errorType: constants.apiResponseStatus.ERROR,
  //         errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
  //         flag: true
  //       })
  //     )
  //   }
  // }

  const handleCancle = async () => {
    try {
      const response = await dispatch(
        fetchCourseOfferedById({
          url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=collegeCourseOffered&college_id=' + collegeId,
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
  //   try {
  //     const courseOfferedPayload = await {
  //       data: courseOfferedList.map((data) => {
  //         return { ...data, college_id: collegeId }
  //       })
  //     }
  //     const response = await dispatch(addCollegeCourseOffered({
  //       url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=collegeCourseOffered',
  //       header: constants.apiHeaders.HEADER,
  //       method: admin === 'draft' ? constants.httpMethod.PUT : constants.httpMethod.POST,
  //       payload: courseOfferedPayload
  //     })
  //     )
  //     console.log(response)
  //     if (response.payload.status === constants.apiResponseStatus.SUCCESS || response.payload.status === constants.apiResponseStatus.WARNING) {
  //       dispatch(updateError({
  //         errorType: constants.apiResponseStatus.SUCCESS,
  //         errorMessage: 'Draft Saved Successfully',
  //         flag: true
  //       })
  //       )
  //       navigate('/list-agent-college')
  //     } else {
  //       dispatch(updateError({
  //         errorType: constants.apiResponseStatus.ERROR,
  //         errorMessage: 'Can not Save the draft... Please try again',
  //         flag: true
  //       })
  //       )
  //     }
  //   }
  //   catch (error) {
  //     dispatch(updateError({
  //       errorType: constants.apiResponseStatus.ERROR,
  //       errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
  //       flag: true
  //     })
  //     )
  //   }
  // }

  useEffect(() => {
    if (course_name !== '' && course_accepting_exam !== '' && sub_course_fee !== '' && sub_course_duration !== '') {
      setisDisabled(false)
    } else {
      setisDisabled(true)
    }
  }, [course_name, course_accepting_exam, sub_course_fee, sub_course_duration])

  useEffect(() => {
    if (courseOfferedList.length > 0) {
      dispatch(updateCollegeInfo({ classKey: 'courseOffered', key: 'isValitadeError', value: false }))
    } else {
      dispatch(updateCollegeInfo({ classKey: 'courseOffered', key: 'isValitadeError', value: true }))
    }
  }, [courseOfferedList.length])

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSubCourseFee()
    }, 2000)
    return () => clearTimeout(timer)
  }, [sub_course_fee])

  const collegeInfoData = courseOfferedList.map((data) =>
    Object.keys(data)
      .filter((key) => key.toLowerCase() !== 'college_id' && key.toLowerCase() !== 'course_id')
      .map((lable) => {
        return {
          lable: lable
            .split('_')
            .map((str) => {
              return str.charAt(0).toUpperCase() + str.slice(1)
            })
            .join(' '),
          value: data[lable]
        }
      })
  )

  return (
    <>
      {!isEdit && collegeId && admin !== 'draft' ? (
        <DataToDisplay dataToDisplay={collegeInfoData} type={'college'} switchClass={true} admin={admin} />
      ) : (
        <>
          <div style={{ gap: '20px', display: 'flex', margin: '2.5rem 0px', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <SearchSelectBox
              label='Course Name'
              options={allCourseDetails.map((course) => course.course_name)}
              onChange={(e, value) => setDetails(e, value)}
              value={courseOffered.course_name}
              onInputChange={(e, value) => setComponentCourse(value)}
              inputValue={componentCourse ? componentCourse : courseOffered.course_name}
            />

            {courseOffered.course_name && (
              <>
                {/* <Box sx={{ width: 250 }}>
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
                </Box> */}
                <InputFieldText
                  placeholder={`Course Fee (Min : ${course_fee_min}, Max : ${course_fee_max})`}
                  inputValue={sub_course_fee}
                  inputType='text'
                  styles={{ width: '280px' }}
                  onChange={(e) =>
                    dispatch(updateCollegeInfo({ classKey: 'courseOffered', key: 'sub_course_fee', value: Number(e.target.value) }))
                  }
                />
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
          </div>
          {courseOfferedList.length > 0 && (
            <div>
              <ItemList
                userColumns={constants.courseOfferedUserColumns}
                categoryData={courseOfferedList.map((data) => {
                  return { ...data, id: data.course_id }
                })}
                addNewColumns={addNewColumns}
                labe={'Course Offered Listing'}
                id={'course_id'}
                isVewdetails={false}
              />
            </div>
          )}

          {/* {!isEdit &&
            <div className='form-group'>
              <CustomButton isDisabled={collegeBasicDetails.isValitadeError === false && courseOfferedList.length > 0 ? false : true} lable={'Save as Draft'} onClick={() => saveDraft()} />
            </div>
          } */}

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {isEdit && collegeId && !admin && (
              <>
                {/* <CustomButton isDisabled={isValitadeError} lable={'Update'} onClick={() => updateCollege()} /> */}
                <CustomButton lable={'Cancle'} onClick={() => handleCancle()} />
              </>
            )}
          </div>
        </>
      )}
    </>
  )
}
