import { createAsyncThunk } from '@reduxjs/toolkit'
import { httpCall } from '../service'
import { httpCall2 } from '../service2'
import { constants } from '../constants'

export const fetchAllCollegeList = createAsyncThunk('college/fetchAllCollegeList', async ({ url, header, method }, thunkApi) => {
  try {
    const data = await httpCall(url, header, method)
    return data
  } catch (error) {
    return thunkApi.rejectWithError(error)
  }
})

export const fetchAgentCollegeList = createAsyncThunk('college/fetchAgentCollegeList', async ({ url, header, method }, thunkApi) => {
  try {
    const data = await httpCall(url, header, method)
    return data
  } catch (error) {
    return thunkApi.rejectWithError(error)
  }
})
export const fetchStateList = createAsyncThunk('college/fetchStateList', async ({ url, header, method }, thunkApi) => {
  try {
    const data = await httpCall(url, header, method)
    return data
  } catch (error) {
    return thunkApi.rejectWithError(error)
  }
})
export const fetchCityList = createAsyncThunk('college/fetchCityList', async ({ url, header, method }, thunkApi) => {
  try {
    const data = await httpCall(url, header, method)
    return data
  } catch (error) {
    return thunkApi.rejectWithError(error)
  }
})
export const fetchCourseList = createAsyncThunk('college/fetchCourseListList', async ({ url, header, method }, thunkApi) => {
  try {
    const data = await httpCall(url, header, method)
    return data
  } catch (error) {
    return thunkApi.rejectWithError(error)
  }
})
export const addCollegeBasicDetails = createAsyncThunk(
  'college/addCollegeBasicDetails',
  async ({ url, header, method, payload }, thunkApi) => {
    try {
      const data = await httpCall(url, header, method, payload)
      return data
    } catch (error) {
      return thunkApi.rejectWithError(error)
    }
  }
)
export const fileUploadlogo = createAsyncThunk('college/fileUploadlogo', async ({ url, payload }, thunkApi) => {
  try {
    const { data } = await httpCall2(url, payload)
    if (data[0]?.error || data[0].status !== constants.apiResponseStatus.SUCCESS) {
      throw new Error('File upload unsuccessfull')
    }
    return data
  } catch (error) {
    return thunkApi.rejectWithError(error)
  }
})
export const fileUploadThumbnail = createAsyncThunk('college/fileUploadThumbnail', async ({ url, payload }, thunkApi) => {
  try {
    const { data } = await httpCall2(url, payload)
    if (data[0]?.error || data[0].status !== constants.apiResponseStatus.SUCCESS) {
      throw new Error('File upload unsuccessfull')
    }
    return data
  } catch (error) {
    return thunkApi.rejectWithError(error)
  }
})
export const fileUploadBrochure = createAsyncThunk('college/fileUploadBrochure', async ({ url, payload }, thunkApi) => {
  try {
    const { data } = await httpCall2(url, payload)
    if (data[0]?.error || data[0].status !== constants.apiResponseStatus.SUCCESS) {
      throw new Error('File upload unsuccessfull')
    }
    return data
  } catch (error) {
    return thunkApi.rejectWithError(error)
  }
})
export const fileUploadGallary = createAsyncThunk('college/fileUploadGallary', async ({ url, payload }, thunkApi) => {
  try {
    const data = await httpCall2(url, payload)
    return data
  } catch (error) {
    return thunkApi.rejectWithError(error)
  }
})
export const deleteCollegeBasicDetails = createAsyncThunk(
  'college/deleteCollegeBasicDetails',
  async ({ url, header, method, payload }, thunkApi) => {
    try {
      const data = await httpCall(url, header, method, payload)
      return data
    } catch (error) {
      return thunkApi.rejectWithError(error)
    }
  }
)
export const deleteCollegeCourseOffered = createAsyncThunk(
  'college/deleteCollegeCourseOffered',
  async ({ url, header, method, payload }, thunkApi) => {
    try {
      const data = await httpCall(url, header, method, payload)
      return data
    } catch (error) {
      return thunkApi.rejectWithError(error)
    }
  }
)
export const deleteCollegeHighlight = createAsyncThunk(
  'college/deleteCollegeHighlight',
  async ({ url, header, method, payload }, thunkApi) => {
    try {
      const data = await httpCall(url, header, method, payload)
      return data
    } catch (error) {
      return thunkApi.rejectWithError(error)
    }
  }
)
export const addCollegeDescription = createAsyncThunk(
  'college/addCollegeDescription',
  async ({ url, header, method, payload }, thunkApi) => {
    try {
      const data = await httpCall(url, header, method, payload)
      return data
    } catch (error) {
      return thunkApi.rejectWithError(error)
    }
  }
)
export const addCollegeHighlight = createAsyncThunk('college/addCollegeHighlight', async ({ url, header, method, payload }, thunkApi) => {
  try {
    const data = await httpCall(url, header, method, payload)
    return data
  } catch (error) {
    return thunkApi.rejectWithError(error)
  }
})
export const addCollegeFacilities = createAsyncThunk('college/addCollegeFacilities', async ({ url, header, method, payload }, thunkApi) => {
  try {
    const data = await httpCall(url, header, method, payload)
    return data
  } catch (error) {
    return thunkApi.rejectWithError(error)
  }
})
export const addCollegeCourseOffered = createAsyncThunk(
  'college/addCollegeCourseOffered',
  async ({ url, header, method, payload }, thunkApi) => {
    try {
      const data = await httpCall(url, header, method, payload)
      return data
    } catch (error) {
      return thunkApi.rejectWithError(error)
    }
  }
)
export const addCollegeGallary = createAsyncThunk('college/addCollegeGallary', async ({ url, header, method, payload }, thunkApi) => {
  try {
    const data = await httpCall(url, header, method, payload)
    return data
  } catch (error) {
    return thunkApi.rejectWithError(error)
  }
})
export const fetchCollegeById = createAsyncThunk('college/fetchCollegeById', async ({ url, header, method, payload }, thunkApi) => {
  try {
    const data = await httpCall(url, header, method, payload)
    return data
  } catch (error) {
    return thunkApi.rejectWithError(error)
  }
})
export const fetchCourseOfferedById = createAsyncThunk(
  'college/fetchCourseOfferedById',
  async ({ url, header, method, payload }, thunkApi) => {
    try {
      const data = await httpCall(url, header, method, payload)
      return data
    } catch (error) {
      return thunkApi.rejectWithError(error)
    }
  }
)
export const fetchCollegeDiscriptionById = createAsyncThunk(
  'college/fetchCollegeDiscriptionById',
  async ({ url, header, method, payload }, thunkApi) => {
    try {
      const data = await httpCall(url, header, method, payload)
      return data
    } catch (error) {
      return thunkApi.rejectWithError(error)
    }
  }
)
export const fetchCollegeHighlightsById = createAsyncThunk(
  'college/fetchCollegeHighlightsById',
  async ({ url, header, method, payload }, thunkApi) => {
    try {
      const data = await httpCall(url, header, method, payload)
      return data
    } catch (error) {
      return thunkApi.rejectWithError(error)
    }
  }
)
export const fetchCollegeCommonById = createAsyncThunk(
  'college/fetchCollegeCommonById',
  async ({ url, header, method, payload }, thunkApi) => {
    try {
      const data = await httpCall(url, header, method, payload)
      return data
    } catch (error) {
      return thunkApi.rejectWithError(error)
    }
  }
)
export const fetchCollegeGallaryById = createAsyncThunk(
  'college/fetchCollegeGallaryById',
  async ({ url, header, method, payload }, thunkApi) => {
    try {
      const data = await httpCall(url, header, method, payload)
      return data
    } catch (error) {
      return thunkApi.rejectWithError(error)
    }
  }
)
export const createNewCollege = createAsyncThunk('newCollege/AddNewCollege', async ({ url, payload, header }, thunkApi) => {
  try {
    const { data } = await httpCall2(url, payload, header)
    if (data.status !== constants.apiResponseStatus.SUCCESS) {
      throw new Error('Failed to Add College...')
    }
    return data
  } catch (error) {
    return thunkApi.rejectWithError(error)
  }
})
export const updateCollegeById = createAsyncThunk('newCollege/updateCollegeById', async ({ url, header, method, payload }, thunkApi) => {
  try {
    const data = await httpCall(url, header, method, payload)
    return data
  } catch (error) {
    return thunkApi.rejectWithError(error)
  }
})
export const fetchNewCollegeById = createAsyncThunk('newCollege/fetchNewCollegeById', async ({ url, header, method }, thunkApi) => {
  try {
    const data = await httpCall(url, header, method)
    return data
  } catch (error) {
    return thunkApi.rejectWithError(error)
  }
})
export const deleteNewCollegeById = createAsyncThunk('newCollege/deleteNewCollegeById', async ({ url, header, method }, thunkApi) => {
  try {
    const data = await httpCall(url, header, method)
    return data
  } catch (error) {
    return thunkApi.rejectWithError(error)
  }
})