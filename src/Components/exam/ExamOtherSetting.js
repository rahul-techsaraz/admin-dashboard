import React, { useCallback, useEffect } from 'react'
import InputFieldText from '../../utils/CommonComponents/InputFieldText'
import AddItemForm from '../AddItemForm'
import { useDispatch, useSelector } from 'react-redux'
import SelectBox from '../../utils/CommonComponents/SelectBox'
import { handleExamConfigValidation, updateExamConfig } from '../../features/examSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ExamOtherSetting() {
  const dispatch = useDispatch();
  const {
    no_session,
    session_name,
    is_counselling_announced,
    counselling_date,
    exam_conducting_address,
    exam_conducting_email
  } = useSelector(state => state.exam.examConfig)
  const handleChange = (key, value) => {
    dispatch(updateExamConfig({ key, value }));
  }
   const generateTodayDate = useCallback(() => {
         let date = new Date();
// Get year, month, and day part from the date
let year = date.toLocaleString("default", { year: "numeric" });
let month = date.toLocaleString("default", { month: "2-digit" });
let day = date.toLocaleString("default", { day: "2-digit" });

// Generate yyyy-mm-dd date string
        let formattedDate = year + "-" + month + "-" + day;
        return formattedDate;
    },[])
    const validateDates = (key, value) => {
        console.log(value)
        if (value >= generateTodayDate()) {
          dispatch(updateExamConfig({key,value}))
        } else {
            // alert('its invalid dates')
            toast.error("its invalid dates !");
        }
    }
  useEffect(() => {
if([no_session,
    session_name,
    is_counselling_announced,
    exam_conducting_address,
  exam_conducting_email].includes('')) {
  dispatch(handleExamConfigValidation({flag:true}))
} else {
  dispatch(handleExamConfigValidation({flag:false}))
  
    }
    if (is_counselling_announced === 'Yes' && counselling_date === '') {
  dispatch(handleExamConfigValidation({flag:true}))
    }
  },[no_session,
    session_name,
    is_counselling_announced,
    counselling_date,
    exam_conducting_address,
    exam_conducting_email])
   
  return (
    <>
              <div style={{gap:"20px",display:'flex',margin:"2.5rem 0px",flexWrap:"wrap"}}>
                 <InputFieldText
                  inputValue={no_session}
                  onChange={(e) => handleChange('no_session',e.target.value)}
                  inputType="text"
                  styles={{ width: '280px' }}
                  placeholder="No Of Session"
                  />
      <InputFieldText
        inputValue={session_name}
                  onChange={(e) => handleChange('session_name',e.target.value)}
                  inputType="text"
                  styles={{ width: '380px' }}
                  placeholder="Session Name"
                  />
                    <SelectBox
                  options={[{label:"Counselling Announced",value:""},{label:"Yes",value:"Yes"},{label:"No",value:"No"}]}
                  inputValue={is_counselling_announced}
                  onChange={(e) => handleChange('is_counselling_announced',e.target.value)}
                  styles={{ width: '280px',height:"38px" }}
                  />
      {is_counselling_announced === 'Yes' && <InputFieldText
        inputValue={counselling_date}
        onChange={(e) => validateDates('counselling_date', e.target.value)}
        inputType="date"
        styles={{ width: '280px' }}
        placeholder="counselling_dates"
      />}
                                    <InputFieldText
                    inputType="text"
                    inputValue={exam_conducting_address}
                    onChange={(e) => handleChange('exam_conducting_address', e.target.value)}
                  styles={{ width: '480px' }}
                  placeholder="Exam Conducting Address"
                  />
      <InputFieldText
                      inputValue={exam_conducting_email}
                    onChange={(e) => handleChange('exam_conducting_email', e.target.value)}
                  inputType="text"
                  styles={{ width: '280px' }}
                  placeholder="Exam Conducting Email"
                  />
                 
                 
                   
             
                  
              </div>
              <ToastContainer />
              </>
             
  )
}
