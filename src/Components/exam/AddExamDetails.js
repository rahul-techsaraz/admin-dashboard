import React, { useEffect, useState } from 'react'
import ExamDescriptions from './ExamDescriptions'
import { useDispatch, useSelector } from 'react-redux'
import ExamHighlights from './ExamHighlights'
import ExamOtherSetting from './ExamOtherSetting'
import AddNewExam from './AddNewExam'
import AddItemForm from '../AddItemForm'
import { constants } from '../../utils/constants'
import { updateExamTab } from '../../features/examSlice'
import CustomButton from '../../utils/CommonComponents/CustomButton';
import { v4 as uuid } from 'uuid'
import { addExamConfig, addExamHighlights, addNewExam, updateExamDescription } from '../../utils/reduxThunk/examThunk'

export default function AddExamDetails() {
  const [isDisabled, setDisabled] = useState(true);
  const dispatch = useDispatch();
  const { activeExamTab,examInfo,examDescriptionOptions,examHighlights,examConfig } = useSelector(state => state.exam);
  const { examTab } = constants.examDetailsTab;
  const createNewExam = async () => {
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
    console.log(examInfoResponse)
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
          url: constants.apiEndPoint.EXAM_LIST + "?requestType=examImpDetail",
          header: constants.apiHeaders.HEADER,
          method: constants.httpMethod.POST,
          payload: examConfigPayload
        }))
      ]); 
      isAllResolved.map(resolve => {
        if (resolve.payload.status !== constants.apiResponseStatus.SUCCESS) {
          alert('You are broken')
        }
      })
     console.log(isAllResolved)
    } else if(examInfoResponse.payload.data.toLowerCase().includes('duplicate')){
      alert('Exam name is already added. Please add other exam')
    }else {
      alert('Your request can not be proccess at the moment . Please try again')
      
    }

    

}
  //Validate the validation error
  useEffect(() => {
    if ([examInfo.isValidationError, examDescriptionOptions.isValidationError, examHighlights.isValidationError, examConfig.isValidationError].includes(true)) {
    setDisabled(true)
    } else {
    setDisabled(false)  
  }
},[examInfo.isValidationError,examDescriptionOptions.isValidationError,examHighlights.isValidationError,examConfig.isValidationError])
  return (
    <>
          <AddItemForm label={'Add New Exam'}>
      
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          
          <ul class="nav nav-tabs">
            {examTab.map(tabName => (
              <li class="nav-item">
                <span
                  className={`nav-link ${tabName.key === activeExamTab && 'active'}`}
                  aria-current="page"
                  onClick={() => dispatch(updateExamTab({tabName:tabName.key}))}
                >
                  {tabName.label}
                </span>
            </li>
            ))}
   
</ul>
          {
        {
                  'examinfo': <AddNewExam />,
                  'description': <ExamDescriptions />,
                  'highlights': <ExamHighlights />,
                  'config' : <ExamOtherSetting />
         

        }[activeExamTab]
          }
          <div style={{ display: 'flex' }}>
            
             
            {activeExamTab === constants.examDetailsTab.EXAM_CONFIG &&
              <CustomButton
              isDisabled={isDisabled}
              lable={'Submit'}
              onClick={() => createNewExam()}
            />}
           
             

            

          </div>
      </div>
          
          </AddItemForm>
        
      </>
  )
}
