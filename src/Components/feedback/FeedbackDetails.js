import React, { useEffect } from 'react'
import { useFetchAllUserFeedback } from '../../hooks/useFetchAllUserFeedback'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import DataToDisplay from '../course_list/DataToDisplay'
import AddItemForm from '../AddItemForm'

const FeedbackDetails = () => {
  const { email } = useParams()
  const { feedback } = useSelector((state) => state.feedback)
  const { fetchFeedbackBymail } = useFetchAllUserFeedback()
  const feedbackData = () => {
    return [
      { lable: 'User Name', value: feedback[0].user_name },
      { lable: 'Email', value: feedback[0].email },
      { lable: 'Phone', value: feedback[0].phone_number },
      { lable: 'Feedback', value: feedback[0].feedback }
    ]
  }
  useEffect(() => {
    fetchFeedbackBymail(email)
  }, [])
  useEffect(() => {
    console.log(feedback)
  }, [feedback])
  return (
    <AddItemForm label={'Feedback Details'}>
      <DataToDisplay dataToDisplay={feedback.length > 0 ? feedbackData() : []} admin={'admin'} />
    </AddItemForm>
  )
}

export default FeedbackDetails
