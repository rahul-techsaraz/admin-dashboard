import AddItemForm from '../AddItemForm'
import { useDispatch, useSelector } from 'react-redux'
import { fetchExamDescriptionById, updateExamDescription } from '../../features/examSlice'
import { useCallback, useEffect, useReducer } from 'react'
import { constants } from '../../utils/constants'
import { useParams } from 'react-router-dom'
import ExamDescriptionForm from './ExamDescriptionForm'
import DescriptionsDetailsData from './DescriptionsDetailsData'


export default function ExamDescriptions() {

const reduxDispatch = useDispatch();

    //Reading Exam Slice
    const { isEdit,examDescriptionOptions } = useSelector(state => state.exam)   
    
    const { examId } = useParams();

    
    // const postDescriptionDetails = async (method) => {
    //     const payload = await { ...examDescriptionOptions, exam_id: examId }
    //     console.log(payload);
    //      reduxDispatch(updateExamDescription({
    //         url: constants.apiEndPoint.EXAM_LIST + "?requestType=examDescriptionsDetails",
    //         header: constants.apiHeaders.HEADER,
    //         method,
    //         payload
    //     }))
    // }
    // const fetchDescriptionsData = useCallback(() => {
    //        const requestPayload = {
    //         url: constants.apiEndPoint.EXAM_LIST + "?requestType=examDescriptionsDetails&exam_id=" + examId,
    //         header: constants.apiHeaders.HEADER,
    //         method:constants.httpMethod.GET
    //     }
    //      reduxDispatch(fetchExamDescriptionById(requestPayload));
    // },[examId])
    //  useEffect(() => {
    //     fetchDescriptionsData()
    //  }, [])
  return (
      <>
                   <ExamDescriptionForm />
      </>
  )
}
