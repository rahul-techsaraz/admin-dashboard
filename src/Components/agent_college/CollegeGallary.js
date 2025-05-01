import React, { useContext, useEffect, useState } from 'react'
import UploadFile from '../../utils/CommonComponents/UploadFile'
import { useDispatch, useSelector } from 'react-redux'
import { updateCollegeInfo } from '../../features/collegeSlice'
import { FileUpload } from '../../utils/FileUpload'
import DataToDisplay from '../course_list/DataToDisplay'
import { constants } from '../../utils/constants'
import CustomButton from '../../utils/CommonComponents/CustomButton'
import { addCollegeGallary, fetchCollegeGallaryById, fileUploadGallary } from '../../utils/reduxThunk/collegeThunk'
import { updateError } from '../../features/commonSlice'
import { fileTouploadPayload } from '../../utils/fileUploadService'
import { useNavigate } from 'react-router-dom'

export default function CollegeGallary({ collegeId, admin }) {
  const { collegeGallary, collegeGallaryUrl, setCollegeGallary, setCollegeGallaryUrl } = useContext(FileUpload)
  const { isEdit, gallary, collegeBasicDetails } = useSelector((state) => state.college)
  const [uploadResponse, setUploadResponse] = useState(false)
  const [draftResponse, setDraftResponse] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const afterFileUpload = async () => {
    try {
      const gallaryPayload = {
        college_id: collegeId,
        image_path: gallary.image_path,
        video_path: gallary.video_path
      }
      const response = await dispatch(
        addCollegeGallary({
          url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=collegeGallary',
          header: constants.apiHeaders.HEADER,
          method: constants.httpMethod.PUT,
          payload: gallaryPayload
        })
      )
      if (response.payload.status !== constants.apiResponseStatus.SUCCESS) {
        dispatch(
          updateError({
            errorType: constants.apiResponseStatus.ERROR,
            errorMessage: 'Something went Wrong... try again',
            flag: true
          })
        )
        return
      } else {
        dispatch(
          updateError({
            errorType: constants.apiResponseStatus.SUCCESS,
            errorMessage: 'Gallary updated successfully',
            flag: true
          })
        )
        dispatch(
          fetchCollegeGallaryById({
            url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=collegeGallary&college_id=' + collegeId,
            header: constants.apiHeaders.HEADER,
            method: constants.httpMethod.GET
          })
        )
        dispatch(updateCollegeInfo({ classKey: 'isEdit', value: false }))
        setCollegeGallary([])
        setCollegeGallaryUrl([])
        setUploadResponse(false)
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
      if (collegeGallary.length > 0) {
        const collegeGallaryData = await fileTouploadPayload(collegeGallary)
        const response = await dispatch(
          fileUploadGallary({
            url: constants.apiEndPoint.UPLOAD_FILE + '?dir=colleges',
            payload: collegeGallaryData
          })
        )
        if (response.payload.status !== 200) {
          dispatch(
            updateError({
              errorType: constants.apiResponseStatus.ERROR,
              errorMessage: 'Something went Wrong... try again',
              flag: true
            })
          )
          return
        } else {
          setUploadResponse(true)
        }
      } else {
        const gallaryPayload = {
          college_id: collegeId,
          image_path: gallary.image_path,
          video_path: gallary.video_path
        }
        const response = await dispatch(
          addCollegeGallary({
            url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=collegeGallary',
            header: constants.apiHeaders.HEADER,
            method: constants.httpMethod.PUT,
            payload: gallaryPayload
          })
        )
        if (response.payload.status !== constants.apiResponseStatus.SUCCESS) {
          dispatch(
            updateError({
              errorType: constants.apiResponseStatus.ERROR,
              errorMessage: 'Something went Wrong... try again',
              flag: true
            })
          )
          return
        } else {
          dispatch(
            updateError({
              errorType: constants.apiResponseStatus.SUCCESS,
              errorMessage: 'Gallary updated successfully',
              flag: true
            })
          )
          dispatch(
            fetchCollegeGallaryById({
              url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=collegeGallary&college_id=' + collegeId,
              header: constants.apiHeaders.HEADER,
              method: constants.httpMethod.GET
            })
          )
          dispatch(updateCollegeInfo({ classKey: 'isEdit', value: false }))
        }
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
        fetchCollegeGallaryById({
          url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=collegeGallary&college_id=' + collegeId,
          header: constants.apiHeaders.HEADER,
          method: constants.httpMethod.GET
        })
      )
      if (response.payload.status === constants.apiResponseStatus.SUCCESS) {
        dispatch(updateCollegeInfo({ classKey: 'isEdit', value: false }))
        setCollegeGallary([])
        setCollegeGallaryUrl([])
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

  const removeImage = (indexToRemove, toUpdate) => {
    if (toUpdate === 'redux') {
      const filteredUrl = gallary.image_path
        .split(',')
        .filter((url, index) => url[index] !== url[indexToRemove])
        .join(',')
      dispatch(updateCollegeInfo({ classKey: 'gallary', key: 'image_path', value: filteredUrl }))
    } else {
      const filteredUrl = collegeGallaryUrl.filter((url, index) => url[index] !== url[indexToRemove])
      setCollegeGallaryUrl(filteredUrl)
      const filteredData = collegeGallary.toSpliced(indexToRemove, 1)
      setCollegeGallary(filteredData)
    }
  }

  const saveDraft = async () => {
    try {
      if (collegeGallary.length > 0) {
        const collegeGallaryData = await fileTouploadPayload(collegeGallary)
        const response = await dispatch(
          fileUploadGallary({
            url: constants.apiEndPoint.UPLOAD_FILE + '?dir=colleges',
            payload: collegeGallaryData
          })
        )
        if (response.payload.status !== 200) {
          dispatch(
            updateError({
              errorType: constants.apiResponseStatus.ERROR,
              errorMessage: 'Something went Wrong... try again',
              flag: true
            })
          )
          return
        } else {
          setDraftResponse(true)
        }
      }
      // else {
      //   const gallaryPayload = {
      //     college_id: collegeId,
      //     image_path: gallary.image_path,
      //     video_path: gallary.video_path
      //   }
      //   const response = await dispatch(
      //     addCollegeGallary({
      //       url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=collegeGallary',
      //       header: constants.apiHeaders.HEADER,
      //       method: constants.httpMethod.PUT,
      //       payload: gallaryPayload
      //     })
      //   )
      //   if (response.payload.status !== constants.apiResponseStatus.SUCCESS) {
      //     dispatch(
      //       updateError({
      //         errorType: constants.apiResponseStatus.ERROR,
      //         errorMessage: "Something went Wrong... try again",
      //         flag: true
      //       })
      //     )
      //     return;
      //   } else {
      //     dispatch(
      //       updateError({
      //         errorType: constants.apiResponseStatus.SUCCESS,
      //         errorMessage: "Gallary updated successfully",
      //         flag: true
      //       })
      //     )
      //     dispatch(
      //       fetchCollegeGallaryById({
      //         url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=collegeGallary&college_id=' + collegeId,
      //         header: constants.apiHeaders.HEADER,
      //         method: constants.httpMethod.GET
      //       })
      //     )
      //     dispatch(updateCollegeInfo({ classKey: 'isEdit', value: false }))
      //   }
      // }
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

  const updateDraft = async () => {
    try {
      const gallaryPayload = {
        college_id: collegeId,
        image_path: gallary.image_path,
        video_path: gallary.video_path
      }
      const response = await dispatch(
        addCollegeGallary({
          url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=collegeGallary',
          header: constants.apiHeaders.HEADER,
          method: gallary.college_id ? constants.httpMethod.PUT : constants.httpMethod.POST,
          payload: gallaryPayload
        })
      )
      console.log(response.payload)
      if (response.payload.status !== constants.apiResponseStatus.SUCCESS) {
        dispatch(
          updateError({
            errorType: constants.apiResponseStatus.ERROR,
            errorMessage: 'Can not Save the draft... Please try again',
            flag: true
          })
        )
        return
      } else {
        dispatch(
          updateError({
            errorType: constants.apiResponseStatus.SUCCESS,
            errorMessage: 'Gallary updated successfully',
            flag: true
          })
        )
        setCollegeGallary([])
        setCollegeGallaryUrl([])
        setDraftResponse(false)
        navigate('/list-agent-college')
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
    if (uploadResponse) {
      afterFileUpload()
    }
  }, [uploadResponse])

  useEffect(() => {
    if (draftResponse) {
      updateDraft()
    }
  }, [draftResponse])

  useEffect(() => {
    if (gallary.image_path || collegeGallary.length > 0) {
      dispatch(updateCollegeInfo({ classKey: 'gallary', key: 'isValitadeError', value: false }))
    } else {
      dispatch(updateCollegeInfo({ classKey: 'gallary', key: 'isValitadeError', value: true }))
    }
  }, [collegeGallary, gallary.image_path])

  const collegeInfoData = gallary.image_path.split(',').map((path, index) => {
    return { lable: 'Gallary Image' + (index + 1), value: path.trim() }
  })

  return (
    <>
      {!isEdit && collegeId && admin !== 'draft' ? (
        <DataToDisplay dataToDisplay={collegeInfoData} type={'college'} admin={admin} />
      ) : (
        <>
          <div>
            <UploadFile
              label={'College Images'}
              styles={{ width: '138px', height: '45px', display: 'flex', justifyContent: 'spaceBetween' }}
              multiple={true}
            />
            <div className='d-flex my-5'>
              <div className='d-flex'>
                {isEdit &&
                  gallary.image_path &&
                  gallary.image_path.split(',').map((url, index) => (
                    <div key={index}>
                      <img src={constants.imageAbsolutePath + url.trim()} width={150} height={150} gap={20} alt='Gallary Image' />
                      <div style={{ display: isEdit ? 'block' : 'none', textAlign: 'center', marginTop: '20px' }}>
                        <button className='btn btn-primary btn-round' onClick={() => removeImage(index, 'redux')}>
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
              <div className='d-flex'>
                {collegeGallaryUrl.length > 0
                  ? collegeGallaryUrl.map((url, index) => (
                      <div key={index}>
                        <img src={url} width={150} height={150} gap={20} alt='Gallary Image' />
                        <div style={{ display: isEdit ? 'block' : 'none', textAlign: 'center', marginTop: '20px' }}>
                          <button className='btn btn-primary btn-round' onClick={() => removeImage(index, 'context')}>
                            Remove
                          </button>
                        </div>
                      </div>
                    ))
                  : gallary.image_path.split(',').map((url, index) => (
                      <div key={index}>
                        <img src={constants.imageAbsolutePath + url.trim()} width={150} height={150} gap={20} alt='Gallary Image' />
                      </div>
                    ))}
              </div>
            </div>
          </div>

          {!isEdit && (
            <div className='form-group'>
              <CustomButton
                isDisabled={gallary.isValitadeError || collegeBasicDetails.isValitadeError}
                lable={'Save as Draft'}
                onClick={() => saveDraft()}
              />
            </div>
          )}

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {isEdit && collegeId && !admin && (
              <>
                <CustomButton isDisabled={gallary.isValitadeError} lable={'Update'} onClick={() => updateCollege()} />
                <CustomButton lable={'Cancle'} onClick={() => handleCancle()} />
              </>
            )}
          </div>
        </>
      )}
    </>
  )
}
