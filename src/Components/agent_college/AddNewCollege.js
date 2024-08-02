import React, { useEffect, useState } from 'react'
import AddItemForm from '../AddItemForm'
import AddCollege from './AddCollege'
import { useDispatch, useSelector } from 'react-redux'
import CustomButton from '../../utils/CommonComponents/CustomButton'
import { v4 as uuid } from 'uuid'
import { updateError } from '../../features/commonSlice'
import { constants } from '../../utils/constants'
import { resetCollege, updateCollegeInfo } from '../../features/collegeSlice'
import {
  addCollegeBasicDetails,
  addCollegeCourseOffered,
  addCollegeDescription,
  addCollegeFacilities,
  addCollegeGallary,
  addCollegeHighlight,
  deleteCollegeBasicDetails,
  fileUploadGallary,
  fileUploadThumbnail,
  fileUploadlogo
} from '../../utils/reduxThunk/collegeThunk'
import { useNavigate } from 'react-router-dom'
import { FileUpload } from '../../utils/FileUpload'


export default function AddNewCollege() {
  const {
    isDisabled,
    collegeBasicDetails,
    courseOffered,
    collegeDescriptions,
    collegeHighlights,
    common,
    gallary,
    highlightList,
    facultyList,
    courseOfferedList
  } = useSelector((state) => state.college)
  const {
    college_name,
    location,
    affiliate_by,
    ratings,
    state,
    city,
    college_type,
    college_logo,
    college_thumbnail } = useSelector((state) => state.college.collegeBasicDetails)
  // console.log("Redux state of Logo " + college_logo)
  // console.log("Redux state of Thumbnail " + college_thumbnail)
  const {
    image_path,
    video_path } = useSelector((state) => state.college.gallary)
  // console.log("Redux state of Gallary " + image_path)
  const [collegeLogo, setCollegeLogo] = useState([])
  const [collegeThumbnail, setCollegeThumbnail] = useState([])
  const [collegeGallary, setCollegeGallary] = useState([])
  const [collegeGallaryUrl, setCollegeGallaryUrl] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // console.log("Redux state of Logo " + college_logo)
  // console.log("Redux state of Thumbnail " + college_thumbnail)
  // const createPayload = (collegeID) => {
  //   const newPayload = {
  //     college_id: collegeID,
  //     college_name: college_name,
  //     location: location,
  //     affiliate_by: affiliate_by,
  //     ratings: ratings,
  //     college_logo: college_logo,
  //     college_thumbnail: college_thumbnail,
  //     state: state,
  //     city: city,
  //     college_type: college_type,
  //     account_name: JSON.parse(localStorage.getItem('userData')).account_name,
  //     is_publish: constants.courseIsPublished.notPublished
  //   }
  //   return newPayload
  // }
  const createNewCollege = async () => {
    try {
      const collegeID =  uuid()

      const collegeDeletePayload = {
        college_id: collegeID
      }
      const collegeInfoPayload = {
        college_id: collegeID,
        college_name: collegeBasicDetails.college_name,
        location: collegeBasicDetails.location,
        affiliate_by: collegeBasicDetails.affiliate_by,
        ratings: collegeBasicDetails.ratings,
        college_logo: '',
        college_thumbnail: '',
        state: collegeBasicDetails.state,
        city: collegeBasicDetails.city,
        college_type: collegeBasicDetails.college_type,
        account_name: JSON.parse(localStorage.getItem('userData')).account_name,
        is_publish: constants.courseIsPublished.notPublished
      }


      const addNewCollegeResponse =  await dispatch(
        addCollegeBasicDetails({
          url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=basicCollegeListing',
          header: constants.apiHeaders.HEADER,
          method: constants.httpMethod.POST,
          payload: collegeInfoPayload
        })
      )
      console.log(addNewCollegeResponse)
      if (addNewCollegeResponse?.payload?.status === constants.apiResponseStatus.SUCCESS) {
        const collegeLogoData = new FormData()
        for (let i = 0; i < collegeLogo.length; i++) {
          collegeLogoData.append('file[]', collegeLogo[i])
        }
        const collegeThumbnailData = new FormData()
        for (let i = 0; i < collegeThumbnail.length; i++) {
          collegeThumbnailData.append('file[]', collegeThumbnail[i])
        }
        const collegeGallaryData = new FormData()
        for (let i = 0; i < collegeGallary.length; i++) {
          collegeGallaryData.append('file[]', collegeGallary[i])
        }
        const isFileUploaded = await Promise.all([
          dispatch(
            fileUploadlogo({
              url: constants.apiEndPoint.UPLOAD_FILE + `?dir=${collegeBasicDetails.college_name}`,
              payload: collegeLogoData
            })
          ),
          dispatch(
            fileUploadThumbnail({
              url: constants.apiEndPoint.UPLOAD_FILE + `?dir=${collegeBasicDetails.college_name}`,
              payload: collegeThumbnailData
            })
          )
        ])
        console.log({ isFileUploaded })
        const response = isFileUploaded
          .map((status) => status?.payload?.status)
          .some((status) => [constants.apiResponseStatus.SUCCESS, 200].includes(status))
        console.log({response})
        if (!response) {
          dispatch(
            updateError({
              errorType: constants.apiResponseStatus.ERROR,
              errorMessage: 'Something went wrong',
              flag: true
            })
          )
          dispatch(
            deleteCollegeBasicDetails({
              url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=basicCollegeListing',
              header: constants.apiHeaders.HEADER,
              method: constants.httpMethod.DELETE,
              payload: collegeDeletePayload
            })
          )
          dispatch(resetCollege())
          return;
        }
       

      } else {
      console.log('Payload status is not success')
        
      }
          
    } catch (error) {
      console.error(`error: ${error}`)
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
    if (
      !collegeBasicDetails.isValidationError &&
      !courseOffered.isValidationError &&
      !collegeDescriptions.isValidationError &&
      !collegeHighlights.isValidationError &&
      !common.isValitadeError &&
      !gallary.isValitadeError
    ) {
      dispatch(updateCollegeInfo({ classKey: 'isDisabled', value: false }))
    } else {
      dispatch(updateCollegeInfo({ classKey: 'isDisabled', value: true }))
    }
  }, [
    collegeBasicDetails.isValitadeError,
    courseOffered.isValitadeError,
    collegeDescriptions.isValitadeError,
    collegeHighlights.isValitadeError,
    common.isValitadeError,
    gallary.isValitadeError
  ])

  return (
    <AddItemForm label={'Add New College'}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <FileUpload.Provider
          value={{
            collegeLogo,
            setCollegeLogo,
            collegeThumbnail,
            setCollegeThumbnail,
            collegeGallary,
            setCollegeGallary,
            collegeGallaryUrl,
            setCollegeGallaryUrl
          }}
        >
          <AddCollege />
        </FileUpload.Provider>

        <div style={{ display: 'flex' }}>
          <CustomButton isDisabled={false} lable={'Submit'} onClick={() => createNewCollege()} />
        </div>
      </div>
    </AddItemForm>
  )
}
