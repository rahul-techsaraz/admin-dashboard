import React, { useEffect, useState } from 'react'
import UploadFile from '../../utils/CommonComponents/UploadFile'
import { useDispatch, useSelector } from 'react-redux';
import { updateCollegeInfo } from '../../features/collegeSlice';

export default function CollegeGallary({gallaryGetter}) {
  const {gallary} = useSelector(state=>state.college)
  const [gallaryList, setGallaryList] = useState([])
  const dispatch = useDispatch()
  const [filesUrl, setFilesUrl] = useState([])
  const allowedFileTypes = ['jpg','jpeg','png']
  const validateSelectedFiles = (e)=>{
    let urls = []
    for(let i = 0; i < e.target.files.length; i++){
      const fileType = e.target.files[i].type.split('/')
      if(!allowedFileTypes.includes(fileType[1])){
        alert("Selected File Type is not Supported")
        return false
      }else if(e.target.files[i].size > 2097152){
        alert("Selected File Size exceeds the limite")
        return false
      }else{
        setGallaryList(e.target.files)
        urls.push(URL.createObjectURL(e.target.files[i]))
        setFilesUrl(urls)
      }
    }
  }

  useEffect(()=>{
    if(gallaryList.length > 0){
      gallaryGetter(gallaryList)
      dispatch(updateCollegeInfo({classKey : "gallary", key : 'isValitadeError', value : false}))
    }else{
      dispatch(updateCollegeInfo({classKey : "gallary", key : 'isValitadeError', value : true}))
    }
  },[gallaryList])

  return (
    <>
      <UploadFile
      label={'College Images'}
      onChange={(e)=>validateSelectedFiles(e)}
      onClick={()=>console.log("Upload Multi Image Clicked")}
      styles={{width: '280px', height: '45px', display: 'flex', justifyContent: 'spaceBetween'}}
      multiple={true}
      />
      <div className='d-flex'>
        {filesUrl.map(url=>(
        <div>
          <img src={url} width={150} height={150} gap={20}/>
        </div>  
        ))}
      </div>
    </>
  )
}
