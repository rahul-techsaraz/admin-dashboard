import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { constants } from '../../../utils/constants'
import { updateError } from '../../../features/commonSlice'
import ItemList from '../../ItemList'
import { deleteNewCollegeById, fetchAgentCollegeList } from '../../../utils/reduxThunk/collegeThunk'
import { resetCollege } from '../../../features/newCollegeSlice'
import useCollegeData from '../../../hooks/useCollegeData'

const CollegeList = () => {
  const dispatch = useDispatch()
  const { userToken } = useSelector((state) => state.user)
  const { agentCollegeList } = useSelector((state) => state.newCollege)
  const { getAgentCollege, deleteCollegebyId } = useCollegeData()

  const addNewColumns = [
    {
      label: 'Delete',
      handleDeleteItem: (rowData) => {
        deleteCollegeListById(rowData.college_id, rowData.college_name)
      },
      classname: 'deleteButton'
    }
  ]

  const deleteCollegeListById = async (collegeId, collegeName) => {
    deleteCollegebyId(collegeId, collegeName)
    getAgentCollege()
  }

  useEffect(() => {
    getAgentCollege()
    return () => {
      dispatch(resetCollege())
    }
  }, [])
  return (
    <ItemList
      userColumns={constants.collegeListUserColumns}
      categoryData={agentCollegeList}
      addNewColumns={addNewColumns}
      labe={'College Details'}
      path={'/add-college/'}
      id={'college_id'}
      isVewdetails={true}
    />
  )
}

export default CollegeList
