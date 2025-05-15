import React from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { Box, Typography } from '@mui/material'
import CourseDescriptionEditor from '../CourseDescriptionEditor'
import { setExamDescriptions } from '../../features/newExamSlice'
import { EXAM_FIELDS } from '../../Constants/redux/courseFieldName'

const descriptionSections = [
  { label: 'Exam Overview', field: EXAM_FIELDS.EXAM_DESCRIPTION.EXAM_OVERVIEW },
  { label: 'Exam Important Notes', field: EXAM_FIELDS.EXAM_DESCRIPTION.EXAM_IMPORTANT_NOTES },
  { label: 'Exam Important Dates', field: EXAM_FIELDS.EXAM_DESCRIPTION.EXAM_IMPORTANT_DATES },
  { label: 'Exam Application Form', field: EXAM_FIELDS.EXAM_DESCRIPTION.EXAM_APPLICATION_FORM },
  { label: 'Exam Admit Card', field: EXAM_FIELDS.EXAM_DESCRIPTION.EXAM_ADMIT_CARD },
  { label: 'Exam Pattern', field: EXAM_FIELDS.EXAM_DESCRIPTION.EXAM_PATTERN },
  { label: 'Exam Conducting Body', field: EXAM_FIELDS.EXAM_DESCRIPTION.EXAM_CONDUCTING_BODY },
  { label: 'Exam Counselling', field: EXAM_FIELDS.EXAM_DESCRIPTION.EXAM_COUNSELLING },
  { label: 'Application Form Step1', field: EXAM_FIELDS.EXAM_DESCRIPTION.EXAM_APPLICATION_FORM_STEP1 },
  { label: 'Application Form Step2', field: EXAM_FIELDS.EXAM_DESCRIPTION.EXAM_APPLICATION_FORM_STEP2 },
  { label: 'Application Form Step3', field: EXAM_FIELDS.EXAM_DESCRIPTION.EXAM_APPLICATION_FORM_STEP3 },
  { label: 'Exam Intimation Slip', field: EXAM_FIELDS.EXAM_DESCRIPTION.EXAM_INTIMATION_SLIP },
  { label: 'Exam Session', field: EXAM_FIELDS.EXAM_DESCRIPTION.EXAM_SESSION },
  { label: 'Exam Center', field: EXAM_FIELDS.EXAM_DESCRIPTION.EXAM_CENTER },
  { label: 'Exam Syllabus', field: EXAM_FIELDS.EXAM_DESCRIPTION.EXAM_SYLLABUS }
]

const ExamDescriptions = ({ isEdit = false }) => {
  const dispatch = useDispatch()

  const examDescriptions = useSelector((state) => state?.newExam?.examDescriptions ?? {}, shallowEqual)

  const getSafeHtml = (field) => {
    const value = examDescriptions?.[field]
    return value && typeof value === 'string' && value.trim() !== '' ? value : '<p>—</p>'
  }

  const getSafeValue = (field) => {
    const value = examDescriptions?.[field]
    return value && typeof value === 'string' ? value : ''
  }

  const handleEditorChange = (field) => (value) => {
    dispatch(setExamDescriptions({ field, value }))
  }

  return (
    <>
      {descriptionSections.map(({ label, field }) => (
        <Box key={label} sx={{ marginTop: '1rem' }}>
          <Typography
            variant='h6'
            sx={{
              fontSize: '1.1rem',
              fontWeight: 600,
              color: '#2C3E50',
              mb: 1
            }}
          >
            {label}
          </Typography>

          {!isEdit ? (
            <CourseDescriptionEditor value={getSafeValue(field)} onChange={handleEditorChange(field)} />
          ) : (
            <Typography
              component='div'
              sx={{
                fontSize: '1.1rem',
                fontWeight: 500,
                color: '#2C3E50',
                mb: 1
              }}
              dangerouslySetInnerHTML={{
                __html: getSafeHtml(field)
              }}
            />
          )}
        </Box>
      ))}
    </>
  )
}

export default ExamDescriptions
