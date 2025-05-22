import React, { useEffect } from 'react'
import { constants } from '../../utils/constants'
import ItemList from '../ItemList'
import { useFetchAllUsersList } from '../../hooks/useFetchUsersList'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function UsersList() {
  const { fetchUsersList } = useFetchAllUsersList()
  const { getAllUsersList } = useSelector((state) => state.common)
  console.log({ getAllUsersList })
  useEffect(() => {
    fetchUsersList()
  }, [])

  const addNewColumns = [
    {
      label: 'Delete',
      handleDeleteItem: (rowData) => {
        //deleteCourseListById(rowData.course_id)
      },
      classname: 'deleteButton'
    }
  ]

  return (
    <>
      <ItemList
        userColumns={constants.allUsersList}
        categoryData={getAllUsersList.map((user, index) => {
          return { ...user, id: index + 1 }
        })}
        addNewColumns={addNewColumns}
        labe={'Course Details'}
        isVewdetails={true}
        id={'email'}
        path={''}
      />
    </>
  )
}
