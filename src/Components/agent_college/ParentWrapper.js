import React, { useState } from 'react'
import { FileUpload } from '../../utils/FileUpload'
import ViewCollegeDetails from './ViewCollegeDetails'
import AddNewCollege from './AddNewCollege'
import { useParams } from 'react-router-dom'
import CollegeContainer from '../college_steps/CollegeContainer'

export default function ParentWrapper() {
  const [facultyImage, setFacultyImage] = useState([])
  const [facultyImageUrl, setFacultyImageUrl] = useState([])
  const [collegeLogo, setCollegeLogo] = useState([])
  const [collegeLogoUrl, setCollegeLogoUrl] = useState([])
  const [collegeThumbnail, setCollegeThumbnail] = useState([])
  const [collegeThumbnailUrl, setCollegeThumbnailUrl] = useState([])
  const [collegeGallary, setCollegeGallary] = useState([])
  const [collegeGallaryUrl, setCollegeGallaryUrl] = useState([])
  const [collegeBrochure, setCollegeBrochure] = useState([])
  const [collegeBrochureUrl, setCollegeBrochureUrl] = useState([])
  const [tabValue, setTabValue] = useState('1')

  const { collegeId, admin } = useParams()
  return (
    <>
      <FileUpload.Provider
        value={{
          facultyImage,
          setFacultyImage,
          facultyImageUrl,
          setFacultyImageUrl,
          collegeLogo,
          setCollegeLogo,
          collegeLogoUrl,
          setCollegeLogoUrl,
          collegeThumbnail,
          setCollegeThumbnail,
          collegeThumbnailUrl,
          setCollegeThumbnailUrl,
          collegeBrochure,
          setCollegeBrochure,
          collegeBrochureUrl,
          setCollegeBrochureUrl,
          collegeGallary,
          setCollegeGallary,
          collegeGallaryUrl,
          setCollegeGallaryUrl,
          tabValue,
          setTabValue
        }}
      >
        {collegeId ? (
          <ViewCollegeDetails collegeId={collegeId} admin={admin} />
        ) : (
          // <AddNewCollege />
          <CollegeContainer />
        )}
      </FileUpload.Provider>
    </>
  )
}
