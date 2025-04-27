import React, { useState } from 'react'
import { TextField, Box, MenuItem, Select, InputLabel, FormControl, InputAdornment, Typography, Grid, Autocomplete } from '@mui/material'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { setBasicDetailField } from '../../features/newCoursesSlice'
import { FIELDS } from '../../Constants/redux/courseFieldName'

const courseModes = ['Online', 'Offline', 'Hybrid']
const durations = [1, 2, 3, 4, 5, 6] // Duration options 1-6
const exams = ['JEE', 'NEET', 'CAT', 'GATE', 'SAT']

const CourseBasicDetails = () => {
  const basicDetails = useSelector((state) => state.newCourses.basicDetails, shallowEqual)
  const { categoryData } = useSelector((state) => state.category, shallowEqual)
  const { examList } = useSelector((state) => state.exam, shallowEqual)

  const dispatch = useDispatch()

  const handleFeeChange = (e, fieldName) => {
    const value = e.target.value.replace(/\D/g, '') // Allow only digits
    dispatch(setBasicDetailField({ field: fieldName, value: Number(value) }))
  }

  return (
    <Box className='container'>
      <Typography variant='h5' className='title'>
        Course Basic Details
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} className='gridItem'>
          <TextField
            label='Course Name'
            variant='outlined'
            fullWidth
            value={basicDetails[FIELDS.COURSE_NAME]}
            onChange={(e) => dispatch(setBasicDetailField({ field: FIELDS.COURSE_NAME, value: e.target.value }))}
            className='inputField'
          />
        </Grid>

        <Grid item xs={12} sm={6} className='gridItem'>
          <TextField
            label='Sub Course Name'
            variant='outlined'
            fullWidth
            value={basicDetails[FIELDS.SUB_COURSE_NAME]}
            onChange={(e) => dispatch(setBasicDetailField({ field: FIELDS.SUB_COURSE_NAME, value: e.target.value }))}
            className='inputField'
          />
        </Grid>

        <Grid item xs={12} sm={6} className='gridItem'>
          <FormControl fullWidth>
            <InputLabel id='course-mode-label'>Course Mode</InputLabel>
            <Select
              labelId='course-mode-label'
              value={courseModes.includes(basicDetails[FIELDS.COURSE_MODE]) ? basicDetails[FIELDS.COURSE_MODE] : ''}
              onChange={(e) => dispatch(setBasicDetailField({ field: FIELDS.COURSE_MODE, value: e.target.value }))}
              label='Course Mode'
              className='selectField'
            >
              {courseModes.map((mode, index) => (
                <MenuItem key={index} value={mode}>
                  {mode}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} className='gridItem'>
          <FormControl fullWidth>
            <InputLabel id='course-duration-label'>Course Duration</InputLabel>
            <Select
              labelId='course-duration-label'
              value={basicDetails[FIELDS.COURSE_DURATION] || ''}
              onChange={(e) => dispatch(setBasicDetailField({ field: FIELDS.COURSE_DURATION, value: e.target.value }))}
              label='Course Duration'
              className='selectField'
            >
              {durations.map((duration) => (
                <MenuItem key={duration} value={duration}>
                  {duration}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} className='gridItem'>
          <TextField
            label='Course Fee Min'
            variant='outlined'
            fullWidth
            value={basicDetails[FIELDS.COURSE_FEE_MIN]}
            onChange={(e) => handleFeeChange(e, FIELDS.COURSE_FEE_MIN)}
            InputProps={{
              startAdornment: <InputAdornment position='start'>₹</InputAdornment>
            }}
            className='inputAdornment'
          />
        </Grid>

        <Grid item xs={12} sm={6} className='gridItem'>
          <TextField
            label='Course Fee Max'
            variant='outlined'
            fullWidth
            value={basicDetails[FIELDS.COURSE_FEE_MAX]}
            onChange={(e) => handleFeeChange(e, FIELDS.COURSE_FEE_MAX)}
            InputProps={{
              startAdornment: <InputAdornment position='start'>₹</InputAdornment>
            }}
            className='inputAdornment'
          />
        </Grid>

        <Grid item xs={12} sm={6} className='gridItem'>
          <Autocomplete
            multiple
            id='category-select'
            options={categoryData.map((category) => category.category_name)}
            value={basicDetails[FIELDS.CATEGORY]}
            onChange={(event, newValue) => dispatch(setBasicDetailField({ field: FIELDS.CATEGORY, value: newValue }))}
            renderInput={(params) => <TextField {...params} label='Category' variant='outlined' />}
            getOptionLabel={(option) => option}
            isOptionEqualToValue={(option, value) => option === value}
            className='autocompleteField'
          />
        </Grid>

        <Grid item xs={12} sm={6} className='gridItem'>
          <Autocomplete
            multiple
            id='exams-select'
            options={examList.map((exam) => exam.exam_name)}
            value={basicDetails[FIELDS.COURSE_ACCEPTING_EXAM]}
            onChange={(event, newValue) => dispatch(setBasicDetailField({ field: FIELDS.COURSE_ACCEPTING_EXAM, value: newValue }))}
            renderInput={(params) => <TextField {...params} label='Course Accepting Exam' variant='outlined' />}
            getOptionLabel={(option) => option}
            isOptionEqualToValue={(option, value) => option === value}
            className='autocompleteField'
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default CourseBasicDetails
