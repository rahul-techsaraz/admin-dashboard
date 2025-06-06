import React, { memo, useContext, useEffect, useState } from 'react'
import AddItemForm from '../../AddItemForm'
import { Button, Paper } from '@mui/material'
import CustomAccordian from '../../../utils/CommonComponents/CustomAccordian'
import CollegeBasicDetails from './CollegeBasicDetails'
import CourseOffered from './CourseOffered'
import CollegeDescription from './CollegeDescription'
import Placements from './Placements'
import News from './News'
import FacilitiesFaculties from './FacilitiesFaculties'
import CollegeGallary from './CollegeGallary'
import { useDispatch, useSelector } from 'react-redux'
import { constants } from '../../../utils/constants'
import { useFetchCategoryList } from '../../../hooks/useFetchCategoryList'
import useCourseDetails from '../../../hooks/useCourseDetails'
import CustomButton from '../../../utils/CommonComponents/CustomButton'
import { resetCollege, updateCollegeInfo } from '../../../features/newCollegeSlice'
import { updateError } from '../../../features/commonSlice'
import { useNavigate } from 'react-router-dom'
import { FileUpload } from '../../../utils/FileUpload'
import CustomMessageModal from '../../../utils/CommonComponents/CustomMessageModal'
import { useFetchAllCollegeList } from '../../../hooks/useFetchAllCollegeList'
import useFileUpload from '../../../hooks/useFileUpload'
import useCollegeData from '../../../hooks/useCollegeData'

