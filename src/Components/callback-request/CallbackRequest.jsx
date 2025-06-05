import React, { useEffect } from 'react'
import { constants } from '../../utils/constants'
import ItemList from '../ItemList'
import { useCallbackRequest } from '../../hooks/useCallbackRequest'
import { useSelector } from 'react-redux'

const CallbackRequest = () => {
  const { fetchcallbackRequestList } = useCallbackRequest()
  const { getAllCallbackRequestList } = useSelector((state) => state.callbackrequest)

  const addNewColumns = [
    {
      label: 'Delete',
      handleDeleteItem: (rowData) => {
        console.log({ rowData })
      },
      classname: 'deleteButton'
    }
  ]

  useEffect(() => {
    fetchcallbackRequestList()
  }, [])
  return (
    <>
      <ItemList
        userColumns={constants.allUserCallbackRequest}
        categoryData={getAllCallbackRequestList}
        addNewColumns={addNewColumns}
        labe={'Callback Request Details'}
        path={'/users-callback-request-list/'}
        id={'email'}
        isVewdetails={true}
      />
    </>
  )
}

export default CallbackRequest
