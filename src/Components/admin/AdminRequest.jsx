import React, { useEffect, useState } from 'react'
import { constants } from '../../utils/constants'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import { approveUser, fetchAllAdminUserList } from '../../utils/reduxThunk/commonThunk'
import { updateError } from '../../features/commonSlice'
import AddItemForm from '../AddItemForm'
import ItemList from '../ItemList'
import CustomModalAdminRole from '../../utils/CommonComponents/CustomModalAdminRole'

export default function AdminRequest() {
  const [open, setOpen] = useState(false)
  const [adminData, setAdminData] = useState({})
  const { userList, userInfo } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const addNewColumns = [
    {
      label: 'Change Permission',
      handleClick: (rowData) => {
        modifyUser(rowData)
      },
      classname: 'deleteButton'
    }
  ]
  const modifyUser = (rowData) => {
    setAdminData(rowData)
    setOpen(true)
  }
  const fetchAdminUserList = async () => {
    try {
      const response = await dispatch(
        fetchAllAdminUserList({
          url: constants.apiEndPoint.GET_ALL_ADMIN_USERLIST,
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

  useEffect(() => {
    fetchAdminUserList()
  }, [])

  const handleApprovedApi = async () => {
    const payloadData = await {
      email: adminData.email,
      user_status: adminData.user_status,
      user_role: adminData.user_role,
      approvedBy: userInfo.first_name + ' ' + userInfo.last_name
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
      setOpen(false)
      fetchAdminUserList()
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
      <AddItemForm label={'Admin List'}>
        {userList.length > 0 && (
          <ItemList
            userColumns={constants.AdminUserColumns}
            categoryData={userList.map((data, index) => {
              return { ...data, id: index }
            })}
            addNewColumns={addNewColumns}
            labe={'User Listing'}
            isVewdetails={false}
          />
        )}
      </AddItemForm>
      <CustomModalAdminRole
        open={open}
        handleClose={() => setOpen(!open)}
        data={adminData}
        roleChange={(e) => setAdminData({ ...adminData, user_role: e.target.value })}
        statusChange={(e) => setAdminData({ ...adminData, user_status: e.target.value })}
        handleSubmit={() => handleApprovedApi()}
      />
    </>
  )
}
