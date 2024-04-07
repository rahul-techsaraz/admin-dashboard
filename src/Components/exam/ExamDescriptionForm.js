import React, { useEffect } from 'react'
import TextArea from '../../utils/CommonComponents/TextArea'
import { constants } from '../../utils/constants';
import {  handleExamDescriptionValidation, toggelExamInfoEdit, updateDescriptionsOptions } from '../../features/examSlice';
import { useDispatch, useSelector } from 'react-redux';
import ExamInfoData from './ExamInfoData';
import { useParams } from 'react-router-dom';
import CustomButton from '../../utils/CommonComponents/CustomButton';

import { fetchExamDescriptionById, updateExamDescription } from '../../utils/reduxThunk/examThunk';
import { updateError } from '../../features/commonSlice';

export default function ExamDescriptionForm() {
    
    const reduxDispatch = useDispatch();
    const { examId } = useParams();
    const { examDescriptionInputFieldList } = constants;

    const { examDescriptionOptions,isEdit } = useSelector(state => state.exam);    

 function checkProperties(obj) {
        const getValues = Object.values(obj);
        const isEmptyValue = getValues.filter(value => value === '')
        return isEmptyValue.length > 0 ? true : false;
    }   
     const handleChange = (key,value) => {
          reduxDispatch(updateDescriptionsOptions({key,value}))
    }

    useEffect(() => {
        reduxDispatch(handleExamDescriptionValidation({flag:checkProperties(examDescriptionOptions)}))
    }, [examDescriptionOptions]);
    
    const examInfoData = examDescriptionInputFieldList.map(description => {
         return {lable:description.label,value:examDescriptionOptions[description.keyName]}
     })
    const handleUpdateExamDescription = async () => {
        try {
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
         const examDescResponse = await reduxDispatch(updateExamDescription({
          url: constants.apiEndPoint.EXAM_LIST + "?requestType=examDescriptionsDetails",
          header: constants.apiHeaders.HEADER,
          method: constants.httpMethod.PUT,
          payload: examDescriptionOptionsPayload
        }))
        if (examDescResponse.payload.status === constants.apiResponseStatus.SUCCESS) { 
             reduxDispatch(updateError({
            errorType: constants.apiResponseStatus.SUCCESS,
            errorMessage: "Your exam description has been updated successfully",
            flag:true
          }))
            await reduxDispatch(fetchExamDescriptionById({
            url: constants.apiEndPoint.EXAM_LIST + "?requestType=examDescriptionsDetails&exam_id=" + examId,
            header: constants.apiHeaders.HEADER,
            method:constants.httpMethod.GET
            }))
        } else {
             reduxDispatch(updateError({
            errorType: constants.apiResponseStatus.ERROR,
            errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
            flag:true
          }))
        }
        }
        catch (err) {
           reduxDispatch(updateError({
            errorType: constants.apiResponseStatus.ERROR,
            errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
            flag:true
          })) 
        }
           
    }
    return (
        <>
            
            {!isEdit && examId ? <ExamInfoData examInfoData={examInfoData} /> : (
                <div style={{ display: " flex", flexWrap: "wrap", gap: '3rem', margin: 'auto', padding: 'auto' }}>
                  {examDescriptionInputFieldList.map(description => (
                      <TextArea
                          key={description.keyName}
                  inputValue={examDescriptionOptions[description.keyName]}
                  placeholder={description.label}
                  onChange={(e) => handleChange(description.keyName,e.target.value)}
                  noOfROws={6}
                  noOfCols={60}
                  fieldName={description.label}
                  styles={{border:'solid #e83e8c 1px',borderRadius:"1rem"}}
              /> 
                  ))}
                  {isEdit && examId && <div style={{ display: 'flex',margin:'auto' }}>
                      <CustomButton
                          isDisabled={examDescriptionOptions.isValidationError}
                          lable={'Update'}
                          onClick={() => handleUpdateExamDescription()}
              />
              <CustomButton
                          isDisabled={examDescriptionOptions.isValidationError}
                          lable={'Cancel'}
                          onClick={() => reduxDispatch(toggelExamInfoEdit())}
                      />
                  </div>}
            </div> 
         )}   
  
            </>
  )
}
