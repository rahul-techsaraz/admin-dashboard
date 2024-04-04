import React, { useCallback, useEffect } from 'react'
import InputFieldText from '../../utils/CommonComponents/InputFieldText'
import SelectBox from '../../utils/CommonComponents/SelectBox'
import { constants } from '../../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { handleExamInfoValidation, updateExamInfo } from '../../features/examSlice'


export default function AddNewExam() {
    const dispatch = useDispatch();
    const {examInfoSelectBox} = constants
    const {
        examName,
        applicationStartDates,
        applicationEndDates,
        examStartDates,
        examEndDates,
        examYear
    } = useSelector(state => state.exam.examInfo)

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
          dispatch(updateExamInfo({key,value}))
        } else {
            alert('its invalid dates')
        }
    }
    useEffect(() => {
        if (!examName || !applicationStartDates || !applicationEndDates || !examStartDates || !examEndDates || !examYear) {
        dispatch(handleExamInfoValidation({flag:true}))
        }
        dispatch(handleExamInfoValidation({flag:false}))

    }, [examName, applicationStartDates, applicationEndDates, examStartDates,examEndDates, examYear])
    
  return (
      <>
              <div style={{gap:"20px",display:'flex',margin:"2.5rem 0px",flexWrap:"wrap"}}>
                   <InputFieldText
                  inputType="text"
                  onChange={(e) => dispatch(updateExamInfo({key:"examName",value:e.target.value}))}
                  styles={{ width: '280px' }}
                  placeholder="Exam Name"
              />
              <SelectBox
                  options={examInfoSelectBox}
                  onChange={(e) => dispatch(updateExamInfo({key:"examYear",value:e.target.value}))}
                  styles={{ width: '280px', height:'38px' }}
                  />
                     <InputFieldText
                  inputType="date"
                  inputValue={applicationStartDates}
                  onChange={(e) => validateDates('applicationStartDates',e.target.value)}
                  styles={{ width: '280px' }}
                  placeholder="Application Start Date"
                  />
                   <InputFieldText
                  inputType="date"
                  inputValue={applicationEndDates}
                 onChange={(e) => validateDates('applicationEndDates',e.target.value)}
                  styles={{ width: '280px' }}
                  placeholder="Application End Date"
                  />
                   <InputFieldText
                  inputType="date"
                  inputValue={examStartDates}
                 onChange={(e) => validateDates('examStartDates',e.target.value)}
                  styles={{ width: '280px' }}
                  placeholder="Exam Start Date"
                  />
                   <InputFieldText
                  inputType="date"
                  inputValue={examEndDates}
                  onChange={(e) => validateDates('examEndDates',e.target.value)}
                  styles={{ width: '280px' }}
                  placeholder="Application End Date"
              />
              
                 
              </div>
             
      </>
  )
}
