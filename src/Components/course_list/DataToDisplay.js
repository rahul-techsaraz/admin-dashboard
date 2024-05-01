import React, { useEffect } from 'react'
import { updateCourseInfo } from '../../features/courseSlice'
import { useDispatch } from 'react-redux'

export default function DataToDisplay({dataToDisplay}) {
    const dispatch = useDispatch()
    
  return (
    <>
        {/* <div>Data to display</div> */}
        <div className='full-contain'>
            <div className='edit-btn-flex'>
                <button onClick={() => dispatch(updateCourseInfo({classKey : 'isEdit', value : true}))} className='edit-btn'>Edit</button>    
            </div>
            <div className='grid-parent'>
                {dataToDisplay.map(data => (
                    !Array.isArray(data) ? 
                        <div className='grid-parent-child' key={data.lable}>  
                            <span className='exam-text'>{data.lable}</span>
                            <div className='exam-list-p'>{data.value}</div> 
                        </div> 
                        : 
                        <div className='grid-parent-child' key={data.lable}>
                            {data.map(childArrayData=>(
                                <div>
                                <span className='exam-text'>{childArrayData.lable}</span>
                                <div className='exam-list-p'>{childArrayData.value}</div>
                                </div>
                            ))}
                        </div>
                        
                ))}
            </div>
        </div>
    </>
  )
}
