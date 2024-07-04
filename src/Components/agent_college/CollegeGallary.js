import React, { useContext, useEffect, useState } from 'react'
import UploadFile from '../../utils/CommonComponents/UploadFile'
import { useDispatch } from 'react-redux';
import { updateCollegeInfo } from '../../features/collegeSlice';
import { FileUpload } from '../../utils/FileUpload';

export default function CollegeGallary({collegeId}) {
  const {collegeGallary, collegeGallaryUrl} = useContext(FileUpload)
  const dispatch = useDispatch()
  
  
  useEffect(()=>{
    if(collegeGallary.length > 0){
      dispatch(updateCollegeInfo({classKey : "gallary", key : 'isValitadeError', value : false}))
    }else{
      dispatch(updateCollegeInfo({classKey : "gallary", key : 'isValitadeError', value : true}))
    }
  },[collegeGallary])

  return (
    <>
      <UploadFile
      label={'College Images'}
      styles={{width: '138px', height: '45px', display: 'flex', justifyContent: 'spaceBetween'}}
      multiple={true}
      />
      <div className='d-flex'>
        {collegeGallaryUrl.map(url=>(
        <div>
          <img src={url} width={150} height={150} gap={20}/>
        </div>  
        ))}
      </div>
    </>
  )
}

