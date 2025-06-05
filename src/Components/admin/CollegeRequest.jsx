import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import ItemList from '../ItemList'
import { constants } from '../../utils/constants'
import { updateError } from '../../features/commonSlice'
import useCollegeData from '../../hooks/useCollegeData'

export default function CollegeRequest() {
  const { allCollegeList } = useSelector((state) => state.newCollege)
  const { userInfo } = useSelector((state) => state.user)

  const dispatch = useDispatch()
  const { deleteCollegebyId, getAllCollege, modifyCollegeTrending } = useCollegeData()

  const addNewColumns = [
    {
      label: 'Delete',
      handleDeleteItem: (rowData) => {
        deleteCollegeListById(rowData.college_id)
      },
      classname: 'deleteButton'
    }
  ]

  const deleteCollegeListById = async (college_id) => {
    try {
      deleteCollegebyId(college_id)
      getAllCollege()
    } catch (err) {
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
    if (allCollegeList.length < 1) {
      getAllCollege()
    }
  }, [allCollegeList])

  return (
    <>
      <ToastContainer />
      <ItemList
        userColumns={constants.collegeListUserColumns}
        categoryData={allCollegeList ?? []}
        addNewColumns={addNewColumns}
        labe={'College Details'}
        path={'/add-college/'}
        id={'college_id'}
        admin={'admin'}
        isVewdetails={true}
        dataType={['super_admin', 'admin'].includes(userInfo.user_role) ? 'college' : ''}
        onToggleTrending={(collegeId, isTrending) => modifyCollegeTrending(collegeId, isTrending)}
      />
      {/* <div className='container-fluid'>
        <div className='row clearfix'>
          <div className='col-lg-12'>
            <div className='card'>
              <div className='body'>
                <div className='row'>
                  {filteredCollegeList ? (
                    <ItemList
                      userColumns={constants.collegeListUserColumns}
                      categoryData={filteredCollegeList}
                      addNewColumns={addNewColumns}
                      labe={'College Details'}
                      path={'/add-college/'}
                      id={'college_id'}
                      admin={'admin'}
                      isVewdetails={true}
                      dataType={['super_admin', 'admin'].includes(userInfo.user_role) ? 'college' : ''}
                      onToggleTrending={(collegeId, isTrending) => modifyCollegeTrending(collegeId, isTrending)}
                    />
                  ) : (
                    <div>No Record Found</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  )
}
