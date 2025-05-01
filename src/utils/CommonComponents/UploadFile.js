import React, { useContext } from 'react'
import { FileUpload } from '../FileUpload'
import { v4 as uuid } from 'uuid'

export default function UploadFile({ label, styles, multiple }) {
  const allowedFileTypes = ['jpg', 'jpeg', 'png', 'pdf']
  const {
    facultyImage,
    setFacultyImage,
    facultyImageUrl,
    setFacultyImageUrl,
    setCollegeGallary,
    setCollegeGallaryUrl,
    setCollegeLogo,
    setCollegeLogoUrl,
    setCollegeThumbnail,
    setCollegeThumbnailUrl,
    setCollegeBrochure,
    setCollegeBrochureUrl
  } = useContext(FileUpload)
  const validateSelectedFiles = (e) => {
    const imageId = uuid()
    let file = []
    let url = []
    if (label === 'Faculty image') {
      const file = facultyImage
      const url = facultyImageUrl
      const fileReceived = e.target.files[0]
      if (!fileReceived) return
      const newFileName = `${imageId}.${fileReceived.type.split('/')[1]}`
      const renamedFile = new File([fileReceived], newFileName, {
        type: fileReceived.type,
        lastModified: fileReceived.lastModified
      })
      file.push(renamedFile)
      url.push(URL.createObjectURL(renamedFile))
      setFacultyImage(file)
      setFacultyImageUrl(url)
      return
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
    } else if (label === 'College Logo') {
      setCollegeLogo(file)
      setCollegeLogoUrl(url)
    } else if (label === 'College Thumbnail') {
      setCollegeThumbnail(file)
      setCollegeThumbnailUrl(url)
    } else if (label === 'Brochuer') {
      setCollegeBrochure(file)
      setCollegeBrochureUrl(url)
    }
  }

  return (
    <>
      <div className='form-group'>
        <label>{label}</label>
        <div className='form-control' style={styles}>
          <input type='file' name='uploadFile' multiple={multiple} onChange={(e) => validateSelectedFiles(e)} />
        </div>
      </div>
    </>
  )
}
