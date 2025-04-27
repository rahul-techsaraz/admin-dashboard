import React, { useState } from 'react'
import { Box, MenuItem, Select, InputLabel, FormControl, Typography, Grid } from '@mui/material'
import CourseDescriptionEditor from '../CourseDescriptionEditor'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { FIELDS } from '../../Constants/redux/courseFieldName'
import { setOtherInfoField } from '../../features/newCoursesSlice'

const courseLevels = ['10th', '12th', 'UG', 'PG']
const examFrquency = ['Anual', 'Semester']

const CourseOtherDetails = () => {
  const othersInfo = useSelector((state) => state.newCourses.otherInfo, shallowEqual)
  console.log({ othersInfo })
  const dispatch = useDispatch()
  const handleEditorChange = (field) => (value) => {
    dispatch(setOtherInfoField({ field, value }))
  }
  return (
    <Box className='container'>
      <Typography
        variant='h5'
        sx={{
          fontSize: '1.5rem',
          fontWeight: 600,
          color: '#2C3E50',
          marginBottom: '20px' // Space between title and content
        }}
        className='title'
      >
        Course Details
      </Typography>

      <Grid container spacing={3}>
        {/* Course Level */}
        <Grid item xs={12} sm={6} className='gridItem'>
          <FormControl fullWidth sx={{ height: '100%' }}>
            <InputLabel id='course-mode-label'>Course Level</InputLabel>
            <Select
              labelId='course-mode-label'
              value={courseLevels.includes(othersInfo[FIELDS.COURSE_CATEGORY_LEVEL]) ? othersInfo[FIELDS.COURSE_CATEGORY_LEVEL] : ''}
              onChange={(e) => dispatch(setOtherInfoField({ field: FIELDS.COURSE_CATEGORY_LEVEL, value: e.target.value }))}
              label='Course Level'
              sx={{
                '& .MuiSelect-select': {
                  padding: '10px 14px' // Control padding
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#BDC3C7' // Border color for focus state
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#2C3E50' // Hover state border color
                },
                backgroundColor: '#FFFFFF',
                '& .MuiSelect-select.MuiInputBase-input': {
                  paddingRight: '10px !important' // Override padding-right
                }
              }}
            >
              {courseLevels.map((mode, index) => (
                <MenuItem key={index} value={mode}>
                  {mode}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Exam Frequency */}
        <Grid item xs={12} sm={6} className='gridItem'>
          <FormControl fullWidth sx={{ height: '100%' }}>
            <InputLabel id='course-duration-label'>Exam Frequency</InputLabel>
            <Select
              labelId='course-duration-label'
              value={examFrquency.includes(othersInfo[FIELDS.EXAM_TYPE]) ? othersInfo[FIELDS.EXAM_TYPE] : ''}
              onChange={(e) => dispatch(setOtherInfoField({ field: FIELDS.EXAM_TYPE, value: e.target.value }))}
              label='Exam Frequency'
              sx={{
                '& .MuiSelect-select': {
                  padding: '10px 14px' // Control padding
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#BDC3C7' // Border color for focus state
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#2C3E50' // Hover state border color
                },
                backgroundColor: '#FFFFFF',
                '& .MuiSelect-select.MuiInputBase-input': {
                  paddingRight: '10px !important' // Override padding-right
                }
              }}
            >
              {examFrquency.map((duration) => (
                <MenuItem key={duration} value={duration}>
                  {duration}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} className='gridItem'>
          <Typography
            variant='h6'
            sx={{
              fontSize: '14px',
              fontWeight: 500,
              color: '#2C3E50',
              marginBottom: '8px'
            }}
          >
            Eligibility Criteria
          </Typography>
          <CourseDescriptionEditor
            value={othersInfo[FIELDS.ELIGIBILITY_CRITERIA]}
            onChange={handleEditorChange(FIELDS.ELIGIBILITY_CRITERIA)}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default CourseOtherDetails
