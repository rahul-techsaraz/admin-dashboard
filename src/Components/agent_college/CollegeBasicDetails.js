import React, { useContext, useEffect, useState } from 'react'
import InputFieldText from '../../utils/CommonComponents/InputFieldText'
import SelectBox from '../../utils/CommonComponents/SelectBox'
import UploadFile from '../../utils/CommonComponents/UploadFile'
import { useDispatch, useSelector } from 'react-redux'
import SearchSelectBox from '../../utils/CommonComponents/SearchSelectBox'
import { updateCollegeInfo } from '../../features/collegeSlice'
import { updateError } from '../../features/commonSlice'
import { constants } from '../../utils/constants'
import { addCollegeBasicDetails, fetchCityList, fetchCollegeById, fetchStateList, fileUploadlogo, fileUploadThumbnail } from '../../utils/reduxThunk/collegeThunk'
import { FileUpload } from '../../utils/FileUpload'
import DataToDisplay from '../course_list/DataToDisplay'
import CustomButton from '../../utils/CommonComponents/CustomButton'
import { fileTouploadPayload } from '../../utils/fileUploadService'

export default function CollegeBasicDetails({ collegeId, admin }) {
  const { collegeLogo, collegeLogoUrl, collegeThumbnail, collegeThumbnailUrl, setCollegeLogo, setCollegeThumbnail, setCollegeLogoUrl, setCollegeThumbnailUrl } = useContext(FileUpload)
  const [searchSelectDisabled, setSearchSelectDisabled] = useState(true)
  // const [componentState, setComponentState] = useState('')
  // const [componentCity, setComponentCity] = useState('')
  const dispatch = useDispatch()
  const { collegeBasicDetails, stateList, cityList, isEdit } = useSelector((state) => state.college)
  const { isValitadeError, college_id, college_name, location, affiliate_by, ratings, state, city, college_type, college_logo, college_thumbnail, message, account_name } =
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
  const updateCollege = async () => {
    try {
      const collegeInfoPayload = await {
        college_id: collegeId,
        college_name: college_name,
        location: location,
        affiliate_by: affiliate_by,
        ratings: ratings,
        college_logo: college_logo,
        college_thumbnail: college_thumbnail,
        state: state,
        city: city,
        college_type: college_type,
        account_name: account_name,
        is_publish: constants.courseIsPublished.notPublished,
        message: message
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
            errorType: constants.apiResponseStatus.SUCCESS,
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
        setCollegeLogo([])
        setCollegeThumbnail([])
        setCollegeLogoUrl([])
        setCollegeThumbnailUrl([])
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
  const removeCollegeLogo = () => {
    dispatch(updateCollegeInfo({ classKey: 'collegeBasicDetails', key: 'college_logo', value: '' }))
  }
  const removeCollegeThumbnail = () => {
    dispatch(updateCollegeInfo({ classKey: 'collegeBasicDetails', key: 'college_thumbnail', value: '' }))
  }
  const uploadLogo = async () => {
    try {
      const logoPayload = await fileTouploadPayload(collegeLogo)
      const resolved = await
        dispatch(
          fileUploadlogo({
            url: constants.apiEndPoint.UPLOAD_FILE + '?dir=colleges',
            payload: logoPayload
          })
        )
      if (resolved.payload[0].status !== constants.apiResponseStatus.SUCCESS && resolved.payload[0].error === true) {
        dispatch(updateError({
          errorType: constants.apiResponseStatus.ERROR,
          errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
          flag: true
        }))
      } else {
        setCollegeLogoUrl('')
        dispatch(updateError({
          errorType: constants.apiResponseStatus.SUCCESS,
          errorMessage: "Logo Uploaded Successfully",
          flag: true
        }))
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
  const uploadThumbnail = async () => {
    try {
      const thumbnailPayload = await fileTouploadPayload(collegeThumbnail)
      const resolved = await
        dispatch(
          fileUploadThumbnail({
            url: constants.apiEndPoint.UPLOAD_FILE + '?dir=colleges',
            payload: thumbnailPayload
          })
        )
      if (resolved.payload[0].status !== constants.apiResponseStatus.SUCCESS && resolved.payload[0].error === true) {
        dispatch(updateError({
          errorType: constants.apiResponseStatus.ERROR,
          errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
          flag: true
        }))
      } else {
        setCollegeThumbnailUrl('')
        dispatch(updateError({
          errorType: constants.apiResponseStatus.SUCCESS,
          errorMessage: "Thumbnail Uploaded Successfully",
          flag: true
        }))
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
    if (collegeId) {
      if (
        college_name !== '' &&
        location !== '' &&
        affiliate_by !== '' &&
        ratings !== '' &&
        state !== '' &&
        city !== '' &&
        college_type !== '' &&
        college_logo !== '' &&
        college_thumbnail !== ''
      ) {
        dispatch(updateCollegeInfo({ classKey: 'collegeBasicDetails', key: 'isValitadeError', value: false }))
      } else {
        dispatch(updateCollegeInfo({ classKey: 'collegeBasicDetails', key: 'isValitadeError', value: true }))
      }
    } else {
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
    }
  }, [college_name, location, affiliate_by, ratings, state, city, college_type, college_logo, college_thumbnail, collegeLogo, collegeThumbnail])

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
        <DataToDisplay dataToDisplay={collegeInfoData} type={'college'} admin={admin} />
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
            // onChange={(e, value) => setState(value)}
            // onInputChange={(e, value) => setComponentState(value)}
            onInputChange={(e, value) => setState(value)}
            inputValue={collegeBasicDetails?.state}
          // onClose={(e) => dispatch(updateCollegeInfo({ classKey: 'collegeBasicDetails', key: 'state', value: '' }))}
          />
          <SearchSelectBox
            label='City'
            options={cityList}
            // onChange={(e, value) => dispatch(updateCollegeInfo({ classKey: 'collegeBasicDetails', key: 'city', value: value }))}
            // onInputChange={(e, value) => setComponentCity(value)}
            onInputChange={(e, value) => dispatch(updateCollegeInfo({ classKey: 'collegeBasicDetails', key: 'city', value: value }))}
            disabled={searchSelectDisabled}
            inputValue={collegeBasicDetails?.city}
          // onClose={(e, value) => dispatch(updateCollegeInfo({ classKey: 'collegeBasicDetails', key: 'city', value: value }))}
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
          <div className='flex flex-col justify-center items-center'>
            <UploadFile
              label={'College Logo'}
              styles={{ width: '240px', height: '45px', display: 'flex', justifyContent: 'spaceBetween' }}
              multiple={false}
            />
            <div style={{ display: college_logo || collegeLogoUrl.length > 0 ? 'block' : 'none', textAlign: 'center' }}>
              <img src={collegeId && college_logo ? constants.imageAbsolutePath + college_logo : collegeLogoUrl} width={150} height={150} />
            </div>
            <div style={{ display: collegeId && college_logo ? 'block' : 'none', textAlign: 'center', marginTop: '20px' }}>
              <button className='btn btn-primary btn-round' onClick={() => removeCollegeLogo()}>Remove</button>
            </div>
            <div style={{ display: collegeId && collegeLogoUrl.length > 0 ? 'block' : 'none', textAlign: 'center', marginTop: '20px' }}>
              <button className='btn btn-primary btn-round' onClick={() => uploadLogo()}>Upload</button>
            </div>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <UploadFile
              label={'College Thumbnail'}
              styles={{ width: '240px', height: '45px', display: 'flex', justifyContent: 'spaceBetween' }}
              multiple={false}
            />
            <div style={{ display: college_thumbnail || collegeThumbnailUrl.length > 0 ? 'block' : 'none', textAlign: 'center' }}>
              <img src={collegeId && college_thumbnail ? constants.imageAbsolutePath + college_thumbnail : collegeThumbnailUrl} width={150} height={150} />
            </div>
            <div style={{ display: collegeId && college_thumbnail ? 'block' : 'none', textAlign: 'center', marginTop: '20px' }}>
              <button className='btn btn-primary btn-round' onClick={() => removeCollegeThumbnail()}>Remove</button>
            </div>
            <div style={{ display: collegeId && collegeThumbnailUrl.length > 0 ? 'block' : 'none', textAlign: 'center', marginTop: '20px' }}>
              <button className='btn btn-primary btn-round' onClick={() => uploadThumbnail()}>Upload</button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {isEdit && collegeId && (
              <>
                <CustomButton isDisabled={isValitadeError} lable={'Update'} onClick={() => updateCollege()} />
                <CustomButton lable={'Cancle'} onClick={() => handleCancle()} />
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
