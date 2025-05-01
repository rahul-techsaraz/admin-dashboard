import { Step, StepLabel, Stepper } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { constants } from '../../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import CustomButton from '../../utils/CommonComponents/CustomButton'
import CollegeBasicDetails from './components/CollegeBasicDetails'
import CourseOffered from './components/CourseOffered'
import CollegeDescription from './components/CollegeDescription'
import Placements from './components/Placements'
import News from './components/News'
import { updateCollegeInfo } from '../../features/newCollegeSlice'
import FacilitiesFaculties from './components/FacilitiesFaculties'
import CollegeGallary from './components/CollegeGallary'
import { v4 as uuid } from 'uuid'
import { updateError } from '../../features/commonSlice'
import { FileUpload } from '../../utils/FileUpload'
import { createNewCollege } from '../../utils/reduxThunk/collegeThunk'

const StepForm = () => {
  const { activeStep, collegeBasicDetails, courseOffered, collegeDescriptions, facilities, gallary, placements, news } = useSelector(
    (state) => state.newCollege
  )
  const { userToken } = useSelector((state) => state.user)
  const { collegeLogo, collegeThumbnail, collegeBrochure, collegeGallary, facultyImage } = useContext(FileUpload)
  const dispatch = useDispatch()
  const handleSteps = (step) => {
    switch (step) {
      case 0:
        return <CollegeBasicDetails />
      case 1:
        return <CourseOffered />
      case 2:
        return <CollegeDescription />
      case 3:
        return <Placements />
      case 4:
        return <News />
      case 5:
        return <FacilitiesFaculties />
      case 6:
        return <CollegeGallary />
      default:
        throw new Error('Unknown step')
    }
  }
  const inhanceLabel = constants.collegeStepsLabel.map((label) => {
    if (label.isValitadeError === 'collegeBasicDetails') {
      return { ...label, isValitadeError: collegeBasicDetails.isValitadeError }
    } else if (label.isValitadeError === 'courseOffered') {
      return { ...label, isValitadeError: courseOffered.isValitadeError }
    } else if (label.isValitadeError === 'collegeDescriptions') {
      return { ...label, isValitadeError: collegeDescriptions.isValitadeError }
    } else if (label.isValitadeError === 'placements') {
      return { ...label, isValitadeError: placements.isValitadeError }
    } else if (label.isValitadeError === 'news') {
      return { ...label, isValitadeError: news.isValitadeError }
    } else if (label.isValitadeError === 'facilities') {
      return { ...label, isValitadeError: facilities.isValitadeError }
    } else if (label.isValitadeError === 'gallary') {
      return { ...label, isValitadeError: gallary.isValitadeError }
    }
  })
  const handleNext = () => {
    dispatch(updateCollegeInfo({ classKey: 'activeStep', value: activeStep + 1 }))
  }
  const disableNextBtn = () => {
    if (activeStep === 0 && !collegeBasicDetails.isValitadeError) {
      return false
    } else if (activeStep === 1 && !courseOffered.isValitadeError) {
      return false
    } else if (activeStep === 2 && !collegeDescriptions.isValitadeError) {
      return false
    } else if (activeStep === 3 && !placements.isValitadeError) {
      return false
    } else if (activeStep === 4 && !news.isValitadeError) {
      return false
    } else if (activeStep === 5 && !facilities.isValitadeError) {
      return false
    } else if (activeStep === 6 && !gallary.isValitadeError) {
      return false
    } else {
      return true
    }
  }
  function getCookie(name) {
    let value = '; ' + document.cookie
    let parts = value.split('; ' + name + '=')
    if (parts.length == 2) return parts.pop().split(';').shift()
  }
  // const handleSubmit = async () => {
  //   const token = getCookie('token')
  //   if (token) {
  //     // Cookie is set, you can make authorized API requests
  //     console.log('Token is set:', token)
  //   } else {
  //     // No token found, show login page or redirect
  //     console.log('User is not authenticated.')
  //   }
  //   try {
  //     const college_id = uuid()
  //     const payload = {
  //       college_id: college_id,
  //       college_name: collegeBasicDetails?.college_name,
  //       location: collegeBasicDetails?.location,
  //       affiliate_by: collegeBasicDetails?.affiliate_by,
  //       ratings: collegeBasicDetails?.ratings,
  //       state: collegeBasicDetails?.state,
  //       city: collegeBasicDetails?.city,
  //       category_name: collegeBasicDetails?.category_name,
  //       college_type: collegeBasicDetails?.college_type,
  //       college_logo: collegeBasicDetails?.college_logo,
  //       college_thumbnail: collegeBasicDetails?.college_thumbnail,
  //       college_download_brochure_path: collegeBasicDetails?.college_download_brochure_path,
  //       fee_starting: collegeBasicDetails?.fee_starting,
  //       avg_first_year_fee: collegeBasicDetails?.avg_first_year_fee,
  //       message: collegeBasicDetails?.message,
  //       account_name: 'test',
  //       is_publish: constants.courseIsPublished.notPublished,
  //       courseOffered: courseOffered?.courses_offered,
  //       collegeDescriptions: {
  //         college_description: collegeDescriptions?.college_description,
  //         college_course_description: collegeDescriptions?.college_course_description,
  //         college_highlights_description: collegeDescriptions?.college_highlights_description,
  //         college_campus_description: collegeDescriptions?.college_campus_description,
  //         college_admission_description: collegeDescriptions?.college_admission_description
  //       },
  //       facilities: {
  //         facilities: facilities?.facilities,
  //         faculty_data: facilities?.faculty_data
  //       },
  //       placements: placements?.placement_data,
  //       news: news?.news_data,
  //       gallary: gallary.image_path
  //     }
  //     console.log(localStorage.getItem('token'))
  //     console.log({ userToken })
  //     console.log()
  //     const filePayload = new FormData()
  //     filePayload.append('data', JSON.stringify(payload))
  //     filePayload.append('college_logo[]', collegeLogo[0])
  //     filePayload.append('college_thumbnail[]', collegeThumbnail[0])
  //     filePayload.append('college_brochure[]', collegeBrochure[0])
  //     for (let i = 0; i < collegeGallary.length; i++) {
  //       filePayload.append('college_gallary[]', collegeGallary[i])
  //     }
  //     for (let i = 0; i < facultyImage.length; i++) {
  //       filePayload.append('faculty_image[]', facultyImage[i])
  //     }
  //     const response = await dispatch(
  //       createNewCollege({
  //         url: constants.apiEndPoint.NEW_COLLEGE,
  //         payload: filePayload,
  //         header: {
  //           Authorization:
  //             'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3RcL3BocF9hdXRoX2FwaVwvIiwiYXVkIjoiaHR0cDpcL1wvbG9jYWxob3N0XC9waHBfYXV0aF9hcGlcLyIsImlhdCI6MTc0NjAwODg2NSwiZXhwIjoxNzQ2MDEyNDY1LCJkYXRhIjp7InVzZXJfaWQiOjI1fX0.miFFDmsIvnzEyPKyuJFWcmGjfqMlezAsy4v7O7PBjrU'
  //         }
  //       })
  //     )
  //     console.log(response)
  //   } catch (error) {
  //     console.error(error)
  //     dispatch(
  //       updateError({
  //         errorType: constants.apiResponseStatus.ERROR,
  //         errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
  //         flag: true
  //       })
  //     )
  //   }
  // }
  const handleSubmit = async () => {
    const token = getCookie('token')
    if (token) {
      // Cookie is set, you can make authorized API requests
      console.log('Token is set:', token)
    } else {
      // No token found, show login page or redirect
      console.log('User is not authenticated.')
    }

    try {
      const college_id = uuid()
      const payload = {
        college_id: college_id,
        college_name: collegeBasicDetails?.college_name,
        location: collegeBasicDetails?.location,
        affiliate_by: collegeBasicDetails?.affiliate_by,
        ratings: collegeBasicDetails?.ratings,
        state: collegeBasicDetails?.state,
        city: collegeBasicDetails?.city,
        category_name: collegeBasicDetails?.category_name,
        college_type: collegeBasicDetails?.college_type,
        college_logo: collegeBasicDetails?.college_logo,
        college_thumbnail: collegeBasicDetails?.college_thumbnail,
        college_download_brochure_path: collegeBasicDetails?.college_download_brochure_path,
        fee_starting: collegeBasicDetails?.fee_starting,
        avg_first_year_fee: collegeBasicDetails?.avg_first_year_fee,
        message: collegeBasicDetails?.message,
        account_name: 'test',
        is_publish: constants.courseIsPublished.notPublished,
        courseOffered: courseOffered?.courses_offered,
        collegeDescriptions: {
          college_description: collegeDescriptions?.college_description,
          college_course_description: collegeDescriptions?.college_course_description,
          college_highlights_description: collegeDescriptions?.college_highlights_description,
          college_campus_description: collegeDescriptions?.college_campus_description,
          college_admission_description: collegeDescriptions?.college_admission_description
        },
        facilities: {
          facilities: facilities?.facilities,
          faculty_data: facilities?.faculty_data
        },
        placements: placements?.placement_data,
        news: news?.news_data,
        gallary: gallary.image_path
      }

      console.log(localStorage.getItem('token'))
      console.log({ userToken })

      const filePayload = new FormData()
      filePayload.append('data', JSON.stringify(payload))

      // Append logo, thumbnail, and brochure files
      filePayload.append('college_logo[]', collegeLogo[0])
      filePayload.append('college_thumbnail[]', collegeThumbnail[0])
      filePayload.append('college_brochure[]', collegeBrochure[0])

      // Append gallery images
      for (let i = 0; i < collegeGallary.length; i++) {
        filePayload.append('college_gallary[]', collegeGallary[i])
      }

      // Append faculty images with corresponding faculty_id
      // for (let i = 0; i < facultyImage.length; i++) {
      //   const facultyId = facilities?.faculty_data[i]?.faculty_id // Get the corresponding faculty_id
      //   if (facultyId) {
      //     filePayload.append(`faculty_image[${facultyId}]`, facultyImage[i])
      //   }
      // }
      for (let i = 0; i < facultyImage.length; i++) {
        const facultyId = facultyImage[i].name.split('.')[0] // Get the corresponding faculty_id
        if (facultyId) {
          filePayload.append(`faculty_image[${facultyId}]`, facultyImage[i])
        }
      }

      // Dispatch API request
      const response = await dispatch(
        createNewCollege({
          url: constants.apiEndPoint.NEW_COLLEGE,
          payload: filePayload,
          header: {
            Authorization:
              'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3RcL3BocF9hdXRoX2FwaVwvIiwiYXVkIjoiaHR0cDpcL1wvbG9jYWxob3N0XC9waHBfYXV0aF9hcGlcLyIsImlhdCI6MTc0NjAxMjk4MCwiZXhwIjoxNzQ2MDE2NTgwLCJkYXRhIjp7InVzZXJfaWQiOjI1fX0.71n6RaRbUajzcxkI02oUnoeUYnXYjVToMEk4DaXHDng'
          }
        })
      )

      console.log(response)
    } catch (error) {
      console.error(error)
      dispatch(
        updateError({
          errorType: constants.apiResponseStatus.ERROR,
          errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
          flag: true
        })
      )
    }
  }

  return (
    <>
      <Stepper activeStep={activeStep} sx={{ py: 3 }} alternativeLabel>
        {inhanceLabel.map((label, index) => (
          <Step key={index} completed={!label.isValitadeError}>
            <StepLabel>{label.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {handleSteps(activeStep)}
      <div className={activeStep === 0 ? 'stepper-btn-container2' : 'stepper-btn-container'}>
        {activeStep > 0 && (
          <CustomButton lable={'Prev'} onClick={() => dispatch(updateCollegeInfo({ classKey: 'activeStep', value: activeStep - 1 }))} />
        )}
        {activeStep < 6 ? (
          <CustomButton onClick={() => handleNext()} lable={'Next'} isDisabled={disableNextBtn()} />
        ) : (
          <CustomButton onClick={() => handleSubmit()} lable={'Submit'} isDisabled={disableNextBtn()} />
        )}
      </div>
    </>
  )
}

export default StepForm
