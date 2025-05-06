import { Autocomplete, Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React from 'react'
import { setExamInfoField } from '../../features/newExamSlice'
import { EXAM_FIELDS } from '../../Constants/redux/courseFieldName'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const examYear = ['2024', '2025', '2026']
const ExamInfo = ({ isEdit = false }) => {
    const examInfo = useSelector((state) => state.newExam.examInfo, shallowEqual)
    const { categoryData } = useSelector((state) => state.category, shallowEqual)
    const dispatch = useDispatch()
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
                        value={examInfo[EXAM_FIELDS.EXAM_NAME]}
                        onChange={(e) => dispatch(setExamInfoField({ field: EXAM_FIELDS.EXAM_NAME, value: e.target.value }))}
                        className='inputField'
                        disabled={isEdit}
                    />
                </Grid>

                <Grid item xs={12} sm={6} className='gridItem'>
                    <FormControl fullWidth>
                        <InputLabel id='year'>Year</InputLabel>
                        <Select
                            labelId='year'
                            value={examYear.includes(examInfo[EXAM_FIELDS.EXAM_YEAR]) ? examInfo[EXAM_FIELDS.EXAM_YEAR] : ''}
                            onChange={(e) => dispatch(setExamInfoField({ field: EXAM_FIELDS.EXAM_YEAR, value: e.target.value }))}
                            label='Exam Year'
                            className='selectField'
                            disabled={isEdit}
                        >
                            {examYear.map((year, index) => (
                                <MenuItem key={index} value={year}>
                                    {year}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} className='gridItem'>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Application Start date"
                            value={examInfo[EXAM_FIELDS.APPLICATION_START_DATES]}
                            onChange={(newValue) => dispatch(setExamInfoField({ field: EXAM_FIELDS.APPLICATION_START_DATES, value: newValue }))}
                        />
                    </LocalizationProvider>
                </Grid>

                <Grid item xs={12} sm={6} className='gridItem'>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Application End date"
                            value={examInfo[EXAM_FIELDS.APPLICATION_END_DATES]}
                            onChange={(newValue) => dispatch(setExamInfoField({ field: EXAM_FIELDS.APPLICATION_END_DATES, value: newValue }))}
                        />
                    </LocalizationProvider>
                </Grid>

                <Grid item xs={12} sm={6} className='gridItem'>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Exam Start date"
                            value={examInfo[EXAM_FIELDS.EXAM_SRART_DATES]}
                            onChange={(newValue) => dispatch(setExamInfoField({ field: EXAM_FIELDS.EXAM_SRART_DATES, value: newValue }))}
                        />
                    </LocalizationProvider>
                </Grid>

                <Grid item xs={12} sm={6} className='gridItem'>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Exam End date"
                            value={examInfo[EXAM_FIELDS.EXAM_END_DATES]}
                            onChange={(newValue) => dispatch(setExamInfoField({ field: EXAM_FIELDS.EXAM_END_DATES, value: newValue }))}
                        />
                    </LocalizationProvider>
                </Grid>

                <Grid item xs={12} sm={6} className='gridItem'>
                    <Autocomplete
                        id='category-select'
                        options={categoryData.map((category) => category.category_name)}
                        value={examInfo[EXAM_FIELDS.CATEGORY_NAME]}
                        onChange={(event, newValue) => dispatch(setExamInfoField({ field: EXAM_FIELDS.CATEGORY_NAME, value: newValue }))}
                        renderInput={(params) => <TextField {...params} label='Category' variant='outlined' />}
                        getOptionLabel={(option) => option}
                        isOptionEqualToValue={(option, value) => option === value}
                        className='autocompleteField'
                        disabled={isEdit}
                    />
                </Grid>



                {/* <Grid item xs={12} sm={6} className='gridItem'>
                    <FormControl fullWidth>
                        <InputLabel id='course-duration-label'>Course Duration</InputLabel>
                        <Select
                            labelId='course-duration-label'
                            value={basicDetails[FIELDS.COURSE_DURATION] || ''}
                            onChange={(e) => dispatch(setBasicDetailField({ field: FIELDS.COURSE_DURATION, value: e.target.value }))}
                            label='Course Duration'
                            className='selectField'
                            disabled={isEdit}
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
                        disabled={isEdit}
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
                        disabled={isEdit}
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
                        disabled={isEdit}
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
                        disabled={isEdit}
                    />
                </Grid> */}
            </Grid>
        </Box>
    )
}

export default ExamInfo