import React from 'react'

export default function CustomCard({label, inputValue}) {
  return (
    <>
        <div className='grid-parent-child'>  
            <span className='exam-text'>{label}</span>
            <div className='exam-list-p'>{inputValue}</div> 
        </div>
    </>
  )
}
