import React, { useContext, useEffect, useState } from 'react'
import UploadFile from '../../utils/CommonComponents/UploadFile'
import { useDispatch, useSelector } from 'react-redux'
import { updateCollegeInfo } from '../../features/collegeSlice'
import { FileUpload } from '../../utils/FileUpload'
import DataToDisplay from '../course_list/DataToDisplay'

export default function CollegeGallary({ collegeId }) {
  const { collegeGallary, collegeGallaryUrl } = useContext(FileUpload)
  const { isEdit, gallary } = useSelector((state) => state.college)
  const dispatch = useDispatch()

  useEffect(() => {
    if (collegeId) {
      if (gallary.image_path !== '') {
        dispatch(updateCollegeInfo({ classKey: 'gallary', key: 'isValitadeError', value: false }))
      } else {
        dispatch(updateCollegeInfo({ classKey: 'gallary', key: 'isValitadeError', value: true }))
      }
    } else {
      if (collegeGallary.length > 0) {
        dispatch(updateCollegeInfo({ classKey: 'gallary', key: 'isValitadeError', value: false }))
      } else {
        dispatch(updateCollegeInfo({ classKey: 'gallary', key: 'isValitadeError', value: true }))
      }
    }
  }, [collegeGallary])

  const collegeInfoData = gallary.image_path.split(',').map((path, index) => {
    return { lable: 'Gallary Image' + (index + 1), value: path.trim() }
  })

  return (
    <>
      {!isEdit && collegeId ? (
        <DataToDisplay dataToDisplay={collegeInfoData} type={'college'} />
      ) : (
        <div>
          <UploadFile
            label={'College Images'}
            styles={{ width: '138px', height: '45px', display: 'flex', justifyContent: 'spaceBetween' }}
            multiple={true}
          />
          <div className='d-flex'>
            {collegeGallaryUrl.map((url) => (
              <div>
                <img src={url} width={150} height={150} gap={20} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
