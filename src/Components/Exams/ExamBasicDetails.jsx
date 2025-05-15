import React, { useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { Autocomplete, Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { EXAM_FIELDS } from '../../Constants/redux/courseFieldName'
import { setExamBasicDetails } from '../../features/newExamSlice'
import { fetchCategory } from '../../utils/reduxThunk/commonThunk'
import { constants } from '../../utils/constants'

const examFrequency = ['Annually', 'Bi-Annually', 'Quaterly', 'Mothely']
const examMode = ['Online', 'Offline', 'Online & Offline']

const ExamBasicDetails = ({ isEdit = false }) => {
  const examBasicDetails = useSelector((state) => state?.newExam?.examBasicDetails || {}, shallowEqual)
  const categoryData = useSelector((state) => state?.category?.categoryData || [], shallowEqual)
  const dispatch = useDispatch()

  const getValue = (field) => examBasicDetails?.[field] ?? ''
  useEffect(() => {
    if (categoryData.length === 0) {
      dispatch(
        fetchCategory({
          url: constants.apiEndPoint.CATEGORY_LIST,
          header: constants.apiHeaders.HEADER,
          method: constants.httpMethod.GET
        })
      )
    }
  }, [])
  return (
    <Box className='container'>
      <Typography variant='h5' className='title'>
        Exam Basic Details
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} className='gridItem'>
          <TextField
            label='Exam Name'
            variant='outlined'
            fullWidth
            value={getValue(EXAM_FIELDS.EXAM_NAME)}
            onChange={(e) =>
              dispatch(
                setExamBasicDetails({
                  field: EXAM_FIELDS.EXAM_NAME,
                  value: e.target.value
                })
              )
            }
            className='inputField'
            disabled={isEdit}
          />
        </Grid>

        <Grid item xs={6} sm={3} className='gridItem'>
          <TextField
            label='Exam Year'
            variant='outlined'
            fullWidth
            value={getValue(EXAM_FIELDS.EXAM_YEAR)}
            onChange={(e) =>
              dispatch(
                setExamBasicDetails({
                  field: EXAM_FIELDS.EXAM_YEAR,
                  value: e.target.value
                })
              )
            }
            className='inputField'
            disabled={isEdit}
          />
        </Grid>

        <Grid item xs={6} sm={3} className='gridItem'>
          <TextField
            label='Exam Duration'
            variant='outlined'
            fullWidth
            value={getValue(EXAM_FIELDS.EXAM_DURATION)}
            onChange={(e) =>
              dispatch(
                setExamBasicDetails({
                  field: EXAM_FIELDS.EXAM_DURATION,
                  value: e.target.value
                })
              )
            }
            className='inputField'
            disabled={isEdit}
          />
        </Grid>

        <Grid item xs={12} sm={6} className='gridItem'>
          <Autocomplete
            multiple
            id='category-select'
            options={categoryData?.map((cat) => cat?.category_name || '') || []}
            value={Array.isArray(getValue(EXAM_FIELDS.EXAM_CATEGORY)) ? getValue(EXAM_FIELDS.EXAM_CATEGORY) : []}
            onChange={(event, newValue) =>
              dispatch(
                setExamBasicDetails({
                  field: EXAM_FIELDS.EXAM_CATEGORY,
                  value: newValue
                })
              )
            }
            renderInput={(params) => <TextField {...params} label='Category' variant='outlined' />}
            getOptionLabel={(option) => option || ''}
            isOptionEqualToValue={(option, value) => option === value}
            className='autocompleteField'
            disabled={isEdit}
          />
        </Grid>

        <Grid item xs={6} sm={3} className='gridItem'>
          <FormControl fullWidth>
            <InputLabel id='exam-frequency-label'>Exam Frequency</InputLabel>
            <Select
              labelId='exam-frequency-label'
              value={examFrequency.includes(getValue(EXAM_FIELDS.EXAM_FREQUENCY)) ? getValue(EXAM_FIELDS.EXAM_FREQUENCY) : ''}
              onChange={(e) =>
                dispatch(
                  setExamBasicDetails({
                    field: EXAM_FIELDS.EXAM_FREQUENCY,
                    value: e.target.value
                  })
                )
              }
              label='Exam Frequency'
              className='selectField'
              disabled={isEdit}
            >
              {examFrequency.map((mode, index) => (
                <MenuItem key={index} value={mode}>
                  {mode}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6} sm={3} className='gridItem'>
          <FormControl fullWidth>
            <InputLabel id='exam-mode-label'>Exam Mode</InputLabel>
            <Select
              labelId='exam-mode-label'
              value={examMode.includes(getValue(EXAM_FIELDS.EXAM_MODE)) ? getValue(EXAM_FIELDS.EXAM_MODE) : ''}
              onChange={(e) =>
                dispatch(
                  setExamBasicDetails({
                    field: EXAM_FIELDS.EXAM_MODE,
                    value: e.target.value
                  })
                )
              }
              label='Exam Mode'
              className='selectField'
              disabled={isEdit}
            >
              {examMode.map((mode, index) => (
                <MenuItem key={index} value={mode}>
                  {mode}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ExamBasicDetails
