import React, { useEffect, useState } from 'react'
import { useFetchAllCollegeList } from '../../hooks/useFetchAllCollegeList'
import { useDispatch, useSelector } from 'react-redux'
import { updateCollegeInfo } from '../../features/collegeSlice'
import { ToastContainer } from 'react-toastify'
import ItemList from '../ItemList'
import { constants } from '../../utils/constants'

export default function CollegeRequest() {
    const [activeLable, setActiveLable] = useState('not published')
    const { fetchCollegeList } = useFetchAllCollegeList()
    const { allCollegeList, filteredCollegeList } = useSelector(state => state.college)
    const dispatch = useDispatch()

    const filterCollegeList = (filterBy) => {
        console.log('filter')
        setActiveLable(filterBy)
        if (filterBy === 'all') {
            dispatch(updateCollegeInfo({ classKey: 'filteredCollegeList', value: allCollegeList }))
            return
        }
        const filterCollege = allCollegeList.filter((college) => college.is_publish.toLowerCase() === filterBy.toLowerCase())
        dispatch(updateCollegeInfo({ classKey: 'filteredCollegeList', value: filterCollege }))
    }

    const addNewColumns = [
        {
            label: 'Delete',
            handleDeleteItem: (rowData) => {
                console.log(rowData)
                // deleteCollegeListById(rowData.college_id)
            },
            classname: 'deleteButton'
        }
    ]

    useEffect(() => {
        console.log(allCollegeList)
        if (allCollegeList.length < 1) {
            fetchCollegeList()
        }
        filterCollegeList(activeLable)
    }, [allCollegeList])

    // useEffect(() => {
    //     filterCollegeList(activeLable)
    // }, [allCollegeList])

    // useEffect(() => {
    //     console.log(filteredCollegeList)
    // }, [filteredCollegeList])
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
                                        <button className=' btn btn-outline-primary btn btn-primary ' onClick={() => filterCollegeList('NOT PUBLISHED')}>
                                            PENDING
                                        </button>
                                        <button className=' btn btn-outline-primary btn btn-success ' onClick={() => filterCollegeList('published')}>
                                            APPROVED
                                        </button>
                                        <button className=' btn btn-outline-primary btn btn-danger ' onClick={() => filterCollegeList('decline')}>
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
