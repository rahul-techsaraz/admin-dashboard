import React, { useCallback, useEffect } from 'react'
import AddExamDetails from './AddExamDetails';
import {useDispatch,useSelector} from 'react-redux'
import { reset } from '../../features/examSlice';
import { fetchExamConfigById, fetchExamDescriptionById, fetchExamHighlightsById, fetchExamInfoById } from '../../utils/reduxThunk/examThunk';
import { constants } from '../../utils/constants';
import { useParams } from 'react-router-dom'
import AddItemForm from '../AddItemForm';
import CustomButton from '../../utils/CommonComponents/CustomButton';

export default function ViewExamDetails() {
  const {isEdit} = useSelector(state => state.exam)
  const dispatch = useDispatch();
  const { examId } = useParams();
  
   const fetchExam = useCallback(() => {
 dispatch(fetchExamInfoById({
            url: constants.apiEndPoint.EXAM_LIST + "?requestType=basicExamDetails&exam_id=" + examId,
            header: constants.apiHeaders.HEADER,
            method:constants.httpMethod.GET
 }))
     dispatch(fetchExamDescriptionById({
            url: constants.apiEndPoint.EXAM_LIST + "?requestType=examDescriptionsDetails&exam_id=" + examId,
            header: constants.apiHeaders.HEADER,
            method:constants.httpMethod.GET
     }))
      dispatch(fetchExamHighlightsById({
            url: constants.apiEndPoint.EXAM_LIST + "?requestType=examHighlightsDetails&exam_id=" + examId,
            header: constants.apiHeaders.HEADER,
            method:constants.httpMethod.GET
      }))
     dispatch(fetchExamConfigById({
            url: constants.apiEndPoint.EXAM_LIST + "?requestType=examImpDetails&exam_id=" + examId,
            header: constants.apiHeaders.HEADER,
            method:constants.httpMethod.GET
    }))
    },[examId])

  useEffect(() => {
        if(!isEdit) {
          fetchExam();
        }
       return () => {
         // cleanup when component unmounts
         console.log('ViewExamDetails Leaving');
         dispatch(reset());
    }
    }, [])
  return (
        <AddItemForm label={'Add New Exam'}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
<AddExamDetails />
        {/* <div style={{display:'flex'}}>
          <CustomButton
              isDisabled={true}
              lable={'Update'}
              onClick={() => {}}
          />
          </div> */}
        </div>
        
        </AddItemForm>

  )
}
