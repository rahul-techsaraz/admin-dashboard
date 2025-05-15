import React from 'react'
import PropTypes from 'prop-types'
import { Box, Typography, TextField, Grid, IconButton, Button, Divider, Link as MuiLink } from '@mui/material'
import { Add, Delete } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { setExamPapers } from '../../features/newExamSlice'
import { EXAM_FIELDS } from '../../Constants/redux/courseFieldName'

const PaperRow = ({ item, index, fieldKey, isEdit, onChange, onDelete }) => {
  if (isEdit) {
    return (
      <Grid container spacing={2} key={item.id} sx={{ mb: 1 }}>
        <Grid item xs={12} sm={4}>
          <Typography variant='body2' fontWeight={500}>
            Title:
          </Typography>
          <Typography variant='body1'>{item.title || '—'}</Typography>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Typography variant='body2' fontWeight={500}>
            Year:
          </Typography>
          <Typography variant='body1'>{item.year || '—'}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='body2' fontWeight={500}>
            Link:
          </Typography>
          {item.link ? (
            <MuiLink href={item.link} target='_blank' rel='noopener noreferrer'>
              {item.link}
            </MuiLink>
          ) : (
            <Typography variant='body1'>—</Typography>
          )}
        </Grid>
      </Grid>
    )
  }

  return (
    <Grid container spacing={2} key={item.id} alignItems='center' sx={{ mb: 1 }}>
      <Grid item xs={12} sm={4}>
        <TextField label='Title' fullWidth value={item.title} onChange={(e) => onChange(fieldKey, index, 'title', e.target.value)} />
      </Grid>
      <Grid item xs={12} sm={2}>
        <TextField
          label='Year'
          type='number'
          fullWidth
          value={item.year}
          onChange={(e) => onChange(fieldKey, index, 'year', e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={5}>
        <TextField label='Link' fullWidth value={item.link} onChange={(e) => onChange(fieldKey, index, 'link', e.target.value)} />
      </Grid>
      <Grid item xs={12} sm={1}>
        <IconButton color='error' onClick={() => onDelete(fieldKey, index)}>
          <Delete />
        </IconButton>
      </Grid>
    </Grid>
  )
}

PaperRow.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    link: PropTypes.string
  }).isRequired,
  index: PropTypes.number.isRequired,
  fieldKey: PropTypes.string.isRequired,
  isEdit: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

const PaperSection = ({ title, fieldKey, papers, isEdit, onChange, onAdd, onDelete }) => (
  <Box sx={{ mb: 4 }}>
    <Typography variant='h6' sx={{ mb: 2, fontWeight: 600 }}>
      {title}
    </Typography>
    {papers.map((item, index) => (
      <PaperRow key={item.id} item={item} index={index} fieldKey={fieldKey} isEdit={isEdit} onChange={onChange} onDelete={onDelete} />
    ))}
    {!isEdit && (
      <Button variant='outlined' startIcon={<Add />} onClick={() => onAdd(fieldKey)} sx={{ mt: 1 }}>
        Add Paper
      </Button>
    )}
  </Box>
)

PaperSection.propTypes = {
  title: PropTypes.string.isRequired,
  fieldKey: PropTypes.string.isRequired,
  papers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string,
      year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      link: PropTypes.string
    })
  ).isRequired,
  isEdit: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

const ExamPapers = ({ isEdit = false }) => {
  const dispatch = useDispatch()
  const examPapers = useSelector((state) => state.newExam.examPapers)

  const mockTestPapers = examPapers[EXAM_FIELDS.EXAM_MOCK_TEST_PAPERS] || []
  const previousPapers = examPapers[EXAM_FIELDS.EXAM_PREVIOUS_TEST_PAPERS] || []

  const handleChange = (fieldKey, index, key, value) => {
    const updated = [...examPapers[fieldKey]]
    updated[index] = { ...updated[index], [key]: value }
    dispatch(setExamPapers({ field: fieldKey, value: updated }))
  }

  const handleAdd = (fieldKey) => {
    const newRow = { id: Date.now().toString(), title: '', year: '', link: '' }
    const updated = [...examPapers[fieldKey], newRow]
    dispatch(setExamPapers({ field: fieldKey, value: updated }))
  }

  const handleDelete = (fieldKey, index) => {
    const updated = examPapers[fieldKey].filter((_, i) => i !== index)
    dispatch(setExamPapers({ field: fieldKey, value: updated }))
  }

  return (
    <Box>
      <PaperSection
        title='Mock Test Papers'
        fieldKey={EXAM_FIELDS.EXAM_MOCK_TEST_PAPERS}
        papers={mockTestPapers}
        isEdit={isEdit}
        onChange={handleChange}
        onAdd={handleAdd}
        onDelete={handleDelete}
      />
      <Divider sx={{ my: 3 }} />
      <PaperSection
        title='Previous Year Papers'
        fieldKey={EXAM_FIELDS.EXAM_PREVIOUS_TEST_PAPERS}
        papers={previousPapers}
        isEdit={isEdit}
        onChange={handleChange}
        onAdd={handleAdd}
        onDelete={handleDelete}
      />
    </Box>
  )
}

ExamPapers.propTypes = {
  isEdit: PropTypes.bool
}

export default ExamPapers
