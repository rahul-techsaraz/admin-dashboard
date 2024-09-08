import { useDispatch } from 'react-redux';
import { constants } from '../utils/constants';
import { updateError } from '../features/commonSlice';
import { fetchUserByEmail } from '../utils/reduxThunk/commonThunk';

const useFetchDetails = () => {
   const dispatch = useDispatch();

     const fetchUsersDetails = async (email) => {
    try {
        const response = await dispatch(
            fetchUserByEmail({
          url: constants.apiEndPoint.FETCH_USER_DETAILS_BY_EMAIL+email,
          header: constants.apiHeaders.HEADER,
          method: constants.httpMethod.GET
        })
      )
      if (response.payload.status === constants.apiResponseStatus.SUCCESS) {
        dispatch(
          updateError({
            errorType: constants.apiResponseStatus.SUCCESS,
            errorMessage: 'Users List Fetched',
            flag: true
          })
          )
          return; 
      } 
        dispatch(
          updateError({
            errorType: constants.apiResponseStatus.ERROR,
            errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
            flag: true
          })
        )
        return;
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
   return {fetchUsersDetails}
}

export default useFetchDetails