import React from 'react'
import InputFieldText from '../../utils/CommonComponents/InputFieldText'
import CustomButton from '../../utils/CommonComponents/CustomButton'
import { updateExamTab } from '../../features/examSlice'
import AddItemForm from '../AddItemForm'
import { useDispatch } from 'react-redux'
import SelectBox from '../../utils/CommonComponents/SelectBox'

export default function ExamOtherSetting() {
    const dispatch = useDispatch();
   
  return (
   <AddItemForm label={"Add New Exam"}>
              <div style={{gap:"20px",display:'flex',margin:"2.5rem 0px",flexWrap:"wrap"}}>
                   <InputFieldText
                  inputType="text"
                  onChange={(e) =>console.log(e.target.value)}
                  styles={{ width: '280px' }}
                  placeholder="No Of Session"
                  />
                   <InputFieldText
                  inputType="text"
                  onChange={(e) =>console.log(e.target.value)}
                  styles={{ width: '380px' }}
                  placeholder="Session Name"
                  />
                    <SelectBox
                  options={[{label:"Counselling Announced",value:""},{label:"Yes",value:"Yes"},{label:"No",value:"No"}]}
                  onChange={() => { }}
                  styles={{ width: '280px',height:"38px" }}
                  />
                  <InputFieldText
                  inputType="date"
                  onChange={(e) =>console.log(e.target.value)}
                  styles={{ width: '280px' }}
                  placeholder="counselling_dates"
                  />
                                    <InputFieldText
                  inputType="text"
                  onChange={(e) =>console.log(e.target.value)}
                  styles={{ width: '480px' }}
                  placeholder="Exam Conducting Address"
                  />
                  <InputFieldText
                  inputType="text"
                  onChange={(e) =>console.log(e.target.value)}
                  styles={{ width: '280px' }}
                  placeholder="Exam Conducting Email"
                  />
                 
                  <CustomButton
                      lable={"Prev"}
                      isDisabled={false}
                     onClick={() => dispatch(updateExamTab({data:"highlights"}))} />
                   <CustomButton
                      lable={"Save"}
                      isDisabled={true}
                      onClick={() => { }} />
                   
             
                  
              </div>
             
          </AddItemForm>
  )
}
