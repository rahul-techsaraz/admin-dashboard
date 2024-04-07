import AddItemForm from '../AddItemForm'
import { useDispatch, useSelector } from 'react-redux'
import { fetchExamDescriptionById, updateExamDescription } from '../../features/examSlice'
import { useCallback, useEffect, useReducer } from 'react'
import { constants } from '../../utils/constants'
import { useParams } from 'react-router-dom'
import ExamDescriptionForm from './ExamDescriptionForm'
import DescriptionsDetailsData from './DescriptionsDetailsData'


export default function ExamDescriptions() {
  return (
      <>
                   <ExamDescriptionForm />
      </>
  )
}
