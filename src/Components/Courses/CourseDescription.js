import React from 'react'
import { Box, Typography, Grid } from '@mui/material'
import CourseDescriptionEditor from '../CourseDescriptionEditor'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { FIELDS } from '../../Constants/redux/courseFieldName'
import { setDescriptionField } from '../../features/newCoursesSlice'

const CourseDescription = () => {
  const descriptions = useSelector((state) => state.newCourses.description, shallowEqual)
  console.log({ descriptions })
  const dispatch = useDispatch()

  const handleEditorChange = (field) => (value) => {
    dispatch(setDescriptionField({ field, value }))
  }

  return (
    <Box className='container'>
      <Typography
        variant='h5'
        sx={{
          fontSize: '1.5rem',
          fontWeight: 600,
          color: '#2C3E50',
          marginBottom: '20px'
        }}
        className='title'
      >
        Course Description
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} className='gridItem'>
          <Typography variant='h6' sx={{ fontSize: '1.1rem', fontWeight: 500, color: '#2C3E50', marginBottom: '8px' }}>
            Course Placement Description
          </Typography>
          <CourseDescriptionEditor
            value={descriptions[FIELDS.COURSE_PLACEMENT_DESCRIPTION]}
            onChange={handleEditorChange(FIELDS.COURSE_PLACEMENT_DESCRIPTION)}
          />
        </Grid>

        <Grid item xs={12} sm={6} className='gridItem'>
          <Typography variant='h6' sx={{ fontSize: '1.1rem', fontWeight: 500, color: '#2C3E50', marginBottom: '8px' }}>
            Course Admission Process Description
          </Typography>
          <CourseDescriptionEditor
            value={descriptions[FIELDS.COURSE_ADMISSION_PROCESS_DESCRIPTION]}
            onChange={handleEditorChange(FIELDS.COURSE_ADMISSION_PROCESS_DESCRIPTION)}
          />
        </Grid>

        <Grid item xs={12} sm={6} className='gridItem'>
          <Typography variant='h6' sx={{ fontSize: '13px', fontWeight: 500, color: '#2C3E50', marginBottom: '8px' }}>
            Course Eligibility Criteria Description
          </Typography>
          <CourseDescriptionEditor
            value={descriptions[FIELDS.COURSE_ELIGIBILITY_CRITERIA_DESCRIPTION]}
            onChange={handleEditorChange(FIELDS.COURSE_ELIGIBILITY_CRITERIA_DESCRIPTION)}
          />
        </Grid>

        {/* Course Description */}
        <Grid item xs={12} sm={6} className='gridItem'>
          <Typography variant='h6' sx={{ fontSize: '13px', fontWeight: 500, color: '#2C3E50', marginBottom: '8px' }}>
            Course Description
          </Typography>
          <CourseDescriptionEditor
            value={descriptions[FIELDS.COURSE_DESCRIPTION]}
            onChange={handleEditorChange(FIELDS.COURSE_DESCRIPTION)}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default CourseDescription
