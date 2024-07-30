import React, { useEffect, useState } from 'react'
import { httpCall } from '../../utils/service'
import { constants } from '../../utils/constants'
import UserListTable from './UserListTable'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import { approveUser, fetchAllUserList } from '../../utils/reduxThunk/commonThunk'
import { updateError } from '../../features/commonSlice'
import { updateUserList, updatefilteredUserList } from '../../features/userSlice'

export default function AdminRequest() {
  // const [userList, setUserList] = useState([]);
  // const [filteredUserList,setFilteredUserList] = useState([])
  const [activeLable, setActiveLable] = useState('Pending')
  const { userList, filteredUserList } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const options = [
    { label: 'User Status', value: '' },
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
    { label: 'Decline', value: 'decline' }
  ]

  const fetchUserList = async () => {
    try {
      const response = await dispatch(
        fetchAllUserList({
          url: constants.apiEndPoint.GET_ALL_USERLIST,
          header: constants.apiHeaders.HEADER,
          method: constants.httpMethod.GET
        })
      )
      if (response.payload.success === 1) {
        dispatch(
          updateError({
            errorType: constants.apiResponseStatus.SUCCESS,
            errorMessage: 'Users List Fetched',
            flag: true
          })
        )
      } else {
        dispatch(
          updateError({
            errorType: constants.apiResponseStatus.ERROR,
            errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
            flag: true
          })
        )
      }
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
  const filterUserList = (filterBy) => {
    setActiveLable(filterBy)
    if (filterBy === 'all') {
      dispatch(updatefilteredUserList({ filteredUserList: userList }))
      return
    }
    const filterUser = userList.filter((user) => filterBy.toLowerCase() === user.user_status.toLowerCase())
    dispatch(updatefilteredUserList({ filteredUserList: filterUser }))
  }
  useEffect(() => {
    fetchUserList()
  }, [])

  const handleApprovedApi = async (userData, requestType) => {
    const payloadData = await {
      email: userData.email,
      user_status: requestType.toLowerCase() === 'approved' ? userData.user_status.value : 'decline',
      approvedBy: userData.approvedBy.first_name + ' ' + userData.approvedBy.last_name,
      user_role: userData.user_role.value
    }
    const response = await dispatch(
      approveUser({
        url: constants.apiEndPoint.UPDATE_USER_ROLE,
        header: constants.apiHeaders.HEADER,
        method: constants.httpMethod.PUT,
        payload: payloadData
      })
    )
    if (response.payload.success === 1) {
      fetchUserList()
    } else {
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
      <ToastContainer />
      <div className='container-fluid'>
        <div className='row clearfix'>
          <div className='col-lg-12'>
            <div className='card'>
              <div className='header'>
                {/* <h2><strong>Basic</strong> Information <small>Description text here...</small> </h2> */}
                <div className='row align-items-center justify-content-between'>
                  <h2 className='admin-h '>{activeLable[0].toUpperCase() + activeLable.slice(1).toLowerCase()} Request</h2>
                  <div className='d-flex justify-end'>
                    <button className=' btn btn-outline-primary btn btn-primary ' onClick={() => filterUserList('inactive')}>
                      PENDING
                    </button>
                    <button className=' btn btn-outline-primary btn btn-success ' onClick={() => filterUserList('active')}>
                      APPROVED
                    </button>
                    <button className=' btn btn-outline-primary btn btn-danger ' onClick={() => filterUserList('decline')}>
                      DECLINED
                    </button>
                    <button className=' btn btn-outline-primary btn btn-info ' onClick={() => filterUserList('all')}>
                      USERLIST
                    </button>
                  </div>
                </div>
              </div>
              <div className='body'>
                {/* <h2 className='admin-h text-right'>Pending Request</h2> */}
                <div className='row'>
                  {filteredUserList.length > 0 ? (
                    <UserListTable
                      userList={filteredUserList}
                      onClick={(data, requestType) => handleApprovedApi(data, requestType)}
                      options={options}
                    />
                  ) : (
                    <div>No Record Found</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
