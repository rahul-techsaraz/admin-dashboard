import React, { useContext } from 'react'
import { FileUpload } from '../utils/FileUpload'

function useFileUpload() {
  const {
    facultyImage,
    setFacultyImage,
    setFacultyImageUrl,
    collegeLogo,
    setCollegeLogo,
    setCollegeLogoUrl,
    collegeThumbnail,
    setCollegeThumbnail,
    setCollegeThumbnailUrl,
    collegeBrochure,
    setCollegeBrochure,
    setCollegeBrochureUrl,
    collegeGallary,
    setCollegeGallary,
    setCollegeGallaryUrl
  } = useContext(FileUpload)
  const createFilePayload = (payload) => {
    const filePayload = new FormData()
    filePayload.append('data', JSON.stringify(payload))
    filePayload.append('college_logo[]', collegeLogo[0])
    filePayload.append('college_thumbnail[]', collegeThumbnail[0])
    filePayload.append('college_brochure[]', collegeBrochure[0])
    for (let i = 0; i < collegeGallary.length; i++) {
      filePayload.append('college_gallary[]', collegeGallary[i])
    }
    for (let i = 0; i < facultyImage.length; i++) {
      const facultyId = facultyImage[i].name.split('.')[0] // Get the corresponding faculty_id
      if (facultyId) {
        filePayload.append(`faculty_image[${facultyId}]`, facultyImage[i])
      }
    }
    return filePayload
  }
  return { createFilePayload }
}

export default useFileUpload
