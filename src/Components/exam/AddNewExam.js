import React, { useEffect, useState } from 'react'
import AddItemForm from '../AddItemForm'
import InputFieldText from '../../utils/CommonComponents/InputFieldText'
import SelectBox from '../../utils/CommonComponents/SelectBox'
import CustomButton from '../../utils/CommonComponents/CustomButton'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid';
import { httpCall } from '../../utils/service'
import { constants } from '../../utils/constants'
import Loader from '../Loader/Loader'


export default function AddNewExam() {
    const [examName, setExamName] = useState('');
    const [applicationStartDates, setApplicationStartDates] = useState('');
    const [applicationEndDates, setApplicationEndDates] = useState('');
    const [examStartDates, setExamStartDate] = useState('');
    const [examEndDates, setExamEndDates] = useState('');
    const [examYear, setExamYear] = useState('');
    const [isValidationError, setValidationError] = useState(true);
    const [isLoading,setLoading] = useState(false)



    function generateTodayDate() {
        var date = new Date();

// Get year, month, and day part from the date
var year = date.toLocaleString("default", { year: "numeric" });
var month = date.toLocaleString("default", { month: "2-digit" });
var day = date.toLocaleString("default", { day: "2-digit" });

// Generate yyyy-mm-dd date string
        var formattedDate = year + "-" + month + "-" + day;
        return formattedDate;
    }
    const validateDates = (targetValue,setDates) => {
        if (targetValue >= generateTodayDate()) {
           setDates(targetValue)
        } else {
            alert('its invalid dates')
        }
    }
    useEffect(() => {
        if (!examName || !applicationStartDates || !applicationEndDates || !examStartDates || !examEndDates || !examYear) {
        setValidationError(true)
        } else {
            setValidationError(false)
    }
    }, [examName, applicationStartDates, applicationEndDates, examStartDates,examEndDates, examYear])
    const postNewExams = async () => {
        setLoading(true)
        const payload = await {
    "exam_id":uuidv4(),
    "exam_name":examName,
    "exam_year":examYear,
    "application_start_date":applicationStartDates,
    "application_end_date":applicationEndDates,
    "exam_start_date":examStartDates,
    "exam_end_date":examEndDates
        }
        const data = await httpCall(
            constants.apiEndPoint.EXAM_LIST + "?requestType=basicExamDetails",
            constants.apiHeaders.HEADER,
            constants.httpMethod.POST,
            payload
        )
        if (data.status === "success") {
            setExamName('');
            setExamYear('');
            setApplicationStartDates('');
            setApplicationEndDates('');
            setExamEndDates('');
            setExamStartDate('');

            setLoading(false)
            alert(data.data.message);
            

        } else {
            alert('Something went wrong. Please try again')
        setLoading(false)

        }
    }
  return (
      <>
          {isLoading && <Loader />}
          <AddItemForm label={"Add New Exam"}>
              <div style={{gap:"20px",display:'flex',margin:"2.5rem 0px",flexWrap:"wrap"}}>
                   <InputFieldText
                  inputType="text"
                  onChange={(e) => setExamName(e.target.value)}
                  styles={{ width: '280px' }}
                  placeholder="Exam Name"
              />
              <SelectBox
                  options={[{"label":"Exam Year","value":""},{"label":"2024","value":"2024"},{"label":"2025","value":"2025"},{"label":"2026","value":"2026"}]}
                  onChange={(e) => setExamYear(e.target.value)}
                  styles={{ width: '180px', height:'38px' }}
                  />
                     <InputFieldText
                  inputType="date"
                  onChange={(e) => validateDates(e.target.value,setApplicationStartDates)}
                  styles={{ width: '280px' }}
                  placeholder="Application Start Date"
                  />
                   <InputFieldText
                  inputType="date"
                 onChange={(e) => validateDates(e.target.value,setApplicationEndDates)}
                  styles={{ width: '280px' }}
                  placeholder="Application End Date"
                  />
                   <InputFieldText
                  inputType="date"
                 onChange={(e) => validateDates(e.target.value,setExamStartDate)}
                  styles={{ width: '280px' }}
                  placeholder="Exam Start Date"
                  />
                   <InputFieldText
                  inputType="date"
                  onChange={(e) => validateDates(e.target.value,setExamEndDates)}
                  styles={{ width: '280px' }}
                  placeholder="Application End Date"
                  />
                  <CustomButton
                      lable={'Add New Exam'}
                      isDisabled={isValidationError}
                      onClick={(e) => postNewExams()}
                  />
              </div>
             
          </AddItemForm>
      </>
  )
}
