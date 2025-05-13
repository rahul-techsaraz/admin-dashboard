import React from 'react'
import dayjs from 'dayjs'
import { Box, Grid, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { setExamImportantDates } from '../../features/newExamSlice'
import { EXAM_FIELDS } from '../../Constants/redux/courseFieldName'

const dateFields = [
  { label: 'Application Start Date', field: EXAM_FIELDS.EXAM_APPLICATION_START_DATE },
  { label: 'Application End Date', field: EXAM_FIELDS.EXAM_APPLICATION_END_DATE },
  { label: 'Admit Card Release Date', field: EXAM_FIELDS.EXAM_ADMIT_CARD_RELEASE_DATE },
  { label: 'Exam Start Date', field: EXAM_FIELDS.EXAM_START_DATE },
  { label: 'Exam End Date', field: EXAM_FIELDS.EXAM_END_DATE },
  { label: 'Result Declaration Date', field: EXAM_FIELDS.EXAM_RESULT_DECLARATION_DATE },
  { label: 'Counselling Date', field: EXAM_FIELDS.EXAM_COUNSELLING_DATE }
]

const ExamImportantDate = ({ isEdit = false }) => {
  const dispatch = useDispatch()
  const examImportantDates = useSelector((state) => state?.newExam?.examImportantDates ?? {}, shallowEqual)

  const handleDateChange = (field) => (newValue) => {
    const formattedDate = newValue ? dayjs(newValue).format('DD/MM/YYYY') : ''
    dispatch(setExamImportantDates({ field, value: formattedDate }))
  }

  const renderDatePicker = ({ label, field }) => (
    <Grid item xs={12} sm={6} md={4} key={field}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={label}
          value={examImportantDates?.[field] ? dayjs(examImportantDates[field], 'DD/MM/YYYY') : null}
          onChange={handleDateChange(field)}
          slotProps={{
            textField: { fullWidth: true, size: 'small' }
          }}
        />
      </LocalizationProvider>
    </Grid>
  )

  const renderDateText = ({ label, field }) => (
    <Grid item xs={12} sm={6} md={4} key={field}>
      <Typography variant='body2' sx={{ fontWeight: 500, color: '#2C3E50' }}>
        {label}:
      </Typography>
      <Typography variant='body1' sx={{ mb: 1 }}>
        {examImportantDates?.[field] ? dayjs(examImportantDates[field], 'DD/MM/YYYY').format('MMM DD, YYYY') : '—'}
      </Typography>
    </Grid>
  )

  return (
    <Box className='container'>
      <Grid container spacing={3}>
        {dateFields.map(isEdit ? renderDateText : renderDatePicker)}
      </Grid>
    </Box>
  )
}

export default ExamImportantDate
