import { useDispatch } from 'react-redux'
import { updateError } from '../features/commonSlice'
import { constants } from '../utils/constants'
import { fetchAllExams } from '../utils/reduxThunk/examThunk'

export const useFetchExamList = () => {
  const dispatch = useDispatch()

  const fetchAllExamList = async () => {
    try {
      const response = await dispatch(
        fetchAllExams({
          url: constants.apiEndPoint.EXAM,
          header: constants.apiHeaders.HEADER,
          method: constants.httpMethod.GET
        })
      )
      if (response.payload.status === constants.apiResponseStatus.SUCCESS) {
        dispatch(
          updateError({
            errorType: constants.apiResponseStatus.SUCCESS,
            errorMessage: 'Exam List Fetched',
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
  return { fetchAllExamList }
}
