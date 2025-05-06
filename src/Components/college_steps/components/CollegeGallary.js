import React, { memo, useContext, useEffect } from 'react'
import UploadFile from '../../../utils/CommonComponents/UploadFile'
import { useDispatch, useSelector } from 'react-redux'
import { FileUpload } from '../../../utils/FileUpload'
import { constants } from '../../../utils/constants'
import { updateCollegeInfo } from '../../../features/newCollegeSlice'

const CollegeGallary = ({ collegeId }) => {
    const { collegeLogo, collegeThumbnail, collegeBrochure, collegeLogoUrl, collegeThumbnailUrl, collegeBrochureUrl, collegeGallary, collegeGallaryUrl, setCollegeGallary, setCollegeGallaryUrl } = useContext(FileUpload)
    const { isEdit, gallary, collegeBasicDetails } = useSelector((state) => state.newCollege)
    const dispatch = useDispatch()
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

    useEffect(() => {
        if (
            (collegeBasicDetails.college_logo !== '' || collegeLogo.length > 0) &&
            (collegeBasicDetails.college_thumbnail !== '' || collegeThumbnail.length > 0) &&
            (gallary.image_path.length > 0 || collegeGallary.length > 0)
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
                </div>
            </div>
        </div>
    )
}

export default memo(CollegeGallary)