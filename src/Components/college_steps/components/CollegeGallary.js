import React, { memo, useContext, useEffect, useState } from 'react'
import UploadFile from '../../../utils/CommonComponents/UploadFile'
import { useDispatch, useSelector } from 'react-redux'
import { FileUpload } from '../../../utils/FileUpload'
import DataToDisplay from '../../course_list/DataToDisplay'
import { constants } from '../../../utils/constants'
import CustomButton from '../../../utils/CommonComponents/CustomButton'
import { addCollegeGallary, fetchCollegeGallaryById, fileUploadGallary } from '../../../utils/reduxThunk/collegeThunk'
import { updateError } from '../../../features/commonSlice'
import { fileTouploadPayload } from '../../../utils/fileUploadService'
import { useNavigate } from 'react-router-dom'
import { updateCollegeInfo } from '../../../features/newCollegeSlice'

const CollegeGallary = ({ collegeId, admin }) => {
    const { collegeLogo, collegeThumbnail, collegeBrochure, collegeLogoUrl, collegeThumbnailUrl, collegeBrochureUrl, collegeGallary, collegeGallaryUrl, setCollegeGallary, setCollegeGallaryUrl } = useContext(FileUpload)
    const { isEdit, gallary, collegeBasicDetails } = useSelector((state) => state.newCollege)
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
                        errorMessage: "Something went Wrong... try again",
                        flag: true
                    })
                )
                return;
            } else {
                dispatch(
                    updateError({
                        errorType: constants.apiResponseStatus.SUCCESS,
                        errorMessage: "Gallary updated successfully",
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
                            errorMessage: "Something went Wrong... try again",
                            flag: true
                        })
                    )
                    return;
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
                            errorMessage: "Something went Wrong... try again",
                            flag: true
                        })
                    )
                    return;
                } else {
                    dispatch(
                        updateError({
                            errorType: constants.apiResponseStatus.SUCCESS,
                            errorMessage: "Gallary updated successfully",
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
            const filteredUrl = gallary.image_path.filter((url, index) => url[index] !== url[indexToRemove])
            dispatch(updateCollegeInfo({ classKey: 'gallary', key: 'image_path', value: filteredUrl }))
        } else {
            const filteredUrl = collegeGallaryUrl.filter((url, index) => url[index] !== url[indexToRemove])
            setCollegeGallaryUrl(filteredUrl)
            const filteredData = collegeGallary.toSpliced(indexToRemove, 1)
            setCollegeGallary(filteredData)
        }
    }

    //   const saveDraft = async () => {
    //     try {
    //       if (collegeGallary.length > 0) {
    //         const collegeGallaryData = await fileTouploadPayload(collegeGallary)
    //         const response = await dispatch(
    //           fileUploadGallary({
    //             url: constants.apiEndPoint.UPLOAD_FILE + '?dir=colleges',
    //             payload: collegeGallaryData
    //           })
    //         )
    //         if (response.payload.status !== 200) {
    //           dispatch(
    //             updateError({
    //               errorType: constants.apiResponseStatus.ERROR,
    //               errorMessage: "Something went Wrong... try again",
    //               flag: true
    //             })
    //           )
    //           return;
    //         } else {
    //           setDraftResponse(true)
    //         }
    //       }
    //       // else {
    //       //   const gallaryPayload = {
    //       //     college_id: collegeId,
    //       //     image_path: gallary.image_path,
    //       //     video_path: gallary.video_path
    //       //   }
    //       //   const response = await dispatch(
    //       //     addCollegeGallary({
    //       //       url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=collegeGallary',
    //       //       header: constants.apiHeaders.HEADER,
    //       //       method: constants.httpMethod.PUT,
    //       //       payload: gallaryPayload
    //       //     })
    //       //   )
    //       //   if (response.payload.status !== constants.apiResponseStatus.SUCCESS) {
    //       //     dispatch(
    //       //       updateError({
    //       //         errorType: constants.apiResponseStatus.ERROR,
    //       //         errorMessage: "Something went Wrong... try again",
    //       //         flag: true
    //       //       })
    //       //     )
    //       //     return;
    //       //   } else {
    //       //     dispatch(
    //       //       updateError({
    //       //         errorType: constants.apiResponseStatus.SUCCESS,
    //       //         errorMessage: "Gallary updated successfully",
    //       //         flag: true
    //       //       })
    //       //     )
    //       //     dispatch(
    //       //       fetchCollegeGallaryById({
    //       //         url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=collegeGallary&college_id=' + collegeId,
    //       //         header: constants.apiHeaders.HEADER,
    //       //         method: constants.httpMethod.GET
    //       //       })
    //       //     )
    //       //     dispatch(updateCollegeInfo({ classKey: 'isEdit', value: false }))
    //       //   }
    //       // }
    //     }
    //     catch (error) {
    //       dispatch(
    //         updateError({
    //           errorType: constants.apiResponseStatus.ERROR,
    //           errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
    //           flag: true
    //         })
    //       )
    //     }
    //   }

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
                        errorMessage: "Can not Save the draft... Please try again",
                        flag: true
                    })
                )
                return;
            } else {
                dispatch(updateError({
                    errorType: constants.apiResponseStatus.SUCCESS,
                    errorMessage: "Gallary updated successfully",
                    flag: true
                })
                )
                setCollegeGallary([])
                setCollegeGallaryUrl([])
                setDraftResponse(false)
                navigate('/list-agent-college')
            }
        }
        catch (error) {
            dispatch(updateError({
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
        if ((collegeBasicDetails.college_logo !== '' ||
            collegeLogo.length > 0) &&
            (collegeBasicDetails.college_thumbnail !== '' ||
                collegeThumbnail.length > 0) &&
            (gallary.image_path.length > 0 ||
                collegeGallary.length > 0)
        ) {
            dispatch(updateCollegeInfo({ classKey: 'gallary', key: 'isValitadeError', value: false }))
        } else {
            dispatch(updateCollegeInfo({ classKey: 'gallary', key: 'isValitadeError', value: true }))
        }
    }, [
        collegeBasicDetails.college_logo,
        collegeLogo.length,
        collegeBasicDetails.college_thumbnail,
        collegeThumbnail.length,
        collegeBasicDetails.college_download_brochure_path,
        collegeBrochure.length,
        gallary.image_path.length,
        collegeGallary.length
    ])

    return (
        <div style={{ gap: '20px', display: 'flex', margin: '2.5rem 0px', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%' }}>
            <div className='flex flex-col justify-center items-center'>
                <UploadFile
                    label={'College Logo'}
                    styles={{ width: '300px', height: '45px', display: 'flex', justifyContent: 'spaceBetween' }}
                    multiple={false}
                    disabled={collegeId && !isEdit ? true : false}
                />
                <div style={{ display: collegeBasicDetails?.college_logo || collegeLogoUrl.length > 0 ? 'block' : 'none', textAlign: 'center' }}>
                    <img src={collegeLogoUrl.length > 0 ? collegeLogoUrl : constants.newImageAbsolutePath + collegeBasicDetails?.college_logo} width={150} height={150} />
                </div>
                {/* <div style={{ display: collegeId && collegeBasicDetails?.college_logo && !admin ? 'block' : 'none', textAlign: 'center', marginTop: '20px' }}>
                    <button className='btn btn-primary btn-round' onClick={() => removeCollegeLogo()}>Remove</button>
                </div>
                <div style={{ display: collegeId && collegeLogoUrl.length > 0 && !admin ? 'block' : 'none', textAlign: 'center', marginTop: '20px' }}>
                    <button className='btn btn-primary btn-round' onClick={() => uploadLogo()}>Upload</button>
                </div> */}
            </div>
            <div className='flex flex-col justify-center items-center'>
                <UploadFile
                    label={'College Thumbnail'}
                    styles={{ width: '300px', height: '45px', display: 'flex', justifyContent: 'spaceBetween' }}
                    multiple={false}
                    disabled={collegeId && !isEdit ? true : false}
                />
                <div style={{ display: collegeBasicDetails?.college_thumbnail || collegeThumbnailUrl.length > 0 ? 'block' : 'none', textAlign: 'center' }}>
                    <img src={collegeThumbnailUrl.length > 0 ? collegeThumbnailUrl : constants.newImageAbsolutePath + collegeBasicDetails?.college_thumbnail} width={150} height={150} />
                </div>
                {/* <div style={{ display: collegeId && collegeBasicDetails?.college_thumbnail && !admin ? 'block' : 'none', textAlign: 'center', marginTop: '20px' }}>
                    <button className='btn btn-primary btn-round' onClick={() => removeCollegeThumbnail()}>Remove</button>
                </div>
                <div style={{ display: collegeId && collegeThumbnailUrl.length > 0 && !admin ? 'block' : 'none', textAlign: 'center', marginTop: '20px' }}>
                    <button className='btn btn-primary btn-round' onClick={() => uploadThumbnail()}>Upload</button>
                </div> */}
            </div>
            <div className='flex flex-col justify-center items-center'>
                <UploadFile
                    label={'Brochuer'}
                    styles={{ width: '300px', height: '45px', display: 'flex', justifyContent: 'spaceBetween' }}
                    multiple={false}
                    disabled={collegeId && !isEdit ? true : false}
                />
                <div style={{ display: collegeBasicDetails?.college_download_brochure_path || collegeBrochureUrl.length > 0 ? 'block' : 'none', textAlign: 'center' }}>
                    <img src={collegeBrochureUrl.length > 0 ? collegeBrochureUrl : constants.newImageAbsolutePath + collegeBasicDetails?.college_download_brochure_path} width={150} height={150} />
                </div>
                {/* <div style={{ display: collegeId && collegeBasicDetails?.college_download_brochure_path && !admin ? 'block' : 'none', textAlign: 'center', marginTop: '20px' }}>
                    <button className='btn btn-primary btn-round' onClick={() => removeCollegeBrochure()}>Remove</button>
                </div>
                <div style={{ display: collegeId && collegeBrochureUrl.length > 0 && !admin ? 'block' : 'none', textAlign: 'center', marginTop: '20px' }}>
                    <button className='btn btn-primary btn-round' onClick={() => uploadBrochure()}>Upload</button>
                </div> */}
            </div >
            <div className='flex flex-col justify-center items-center'>
                <UploadFile
                    label={'College Images'}
                    styles={{ width: '138px', height: '45px', display: 'flex', justifyContent: 'spaceBetween' }}
                    multiple={true}
                    disabled={collegeId && !isEdit ? true : false}
                />
                <div className='d-flex my-5'>
                    <div className='d-flex'>
                        {gallary.image_path.length > 0 && gallary.image_path.map((url, index) => (
                            <div key={index}>
                                <img src={constants.newImageAbsolutePath + url} width={150} height={150} gap={20} alt='Gallary Image' />
                                <div style={{ display: isEdit ? 'block' : 'none', textAlign: 'center', marginTop: '20px' }}>
                                    <button className='btn btn-primary btn-round' onClick={() => removeImage(index, 'redux')}>Remove</button>
                                </div>
                            </div>
                        ))}
                        {collegeGallaryUrl.length > 0 && collegeGallaryUrl.map((url, index) => (
                            <div key={index}>
                                <img src={url} width={150} height={150} gap={20} alt='Gallary Image' />
                                <div style={{ display: isEdit ? 'block' : 'none', textAlign: 'center', marginTop: '20px' }}>
                                    <button className='btn btn-primary btn-round' onClick={() => removeImage(index, 'context')}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* <div className='d-flex'>
                        {collegeGallaryUrl.length > 0 ? collegeGallaryUrl.map((url, index) => (
                            <div key={index}>
                                <img src={url} width={150} height={150} gap={20} alt='Gallary Image' />
                                <div style={{ display: isEdit ? 'block' : 'none', textAlign: 'center', marginTop: '20px' }}>
                                    <button className='btn btn-primary btn-round' onClick={() => removeImage(index, 'context')}>Remove</button>
                                </div>
                            </div>
                        ))
                            :
                            gallary.image_path.map((url, index) => (
                                <div key={index}>
                                    <img src={constants.newImageAbsolutePath + url} width={150} height={150} gap={20} alt='Gallary Image' />
                                </div>
                            ))}
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default memo(CollegeGallary)