const ViewCollegeDetails = ({ collegeId, admin }) => {
  const [open, setOpen] = useState(false)
  const [whichBtn, setWhichBtn] = useState('')
  const [message, setMessage] = useState('')
  const [expanded, setExpanded] = useState({
    collegeBasicDetails: true,
    courseOffered: false,
    collegeDescription: false,
    placements: false,
    news: false,
    facultyFacility: false,
    gallery: false
  })
  const { isDisabled, isEdit, collegeBasicDetails, courseOffered, collegeDescriptions, facilities, gallary, placements, news } =
    useSelector((state) => state.newCollege)
  const { userToken } = useSelector((state) => state.user)
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
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { fetchCollegeList } = useFetchAllCollegeList()
  const { getAllCourses } = useCourseDetails()
  const { createFilePayload } = useFileUpload()
  const { getAgentCollege, updateCollegeDataByID, updateMessage, getCollegeByID } = useCollegeData()
  const { fetchCategoryList } = useFetchCategoryList()

  const handleChange = (activeAcordian) => {
    const data = {
      collegeBasicDetails: false,
      courseOffered: false,
      collegeDescription: false,
      placements: false,
      news: false,
      facultyFacility: false,
      gallery: false
    }
    setExpanded({ ...data, [activeAcordian]: true })
  }

  const handleSubmit = async () => {
    try {
      const payload = {
        college_id: collegeBasicDetails?.college_id,
        college_name: collegeBasicDetails?.college_name,
        location: collegeBasicDetails?.location,
        affiliate_by: collegeBasicDetails?.affiliate_by,
        ratings: collegeBasicDetails?.ratings,
        state: collegeBasicDetails?.state,
        city: collegeBasicDetails?.city,
        category_name: collegeBasicDetails?.category_name,
        college_type: collegeBasicDetails?.college_type,
        college_logo: collegeBasicDetails?.college_logo,
        college_thumbnail: collegeBasicDetails?.college_thumbnail,
        college_download_brochure_path: collegeBasicDetails?.college_download_brochure_path,
        fee_starting: collegeBasicDetails?.fee_starting,
        avg_first_year_fee: collegeBasicDetails?.avg_first_year_fee,
        message: collegeBasicDetails?.message,
        account_name: JSON.parse(localStorage.getItem('userData')).account_name,
        is_publish: constants.courseIsPublished.notPublished,
        courseOffered: courseOffered?.courses_offered,
        collegeDescriptions: {
          college_description: collegeDescriptions?.college_description,
          college_course_description: collegeDescriptions?.college_course_description,
          college_highlights_description: collegeDescriptions?.college_highlights_description,
          college_campus_description: collegeDescriptions?.college_campus_description,
          college_admission_description: collegeDescriptions?.college_admission_description
        },
        facilities: {
          facilities: facilities?.facilities,
          faculty_data: facilities?.faculty_data
        },
        placements: placements?.placement_data,
        news: news?.news_data,
        gallary: gallary?.image_path
      }
      const filePayload = createFilePayload(payload)
      updateCollegeDataByID(filePayload, collegeId)
    } catch (error) {
      dispatch(
        updateError({
          errorType: constants.apiResponseStatus.ERROR,
          errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
          flag: true
        })
      )
    }
  }

  const handleOpen = (flag) => {
    setWhichBtn(flag)
    setOpen(true)
  }

  const handleClose = () => {
    updateResponseMessage(whichBtn)
    setOpen(false)
  }

  const updateResponseMessage = async (status) => {
    try {
      const payload = {
        college_id: collegeBasicDetails?.college_id,
        college_name: collegeBasicDetails?.college_name,
        location: collegeBasicDetails?.location,
        affiliate_by: collegeBasicDetails?.affiliate_by,
        ratings: collegeBasicDetails?.ratings,
        state: collegeBasicDetails?.state,
        city: collegeBasicDetails?.city,
        category_name: collegeBasicDetails?.category_name,
        college_type: collegeBasicDetails?.college_type,
        college_logo: collegeBasicDetails?.college_logo,
        college_thumbnail: collegeBasicDetails?.college_thumbnail,
        college_download_brochure_path: collegeBasicDetails?.college_download_brochure_path,
        fee_starting: collegeBasicDetails?.fee_starting,
        avg_first_year_fee: collegeBasicDetails?.avg_first_year_fee,
        message: message,
        account_name: JSON.parse(localStorage.getItem('userData')).account_name,
        is_publish: status,
        courseOffered: courseOffered?.courses_offered,
        collegeDescriptions: {
          college_description: collegeDescriptions?.college_description,
          college_course_description: collegeDescriptions?.college_course_description,
          college_highlights_description: collegeDescriptions?.college_highlights_description,
          college_campus_description: collegeDescriptions?.college_campus_description,
          college_admission_description: collegeDescriptions?.college_admission_description
        },
        facilities: {
          facilities: facilities?.facilities,
          faculty_data: facilities?.faculty_data
        },
        placements: placements?.placement_data,
        news: news?.news_data,
        gallary: gallary?.image_path
      }
      const filePayload = createFilePayload(payload)
      updateCollegeDataByID(filePayload, collegeId)
    } catch (error) {
      dispatch(
        updateError({
          errorType: constants.apiResponseStatus.ERROR,
          errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
          flag: true
        })
      )
    }
  }

  const fetchData = async () => {
    const response = await Promise.all([fetchCategoryList(), getAllCourses(), getCollegeByID(collegeId)])
    console.log(response)
  }

  useEffect(() => {
    fetchData()
    return () => {
      dispatch(resetCollege())
    }
  }, [])

  useEffect(() => {
    if (
      !collegeBasicDetails.isValitadeError &&
      !courseOffered.isValitadeError &&
      !collegeDescriptions.isValitadeError &&
      !gallary.isValitadeError &&
      !facilities.isValitadeError &&
      !placements.isValitadeError &&
      !news.isValitadeError
    ) {
      dispatch(updateCollegeInfo({ classKey: 'isDisabled', value: false }))
    } else {
      dispatch(updateCollegeInfo({ classKey: 'isDisabled', value: true }))
    }
  }, [
    collegeBasicDetails.isValitadeError,
    courseOffered.isValitadeError,
    collegeDescriptions.isValitadeError,
    gallary.isValitadeError,
    facilities.isValitadeError,
    placements.isValitadeError,
    news.isValitadeError
  ])

  return (
    <AddItemForm label={'College Details'}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Paper elevation={6} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          {collegeId && !admin && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '16px' }}>
              <CustomButton
                lable={!isEdit ? 'Edit' : 'Close'}
                onClick={() => dispatch(updateCollegeInfo({ classKey: 'isEdit', value: !isEdit }))}
                styles={{ margin: '0px 30px', padding: '0px 20px', width: '300px', height: '40px' }}
              />
              {collegeId && isEdit && !admin && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                  <CustomButton
                    lable={'Update'}
                    onClick={() => handleSubmit()}
                    styles={{ margin: '0px 30px', padding: '0px 20px', width: '300px', height: '40px' }}
                  />
                </div>
              )}
            </div>
          )}
          {admin && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '1rem' }}>
              {collegeBasicDetails.is_publish === constants.collegeStatus.NOTPUBLISHED && (
                <>
                  <Button
                    variant='contained'
                    color='success'
                    className='edit-btn'
                    onClick={() => handleOpen(constants.collegeStatus.APPROVED)}
                  >
                    Approve
                  </Button>
                  <Button
                    variant='outlined'
                    color='error'
                    className='edit-btn'
                    onClick={() => handleOpen(constants.collegeStatus.DECLINED)}
                  >
                    Decline
                  </Button>
                  <Button
                    variant='contained'
                    color='primary'
                    className='edit-btn'
                    onClick={() => handleOpen(constants.collegeStatus.REVISION)}
                  >
                    {constants.collegeStatus.REVISION}
                  </Button>
                </>
              )}
              {collegeBasicDetails.is_publish === constants.collegeStatus.APPROVED && (
                <>
                  <Button
                    variant='contained'
                    color='primary'
                    className='edit-btn'
                    onClick={() => handleOpen(constants.collegeStatus.REVISION)}
                  >
                    {constants.collegeStatus.REVISION}
                  </Button>
                </>
              )}
            </div>
          )}
          <CustomAccordian
            label={'College Basic Details'}
            expanded={expanded.collegeBasicDetails}
            onChange={() => handleChange('collegeBasicDetails')}
          >
            <CollegeBasicDetails collegeId={collegeId} admin={admin} />
          </CustomAccordian>
          <CustomAccordian label={'Course Offered'} expanded={expanded.courseOffered} onChange={() => handleChange('courseOffered')}>
            <CourseOffered collegeId={collegeId} admin={admin} />
          </CustomAccordian>
          <CustomAccordian
            label={'College Description'}
            expanded={expanded.collegeDescription}
            onChange={() => handleChange('collegeDescription')}
          >
            <CollegeDescription collegeId={collegeId} admin={admin} />
          </CustomAccordian>
          <CustomAccordian label={'Placements'} expanded={expanded.placements} onChange={() => handleChange('placements')}>
            <Placements collegeId={collegeId} admin={admin} />
          </CustomAccordian>
          <CustomAccordian label={'News'} expanded={expanded.news} onChange={() => handleChange('news')}>
            <News collegeId={collegeId} admin={admin} />
          </CustomAccordian>
          <CustomAccordian
            label={'Faculty & Facilities'}
            expanded={expanded.facultyFacility}
            onChange={() => handleChange('facultyFacility')}
          >
            <FacilitiesFaculties collegeId={collegeId} admin={admin} />
          </CustomAccordian>
          <CustomAccordian label={'Gallery'} expanded={expanded.gallery} onChange={() => handleChange('gallery')}>
            <CollegeGallary collegeId={collegeId} admin={admin} />
          </CustomAccordian>
        </Paper>
      </div>
      <CustomMessageModal
        open={open}
        setOpen={(e) => setOpen(e)}
        handleClose={() => handleClose()}
        handleEdit={(e) => setMessage(e.target.value)}
        message={message}
      />
    </AddItemForm>
  )
}

export default memo(ViewCollegeDetails)
