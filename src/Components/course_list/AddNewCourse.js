import React from 'react'
import AddItemForm from '../AddItemForm'
import AddCourse from './AddCourse'

export default function AddNewCourse() {
  return (
    <>
    <AddItemForm label={'Add New Course'}>
    <AddCourse/>
    </AddItemForm>
    </>
  )
}
