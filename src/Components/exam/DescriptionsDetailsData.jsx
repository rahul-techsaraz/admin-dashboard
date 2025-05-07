import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateEditMode } from '../../features/examSlice'
import '../../assets/css/exam.css'

export default function DescriptionsDetailsData() {
  const { isEdit } = useSelector((state) => state.exam)
  const dispatch = useDispatch()

  return (
    <div className='full-contain'>
      <div className='edit-btn-flex'>
        <button onClick={() => dispatch(updateEditMode({ flag: !isEdit }))} className='edit-btn'>
          Edit
        </button>
      </div>

      <div className='grid-parent'>
        <div className='grid-parent-child'>
          <span className='exam-text'>Exam Description</span>
          <div className='exam-list-p'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at nunc sem. Donec eu consequat turpis. Aenean porta in ligula
            venenatis congue. Duis eget cursus lacus Morbi posuere
          </div>
        </div>
        <div className='grid-parent-child'>
          <span className='exam-text'>Exam Description</span>
          <div className='exam-list-p'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at nunc sem. Donec eu consequat turpis. Aenean porta in ligula
            venenatis congue. Duis eget cursus lacus Morbi posuere
          </div>
        </div>
        <div className='grid-parent-child'>
          <span className='exam-text'>Exam Description</span>
          <div className='exam-list-p'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at nunc sem. Donec eu consequat turpis. Aenean porta in ligula
            venenatis congue. Duis eget cursus lacus Morbi posuere
          </div>
        </div>
        <div className='grid-parent-child'>
          <span className='exam-text'>Exam Description</span>
          <div className='exam-list-p'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at nunc sem. Donec eu consequat turpis. Aenean porta in ligula
            venenatis congue. Duis eget cursus lacus Morbi posuere
          </div>
        </div>
        <div className='grid-parent-child'>
          <span className='exam-text'>Exam Description</span>
          <div className='exam-list-p'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at nunc sem. Donec eu consequat turpis. Aenean porta in ligula
            venenatis congue. Duis eget cursus lacus Morbi posuere
          </div>
        </div>
      </div>
      <div className='model-grid-parent'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget lorem vestibulum, volutpat lacus id, elementum sapien. Fusce
        varius lectus at lacus accumsan, non blandit urna fermentum. Praesent iaculis feugiat nisl, in commodo mauris. Pellentesque blandit
        dignissim lacus, in posuere sapien
      </div>
    </div>
  )
}

// model card
