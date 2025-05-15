/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Box, Button, TextField, Grid, Typography, Select, MenuItem, FormControl, InputLabel, IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material' // Import the delete icon
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import {
  defaultState as courseInitialState,
  addSyllabusEntry,
  removeSyllabusEntry,
  updateSyllabusEntry
} from '../../features/newCoursesSlice'
import { FIELDS } from '../../Constants/redux/courseFieldName'
import { useLocalStorageSync } from '../../hooks/useLocalStorageSync'

const YearSemesterCard = ({
  syllabusIndex,
  index,
  handleDeleteYearSemester,
  handleAddSubject,
  yearData,
  yearList,
  isSemester,
  handleDeleteSubject,
  handleSubjectChange,
  handleYearChange,
  handleTypeChange,
  disabled
}) => {
  const [year, setYear] = useState(yearData.year || '')
  const [type, setType] = useState(yearData.type || 'Yearly')

  const subjects = yearData.subjects || [] // Access subjects from the prop
  const semesterList = () => {
    if (year) {
      const index = yearList.indexOf(year)
      console.log(index)
      switch (index) {
        case 0:
          return ["Semester 1", "Semester 2"]
        case 1:
          return ["Semester 3", "Semester 4"]
        case 2:
          return ["Semester 5", "Semester 6"]
        case 3:
          return ["Semester 7", "Semester 8"]
        default:
          return []
      }
    } else {
      return ["Semester 1", "Semester 2"]
    }
  }
  console.log(semesterList())
  return (
    <Grid item xs={12} className='year-semester-card' sx={{ marginBottom: 3 }}>
      <Box
        sx={{
          padding: 2,
          border: '1px solid #ddd',
          borderRadius: 1,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
      >
        {/* Year and Type Dropdown */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={5}>
            <FormControl fullWidth>
              <InputLabel>Year</InputLabel>
              <Select
                value={year}
                onChange={(e) => {
                  setYear(e.target.value)
                  handleYearChange(syllabusIndex, e.target.value)
                }}
                label='Year'
              >
                {yearList.map((y, index) => (
                  <MenuItem value={y} key={index}>{y}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {isSemester && <Grid item xs={12} sm={5}>
            <FormControl fullWidth>
              <InputLabel>Semester</InputLabel>
              <Select
                value={type}
                onChange={(e) => {
                  setType(e.target.value)
                  handleTypeChange(syllabusIndex, e.target.value)
                }}
                label='Year/Semester Type'
              >
                {semesterList().map((s, i) => (
                  <MenuItem value={s} key={i}>{s}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>}
          <IconButton
            onClick={() => handleDeleteYearSemester(index)}
            sx={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              color: 'red',
              zIndex: 10
            }}
          >
            <Delete />
          </IconButton>
        </Grid>

        {/* Subjects */}
        {subjects.map((subject, subjectIndex) => (
          <Grid container key={subjectIndex} spacing={2} alignItems='center'>
            <Grid item xs={10} sm={10}>
              <TextField
                label={`Subject ${subjectIndex + 1}`}
                fullWidth
                value={subject}
                onChange={(e) => handleSubjectChange(syllabusIndex, subjectIndex, e.target.value)}
              />
            </Grid>
            <Grid item xs={2} sm={2} sx={{ display: 'flex', justifyContent: 'center' }}>
              <IconButton onClick={() => handleDeleteSubject(syllabusIndex, subjectIndex)} sx={{ color: 'red' }}>
                <Delete />
              </IconButton>
            </Grid>
          </Grid>
        ))}

        <Button
          variant='contained'
          color='primary'
          onClick={() => handleAddSubject(index, syllabusIndex)}
          sx={{ marginTop: 2 }}
          disabled={disabled}
        >
          Add Subject
        </Button>
      </Box>
    </Grid>
  )
}

const CourseSyllabus = ({ isEdit = false }) => {
  const syllabusDetails = useSelector((state) => state.newCourses.syllabusDetails, shallowEqual)
  const basicDetails = useSelector((state) => state.newCourses.basicDetails, shallowEqual)
  const otherInfo = useSelector((state) => state.newCourses.otherInfo, shallowEqual)
  const syllabus = syllabusDetails[FIELDS.SYLLABUS]
  const isSemester = otherInfo[FIELDS.EXAM_TYPE] === 'Semester' ? true : false
  const courseDuration = basicDetails[FIELDS.COURSE_DURATION]
  const currentYear = new Date().getFullYear();
  const yearList = Array.from({ length: courseDuration }, (_, i) => currentYear + i)


  useLocalStorageSync('courseFormData', 'syllabusDetails', syllabusDetails, courseInitialState)

  const dispatch = useDispatch()
  console.log({ syllabusDetails })
  const handleAddYearSemester = () => {
    dispatch(addSyllabusEntry())
  }

  const handleDeleteYearSemester = (index) => {
    dispatch(removeSyllabusEntry({ id: index }))
  }

  const handleAddSubject = (index, syllabusIndex) => {
    const selectedSyllabus = syllabus[syllabusIndex]

    const updatedSubjects = [...selectedSyllabus.subjects, '']

    dispatch(
      updateSyllabusEntry({
        id: selectedSyllabus.id,
        updates: { subjects: updatedSubjects }
      })
    )
  }

  const handleSubjectChange = (syllabusIndex, subjectIndex, value) => {
    const selectedSyllabus = syllabus[syllabusIndex]
    const updatedSubjects = [...selectedSyllabus.subjects]
    updatedSubjects[subjectIndex] = value

    dispatch(
      updateSyllabusEntry({
        id: selectedSyllabus.id,
        updates: { subjects: updatedSubjects }
      })
    )
  }

  const handleDeleteSubject = (syllabusIndex, subjectIndex) => {
    const selectedSyllabus = syllabus[syllabusIndex]
    const updatedSubjects = selectedSyllabus.subjects.filter((_, i) => i !== subjectIndex)

    dispatch(
      updateSyllabusEntry({
        id: selectedSyllabus.id,
        updates: { subjects: updatedSubjects }
      })
    )
  }

  const handleYearChange = (syllabusIndex, value) => {
    const selectedSyllabus = syllabus[syllabusIndex]

    dispatch(
      updateSyllabusEntry({
        id: selectedSyllabus.id,
        updates: { year: Number(value) }
      })
    )
  }

  const handleTypeChange = (syllabusIndex, value) => {
    const selectedSyllabus = syllabus[syllabusIndex]

    // Dispatch the update to Redux for semester type change
    dispatch(
      updateSyllabusEntry({
        id: selectedSyllabus.id,
        updates: { type: value }
      })
    )
  }

  return (
    <Box>
      <Typography variant='h5' sx={{ marginBottom: 3 }}>
        Course Details
      </Typography>

      <Grid container spacing={3}>
        {syllabus.map((yearData, index) => (
          <YearSemesterCard
            key={index}
            syllabusIndex={index}
            index={yearData.id}
            yearData={yearData}
            yearList={yearList}
            isSemester={isSemester}
            handleDeleteYearSemester={handleDeleteYearSemester}
            handleAddSubject={handleAddSubject}
            handleDeleteSubject={handleDeleteSubject}
            handleSubjectChange={handleSubjectChange}
            handleYearChange={handleYearChange}
            handleTypeChange={handleTypeChange}
            disabled={isEdit}
          />
        ))}
      </Grid>

      <Button variant='contained' color='primary' onClick={handleAddYearSemester} sx={{ marginTop: 3 }} disabled={isEdit}>
        Add Syllabus
      </Button>
    </Box>
  )
}

export default CourseSyllabus
