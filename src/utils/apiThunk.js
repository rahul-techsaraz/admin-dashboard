// utils/apiThunk.js
import { createAsyncThunk } from '@reduxjs/toolkit'
import { httpCall } from './service'

export const createApiThunk = (type, httpHandler = httpCall) =>
  createAsyncThunk(type, async ({ url, method = 'GET', header = {}, payload }, thunkAPI) => {
    try {
      const response = await httpHandler(url, header, method, payload)
      console.log(response)
      if (Array.isArray(response)) {
        return response.length > 0 ? response : thunkAPI.rejectWithValue('Something went wrong')
      }
      const statusCodeOk = response?.status_code === 200 || response?.data?.status_code === 200
      const statusOk = response?.status === 200 || response?.status === 'success' || response?.data?.status === 'success'
      const successOk = response?.success === 1 || response?.success === true
      // const dataLength = response?.length

      if (!(statusCodeOk || statusOk || successOk)) {
        return thunkAPI.rejectWithValue(response)
      }

      return response
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error.message || 'Something went wrong')
    }
  })
