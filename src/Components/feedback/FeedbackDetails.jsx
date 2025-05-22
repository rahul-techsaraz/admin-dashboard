import React, { useEffect } from 'react'
import { useFetchAllUserFeedback } from '../../hooks/useFetchAllUserFeedback'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AddItemForm from '../AddItemForm'

const FeedbackDetails = () => {
  const { email } = useParams()
  const { feedback } = useSelector((state) => state.feedback)
  const { fetchFeedbackBymail } = useFetchAllUserFeedback()

  useEffect(() => {
    fetchFeedbackBymail(email)
  }, [])
  useEffect(() => {
    console.log(feedback)
  }, [feedback])
  return (
    <AddItemForm label={'Feedback Details'}>
      {/* <DataToDisplay dataToDisplay={feedback.length > 0 ? feedbackData() : []} admin={'admin'} /> */}
      <div>Feedback Details</div>
      <div></div>
    </AddItemForm>
  )
}

export default FeedbackDetails
