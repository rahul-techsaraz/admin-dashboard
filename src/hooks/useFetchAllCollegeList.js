import { useDispatch } from "react-redux"
import { updateError } from "../features/commonSlice"
import { constants } from "../utils/constants"
import { fetchAllCollegeList } from "../utils/reduxThunk/collegeThunk"


export const useFetchAllCollegeList = () => {
    const dispatch = useDispatch()

    const fetchCollegeList = async () => {
        try {
            const response = await dispatch(fetchAllCollegeList({
                url: constants.apiEndPoint.NEW_COLLEGE,
                header: constants.apiHeaders.HEADER,
                method: constants.httpMethod.GET
            }))
            if (response.payload.status === constants.apiResponseStatus.SUCCESS) {
                dispatch(
                    updateError({
                        errorType: constants.apiResponseStatus.SUCCESS,
                        errorMessage: 'College List Fetched',
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
        }
        catch (error) {
            dispatch(updateError({
                errorType: constants.apiResponseStatus.ERROR,
                errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
                flag: true
            }))
        }
    }
    return { fetchCollegeList }
}