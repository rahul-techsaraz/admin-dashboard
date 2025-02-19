import React, { useEffect } from 'react'
import { useFetchAllUserFeedback } from '../../hooks/useFetchAllUserFeedback'
import { constants } from '../../utils/constants'
import ItemList from '../ItemList'
import { useDispatch, useSelector } from 'react-redux'
import { updateError } from '../../features/commonSlice'
import { deleteFeedbackByEmail } from '../../utils/reduxThunk/feedbackThunk'

const FeedbackList = () => {
    const { fetchAllFeedback } = useFetchAllUserFeedback()
    const { allfeedbackList } = useSelector((state) => state.feedback)
    const dispatch = useDispatch()

    const addNewColumns = [
        {
            label: 'Delete',
            handleDeleteItem: (rowData) => {
                deleteFeedback(rowData.email)
            },
            classname: 'deleteButton'
        }
    ]

    const deleteFeedback = async (email) => {
        console.log(email)
        try {
            const payload = { email: email }
            const data = await dispatch(deleteFeedbackByEmail({
                url: `${constants.apiEndPoint.USER_FEADBACK_RESPONSE}&email=${email}`,
                header: constants.apiHeaders.HEADER,
                method: constants.httpMethod.DELETE,
                body: payload
            })
            )
            console.log(data)
            if (data.payload.status === constants.apiResponseStatus.SUCCESS) {
                dispatch(updateError({
                    errorType: constants.apiResponseStatus.SUCCESS,
                    errorMessage: 'Feedback deleted successfully!',
                    flag: true
                })
                )
                fetchAllFeedback()
            } else {
                dispatch(updateError({
                    errorType: constants.apiResponseStatus.WARNING,
                    errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
                    flag: true
                })
                )
            }
        } catch (error) {
            dispatch(updateError({
                errorType: constants.apiResponseStatus.WARNING,
                errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
                flag: true
            })
            )
        }
    }

    useEffect(() => {
        fetchAllFeedback()
    }, [])

    useEffect(() => {
        console.log(allfeedbackList)
    }, [allfeedbackList])
    return (
        <>
            <ItemList
                userColumns={constants.allUserFeedbackList}
                categoryData={allfeedbackList}
                addNewColumns={addNewColumns}
                labe={'Feedback Details'}
                path={'/feedback-list/'}
                id={'email'}
                isVewdetails={true}
            />
        </>
    )
}

export default FeedbackList