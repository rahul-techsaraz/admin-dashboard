import React, { useContext, useEffect, useState } from 'react'
import InputFieldText from '../../utils/CommonComponents/InputFieldText'
import SelectBox from '../../utils/CommonComponents/SelectBox'
import UploadFile from '../../utils/CommonComponents/UploadFile'
import { useDispatch, useSelector } from 'react-redux'
import SearchSelectBox from '../../utils/CommonComponents/SearchSelectBox'
import { updateCollegeInfo } from '../../features/collegeSlice'
import { updateError } from '../../features/commonSlice'
import { constants } from '../../utils/constants'
import { fetchCityList, fetchStateList } from '../../utils/reduxThunk/collegeThunk'
import { FileUpload } from '../../utils/FileUpload'
import DataToDisplay from '../course_list/DataToDisplay'

export default function CollegeBasicDetails({ collegeId }) {
  const { collegeLogo, collegeThumbnail } = useContext(FileUpload)
  const [searchSelectDisabled, setSearchSelectDisabled] = useState(true)
  const [componentState, setComponentState] = useState('')
  const [componentCity, setComponentCity] = useState('')
  const dispatch = useDispatch()
  const { collegeBasicDetails, stateList, cityList, isEdit } = useSelector((state) => state.college)
  const { isValitadeError, college_name, location, affiliate_by, ratings, state, city, college_type, college_logo, college_thumbnail } =
    useSelector((state) => state.college.collegeBasicDetails)

  const fetchState = async () => {
    try {
      const payload = await {
        country: 'India'
      }
      const response = await dispatch(
        fetchStateList({
          url: constants.apiEndPoint.STATE_LIST,
          header: constants.apiHeaders.HEADER,
          method: constants.httpMethod.POST,
          payload: payload
        })
      )
      if (response.payload.error === true) {
        dispatch(
          updateError({
            errorType: constants.apiResponseStatus.ERROR,
            errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
            flag: true
          })
        )
      } else {
        dispatch(
          updateError({
            errorType: constants.apiResponseStatus.SUCCESS,
            errorMessage: response.payload.msg,
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
  const setState = (value) => {
    if (value !== '' && value !== undefined && value !== null) {
      dispatch(updateCollegeInfo({ classKey: 'collegeBasicDetails', key: 'state', value: value }))
    } else {
      dispatch(updateCollegeInfo({ classKey: 'collegeBasicDetails', key: 'state', value: '' }))
      dispatch(updateCollegeInfo({ classKey: 'cityList', value: [] }))
      dispatch(updateCollegeInfo({ classKey: 'collegeBasicDetails', key: 'city', value: '' }))
      setSearchSelectDisabled(true)
    }
  }
  const fetchCity = async () => {
    try {
      const payload = await {
        country: 'India',
        state: collegeBasicDetails.state
      }
      const response = await dispatch(
        fetchCityList({
          url: constants.apiEndPoint.CITY_LIST,
          header: constants.apiHeaders.HEADER,
          method: constants.httpMethod.POST,
          payload: payload
        })
      )
      if (response.payload.error === true) {
        dispatch(
          updateError({
            errorType: constants.apiResponseStatus.ERROR,
            errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
            flag: true
          })
        )
        setSearchSelectDisabled(true)
      } else {
        dispatch(
          updateError({
            errorType: constants.apiResponseStatus.SUCCESS,
            errorMessage: response.payload.msg,
            flag: true
          })
        )
        setSearchSelectDisabled(false)
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
    fetchState()
  }, [])

  useEffect(() => {
    if (state !== '' && state !== undefined && state !== null) {
      fetchCity()
    } else {
      dispatch(updateCollegeInfo({ classKey: 'cityList', value: [] }))
      dispatch(updateCollegeInfo({ classKey: 'collegeBasicDetails', key: 'city', value: '' }))
      setSearchSelectDisabled(true)
    }
  }, [collegeBasicDetails.state])

  useEffect(() => {
    if (
      college_name !== '' &&
      location !== '' &&
      affiliate_by !== '' &&
      ratings !== '' &&
      state !== '' &&
      city !== '' &&
      college_type !== '' &&
      collegeLogo.length > 0 &&
      collegeThumbnail.length > 0
    ) {
      dispatch(updateCollegeInfo({ classKey: 'collegeBasicDetails', key: 'isValitadeError', value: false }))
    } else {
      dispatch(updateCollegeInfo({ classKey: 'collegeBasicDetails', key: 'isValitadeError', value: true }))
    }
  }, [college_name, location, affiliate_by, ratings, state, city, college_type, collegeLogo, collegeThumbnail])

  // useEffect(() => {
  //   console.log(collegeLogo)
  // }, [collegeId])

  const collegeInfoData = [
    { lable: 'College Name', value: college_name },
    { lable: 'College Type', value: college_type },
    { lable: 'Affiliate By', value: affiliate_by },
    { lable: 'State', value: state },
    { lable: 'City', value: city },
    { lable: 'College Location', value: location },
    { lable: 'Ratings', value: ratings },
    { lable: 'College Logo', value: college_logo },
    { lable: 'College Thumbnail', value: college_thumbnail }
  ]

  return (
    <>
      {!isEdit && collegeId ? (
        <DataToDisplay dataToDisplay={collegeInfoData} type={'college'} />
      ) : (
        <div style={{ gap: '20px', display: 'flex', margin: '2.5rem 0px', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <InputFieldText
            placeholder='College Name'
            inputValue={collegeBasicDetails.college_name}
            inputType='text'
            onChange={(e) => dispatch(updateCollegeInfo({ classKey: 'collegeBasicDetails', key: 'college_name', value: e.target.value }))}
            styles={{ width: '280px' }}
          />
          <SelectBox
            label={'College Type'}
            options={constants.collegeType}
            onChange={(e) => dispatch(updateCollegeInfo({ classKey: 'collegeBasicDetails', key: 'college_type', value: e.target.value }))}
            styles={{ width: '280px', height: '38px' }}
            inputValue={collegeBasicDetails.college_type}
          />
          <InputFieldText
            placeholder='Affiliate By'
            inputValue={collegeBasicDetails.affiliate_by}
            inputType='text'
            onChange={(e) => dispatch(updateCollegeInfo({ classKey: 'collegeBasicDetails', key: 'affiliate_by', value: e.target.value }))}
            styles={{ width: '280px' }}
          />
          <SearchSelectBox
            label='State'
            options={stateList}
            onChange={(e, value) => setState(value)}
            onInputChange={(e, value) => setComponentState(value)}
            inputValue={componentState ? componentState : collegeBasicDetails.state}
          />
          <SearchSelectBox
            label='City'
            options={cityList}
            onChange={(e, value) => dispatch(updateCollegeInfo({ classKey: 'collegeBasicDetails', key: 'city', value: value }))}
            onInputChange={(e, value) => setComponentCity(value)}
            disabled={searchSelectDisabled}
            inputValue={componentCity ? componentCity : collegeBasicDetails.city}
          />
          <InputFieldText
            placeholder='College Location'
            inputValue={collegeBasicDetails.location}
            inputType='text'
            onChange={(e) => dispatch(updateCollegeInfo({ classKey: 'collegeBasicDetails', key: 'location', value: e.target.value }))}
            styles={{ width: '280px' }}
          />
          <InputFieldText
            placeholder='Ratings'
            inputValue={collegeBasicDetails.ratings}
            inputType='text'
            onChange={(e) => dispatch(updateCollegeInfo({ classKey: 'collegeBasicDetails', key: 'ratings', value: e.target.value }))}
            styles={{ width: '280px' }}
          />
          <UploadFile
            label={'College Logo'}
            styles={{ width: '240px', height: '45px', display: 'flex', justifyContent: 'spaceBetween' }}
            multiple={false}
          />
          <UploadFile
            label={'College Thumbnail'}
            styles={{ width: '240px', height: '45px', display: 'flex', justifyContent: 'spaceBetween' }}
            multiple={false}
          />
        </div>
      )}
    </>
  )
}
