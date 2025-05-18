import React, { useEffect, useState } from 'react'
import { useFetchAllCollegeList } from '../../hooks/useFetchAllCollegeList'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import ItemList from '../ItemList'
import { constants } from '../../utils/constants'
import { updateError } from '../../features/commonSlice'
import useCollegeData from '../../hooks/useCollegeData'
import { updateCollegeInfo } from '../../features/newCollegeSlice'

export default function CollegeRequest() {
  const [activeLable, setActiveLable] = useState('not published')
  const { allCollegeList, filteredCollegeList } = useSelector((state) => state.newCollege)
  const { userInfo } = useSelector((state) => state.user)

  const dispatch = useDispatch()
  const { deleteCollegebyId, getAllCollege, modifyCollegeTrending } = useCollegeData()

  const filterCollegeList = (filterBy) => {
    setActiveLable(filterBy)
    if (filterBy === 'all') {
      console.log(allCollegeList)
      dispatch(updateCollegeInfo({ classKey: 'filteredCollegeList', value: allCollegeList }))
      return
    }
    if (filterBy === constants.collegeStatus.NOTPUBLISHED) {
      const filterCollege = allCollegeList.filter(
        (college) =>
          college.is_publish.toLowerCase() === filterBy.toLowerCase() &&
          college.is_publish.toLowerCase() === constants.collegeStatus.REVISION.toLowerCase()
      )
      dispatch(updateCollegeInfo({ classKey: 'filteredCollegeList', value: filterCollege }))
      return
    }
    const filterCollege = allCollegeList.filter((college) => college.is_publish.toLowerCase() === filterBy.toLowerCase())
    dispatch(updateCollegeInfo({ classKey: 'filteredCollegeList', value: filterCollege }))
  }

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
    filterCollegeList(activeLable)
  }, [allCollegeList])

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
                  <h2 className='admin-h '>{activeLable[0].toUpperCase() + activeLable.slice(1).toLowerCase()} Colleges</h2>
                  <div className='d-flex justify-end'>
                    <button
                      className=' btn btn-outline-primary btn btn-primary '
                      onClick={() => filterCollegeList(constants.collegeStatus.NOTPUBLISHED)}
                    >
                      PENDING
                    </button>
                    <button
                      className=' btn btn-outline-primary btn btn-success '
                      onClick={() => filterCollegeList(constants.collegeStatus.APPROVED)}
                    >
                      APPROVED
                    </button>
                    <button
                      className=' btn btn-outline-primary btn btn-danger '
                      onClick={() => filterCollegeList(constants.collegeStatus.DECLINED)}
                    >
                      DECLINED
                    </button>
                    <button className=' btn btn-outline-primary btn btn-info ' onClick={() => filterCollegeList('all')}>
                      COLLEGELIST
                    </button>
                  </div>
                </div>
              </div>
              <div className='body'>
                {/* <h2 className='admin-h text-right'>Pending Request</h2> */}
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
      </div>
    </>
  )
}
