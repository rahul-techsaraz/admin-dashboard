import React, { memo, useEffect, useState } from 'react'
import { FileUpload } from '../../../utils/FileUpload'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchNewCollegeById } from '../../../utils/reduxThunk/collegeThunk'
import { constants } from '../../../utils/constants'
import ViewCollegeDetails from './ViewCollegeDetails'
import CollegeContainer from '../CollegeContainer'
import { resetCollege } from '../../../features/newCollegeSlice'

const ParentWrapper = () => {
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
  const dispatch = useDispatch()
  const { collegeId, admin } = useParams()

  useEffect(() => {
    if (collegeId) {
      dispatch(
        fetchNewCollegeById({
          url: constants.apiEndPoint.NEW_COLLEGE + '?college_id=' + collegeId,
          header: constants.apiHeaders.HEADER,
          method: constants.httpMethod.GET
        })
      )
    }
  }, [collegeId])

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
        {collegeId ? <ViewCollegeDetails collegeId={collegeId} admin={admin} /> : <CollegeContainer />}
      </FileUpload.Provider>
    </>
  )
}

export default memo(ParentWrapper)
