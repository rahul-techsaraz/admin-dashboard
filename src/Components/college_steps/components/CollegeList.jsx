import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { constants } from '../../../utils/constants'
import { updateError } from '../../../features/commonSlice'
import ItemList from '../../ItemList'
import { deleteNewCollegeById, fetchAgentCollegeList } from '../../../utils/reduxThunk/collegeThunk'
import { resetCollege } from '../../../features/newCollegeSlice'

const CollegeList = () => {
    const dispatch = useDispatch()
    const { userToken } = useSelector((state) => state.user)
    const { agentCollegeList } = useSelector((state) => state.newCollege)

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
        try {
            const data = await dispatch(
                deleteNewCollegeById({
                    url: constants.apiEndPoint.NEW_COLLEGE + `?college_id=${collegeId}&college_name=${collegeName}`,
                    header: { ...constants.apiHeaders.HEADER, Authorization: userToken },
                    method: constants.httpMethod.DELETE,
                })
            )
            if (data.payload.status === constants.apiResponseStatus.SUCCESS) {
                dispatch(
                    updateError({
                        errorType: constants.apiResponseStatus.SUCCESS,
                        errorMessage: 'College deleted successfully!',
                        flag: true
                    })
                )
                await fetchCollegeList()
            } else {
                dispatch(
                    updateError({
                        errorType: constants.apiResponseStatus.WARNING,
                        errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
                        flag: true
                    })
                )
            }
        } catch (error) {
            dispatch(
                updateError({
                    errorType: constants.apiResponseStatus.WARNING,
                    errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
                    flag: true
                })
            )
        }
    }

    const fetchCollegeList = async () => {
        try {
            const response = await dispatch(
                fetchAgentCollegeList({
                    url: constants.apiEndPoint.NEW_COLLEGE,
                    header: constants.apiHeaders.HEADER,
                    method: constants.httpMethod.GET
                })
            )
            if (response.payload.status === constants.apiResponseStatus.SUCCESS) {
                dispatch(
                    updateError({
                        errorType: constants.apiResponseStatus.SUCCESS,
                        errorMessage: 'College List Fetched Successfully',
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
        fetchCollegeList()
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