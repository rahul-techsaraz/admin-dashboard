import React, { useContext } from 'react'
import { FileUpload } from '../FileUpload'

export default function UploadFile({ label, styles, multiple }) {
  const allowedFileTypes = ['jpg', 'jpeg', 'png']
  const { setCollegeGallary, setCollegeGallaryUrl, setCollegeLogo, setCollegeThumbnail } = useContext(FileUpload)
  const validateSelectedFiles = (e) => {
    console.log('upload File onchange Fired')
    let file = []
    let url = []
    for (let i = 0; i < e.target.files.length; i++) {
      const fileType = e.target.files[i].type.split('/')
      if (!allowedFileTypes.includes(fileType[1])) {
        alert('Selected File Type is not Supported')
        return false
      } else if (e.target.files[i].size > 2097152) {
        alert('Selected File Size exceeds the limite')
        return false
      } else {
        file.push(e.target.files[i])
        url.push(URL.createObjectURL(e.target.files[i]))
      }
    }
    if (label === 'College Images') {
      setCollegeGallary(file)
      setCollegeGallaryUrl(url)
    } else if (label === 'College Logo') {
      setCollegeLogo(file)
    } else if (label === 'College Thumbnail') {
      setCollegeThumbnail(file)
    }
  }

  return (
    <>
      <div className='form-group'>
        <label>{label}</label>
        <div className='form-control' style={styles}>
          <input type='file' name='uploadFile' multiple={multiple} onChange={(e) => validateSelectedFiles(e)} />
          {/* <IconButton color="primary" aria-label="upload picture" component="span">
                <FileUploadIcon />
                </IconButton> */}
        </div>
      </div>
    </>
  )
}
