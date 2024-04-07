import React, { useEffect, useState } from 'react'
import AddExamDetails from './AddExamDetails';
import {useDispatch,useSelector} from 'react-redux'
import { reset } from '../../features/examSlice';
import { useNavigate } from 'react-router-dom'
import { v4 as uuid } from 'uuid';
import { addExamConfig, addExamHighlights, addNewExam, updateExamDescription } from '../../utils/reduxThunk/examThunk';
import { constants } from '../../utils/constants';
import CustomButton from '../../utils/CommonComponents/CustomButton';
import AddItemForm from '../AddItemForm';
import { updateError } from '../../features/commonSlice';
export default function AddNewExamDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDisabled, setDisabled] = useState(true);

  const { examInfo,examDescriptionOptions,examHighlights,examConfig } = useSelector(state => state.exam);
 const createNewExam = async () => {
   try {
      const examId = await uuid();
    const examInfoPayload = await {
      exam_id: examId,
      exam_name: examInfo.examName,
      exam_year: examInfo.examYear,
      application_start_date: examInfo.applicationStartDates,
      application_end_date: examInfo.applicationEndDates,
      exam_start_date: examInfo.examStartDates,
      exam_end_date: examInfo.examEndDates
    };
    const examDescriptionOptionsPayload = await {
      exam_id: examId,
        exam_description: examDescriptionOptions.exam_description,
        exam_conducting_body_description: examDescriptionOptions.exam_conducting_body_description,
        exam_important_dates_description: examDescriptionOptions.exam_important_dates_description,
        exam_session_description:examDescriptionOptions.exam_session_description ,
        exam_counselling_description: examDescriptionOptions.exam_counselling_description,
        exam_application_form_description:  examDescriptionOptions.exam_application_form_description,
        apllication_form_step1_description:  examDescriptionOptions.apllication_form_step1_description,
        apllication_form_step2_description:  examDescriptionOptions.apllication_form_step2_description,
        apllication_form_step3_description:  examDescriptionOptions.apllication_form_step3_description,
        exam_intimation_slip_description:  examDescriptionOptions.exam_intimation_slip_description,
        exam_admit_card_description:  examDescriptionOptions.exam_admit_card_description,
        exam_center_description:  examDescriptionOptions.exam_center_description,
        exam_pattern_description:  examDescriptionOptions.exam_pattern_description,
        exam_syllabus_description:  examDescriptionOptions.exam_syllabus_description,
    }
    const examHighlightsPayload = await { 
      exam_id: examId,
      conducting_body: examHighlights.conducting_body,
exam_level:examHighlights.exam_level,
exam_frequency:examHighlights.exam_frequency,
model_of_exam:examHighlights.exam_mode,
exam_duration:examHighlights.exam_duration,
      paper_marks: examHighlights.paper_marks,
marking_scheme:examHighlights.marking_scheme,


     };
    const examConfigPayload = await {
      exam_id: examId,
      no_of_session: examConfig.no_session,
      session_name:examConfig.session_name,
      is_counselling_announced:examConfig.is_counselling_announced,
      counselling_dates:examConfig.counselling_date,
      exam_conducting_address:examConfig.exam_conducting_address,
      exam_conducting_email:examConfig.exam_conducting_email,

      
    };
    const examInfoResponse = await dispatch(addNewExam({
      url: constants.apiEndPoint.EXAM_LIST + "?requestType=basicExamDetails",
      header: constants.apiHeaders.HEADER,
      method: constants.httpMethod.POST,
      payload:examInfoPayload
    }))
    if (examInfoResponse.payload.status === constants.apiResponseStatus.SUCCESS) {
      const isAllResolved = await Promise.all([
        dispatch(updateExamDescription({
          url: constants.apiEndPoint.EXAM_LIST + "?requestType=examDescriptionsDetails",
          header: constants.apiHeaders.HEADER,
          method: constants.httpMethod.POST,
          payload: examDescriptionOptionsPayload
        })),
        dispatch(addExamHighlights({
          url: constants.apiEndPoint.EXAM_LIST + "?requestType=examHighlightsDetails",
          header: constants.apiHeaders.HEADER,
          method: constants.httpMethod.POST,
          payload: examHighlightsPayload
        })),
        dispatch(addExamConfig({
          url: constants.apiEndPoint.EXAM_LIST + "?requestType=examImpDetails",
          header: constants.apiHeaders.HEADER,
          method: constants.httpMethod.POST,
          payload: examConfigPayload
        }))
      ]); 
      isAllResolved.map(resolve => {
        if (resolve.payload.status !== constants.apiResponseStatus.SUCCESS) {
          dispatch(updateError({
                    errorType: constants.apiResponseStatus.ERROR,
                    errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
                    flag:true
                  }))
          dispatch(reset())
        } else {
           dispatch(updateError({
                    errorType: constants.apiResponseStatus.SUCCESS,
                    errorMessage: "Exam has been added successfully",
                    flag:true
                  }))
          dispatch(reset())
          navigate('/exam-list');
        }
      })
     console.log(isAllResolved)
    } else if(examInfoResponse.payload.data.toLowerCase().includes('duplicate')){
       dispatch(updateError({
                    errorType: constants.apiResponseStatus.WARNING,
                    errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
                    flag:true
                  }))
      
      
    }else {
       dispatch(updateError({
                    errorType: constants.apiResponseStatus.ERROR,
                    errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
                    flag:true
                  }))
      
    }
   }
   catch (err) {
        dispatch(updateError({
                    errorType: constants.apiResponseStatus.ERROR,
                    errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
                    flag:true
                  }))
     
   }

    

  }
  useEffect(() => {
    if ([examInfo.isValidationError, examDescriptionOptions.isValidationError, examHighlights.isValidationError, examConfig.isValidationError].includes(true)) {
    setDisabled(true)
    } else {
    setDisabled(false)  
  }
  }, [examInfo.isValidationError, examDescriptionOptions.isValidationError, examHighlights.isValidationError, examConfig.isValidationError])
     useEffect(() => {
       return () => {
         // cleanup when component unmounts
         console.log('AddNewExamDetails Leaving');
         dispatch(reset());
    }
    }, [])
  return (
    <>
          <AddItemForm label={'Add New Exam'}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
<AddExamDetails />
        <div style={{display:'flex'}}>
    <CustomButton
              isDisabled={isDisabled}
              lable={'Submit'}
              onClick={() => createNewExam()}
          />
          </div>
        </div>
        
        </AddItemForm>
      </>
  )
}
