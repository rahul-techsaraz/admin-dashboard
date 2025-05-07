import React, { useCallback, useEffect, useState } from 'react'
import InputFieldText from '../../utils/CommonComponents/InputFieldText'
import AddItemForm from '../AddItemForm'
import { useDispatch, useSelector } from 'react-redux'
import SelectBox from '../../utils/CommonComponents/SelectBox'
import { handleExamConfigValidation, toggelExamInfoEdit, updateExamConfig } from '../../features/examSlice'
import { constants } from '../../utils/constants'
import ExamInfoData from './ExamInfoData'
import { useParams } from 'react-router-dom'
import CustomButton from '../../utils/CommonComponents/CustomButton'
import { addExamConfig, fetchExamConfigById } from '../../utils/reduxThunk/examThunk'
import { updateError } from '../../features/commonSlice'

export default function ExamOtherSetting() {
  const [isDisplay, setIsDisplay] = useState('none')
  const dispatch = useDispatch()
  const { examId } = useParams()
  const { examConfigInputFieldList } = constants
  const { examConfig, isEdit } = useSelector((state) => state.exam)
  const {
    no_session,
    session_name,
    is_counselling_announced,
    counselling_date,
    exam_conducting_address,
    exam_conducting_email,
    isValidationError
  } = useSelector((state) => state.exam.examConfig)
  const handleChange = (key, value) => {
    if (key === 'counselling_date') {
      validateDates(key, value)
    } else {
      dispatch(updateExamConfig({ key, value }))
    }
  }
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
      dispatch(updateExamConfig({ key, value }))
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
    if ([no_session, session_name, is_counselling_announced, exam_conducting_address, exam_conducting_email].includes('')) {
      dispatch(handleExamConfigValidation({ flag: true }))
    } else {
      dispatch(handleExamConfigValidation({ flag: false }))
    }
    if (is_counselling_announced === 'Yes' && counselling_date === '') {
      dispatch(handleExamConfigValidation({ flag: true }))
    }
  }, [no_session, session_name, is_counselling_announced, counselling_date, exam_conducting_address, exam_conducting_email])
  const examConfigInfo = examConfigInputFieldList.map((config) => {
    return { lable: config.label, value: examConfig[config.keyName] }
  })
  const handleUpdateExamConfig = async () => {
    try {
      const examConfigPayload = await {
        exam_id: examId,
        no_of_session: examConfig.no_session,
        session_name: examConfig.session_name,
        is_counselling_announced: examConfig.is_counselling_announced,
        counselling_dates: examConfig.counselling_date,
        exam_conducting_address: examConfig.exam_conducting_address,
        exam_conducting_email: examConfig.exam_conducting_email
      }
      const examConfigResponse = dispatch(
        addExamConfig({
          url: constants.apiEndPoint.EXAM_LIST + '?requestType=examImpDetails',
          header: constants.apiHeaders.HEADER,
          method: constants.httpMethod.PUT,
          payload: examConfigPayload
        })
      )
      if (examConfigResponse.payload.status === constants.apiResponseStatus.SUCCESS) {
        dispatch(
          updateError({
            errorType: constants.apiResponseStatus.SUCCESS,
            errorMessage: 'Your exam description has been updated successfully!',
            flag: true
          })
        )
        await dispatch(
          fetchExamConfigById({
            url: constants.apiEndPoint.EXAM_LIST + '?requestType=examImpDetails&exam_id=' + examId,
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
    console.log(examConfig.is_counselling_announced)
    if (examConfig.is_counselling_announced === 'yes') {
      setIsDisplay('')
    } else {
      setIsDisplay('none')
    }
  }, [examConfig.is_counselling_announced])
  return (
    <>
      {!isEdit && examId ? (
        <ExamInfoData examInfoData={examConfigInfo} />
      ) : (
        <div style={{ gap: '20px', display: 'flex', margin: '2.5rem 0px', flexWrap: 'wrap' }}>
          {examConfigInputFieldList.map((config) => {
            return config.type === 'text' || config.type === 'date' ? (
              <InputFieldText
                inputValue={examConfig[config.keyName]}
                onChange={(e) => handleChange(config.keyName, e.target.value)}
                inputType={config.type}
                styles={{ width: '280px' }}
                placeholder={config.label}
                display={config.type === 'date' && examConfig.is_counselling_announced !== 'Yes' ? 'none' : ''}
              />
            ) : (
              <SelectBox
                label={config.label}
                options={config?.options}
                inputValue={examConfig[config.keyName]}
                onChange={(e) => handleChange(config.keyName, e.target.value)}
                styles={{ width: '280px', height: '38px' }}
              />
            )
          })}

          {isEdit && examId && (
            <div style={{ display: 'flex', margin: 'auto' }}>
              <CustomButton isDisabled={isValidationError} lable={'Update'} onClick={() => handleUpdateExamConfig()} />
              <CustomButton isDisabled={isValidationError} lable={'Cancel'} onClick={() => dispatch(toggelExamInfoEdit())} />
            </div>
          )}
        </div>
      )}
    </>
  )
}
