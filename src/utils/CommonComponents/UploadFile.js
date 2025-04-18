import React, { useContext } from 'react'
import { FileUpload } from '../FileUpload'

export default function UploadFile({ label, styles, multiple }) {
  const allowedFileTypes = ['jpg', 'jpeg', 'png', 'pdf']
  const { setCollegeGallary, setCollegeGallaryUrl, setCollegeLogo, setCollegeLogoUrl, setCollegeThumbnail, setCollegeThumbnailUrl, setCollegeBrochure, setCollegeBrochureUrl, } = useContext(FileUpload)
  const validateSelectedFiles = (e) => {
    let file = []
    let url = []
    let formData = {}
    if (localStorage.getItem('formData')) {
      formData = JSON.parse(localStorage.getItem('formData'))
    }

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
      localStorage.setItem('formData', JSON.stringify({ ...formData, "gallery": url }))
    } else if (label === 'College Logo') {
      setCollegeLogo(file)
      setCollegeLogoUrl(url)
      const data = {
        ...formData.collegeBasicDetails, college_logo: url[0]
      }
      localStorage.setItem('formData', JSON.stringify({ ...formData, collegeBasicDetails: data }))
    } else if (label === 'College Thumbnail') {
      setCollegeThumbnail(file)
      setCollegeThumbnailUrl(url)
      const data = {
        ...formData.collegeBasicDetails, college_thumbnail: url[0]
      }
      localStorage.setItem('formData', JSON.stringify({ ...formData, collegeBasicDetails: data }))
    } else if (label === 'Brochuer') {
      setCollegeBrochure(file)
      setCollegeBrochureUrl(url)
      const data = {
        ...formData.collegeBasicDetails, college_download_brochure_path: url[0]
      }
      localStorage.setItem('formData', JSON.stringify({ ...formData, collegeBasicDetails: data }))
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
