// utils/apiThunk.js
import { createAsyncThunk } from '@reduxjs/toolkit'
import { httpCall } from './service'

export const createApiThunk = (type) =>
  createAsyncThunk(type, async ({ url, method = 'GET', header = {}, payload }, thunkAPI) => {
    try {
      console.log({ header })
      const response = await httpCall(url, header, method, payload)

      // const statusCodeOk = response?.status_code === 200
      // const statusOk = response?.status === 200 || response?.status === 'success'

      // if (!statusCodeOk || !statusOk) {
      //   return thunkAPI.rejectWithValue(response)
      // }
      const statusCodeOk = response?.status_code === 200
      const statusOk = response?.status === 200 || response?.status === 'success'
      const successOk = response?.success === 1 || response?.success === true

      if (!(statusCodeOk || statusOk || successOk)) {
        return thunkAPI.rejectWithValue(response)
      }

      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Something went wrong')
    }
  })
