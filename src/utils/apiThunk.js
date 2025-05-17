// utils/apiThunk.js
import { createAsyncThunk } from '@reduxjs/toolkit'
import { httpCall } from './service'

export const createApiThunk = (type, httpHandler = httpCall) =>
  createAsyncThunk(type, async ({ url, method = 'GET', header = {}, payload }, thunkAPI) => {
    try {
      const response = await httpHandler(url, header, method, payload)

      const statusCodeOk = response?.status_code === 200
      const statusOk = response?.status === 200 || response?.status === 'success'
      const successOk = response?.success === 1 || response?.success === true
      const dataLength = response?.length

      if (!(statusCodeOk || statusOk || successOk || dataLength)) {
        return thunkAPI.rejectWithValue(response)
      }

      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Something went wrong')
    }
  })
