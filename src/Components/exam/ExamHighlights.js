import React, { useEffect } from 'react'
import AddItemForm from '../AddItemForm'
import InputFieldText from '../../utils/CommonComponents/InputFieldText'
import { handleExamHighlightsValidation, toggelExamInfoEdit, updateExamHighlights } from '../../features/examSlice'
import { useDispatch, useSelector } from 'react-redux'
import { constants } from '../../utils/constants'
import { useParams } from 'react-router-dom'
import ExamInfoData from './ExamInfoData'
import CustomButton from '../../utils/CommonComponents/CustomButton'
import { addExamHighlights, fetchExamHighlightsById } from '../../utils/reduxThunk/examThunk'
import { updateError } from '../../features/commonSlice'

export default function ExamHighlights() {
  const dispatch = useDispatch()
  const { examHighlightsInputFieldList } = constants
  const { examHighlights, isEdit } = useSelector((state) => state.exam)
  const { examId } = useParams()
  const { conducting_body, exam_level, exam_frequency, exam_mode, exam_duration, paper_marks, marking_scheme, isValidationError } =
    useSelector((state) => state.exam.examHighlights)

  useEffect(() => {
    if ([conducting_body, exam_level, exam_frequency, exam_mode, exam_duration, paper_marks, marking_scheme].includes('')) {
      dispatch(handleExamHighlightsValidation({ flag: true }))
    } else {
      dispatch(handleExamHighlightsValidation({ flag: false }))
    }
  }, [conducting_body, exam_level, exam_frequency, exam_mode, exam_duration, paper_marks, marking_scheme])
  const examHighlightInfo = examHighlightsInputFieldList.map((highlights) => {
    return { lable: highlights.label, value: examHighlights[highlights.keyName] }
  })
  const handleUpdateExamHighlights = async () => {
    try {
      const examHighlightsPayload = await {
        exam_id: examId,
        conducting_body: examHighlights.conducting_body,
        exam_level: examHighlights.exam_level,
        exam_frequency: examHighlights.exam_frequency,
        model_of_exam: examHighlights.exam_mode,
        exam_duration: examHighlights.exam_duration,
        paper_marks: examHighlights.paper_marks,
        marking_scheme: examHighlights.marking_scheme
      }
      const examHighlightsResponse = dispatch(
        addExamHighlights({
          url: constants.apiEndPoint.EXAM_LIST + '?requestType=examHighlightsDetails',
          header: constants.apiHeaders.HEADER,
          method: constants.httpMethod.PUT,
          payload: examHighlightsPayload
        })
      )
      if (examHighlightsResponse.payload.status === constants.apiResponseStatus.SUCCESS) {
        dispatch(
          updateError({
            errorType: constants.apiResponseStatus.SUCCESS,
            errorMessage: 'Your exam description has been updated successfully!',
            flag: true
          })
        )
        await dispatch(
          fetchExamHighlightsById({
            url: constants.apiEndPoint.EXAM_LIST + '?requestType=examHighlightsDetails&exam_id=' + examId,
            header: constants.apiHeaders.HEADER,
            method: constants.httpMethod.GET
          })
        )
      } else {
        dispatch(
          updateError({
            errorType: constants.apiResponseStatus.ERROR,
            errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
            flag: true
          })
        )
      }
    } catch (err) {
      dispatch(
        updateError({
          errorType: constants.apiResponseStatus.ERROR,
          errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
          flag: true
        })
      )
    }
  }

  return (
    <>
      {!isEdit && examId ? (
        <ExamInfoData examInfoData={examHighlightInfo} />
      ) : (
        <div style={{ gap: '20px', display: 'flex', margin: '2.5rem 0px', flexWrap: 'wrap' }}>
          {examHighlightsInputFieldList.map((highlights) => (
            <InputFieldText
              inputType='text'
              inputValue={examHighlights[highlights.keyName]}
              styles={{ width: '280px' }}
              placeholder={highlights.label}
              onChange={(e) => dispatch(updateExamHighlights({ key: highlights.keyName, value: e.target.value }))}
            />
          ))}
          {isEdit && examId && (
            <div style={{ display: 'flex', margin: 'auto' }}>
              <CustomButton isDisabled={isValidationError} lable={'Update'} onClick={() => handleUpdateExamHighlights()} />
              <CustomButton isDisabled={isValidationError} lable={'Cancel'} onClick={() => dispatch(toggelExamInfoEdit())} />
            </div>
          )}
        </div>
      )}
    </>
  )
}
