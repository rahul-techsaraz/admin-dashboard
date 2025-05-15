import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { addNewExams, deleteExamById, fetchAllExams, fetchExamDetailById, updateExamDetails } from '../utils/reduxThunk/examThunk'
import { constants } from '../utils/constants'
import { updateError } from '../features/commonSlice'
import { deepParseTypedJSON } from '../utils/deepParseTypedJSON'
import { resetExamForm, setExamDataFromApi } from '../features/newExamSlice'
import { useNavigate } from 'react-router-dom'

const useExamData = () => {
  const { userInfo } = useSelector((state) => state.user, shallowEqual)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const customHeader = constants.apiHeaders.customHeader(userInfo.token)

  const getAllExam = () => {
    dispatch(
      fetchAllExams({
        url: constants.apiEndPoint.EXAM,
        header: constants.apiHeaders.HEADER,
        method: constants.httpMethod.GET
      })
    )
  }
  const getExamById = (examId) => {
    dispatch(
      fetchExamDetailById({
        url: constants.apiEndPoint.EXAM + '?exam_id=' + examId,
        header: constants.apiHeaders.HEADER,
        method: constants.httpMethod.GET
      })
    )
      .then((res) => {
        const examData = deepParseTypedJSON(res.payload.data)
        dispatch(setExamDataFromApi(examData))
      })
      .catch((err) => {
        console.error(err)
      })
  }
  const editExamData = (payload) => {
    dispatch(
      updateExamDetails({
        url: constants.apiEndPoint.EXAM,
        header: { ...constants.apiHeaders.HEADER, ...customHeader },
        method: constants.httpMethod.PUT,
        payload
      })
    )
      .unwrap()
      .then((res) => {
        dispatch(
          updateError({
            errorType: res?.status,
            errorMessage: res?.message,
            flag: true
          })
        )
        getExamById(payload?.exam_id)
      })
      .catch((err) => {
        console.error('Update failed', err)
      })
  }
  const removeExam = async (examId) => {
    const data = await dispatch(
      deleteExamById({
        url: constants.apiEndPoint.EXAM + '?exam_id=' + examId,
        header: { ...constants.apiHeaders.HEADER, ...customHeader },
        method: constants.httpMethod.DELETE
      })
    )
    if (data.payload.status === constants.apiResponseStatus.SUCCESS) {
      dispatch(
        updateError({
          errorType: constants.apiResponseStatus.SUCCESS,
          errorMessage: 'Exam deleted successfully!',
          flag: true
        })
      )
      getAllExam()
    } else {
      // alert("Something went wrong. Please try again!")
      dispatch(
        updateError({
          errorType: constants.apiResponseStatus.ERROR,
          errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
          flag: true
        })
      )
    }
  }
  const createExam = (payload) => {
    dispatch(
      addNewExams({
        url: constants.apiEndPoint.NEW_EXAM_API,
        header: { ...constants.apiHeaders.HEADER, ...customHeader },
        method: constants.httpMethod.POST,
        payload
      })
    )
      .then((res) => {
        dispatch(
          updateError({
            errorType: res?.payload?.status,
            errorMessage: res?.payload?.message,
            flag: true
          })
        )
        navigate('/exam-list')
        localStorage.removeItem('examsData')
        dispatch(resetExamForm())
      })
      .catch((err) => {
        console.error(err)
      })
  }
  return { getAllExam, removeExam, getExamById, editExamData, createExam }
}
export default useExamData
