import { createAsyncThunk } from '@reduxjs/toolkit'
import { httpCall } from '../service'
import { createApiThunk } from '../apiThunk'

export const addNewCourse = createApiThunk('course/addNewCourse')
export const fetchCourseDetails = createApiThunk('course/fetchCourseDetails')
export const updateCourseDetails = createApiThunk('course/updateCourseDetails')
export const fetchAllCourse = createApiThunk('course/fetchAllCourse')
export const deleteCourseById = createApiThunk('course/deleteCourseById')
