import React, { useCallback, useEffect, useState } from 'react'
import AddItemForm from '../AddItemForm'
import TextArea from '../../utils/CommonComponents/TextArea'
import CustomButton from '../../utils/CommonComponents/CustomButton'
import { useDispatch, useSelector } from 'react-redux'
import { fetchExamDescriptionById, updateEditMode, updateExamDescription, updateExamTab } from '../../features/examSlice'
import { useReducer } from 'react'
import { constants } from '../../utils/constants'
import { examReducer } from '../../utils/reducers/examReducers'
import { httpCall } from '../../utils/service';
import { v4 as uuidv4 } from 'uuid';
import { updateLoader } from '../../features/commonSlice';
import { useParams } from 'react-router-dom'
import ExamDescriptionForm from './ExamDescriptionForm'
import DescriptionsDetailsData from './DescriptionsDetailsData'
import { useExamDataById } from '../../hooks/useExamData'



export default function ExamDescriptions() {
const callDispatch = useDispatch();

const {isEdit,errorMessage,isError} = useSelector(state => state.exam)    
    const { initialState } = constants.examDescriptionInitialState;
    const { examId } = useParams();
   
   
    const handleChange = (key,value) => {
          dispatch({type:key,[key]:value})
    }
    //Check wheather descriptions is empty or not
   
const [examDesc, dispatch] = useReducer(examReducer,initialState)
   
   
    const {
      exam_description,
            exam_conducting_body_description,
            exam_important_dates_description,
            exam_session_description,
            exam_counselling_description,
            exam_application_form_description,
            apllication_form_step1_description,
            apllication_form_step2_description,
            apllication_form_step3_description,
            exam_intimation_slip_description,
            exam_admit_card_description,
            exam_center_description,
            exam_pattern_description,
            exam_syllabus_description  
    } = examDesc;
    const postDescriptionDetails = async (method) => {
        const payload = await {
            exam_id: examId,
            exam_description,
            exam_conducting_body_description,
            exam_important_dates_description,
            exam_session_description,
            exam_counselling_description,
            exam_application_form_description,
            apllication_form_step1_description,
            apllication_form_step2_description,
            apllication_form_step3_description,
            exam_intimation_slip_description,
            exam_admit_card_description,
            exam_center_description,
            exam_pattern_description,
            exam_syllabus_description  
        }
        console.log({payload})
        // const data = await httpCall(
        //     constants.apiEndPoint.EXAM_LIST + "?requestType=examDescriptionsDetails",
        //     constants.apiHeaders.HEADER,
        //     method,
        //     payload
        // );
         callDispatch(updateExamDescription({
            url: constants.apiEndPoint.EXAM_LIST + "?requestType=examDescriptionsDetails",
            header: constants.apiHeaders.HEADER,
            method,
            payload
        }))
        // if (data.payload.status === 'success') {
        //     callDispatch(updateEditMode({flag:false}))
        // } else {
        //     alert(data.payload.data.message)
        // }

    }
  return (
      <>
          {isError && alert(errorMessage)}
          <AddItemForm label={"Add Exam Description"}>
              
              {isEdit ? (
                   <ExamDescriptionForm
                     
                      handleChange={(key,value) => handleChange(key,value)}
                      examDesc={examDesc}
                      postDescriptionDetails={(method) => postDescriptionDetails(method)}
                      examId={examId}
              />
              ) : (
                      <DescriptionsDetailsData />
                 )}
              
            
             
             
           </AddItemForm>
      </>
  )
}
