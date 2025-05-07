import React, { useState } from 'react'
import { updateCourseInfo } from '../../features/courseSlice'
import { useDispatch, useSelector } from 'react-redux'
import { updateCollegeInfo } from '../../features/collegeSlice'
import { constants } from '../../utils/constants'
import CustomMessageModal from '../../utils/CommonComponents/CustomMessageModal'
import { updateError } from '../../features/commonSlice'
import { addCollegeBasicDetails } from '../../utils/reduxThunk/collegeThunk'
import { useFetchAllCollegeList } from '../../hooks/useFetchAllCollegeList'
import { useNavigate } from 'react-router-dom'
import { Tooltip } from '@mui/material'

export default function DataToDisplay({ dataToDisplay, type, switchClass, admin }) {
  const [open, setOpen] = useState(false)
  const [whichBtn, setWhichBtn] = useState('')
  const [message, setMessage] = useState('')
  const dispatch = useDispatch()
  const { collegeBasicDetails } = useSelector((state) => state.college)
  const { fetchCollegeList } = useFetchAllCollegeList()
  const navigate = useNavigate()
  // console.log(dataToDisplay)

  const handleOpen = (flag) => {
    setWhichBtn(flag)
    setOpen(true)
  }

  const handleClose = () => {
    updateMessage(whichBtn)
    setOpen(false)
  }

  const updateMessage = async (status) => {
    try {
      console.log(collegeBasicDetails)
      const messageUpdatePayload = {
        college_id: collegeBasicDetails.college_id,
        college_name: collegeBasicDetails.college_name,
        location: collegeBasicDetails.location,
        affiliate_by: collegeBasicDetails.affiliate_by,
        ratings: collegeBasicDetails.ratings,
        college_logo: collegeBasicDetails.college_logo,
        college_thumbnail: collegeBasicDetails.college_thumbnail,
        state: collegeBasicDetails.state,
        city: collegeBasicDetails.city,
        college_type: collegeBasicDetails.college_type,
        account_name: collegeBasicDetails.account_name,
        is_publish: status,
        message: message,
        category_name: collegeBasicDetails.category_name
      }
      const response = await dispatch(
        addCollegeBasicDetails({
          url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=basicCollegeListing',
          header: constants.apiHeaders.HEADER,
          method: constants.httpMethod.PUT,
          payload: messageUpdatePayload
        })
      )
      console.log(response)
      if (response.payload.status !== constants.apiResponseStatus.SUCCESS) {
        dispatch(
          updateError({
            errorType: constants.apiResponseStatus.ERROR,
            errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
            flag: true
          })
        )
        return
      }
      dispatch(
        updateError({
          errorType: constants.apiResponseStatus.SUCCESS,
          errorMessage: 'Status updated with message',
          flag: true
        })
      )
      fetchCollegeList()
      navigate('/list-college')
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

  return (
    <>
      {/* <div>Data to display</div> */}
      <div className='full-contain'>
        <div className='edit-btn-flex'>
          {!admin ? (
            <Tooltip
              title={
                collegeBasicDetails.is_publish.toLowerCase() === 'decline' || collegeBasicDetails.is_publish.toLowerCase() === 'review'
                  ? collegeBasicDetails.message
                  : ''
              }
              arrow
            >
              <button
                onClick={() =>
                  type === 'college'
                    ? dispatch(updateCollegeInfo({ classKey: 'isEdit', value: true }))
                    : dispatch(updateCourseInfo({ classKey: 'isEdit', value: true }))
                }
                className='edit-btn'
                disabled={collegeBasicDetails.is_publish.toLowerCase() === 'decline' ? true : false}
              >
                Edit
              </button>
            </Tooltip>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'end', gap: '1rem' }}>
                {collegeBasicDetails.is_publish === constants.collegeStatus.NOTPUBLISHED && (
                  <>
                    <button className='edit-btn' onClick={() => handleOpen(constants.collegeStatus.APPROVED)}>
                      Approve
                    </button>
                    <button className='edit-btn' onClick={() => handleOpen(constants.collegeStatus.DECLINED)}>
                      Decline
                    </button>
                    <button className='edit-btn' onClick={() => handleOpen(constants.collegeStatus.REVISION)}>
                      {constants.collegeStatus.REVISION}
                    </button>
                  </>
                )}
                {collegeBasicDetails.is_publish === constants.collegeStatus.APPROVED && (
                  <>
                    <button className='edit-btn' onClick={() => handleOpen(constants.collegeStatus.REVISION)}>
                      {constants.collegeStatus.REVISION}
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
        <div className={switchClass ? 'grid-parent-changed' : 'grid-parent'}>
          {dataToDisplay.map((data) =>
            !Array.isArray(data) ? (
              <div className='grid-parent-child' key={data.lable}>
                <span className='exam-text'>{data.lable}</span>
                <div className='exam-list-p'>
                  {/.jpg|.png|.jpeg|.pdf/.test(data.value) ? (
                    <img className='w-1/2 aspect-[3/2] mix-blend-color-burn' src={constants.imageAbsolutePath + data.value} alt='Image' />
                  ) : !Array.isArray(data.value) ? (
                    data.value
                  ) : (
                    data.value.map((v) => (
                      <>
                        <div className='exam-list-p'>{v}</div>
                        <hr style={{ width: '100%', border: '1px solid white' }}></hr>
                      </>
                    ))
                  )}
                </div>
              </div>
            ) : (
              <div className={switchClass ? 'grid-parent-child-changed' : 'grid-parent-child'} key={data.lable}>
                {data.map((childArrayData) => (
                  <div>
                    <span className='exam-text'>{childArrayData.lable}</span>
                    <div className='exam-list-p'>{childArrayData.value}</div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </div>
      <CustomMessageModal
        open={open}
        setOpen={(e) => setOpen(e)}
        handleClose={() => handleClose()}
        handleEdit={(e) => setMessage(e.target.value)}
        message={message}
      />
    </>
  )
}
