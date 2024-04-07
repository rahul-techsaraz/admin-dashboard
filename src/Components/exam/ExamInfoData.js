import React from 'react'
import { toggelExamInfoEdit } from '../../features/examSlice'
import { useDispatch } from 'react-redux'

export default function ExamInfoData({ examInfoData }) {
    const dispatch = useDispatch()
  return (
   
      <div className='full-contain'>
       
                  
                      <div className='edit-btn-flex'>
                  <button onClick={() => dispatch(toggelExamInfoEdit())} className='edit-btn'>Edit</button>    
          </div>
      <div className='grid-parent'>
          
          {examInfoData.map(data => (
                      <div className='grid-parent-child' key={data.lable}>  
                  <span className='exam-text'>{data.lable}</span>
                  <div className='exam-list-p'>{data.value}</div> 
              </div>
))}
              </div>
                    
              {/* <div className='model-grid-parent'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget lorem vestibulum, volutpat lacus id, elementum sapien. Fusce varius lectus at lacus accumsan, non blandit urna fermentum. Praesent iaculis feugiat nisl, in commodo mauris. Pellentesque blandit dignissim lacus, in posuere sapien
              </div> */}
              </div>
  )
}
