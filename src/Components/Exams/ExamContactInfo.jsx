import React from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { Box, Grid, TextField, Typography } from '@mui/material'
import { EXAM_FIELDS } from '../../Constants/redux/courseFieldName'
import { setExamContactInfo } from '../../features/newExamSlice'

const ExamContactInfo = ({ isEdit = false }) => {
  const dispatch = useDispatch()

  const examContactInfo = useSelector((state) => state?.newExam?.examContactInfo ?? {}, shallowEqual)

  const getSafeValue = (field) => {
    return examContactInfo?.[field] ?? ''
  }

  const handleChange = (field) => (e) => {
    dispatch(setExamContactInfo({ field, value: e.target.value }))
  }

  return (
    <Box sx={{ marginTop: '1rem' }}>
      <Typography variant='h6' sx={{ fontSize: '1.1rem', fontWeight: 600, color: '#2C3E50', mb: 1 }}>
        Contact Info
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} className='gridItem'>
          <TextField
            label='Exam Conducted By'
            variant='outlined'
            fullWidth
            value={getSafeValue(EXAM_FIELDS.EXAM_CONDUCTED_BY)}
            onChange={handleChange(EXAM_FIELDS.EXAM_CONDUCTED_BY)}
            className='inputField'
            disabled={isEdit}
          />
        </Grid>
        <Grid item xs={12} sm={6} className='gridItem'>
          <TextField
            label='Exam Website'
            variant='outlined'
            fullWidth
            value={getSafeValue(EXAM_FIELDS.EXAM_WEBSITE)}
            onChange={handleChange(EXAM_FIELDS.EXAM_WEBSITE)}
            className='inputField'
            disabled={isEdit}
          />
        </Grid>

        <Grid item xs={12} sm={6} className='gridItem'>
          <TextField
            label='Exam Support Contact'
            variant='outlined'
            fullWidth
            value={getSafeValue(EXAM_FIELDS.EXAM_SUPPORT_CONTACTS)}
            onChange={handleChange(EXAM_FIELDS.EXAM_SUPPORT_CONTACTS)}
            className='inputField'
            disabled={isEdit}
          />
        </Grid>

        <Grid item xs={12} sm={6} className='gridItem'>
          <TextField
            label='Exam Full Address'
            variant='outlined'
            fullWidth
            value={getSafeValue(EXAM_FIELDS.EXAM_CONDUCTING_ADDRESS)}
            onChange={handleChange(EXAM_FIELDS.EXAM_CONDUCTING_ADDRESS)}
            className='inputField'
            disabled={isEdit}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default ExamContactInfo
