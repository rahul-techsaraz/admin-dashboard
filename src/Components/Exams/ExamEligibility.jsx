import React from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Grid, IconButton, MenuItem, TextField, Typography } from '@mui/material'
import { Add, Delete } from '@mui/icons-material'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import CourseDescriptionEditor from '../CourseDescriptionEditor'
import { EXAM_FIELDS } from '../../Constants/redux/courseFieldName'
import { setExamEligibilityAndFees } from '../../features/newExamSlice'

const categories = ['General', 'OBC', 'SC', 'ST', 'PwD']
const modes = ['Online', 'Offline']

const defaultFeeRow = {
  [EXAM_FIELDS.EXAM_FEE_ROW.CATEGORY]: '',
  [EXAM_FIELDS.EXAM_FEE_ROW.MODE]: '',
  [EXAM_FIELDS.EXAM_FEE_ROW.APPLICATION_FEE]: '',
  [EXAM_FIELDS.EXAM_FEE_ROW.CURRENCY]: '',
  [EXAM_FIELDS.EXAM_FEE_ROW.NOTE]: ''
}

const FeeRow = ({ row, index, onChange, onDelete }) => (
  <Grid container spacing={2} alignItems='center' sx={{ mb: 1 }}>
    <Grid item xs={12} sm={2}>
      <TextField
        select
        fullWidth
        label='Category'
        value={row.category || ''}
        onChange={(e) => onChange(index, EXAM_FIELDS.EXAM_FEE_ROW.CATEGORY, e.target.value)}
      >
        {categories.map((cat) => (
          <MenuItem key={cat} value={cat}>
            {cat}
          </MenuItem>
        ))}
      </TextField>
    </Grid>
    <Grid item xs={12} sm={2}>
      <TextField
        select
        fullWidth
        label='Mode'
        value={row.mode || ''}
        onChange={(e) => onChange(index, EXAM_FIELDS.EXAM_FEE_ROW.MODE, e.target.value)}
      >
        {modes.map((mode) => (
          <MenuItem key={mode} value={mode}>
            {mode}
          </MenuItem>
        ))}
      </TextField>
    </Grid>
    <Grid item xs={12} sm={2}>
      <TextField
        type='number'
        fullWidth
        label='Application Fee'
        value={row.application_fee || ''}
        onChange={(e) => onChange(index, EXAM_FIELDS.EXAM_FEE_ROW.APPLICATION_FEE, e.target.value)}
      />
    </Grid>
    <Grid item xs={12} sm={2}>
      <TextField
        fullWidth
        label='Currency'
        value={row.currency || ''}
        onChange={(e) => onChange(index, EXAM_FIELDS.EXAM_FEE_ROW.CURRENCY, e.target.value)}
      />
    </Grid>
    <Grid item xs={12} sm={3}>
      <TextField
        fullWidth
        label='Note'
        value={row.note || ''}
        onChange={(e) => onChange(index, EXAM_FIELDS.EXAM_FEE_ROW.NOTE, e.target.value)}
      />
    </Grid>
    <Grid item xs={12} sm={1}>
      <IconButton color='error' onClick={() => onDelete(index)}>
        <Delete />
      </IconButton>
    </Grid>
  </Grid>
)

FeeRow.propTypes = {
  row: PropTypes.shape({
    category: PropTypes.string,
    mode: PropTypes.string,
    application_fee: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    currency: PropTypes.string,
    note: PropTypes.string
  }).isRequired,
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

const FeeRowView = ({ row }) => (
  <Box sx={{ mb: 1, border: '1px solid #ccc', p: 2, borderRadius: 1 }}>
    <Typography>
      <strong>Category:</strong> {row.category || '-'}
    </Typography>
    <Typography>
      <strong>Mode:</strong> {row.mode || '-'}
    </Typography>
    <Typography>
      <strong>Application Fee:</strong> {row.application_fee || '-'}
    </Typography>
    <Typography>
      <strong>Currency:</strong> {row.currency || '-'}
    </Typography>
    <Typography>
      <strong>Note:</strong> {row.note || '-'}
    </Typography>
  </Box>
)

FeeRowView.propTypes = {
  row: PropTypes.shape({
    category: PropTypes.string,
    mode: PropTypes.string,
    application_fee: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    currency: PropTypes.string,
    note: PropTypes.string
  }).isRequired
}

const ExamEligibility = ({ isEdit = false }) => {
  const dispatch = useDispatch()
  const examEligibilityAndFees = useSelector((state) => state.newExam?.examEligibilityAndFees || {}, shallowEqual)

  const feeStructure = Array.isArray(examEligibilityAndFees[EXAM_FIELDS.EXAM_FEE_STRUCTURE])
    ? examEligibilityAndFees[EXAM_FIELDS.EXAM_FEE_STRUCTURE]
    : []

  const updateFeeStructure = (updatedFees) => {
    dispatch(
      setExamEligibilityAndFees({
        field: EXAM_FIELDS.EXAM_FEE_STRUCTURE,
        value: updatedFees
      })
    )
  }

  const handleChange = (index, key, value) => {
    const updatedFees = feeStructure.map((item, i) => (i === index ? { ...item, [key]: value } : item))
    updateFeeStructure(updatedFees)
  }

  const handleAddRow = () => {
    updateFeeStructure([...feeStructure, defaultFeeRow])
  }

  const handleDeleteRow = (index) => {
    const updatedFees = feeStructure.filter((_, i) => i !== index)
    updateFeeStructure(updatedFees)
  }

  const handleEditorChange = (field) => (value) => {
    dispatch(setExamEligibilityAndFees({ field, value }))
  }

  const eligibilityContent = examEligibilityAndFees[EXAM_FIELDS.EXAM_ELIGIBILITY_CRITERIA] || ''

  return (
    <>
      <Box>
        <Typography variant='h6' gutterBottom>
          Exam Fee Structure
        </Typography>

        {feeStructure.length > 0 &&
          (isEdit
            ? feeStructure.map((row, index) => <FeeRowView key={index} row={row} />)
            : feeStructure.map((row, index) => (
                <FeeRow key={index} row={row} index={index} onChange={handleChange} onDelete={handleDeleteRow} />
              )))}

        {!isEdit && (
          <Box mt={2}>
            <Button variant='outlined' startIcon={<Add />} onClick={handleAddRow}>
              Add Fee Row
            </Button>
          </Box>
        )}
      </Box>

      <Box sx={{ marginTop: '1rem' }}>
        <Typography variant='h6' sx={{ fontSize: '1.1rem', fontWeight: 600, color: '#2C3E50', mb: 1 }}>
          Eligibility Criteria
        </Typography>

        {!isEdit ? (
          <CourseDescriptionEditor value={eligibilityContent} onChange={handleEditorChange(EXAM_FIELDS.EXAM_ELIGIBILITY_CRITERIA)} />
        ) : (
          <Typography
            component='div'
            sx={{ fontSize: '1.1rem', fontWeight: 500, color: '#2C3E50', mb: 1 }}
            dangerouslySetInnerHTML={{
              __html: eligibilityContent || '<p>—</p>'
            }}
          />
        )}
      </Box>
    </>
  )
}

ExamEligibility.propTypes = {
  isEdit: PropTypes.bool
}

export default ExamEligibility
