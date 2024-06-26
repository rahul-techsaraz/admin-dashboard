import React, { useEffect, useState } from 'react'
import AddItemForm from '../AddItemForm'
import AddCollege from './AddCollege'
import { useDispatch, useSelector } from 'react-redux'
import CustomButton from '../../utils/CommonComponents/CustomButton'
import { v4 as uuid } from 'uuid';
import { updateError } from '../../features/commonSlice'
import { constants } from '../../utils/constants'
import { resetCollege, updateCollegeInfo } from '../../features/collegeSlice'
import { addCollegeBasicDetails, addCollegeCourseOffered, addCollegeDescription, addCollegeFacilities, addCollegeGallary, addCollegeHighlight, deleteCollegeBasicDetails, fileUpload, fileUploadGallary, fileUploadThumbnail, fileUploadlogo } from '../../utils/reduxThunk/collegeThunk'
import { useNavigate } from 'react-router-dom'

export default function AddNewCollege() {
  const [collegeLogo, setCollegeLogo] = useState([]);
  const [collegeThumbnail, setCollegeThumbnail] = useState([]);
  const [collegeGallary, setCollegeGallary] = useState([]);
  const dispatch = useDispatch()
  const navigate = useNavigate()
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
    courseOfferedList,
  } = useSelector(state=>state.college)

  const createNewCollege = async() => {
    try{
      const collegeID = await uuid();

      const collegeDeletePayload = await{
        college_id : collegeID,
      }
      const collegeInfoPayload = await{
        college_id : collegeID,
        college_name : collegeBasicDetails.college_name,
        location : collegeBasicDetails.location,
        affiliate_by : collegeBasicDetails.affiliate_by,
        ratings : collegeBasicDetails.ratings,
        college_logo : "",
        college_thumbnail : "",
        state : collegeBasicDetails.state,
        city : collegeBasicDetails.city,
        college_type : collegeBasicDetails.college_type,
        account_name : JSON.parse(localStorage.getItem('userData')).account_name,
        is_publish : constants.courseIsPublished.notPublished,
      }
      
      const courseOfferedPayload = await{
        data : courseOfferedList.map((data) => {return {...data, college_id : collegeID}})
      }

      const collegeDescriptionPayload = await{
        college_id : collegeID,
        college_description : collegeDescriptions.college_description,
        college_course_description : collegeDescriptions.college_course_description,
        college_highlights_description : collegeDescriptions.college_highlights_description,
        college_campus_description : collegeDescriptions.college_campus_description,
      }

      const collegeHighlightsPayload = await{
        data : highlightList.map((data) => {return {...data, college_id : collegeID}})
      }

      const commonPayload = await{
        college_id : collegeID,
        faculty_name : facultyList.map(data=>data).join(', '),
        facilities : common.facilities,
      }

      const addNewCollegeResponse = await dispatch(addCollegeBasicDetails({
        url : constants.apiEndPoint.COLLEGE_LIST+"?requestType=basicCollegeListing",
        header : constants.apiHeaders.HEADER,
        method : constants.httpMethod.POST,
        payload : collegeInfoPayload,
      }))
      console.log(addNewCollegeResponse)
      if(addNewCollegeResponse.payload.status === constants.apiResponseStatus.SUCCESS){
        const collegeLogoData = await new FormData();
        for (let i = 0; i < collegeLogo.length; i++) {
          collegeLogoData.append("file[]", collegeLogo[i]);
        }
        const collegeThumbnailData = await new FormData();
        for (let i = 0; i < collegeThumbnail.length; i++) {
          collegeThumbnailData.append("file[]", collegeThumbnail[i]);
        }
        const collegeGallaryData = await new FormData();
        for (let i = 0; i < collegeGallary.length; i++){
          collegeGallaryData.append("file[]", collegeGallary[i])
        }
        const isresolved = await Promise.all([
          dispatch(fileUploadlogo({
            url : constants.apiEndPoint.UPLOAD_FILE+`?dir=${collegeBasicDetails.college_name}`,
            payload : collegeLogoData,
          })),
          dispatch(fileUploadThumbnail({
            url : constants.apiEndPoint.UPLOAD_FILE+`?dir=${collegeBasicDetails.college_name}`,
            payload : collegeThumbnailData,
          })),
          dispatch(fileUploadGallary({
            url : constants.apiEndPoint.UPLOAD_FILE+`?dir=${collegeBasicDetails.college_name}/gallary`,
            payload : collegeGallaryData,
          })),
          dispatch(addCollegeDescription({
            url : constants.apiEndPoint.COLLEGE_LIST+"?requestType=basicCollegeDescriptionsDetails",
            header : constants.apiHeaders.HEADER,
            method : constants.httpMethod.POST,
            payload : collegeDescriptionPayload,
          })),
          dispatch(addCollegeHighlight({
            url : constants.apiEndPoint.COLLEGE_LIST+"?requestType=collegeHighlightsDetails",
            header : constants.apiHeaders.HEADER,
            method : constants.httpMethod.POST,
            payload : collegeHighlightsPayload,
          })),
          dispatch(addCollegeFacilities({
            url : constants.apiEndPoint.COLLEGE_LIST+"?requestType=collegeFacilities",
            header : constants.apiHeaders.HEADER,
            method : constants.httpMethod.POST,
            payload : commonPayload,
          })),
          dispatch(addCollegeCourseOffered({
            url : constants.apiEndPoint.COLLEGE_LIST+"?requestType=collegeCourseOffered",
            header : constants.apiHeaders.HEADER,
            method : constants.httpMethod.POST,
            payload : courseOfferedPayload,
          })),
        ])
        isresolved.map(resolve=>{
          if(resolve.payload.status === constants.apiResponseStatus.SUCCESS || resolve.payload.status === 200){
            dispatch(addCollegeBasicDetails({
              url : constants.apiEndPoint.COLLEGE_LIST+"?requestType=basicCollegeListing",
              header : constants.apiHeaders.HEADER,
              method : constants.httpMethod.PUT,
              payload : {...collegeInfoPayload, college_logo : collegeBasicDetails.college_logo, college_thumbnail : collegeBasicDetails.college_thumbnail},
            }))
            dispatch(addCollegeGallary({
              url : constants.apiEndPoint.COLLEGE_LIST+"?requestType=collegeGallary",
              header : constants.apiHeaders.HEADER,
              method : constants.httpMethod.POST,
              payload : {...gallary, college_id : collegeID, image_path : gallary.image_path},
            }))
            dispatch(updateError({
                errorType : constants.apiResponseStatus.SUCCESS,
                errorMessage : "College Added Sucessfully",
                flag : true
              }))
              dispatch(resetCollege())
              navigate('/list-agent-college')
          }
          else{
            dispatch(updateError({
              errorType : constants.apiResponseStatus.ERROR,
              errorMessage : "Add New College Unsucessfull",
              flag : true
            }))
            dispatch(deleteCollegeBasicDetails({
              url : constants.apiEndPoint.COLLEGE_LIST+"?requestType=basicCollegeListing",
              header : constants.apiHeaders.HEADER,
              method : constants.httpMethod.DELETE,
              payload : collegeDeletePayload,
            }))
            dispatch(resetCollege())
            return false;
          }
        })
      }
      else if(addNewCollegeResponse.payload.data.message.toLowerCase().includes('duplicate')){
        dispatch(updateError({
          errorType : constants.apiResponseStatus.ERROR,
          errorMessage : "Duplicate Records",
          flag : true
        }))
      }
      else{
        dispatch(updateError({
          errorType : constants.apiResponseStatus.ERROR,
          errorMessage : "Add New College Unsucessfull",
          flag : true
        }))
        dispatch(deleteCollegeBasicDetails({
          url : constants.apiEndPoint.COLLEGE_LIST+"?requestType=basicCollegeListing",
          header : constants.apiHeaders.HEADER,
          method : constants.httpMethod.DELETE,
          payload : collegeDeletePayload,
        }))
        dispatch(resetCollege())
      }
    }
    catch(error){
      console.log('From catch')
      dispatch(updateError({
        errorType : constants.apiResponseStatus.ERROR,
        errorMessage : constants.apiResponseMessage.ERROR_MESSAGE,
        flag : true
      }))
    }
  }

  useEffect(()=>{
    if(!collegeBasicDetails.isValidationError && !courseOffered.isValidationError && !collegeDescriptions.isValidationError && !collegeHighlights.isValidationError && !common.isValitadeError && !gallary.isValitadeError){
      dispatch(updateCollegeInfo({classKey : 'isDisabled', value : false}))
    }else{
      dispatch(updateCollegeInfo({classKey : 'isDisabled', value : true}))
    }
  },[collegeBasicDetails.isValitadeError, courseOffered.isValitadeError, collegeDescriptions.isValitadeError, collegeHighlights.isValitadeError, common.isValitadeError, gallary.isValitadeError])

  return (
    <AddItemForm label={'Add New College'}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <AddCollege logoSetter={(e)=>setCollegeLogo(e)} thumbnailSetter={(e)=>setCollegeThumbnail(e)} gallarySetter={(e)=>setCollegeGallary(e)}/>
        <div style={{display:'flex'}}>
            <CustomButton
              isDisabled={isDisabled}
              lable={'Submit'}
              onClick={() => createNewCollege()}
            />
        </div>
      </div>
    </AddItemForm>    
  )
}
