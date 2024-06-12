import React, { useEffect } from 'react'
import AddCollege from './AddCollege'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { resetCollege } from '../../features/collegeSlice'
import AddItemForm from '../AddItemForm'

export default function ViewCollegeDetails() {
    const {collegeId} = useParams
    const {collegeBasicDetails, courseOffered, collegeDescriptions, collegeHighlights, common, gallary} = useSelector(state=>state.college)
    const dispatch = useDispatch()

    useEffect(() => {
        return () => dispatch(resetCollege())
    },[])
  return (
    <>
        <AddItemForm label={'Update Course'}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
            <AddCollege collegeId={collegeId}/>
            </div>
        </AddItemForm>
    </>
  )
}
