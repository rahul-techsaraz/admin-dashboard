import React from 'react'
import AddItemForm from '../AddItemForm'
import InputFieldText from '../../utils/CommonComponents/InputFieldText'
import CustomButton from '../../utils/CommonComponents/CustomButton'
import { updateExamTab } from '../../features/examSlice'
import { useDispatch } from 'react-redux'

export default function ExamHighlights() {
    const dispatch = useDispatch()
  return (
      <>
           <AddItemForm label={"Add New Exam"}>
              <div style={{gap:"20px",display:'flex',margin:"2.5rem 0px",flexWrap:"wrap"}}>
                   <InputFieldText
                  inputType="text"
                  onChange={(e) =>console.log(e.target.value)}
                  styles={{ width: '280px' }}
                  placeholder="Conducting Body"
                  />
                   <InputFieldText
                  inputType="text"
                  onChange={(e) =>console.log(e.target.value)}
                  styles={{ width: '280px' }}
                  placeholder="Exam Level"
                  />
                    <InputFieldText
                  inputType="text"
                  onChange={(e) =>console.log(e.target.value)}
                  styles={{ width: '280px' }}
                  placeholder="Exam Frequency"
                  />
                  <InputFieldText
                  inputType="text"
                  onChange={(e) =>console.log(e.target.value)}
                  styles={{ width: '280px' }}
                  placeholder="Model of Exam"
                  />
                                    <InputFieldText
                  inputType="text"
                  onChange={(e) =>console.log(e.target.value)}
                  styles={{ width: '280px' }}
                  placeholder="Exam Duration"
                  />
                  <InputFieldText
                  inputType="text"
                  onChange={(e) =>console.log(e.target.value)}
                  styles={{ width: '480px' }}
                  placeholder="Number of Papers and Total Marks"
                  />
                  <InputFieldText
                  inputType="text"
                  onChange={(e) =>console.log(e.target.value)}
                  styles={{ width: '280px' }}
                  placeholder="Marking Scheme"
                  />
                  <CustomButton
                      lable={"Prev"}
                      isDisabled={false}
                     onClick={() => dispatch(updateExamTab({data:"description"}))} />
                   <CustomButton
                      lable={"Save"}
                      isDisabled={true}
                      onClick={() => { }} />
                   <CustomButton
                      lable={"Next"}
                      isDisabled={false}
                      onClick={() => dispatch(updateExamTab({data:"others"}))} />
             
                  
              </div>
             
          </AddItemForm>
      </>
  )
}
