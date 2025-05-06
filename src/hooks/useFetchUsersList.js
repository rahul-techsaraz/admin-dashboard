import { useDispatch } from 'react-redux'
import { updateError } from '../features/commonSlice'
import { constants } from '../utils/constants'
import { fetchAllUsersList } from '../utils/reduxThunk/commonThunk'

export const useFetchAllUsersList = () => {
  const dispatch = useDispatch()

  const fetchUsersList = async () => {
    try {
      const response = await dispatch(
        fetchAllUsersList({
          url: constants.apiEndPoint.GET_ALL_USERS_USER_DETAILS,
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
        return
      }
      dispatch(
        updateError({
          errorType: constants.apiResponseStatus.ERROR,
          errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
          flag: true
        })
      )
      return
    } catch (err) {
      console.error(err)
      dispatch(
        updateError({
          errorType: constants.apiResponseStatus.ERROR,
          errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
          flag: true
        })
      )
    }
  }

  return { fetchUsersList }
}
