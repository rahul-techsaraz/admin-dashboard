import { createAsyncThunk } from '@reduxjs/toolkit'
import { httpCall } from '../service'
import { createApiThunk } from '../apiThunk'

// export const fetchCourseDetails = createAsyncThunk('coures/fetchCourseDetails', async ({ url, header, method }, thunkApi) => {
//   try {
//     const data = await httpCall(url, header, method)
//     return data
//   } catch (error) {
//     return thunkApi.rejectWithError(error)
//   }
// })
export const addNewCourse = createApiThunk('course/addNewCourse')
export const fetchCourseDetails = createApiThunk('course/fetchCourseDetails')
export const updateCourseDetails = createApiThunk('course/updateCourseDetails')
export const fetchAllCourse = createApiThunk('course/fetchAllCourse')
export const deleteCourseById = createApiThunk('course/deleteCourseById')

export const addCourseDescription = createAsyncThunk('course/addCourseDescription', async ({ url, header, method, payload }, thunkApi) => {
  try {
    const data = await httpCall(url, header, method, payload)
    return data
  } catch (error) {
    return thunkApi.rejectWithError(error)
  }
})
export const addCourseDetails = createAsyncThunk('course/addCourseDescription', async ({ url, header, method, payload }, thunkApi) => {
  try {
    const data = await httpCall(url, header, method, payload)
    return data
  } catch (error) {
    return thunkApi.rejectWithError(error)
  }
})
export const addSyllabusDetails = createAsyncThunk('course/addCourseDescription', async ({ url, header, method, payload }, thunkApi) => {
  try {
    const data = await httpCall(url, header, method, payload)
    return data
  } catch (error) {
    return thunkApi.rejectWithError(error)
  }
})
export const deleteCourseBasicDetails = createAsyncThunk(
  'course/deleteCourseBasicDetails',
  async ({ url, header, method, payload }, thunkApi) => {
    try {
      const data = await httpCall(url, header, method, payload)
      return data
    } catch (error) {
      return thunkApi.rejectWithError(error)
    }
  }
)
export const fetchCourseBasicDetailsById = createAsyncThunk(
  'course/fetchCourseBasicDetailsById',
  async ({ url, header, method }, thunkApi) => {
    try {
      const data = await httpCall(url, header, method)
      return data
    } catch (error) {
      return thunkApi.rejectWithError(error)
    }
  }
)
export const fetchCourseDescriptionById = createAsyncThunk(
  'course/fetchCourseDescriptionById',
  async ({ url, header, method }, thunkApi) => {
    try {
      const data = await httpCall(url, header, method)
      return data
    } catch (error) {
      return thunkApi.rejectWithError(error)
    }
  }
)
export const fetchCourseDetailsById = createAsyncThunk('course/fetchCourseDetailsById', async ({ url, header, method }, thunkApi) => {
  try {
    const data = await httpCall(url, header, method)
    return data
  } catch (error) {
    return thunkApi.rejectWithError(error)
  }
})
export const fetchSyllabusDetailsById = createAsyncThunk('course/fetchSyllabusDetailsById', async ({ url, header, method }, thunkApi) => {
  try {
    const data = await httpCall(url, header, method)
    return data
  } catch (error) {
    return thunkApi.rejectWithError(error)
  }
})
