import React from 'react'
import PropTypes from 'prop-types'
import CourseDescriptionEditor from '../CourseDescriptionEditor'
import { Box, Typography } from '@mui/material'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { EXAM_FIELDS } from '../../Constants/redux/courseFieldName'
import { setExamSyllabusAndMarks } from '../../features/newExamSlice'

const ExamSyllabus = ({ isEdit = false }) => {
  const dispatch = useDispatch()
  const examSyllabusAndMarks = useSelector((state) => state?.newExam?.examSyllabusAndMarks || {}, shallowEqual)

  const handleEditorChange = (field) => (value) => {
    dispatch(setExamSyllabusAndMarks({ field, value }))
  }

  const renderEditorOrView = (label, fieldKey) => {
    const content = examSyllabusAndMarks[fieldKey] || ''
    return (
      <Box sx={{ marginTop: '1rem' }}>
        <Typography variant='h6' sx={{ fontSize: '1.1rem', fontWeight: 600, color: '#2C3E50', mb: 1 }}>
          {label}
        </Typography>
        {isEdit ? (
          <Typography
            component='div'
            sx={{ fontSize: '1.1rem', fontWeight: 500, color: '#2C3E50', mb: 1 }}
            dangerouslySetInnerHTML={{ __html: content || '<p>—</p>' }}
          />
        ) : (
          <CourseDescriptionEditor value={content} onChange={handleEditorChange(fieldKey)} />
        )}
      </Box>
    )
  }

  return (
    <>
      {renderEditorOrView('Exam Syllabus', EXAM_FIELDS.EXAM_SYLLABUS)}
      {renderEditorOrView('Papers & Marks', EXAM_FIELDS.EXAM_PAPERS_AND_MARKS)}
      {renderEditorOrView('Paper Structure & Marks Allocation', EXAM_FIELDS.EXAM_MARKING_SCHEME)}
    </>
  )
}

ExamSyllabus.propTypes = {
  isEdit: PropTypes.bool
}

export default ExamSyllabus
