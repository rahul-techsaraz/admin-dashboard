// utils/apiThunk.js
import { createAsyncThunk } from '@reduxjs/toolkit'
import { httpCall } from './service'

export const createApiThunk = (type) =>
  createAsyncThunk(type, async ({ url, method = 'GET', header = {}, payload }, thunkAPI) => {
    try {
      console.log({ header })
      const response = await httpCall(url, header, method, payload)

      if (response?.status === 'error') {
        return thunkAPI.rejectWithValue(response)
      }

      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Something went wrong')
    }
  })
