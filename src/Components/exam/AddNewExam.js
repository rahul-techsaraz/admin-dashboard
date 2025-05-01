import React, { useCallback, useEffect, useState } from 'react'
import InputFieldText from '../../utils/CommonComponents/InputFieldText'
import SelectBox from '../../utils/CommonComponents/SelectBox'
import { constants } from '../../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { handleExamInfoValidation, toggelExamInfoEdit, updateExamInfo } from '../../features/examSlice'
import { useParams } from 'react-router-dom'
import ExamInfoData from './ExamInfoData'
import { addNewExam, fetchExamInfoById } from '../../utils/reduxThunk/examThunk'
import CustomButton from '../../utils/CommonComponents/CustomButton'
import { updateError } from '../../features/commonSlice'
import SearchSelectBox from '../../utils/CommonComponents/SearchSelectBox'
import { useFetchCategoryList } from '../../hooks/useFetchCategoryList'

export default function AddNewExam() {
  const [componentCategory, setComponentCategory] = useState('')
  const { fetchCategoryList } = useFetchCategoryList()
  const dispatch = useDispatch()
  const { examInfoSelectBox } = constants
  const { examId } = useParams()
  const { categoryData } = useSelector((state) => state.category)
  const { examName, applicationStartDates, applicationEndDates, examStartDates, examEndDates, examYear, isValidationError, category_name } =
    useSelector((state) => state.exam.examInfo)
  const { isEdit } = useSelector((state) => state.exam)

  const generateTodayDate = useCallback(() => {
    let date = new Date()
    // Get year, month, and day part from the date
    let year = date.toLocaleString('default', { year: 'numeric' })
    let month = date.toLocaleString('default', { month: '2-digit' })
    let day = date.toLocaleString('default', { day: '2-digit' })

    // Generate yyyy-mm-dd date string
    let formattedDate = year + '-' + month + '-' + day
    return formattedDate
  }, [])
  const validateDates = (key, value) => {
    if (value >= generateTodayDate()) {
      dispatch(updateExamInfo({ key, value }))
    } else {
      // alert('its invalid dates')
      dispatch(
        updateError({
          errorType: constants.apiResponseStatus.WARNING,
          errorMessage: 'Please Select valid date',
          flag: true
        })
      )
    }
  }
  useEffect(() => {
    if (!examName || !applicationStartDates || !applicationEndDates || !examStartDates || !examEndDates || !examYear || !category_name) {
      dispatch(handleExamInfoValidation({ flag: true }))
    } else {
      dispatch(handleExamInfoValidation({ flag: false }))
    }
  }, [examName, applicationStartDates, applicationEndDates, examStartDates, examEndDates, examYear, category_name])

  const examInfoData = [
    { lable: 'Exam Name', value: examName },
    { lable: 'Exam Application Start Date', value: applicationStartDates },
    { lable: 'Exam Application End Date', value: applicationEndDates },
    { lable: 'Exam Start Date', value: examStartDates },
    { lable: 'Exam Start Date', value: examEndDates },
    { lable: 'Exam Year', value: examYear }
  ]
  const handleUpdateExamInfo = async () => {
    try {
      const examInfoPayload = await {
        exam_id: examId,
        exam_name: examName,
        exam_year: examYear,
        application_start_date: applicationStartDates,
        application_end_date: applicationEndDates,
        exam_start_date: examStartDates,
        exam_end_date: examEndDates,
        category_name: category_name
      }
      const examInfoResponse = await dispatch(
        addNewExam({
          url: constants.apiEndPoint.EXAM_LIST + '?requestType=basicExamDetails',
          header: constants.apiHeaders.HEADER,
          method: constants.httpMethod.PUT,
          payload: examInfoPayload
        })
      )
      if (examInfoResponse.payload.status === constants.apiResponseStatus.SUCCESS) {
        dispatch(
          updateError({
            errorType: constants.apiResponseStatus.SUCCESS,
            errorMessage: 'Your exam info has been updated successfully!',
            flag: true
          })
        )

        await dispatch(
          fetchExamInfoById({
            url: constants.apiEndPoint.EXAM_LIST + '?requestType=basicExamDetails&exam_id=' + examId,
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
  useEffect(() => {
    fetchCategoryList()
  }, [])
  return (
    <>
      {!isEdit && examId ? (
        <ExamInfoData examInfoData={examInfoData} />
      ) : (
        <div style={{ gap: '20px', display: 'flex', margin: '2.5rem 0px', flexWrap: 'wrap' }}>
          <InputFieldText
            inputType='text'
            inputValue={examName}
            onChange={(e) => dispatch(updateExamInfo({ key: 'examName', value: e.target.value }))}
            styles={{ width: '280px' }}
            placeholder='Exam Name'
          />
          <SelectBox
            label={'Exam Year'}
            options={examInfoSelectBox}
            onChange={(e) => dispatch(updateExamInfo({ key: 'examYear', value: e.target.value }))}
            styles={{ width: '280px', height: '38px' }}
          />
          <InputFieldText
            inputType='date'
            inputValue={applicationStartDates}
            onChange={(e) => validateDates('applicationStartDates', e.target.value)}
            styles={{ width: '280px' }}
            placeholder='Application Start Date'
          />
          <InputFieldText
            inputType='date'
            inputValue={applicationEndDates}
            onChange={(e) => validateDates('applicationEndDates', e.target.value)}
            styles={{ width: '280px' }}
            placeholder='Application End Date'
          />
          <InputFieldText
            inputType='date'
            inputValue={examStartDates}
            onChange={(e) => validateDates('examStartDates', e.target.value)}
            styles={{ width: '280px' }}
            placeholder='Exam Start Date'
          />
          <InputFieldText
            inputType='date'
            inputValue={examEndDates}
            onChange={(e) => validateDates('examEndDates', e.target.value)}
            styles={{ width: '280px' }}
            placeholder='Exam End Date'
          />
          <SearchSelectBox
            label='Category'
            options={categoryData.map((data) => data.category_name)}
            onChange={(e, value) => dispatch(updateExamInfo({ key: 'category_name', value: value }))}
            value={category_name}
            onInputChange={(e, value) => setComponentCategory(value)}
            inputValue={componentCategory ? componentCategory : category_name}
          />
        </div>
      )}
      {isEdit && examId && (
        <div style={{ display: 'flex', margin: 'auto' }}>
          <CustomButton isDisabled={isValidationError} lable={'Update'} onClick={() => handleUpdateExamInfo()} />
          <CustomButton isDisabled={isValidationError} lable={'Cancel'} onClick={() => dispatch(toggelExamInfoEdit())} />
        </div>
      )}
      <div></div>
    </>
  )
}
