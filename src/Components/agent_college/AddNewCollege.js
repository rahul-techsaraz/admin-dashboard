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
import { fileTouploadPayload } from '../../utils/fileUploadService'


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
    college_thumbnail,
  } = useSelector((state) => state.college.collegeBasicDetails)
  const {
    image_path,
    video_path,
  } = useSelector((state) => state.college.gallary)
  const [collegeLogo, setCollegeLogo] = useState([])
  const [collegeThumbnail, setCollegeThumbnail] = useState([])
  const [collegeGallary, setCollegeGallary] = useState([])
  const [collegeGallaryUrl, setCollegeGallaryUrl] = useState([])
  const [promiseResponse, setPromiseResponse] = useState({
    college_id: '',
    p_response: false,
    gallaryUpdateResponse: false,
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const updateCollegeGallary = async () => {
    try {
      const gallaryPayload = {
        college_id: promiseResponse.college_id,
        image_path: image_path,
        video_path: video_path
      }
      const collegeDeletePayload = await {
        college_id: promiseResponse.college_id
      }
      const response = await dispatch(addCollegeGallary({
        url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=collegeGallary',
        header: constants.apiHeaders.HEADER,
        method: constants.httpMethod.POST,
        payload: gallaryPayload
      }))
      if (response.payload.status !== constants.apiResponseStatus.SUCCESS) {
        dispatch(
          updateError({
            errorType: constants.apiResponseStatus.ERROR,
            errorMessage: 'Something went Wrong',
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
        return false
      } else {
        dispatch(
          updateError({
            errorType: constants.apiResponseStatus.SUCCESS,
            errorMessage: 'College Added Sucessfully',
            flag: true
          })
        )
        dispatch(resetCollege())
        navigate('/list-agent-college')
      }
    }
    catch (error) {
      dispatch(
        updateError({
          errorType: constants.apiResponseStatus.ERROR,
          errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
          flag: true
        })
      )
    }
  }
  const updateCollegeOtherdetails = async () => {
    try {
      const collegeInfoUpdatedPayload = {
        college_id: promiseResponse.college_id,
        college_name: college_name,
        location: location,
        affiliate_by: affiliate_by,
        ratings: ratings,
        college_logo: college_logo,
        college_thumbnail: college_thumbnail,
        state: state,
        city: city,
        college_type: college_type,
        account_name: JSON.parse(localStorage.getItem('userData')).account_name,
        is_publish: constants.courseIsPublished.notPublished
      }
      const collegeDeletePayload = {
        college_id: promiseResponse.college_id
      }
      const courseOfferedPayload = await {
        data: courseOfferedList.map((data) => {
          return { ...data, college_id: promiseResponse.college_id }
        })
      }
      const collegeDescriptionPayload = await {
        college_id: promiseResponse.college_id,
        college_description: collegeDescriptions.college_description,
        college_course_description: collegeDescriptions.college_course_description,
        college_highlights_description: collegeDescriptions.college_highlights_description,
        college_campus_description: collegeDescriptions.college_campus_description
      }
      const collegeHighlightsPayload = await {
        data: highlightList.map((data) => {
          return { ...data, college_id: promiseResponse.college_id }
        })
      }
      const commonPayload = await {
        college_id: promiseResponse.college_id,
        faculty_name: facultyList.map((data) => data).join(', '),
        facilities: common.facilities
      }
      const collegeGallaryData = await fileTouploadPayload(collegeGallary)
      const response = await dispatch(
        addCollegeBasicDetails({
          url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=basicCollegeListing',
          header: constants.apiHeaders.HEADER,
          method: constants.httpMethod.PUT,
          payload: collegeInfoUpdatedPayload
        })
      )
      if (response.payload.status !== constants.apiResponseStatus.SUCCESS) {
        dispatch(
          updateError({
            errorType: constants.apiResponseStatus.ERROR,
            errorMessage: 'Something went Wrong',
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
        return false
      }
      const isresolved = await Promise.all([
        dispatch(
          fileUploadGallary({
            url: constants.apiEndPoint.UPLOAD_FILE + `?dir=${collegeBasicDetails.college_name}/gallary`,
            payload: collegeGallaryData
          })
        ),
        dispatch(
          addCollegeDescription({
            url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=basicCollegeDescriptionsDetails',
            header: constants.apiHeaders.HEADER,
            method: constants.httpMethod.POST,
            payload: collegeDescriptionPayload
          })
        ),
        dispatch(
          addCollegeHighlight({
            url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=collegeHighlightsDetails',
            header: constants.apiHeaders.HEADER,
            method: constants.httpMethod.POST,
            payload: collegeHighlightsPayload
          })
        ),
        dispatch(
          addCollegeFacilities({
            url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=collegeFacilities',
            header: constants.apiHeaders.HEADER,
            method: constants.httpMethod.POST,
            payload: commonPayload
          })
        ),
        dispatch(
          addCollegeCourseOffered({
            url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=collegeCourseOffered',
            header: constants.apiHeaders.HEADER,
            method: constants.httpMethod.POST,
            payload: courseOfferedPayload
          })
        )
      ])
      const response2 = await isresolved
        .map((status) => status.payload.status)
        .some((status) => [constants.apiResponseStatus.SUCCESS, 200].includes(status))
      if (!response2) {
        dispatch(
          updateError({
            errorType: constants.apiResponseStatus.ERROR,
            errorMessage: 'Something went Wrong',
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
        return false
      }
      setPromiseResponse({ ...promiseResponse, gallaryUpdateResponse: response2, p_response: false })
    }
    catch (error) {
      dispatch(
        updateError({
          errorType: constants.apiResponseStatus.ERROR,
          errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
          flag: true
        })
      )
    }
  }
  const createNewCollege = async () => {
    try {
      const collegeID = await uuid()
      const collegeDeletePayload = await {
        college_id: collegeID
      }
      const collegeInfoPayload = await {
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
      const logoPayload = await fileTouploadPayload(collegeLogo)
      const thumbnailPayload = await fileTouploadPayload(collegeThumbnail)
      const isresolved = await Promise.all([
        dispatch(
          addCollegeBasicDetails({
            url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=basicCollegeListing',
            header: constants.apiHeaders.HEADER,
            method: constants.httpMethod.POST,
            payload: collegeInfoPayload
          })
        ),
        dispatch(
          fileUploadlogo({
            url: constants.apiEndPoint.UPLOAD_FILE + `?dir=${collegeBasicDetails.college_name}`,
            payload: logoPayload
          })
        ),
        dispatch(
          fileUploadThumbnail({
            url: constants.apiEndPoint.UPLOAD_FILE + `?dir=${collegeBasicDetails.college_name}`,
            payload: thumbnailPayload
          })
        )
      ])
      const response = await isresolved
        .map((status) => status.payload.status)
        .some((status) => [constants.apiResponseStatus.SUCCESS, 200].includes(status))
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
        return false
      }
      else if (isresolved.map((status) => status.payload.status).includes('duplicate')) {
        dispatch(
          updateError({
            errorType: constants.apiResponseStatus.ERROR,
            errorMessage: 'Duplicate Records',
            flag: true
          })
        )
      }
      else {
        setPromiseResponse({ ...promiseResponse, college_id: collegeID, p_response: response })
      }
    }
    catch (error) {
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
  useEffect(() => {
    if (promiseResponse.p_response && promiseResponse.college_id !== '' && !promiseResponse.gallaryUpdateResponse) {
      updateCollegeOtherdetails()
    }
    if (promiseResponse.gallaryUpdateResponse) {
      updateCollegeGallary()
    }
  }, [promiseResponse.p_response, promiseResponse.gallaryUpdateResponse])

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
