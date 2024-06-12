import React, { useEffect, useState } from 'react'
import InputFieldText from '../../utils/CommonComponents/InputFieldText'
import SelectBox from '../../utils/CommonComponents/SelectBox'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import UploadFile from '../../utils/CommonComponents/UploadFile';
import { useDispatch, useSelector } from 'react-redux';
import SearchSelectBox from '../../utils/CommonComponents/SearchSelectBox';
import { updateCollegeInfo } from '../../features/collegeSlice';
import { updateError } from '../../features/commonSlice';
import { constants } from '../../utils/constants';
import { fetchCityList, fetchStateList } from '../../utils/reduxThunk/collegeThunk';

export default function CollegeBasicDetails({logoGetter, thumbnailGetter}) {
  const [collegeLogo, setCollegeLogo] = useState([]);
  const [collegeThumbnail, setCollegeThumbnail] = useState([]);
  const allowedFileTypes = ['jpg','jpeg','png','pdf']
  const [searchSelectDisabled, setSearchSelectDisabled] = useState(true)
  const [componentState, setComponentState] = useState('')
  const [componentCity, setComponentCity] = useState('')
  const dispatch = useDispatch()
  const {collegeBasicDetails, stateList, cityList} = useSelector(state=>state.college)
  const {
    isValitadeError,
    college_name,
		location,
		affiliate_by,
		ratings,
		state,
		city,
		college_type,
		college_logo,
		college_thumbnail,
  } = useSelector(state=>state.college.collegeBasicDetails)
  
  const fetchState = async ()=> {
    try{
      const payload = await {
        country : "India"
      }
      const response = await dispatch(fetchStateList({
        url : constants.apiEndPoint.STATE_LIST,
        header : constants.apiHeaders.HEADER,
        method : constants.httpMethod.POST,
        payload : payload,
      }))
      if(response.payload.error === true){
        dispatch(updateError({
          errorType : constants.apiResponseStatus.ERROR,
          errorMessage : constants.apiResponseMessage.ERROR_MESSAGE,
          flag : true
        }))
      }
      else{
        dispatch(updateError({
          errorType : constants.apiResponseStatus.SUCCESS,
          errorMessage : response.payload.msg,
          flag : true
        }))
      }
    }
    catch(error){
      dispatch(updateError({
        errorType : constants.apiResponseStatus.ERROR,
        errorMessage : constants.apiResponseMessage.ERROR_MESSAGE,
        flag : true
      }))
    }
  }
  const setState = (value)=>{
    if(value !== '' && value !== undefined && value !== null){
      dispatch(updateCollegeInfo({classKey : 'collegeBasicDetails', key : 'state', value : value}))
    }else{
      dispatch(updateCollegeInfo({classKey : 'collegeBasicDetails', key : 'state', value : ''}))
      dispatch(updateCollegeInfo({classKey : "cityList", value : []}))
      dispatch(updateCollegeInfo({classKey : "collegeBasicDetails", key : 'city', value : ''}))
      setSearchSelectDisabled(true)
    }
  }
  const fetchCity = async ()=> {
    try{
      const payload = await {
        country : "India",
        state : collegeBasicDetails.state
      }
      const response = await dispatch(fetchCityList({
        url : constants.apiEndPoint.CITY_LIST,
        header : constants.apiHeaders.HEADER,
        method : constants.httpMethod.POST,
        payload : payload,
      }))
      if(response.payload.error === true){
        dispatch(updateError({
          errorType : constants.apiResponseStatus.ERROR,
          errorMessage : constants.apiResponseMessage.ERROR_MESSAGE,
          flag : true
        }))
        setSearchSelectDisabled(true)
      }
      else{
        dispatch(updateError({
          errorType : constants.apiResponseStatus.SUCCESS,
          errorMessage : response.payload.msg,
          flag : true
        }))
        setSearchSelectDisabled(false)
      }
    }
    catch(error){
      dispatch(updateError({
        errorType : constants.apiResponseStatus.ERROR,
        errorMessage : constants.apiResponseMessage.ERROR_MESSAGE,
        flag : true
      }))
    }
  }

  const validateSelectedFiles = (e, type)=>{
    const fileType = e.target.files[0].type.split('/')
      if(!allowedFileTypes.includes(fileType[1])){
        alert("Selected File Type is not Supported")
        return false
      }else if(e.target.files[0].size > 2097152){
        alert("Selected File Size exceeds the limite")
        return false
      }else{
        if(type === 'logo'){
          setCollegeLogo(e.target.files)
        }else{
          setCollegeThumbnail(e.target.files)
        }
      }
  }

  useEffect(()=>{
    fetchState();
  },[])
  
  useEffect(()=>{
    if(state !== '' && state !== undefined && state !== null){
      fetchCity();
    }else{
      dispatch(updateCollegeInfo({classKey : "cityList", value : []}))
      dispatch(updateCollegeInfo({classKey : "collegeBasicDetails", key : 'city', value : ''}))
      setSearchSelectDisabled(true)
    }
  },[collegeBasicDetails.state])

  useEffect(()=>{
    if(collegeLogo.length > 0 || collegeThumbnail.length > 0){
      logoGetter(collegeLogo)
      thumbnailGetter(collegeThumbnail)
    }
  },[collegeLogo, collegeThumbnail])

  useEffect(()=>{
    if(college_name !== '' && location !== '' && affiliate_by !== '' && ratings !== '' && state !== '' && city !== '' && college_type !== '' && collegeLogo.length > 0 && collegeThumbnail.length > 0){
      dispatch(updateCollegeInfo({classKey : "collegeBasicDetails", key : 'isValitadeError', value : false}))
    }else{
      dispatch(updateCollegeInfo({classKey : "collegeBasicDetails", key : 'isValitadeError', value : true}))
    }
  },[college_name, location, affiliate_by, ratings, state, city, college_type, collegeLogo, collegeThumbnail])

  return (
    <div style={{gap: "20px", display: 'flex', margin: "2.5rem 0px", flexWrap: "wrap", justifyContent: "space-between"}}>
      <InputFieldText
      placeholder='College Name'
      inputValue={collegeBasicDetails.college_name}
      inputType='text'
      onChange={(e)=>dispatch(updateCollegeInfo({classKey : 'collegeBasicDetails', key : 'college_name', value : e.target.value}))}
      styles={{width: '280px'}}
      />
      <SelectBox
      label={'College Type'}
      options={constants.collegeType}
      onChange={(e)=>dispatch(updateCollegeInfo({classKey : 'collegeBasicDetails', key : 'college_type', value : e.target.value}))}
      styles={{width: '280px', height: '38px'}}
      inputValue={collegeBasicDetails.college_type}
      />
      <InputFieldText
      placeholder='Affiliate By'
      inputValue={collegeBasicDetails.affiliate_by}
      inputType='text'
      onChange={(e)=>dispatch(updateCollegeInfo({classKey : 'collegeBasicDetails', key : 'affiliate_by', value : e.target.value}))}
      styles={{width: '280px'}}
      />
      <SearchSelectBox
      label='State'
      options={stateList}
      onChange={(e,value)=>setState(value)}
      onInputChange={(e,value)=>setComponentState(value)}
      inputValue={componentState ? componentState : collegeBasicDetails.state}
      />
      <SearchSelectBox
      label='City'
      options={cityList}
      onChange={(e,value)=>dispatch(updateCollegeInfo({classKey : 'collegeBasicDetails', key : 'city', value : value}))}
      onInputChange={(e,value)=>setComponentCity(value)}
      disabled={searchSelectDisabled}
      inputValue={componentCity ? componentCity : collegeBasicDetails.city}
      />
      <InputFieldText
      placeholder='College Location'
      inputValue={collegeBasicDetails.location}
      inputType='text'
      onChange={(e)=>dispatch(updateCollegeInfo({classKey : 'collegeBasicDetails', key : 'location', value : e.target.value}))}
      styles={{width: '280px'}}
      />
      <InputFieldText
      placeholder='Ratings'
      inputValue={collegeBasicDetails.ratings}
      inputType='text'
      onChange={(e)=>dispatch(updateCollegeInfo({classKey : 'collegeBasicDetails', key : 'ratings', value : e.target.value}))}
      styles={{width: '280px'}}
      />
      <UploadFile
      label={'College Logo'}
      onChange={(e)=>validateSelectedFiles(e, 'logo')}
      onClick={()=>console.log("Upload Logo Clicked")}
      styles={{width: '280px', height: '45px', display: 'flex', justifyContent: 'spaceBetween'}}
      multiple={false}
      />
      <UploadFile
      label={'College Thumbnail'}
      onChange={(e)=>validateSelectedFiles(e, 'thumbnail')}
      onClick={()=>console.log("Upload Thumbnail Clicked")}
      styles={{width: '280px', height: '45px', display: 'flex', justifyContent: 'spaceBetween'}}
      multiple={false}
      />
    </div>
  )
}
