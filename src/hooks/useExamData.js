import { httpCall } from '../utils/service'
import { useDispatch } from 'react-redux'
import { updateLoader } from '../features/commonSlice'
const fetchExamDescriptionData = async (url, header, method) => {
  const data = await httpCall(url, header, method)
  return data
}
export const useExamDataById = (url, header, method) => {
  const dispatch = useDispatch()
  dispatch(updateLoader({ flag: true }))
  const examDescriptionData = fetchExamDescriptionData(url, header, method)

  dispatch(updateLoader({ flag: false }))
  return examDescriptionData
}
