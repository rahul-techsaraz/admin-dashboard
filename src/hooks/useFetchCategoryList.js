import { useDispatch } from "react-redux"
import { updateError } from "../features/commonSlice"
import { fetchCategory } from "../utils/reduxThunk/commonThunk"
import { constants } from "../utils/constants"

export const useFetchCategoryList = () => {
    const dispatch = useDispatch()

    const fetchCategoryList = async () => {
        try {
            const response = await dispatch(fetchCategory({
                url: constants.apiEndPoint.CATEGORY_LIST,
                header: constants.apiHeaders.HEADER,
                method: constants.httpMethod.GET
            }))
            if (response.payload.status !== constants.apiResponseStatus.SUCCESS) {
                dispatch(
                    updateError({
                        errorType: constants.apiResponseStatus.ERROR,
                        errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
                        flag: true
                    })
                )
            }
        }
        catch (error) {
            dispatch(updateError({
                errorType: constants.apiResponseStatus.ERROR,
                errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
                flag: true
            }))
        }
    }
    return { fetchCategoryList }
}