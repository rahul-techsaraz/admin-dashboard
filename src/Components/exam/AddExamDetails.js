import React, { useState } from 'react'
import ExamDescriptions from './ExamDescriptions'
import { useSelector } from 'react-redux'
import ExamHighlights from './ExamHighlights'
import ExamOtherSetting from './ExamOtherSetting'

export default function AddExamDetails() {
    const {activeExamTab} = useSelector(state => state.exam)
  return (
      <>
          {
        {
                  'description': <ExamDescriptions />,
                  'highlights': <ExamHighlights />,
                  'others' : <ExamOtherSetting />
         

        }[activeExamTab]
      }
      </>
  )
}
