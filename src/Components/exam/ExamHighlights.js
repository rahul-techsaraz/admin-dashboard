import React, { useEffect } from 'react'
import AddItemForm from '../AddItemForm'
import InputFieldText from '../../utils/CommonComponents/InputFieldText'
import { handleExamHighlightsValidation, updateExamHighlights } from '../../features/examSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function ExamHighlights() {
  const dispatch = useDispatch();
  const {
    conducting_body,
    exam_level,
    exam_frequency,
    exam_mode,
    exam_duration,
    paper_marks,
    marking_scheme
  } = useSelector(state => state.exam.examHighlights);

  useEffect(() => {
    if([conducting_body,
    exam_level,
    exam_frequency,
    exam_mode,
    exam_duration,
    paper_marks,
      marking_scheme].includes('')) {
      dispatch(handleExamHighlightsValidation({flag:true}))
    } else {
      dispatch(handleExamHighlightsValidation({flag:false}))
      
    }

  },[conducting_body,
    exam_level,
    exam_frequency,
    exam_mode,
    exam_duration,
    paper_marks,
    marking_scheme])
  return (
      <>
              <div style={{gap:"20px",display:'flex',margin:"2.5rem 0px",flexWrap:"wrap"}}>
                   <InputFieldText
            inputType="text"
            inputValue={conducting_body}
                  styles={{ width: '280px' }}
            placeholder="Conducting Body"
            onChange={(e) => dispatch(updateExamHighlights({key:'conducting_body',value:e.target.value}))}
                  />
                   <InputFieldText
            inputType="text"
            inputValue={exam_level}
                  styles={{ width: '280px' }}
            placeholder="Exam Level"
             onChange={(e) => dispatch(updateExamHighlights({key:'exam_level',value:e.target.value}))}
                  />
                    <InputFieldText
            inputType="text"
            inputValue={exam_frequency}
            
                  styles={{ width: '280px' }}
            placeholder="Exam Frequency"
             onChange={(e) => dispatch(updateExamHighlights({key:'exam_frequency',value:e.target.value}))}
            
                  />
                  <InputFieldText
            inputType="text"
            inputValue={exam_mode}
            
                  styles={{ width: '280px' }}
            placeholder="Model of Exam"
             onChange={(e) => dispatch(updateExamHighlights({key:'exam_mode',value:e.target.value}))}
            
                  />
                  <InputFieldText
            inputType="text"
            inputValue={exam_duration}
            
                  styles={{ width: '280px' }}
            placeholder="Exam Duration"
             onChange={(e) => dispatch(updateExamHighlights({key:'exam_duration',value:e.target.value}))}
            
                  />
                  <InputFieldText
            inputType="text"
            inputValue={paper_marks}
            
                  styles={{ width: '480px' }}
            placeholder="Number of Papers and Total Marks"
             onChange={(e) => dispatch(updateExamHighlights({key:'paper_marks',value:e.target.value}))}
            
                  />
                  <InputFieldText
            inputType="text"
            inputValue={marking_scheme}
            
                  styles={{ width: '280px' }}
            placeholder="Marking Scheme"
             onChange={(e) => dispatch(updateExamHighlights({key:'marking_scheme',value:e.target.value}))}
            
                  />
                 
             
                  
              </div>
             
      </>
  )
}
