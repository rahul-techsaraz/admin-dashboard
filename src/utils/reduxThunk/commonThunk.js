import { createAsyncThunk } from '@reduxjs/toolkit'
import { httpCall } from '../service'

export const authenticateUsers = createAsyncThunk('auth/authenticateUser', async ({ url, header, method }, thunkApi) => {
  try {
    const data = await httpCall(url, header, method)
    return data
  } catch (error) {
    return thunkApi.rejectWithError(error)
  }
})
export const loginUsers = createAsyncThunk('login/loginUsers', async ({ url, header, method, payload }, thunkApi) => {
  try {
    const data = await httpCall(url, header, method, payload)
    return data
  } catch (error) {
    return thunkApi.rejectWithError(error)
  }
})
export const addNewCategory = createAsyncThunk('category/addNewCategory', async ({ url, header, method, payload }, thunkApi) => {
  try {
    const data = await httpCall(url, header, method, payload)
    return data
  } catch (error) {
    return thunkApi.rejectWithError(error)
  }
})
export const deleteCategory = createAsyncThunk('category/deleteCategory', async ({ url, header, method, payload }, thunkApi) => {
  try {
    const data = await httpCall(url, header, method, payload)
    return data
  } catch (error) {
    return thunkApi.rejectWithError(error)
  }
})
export const fetchCategory = createAsyncThunk('category/fetchCategory', async ({ url, header, method }, thunkApi) => {
  try {
    const data = await httpCall(url, header, method)
    return data
  } catch (error) {
    return thunkApi.rejectWithError(error)
  }
})
export const fetchCategoryById = createAsyncThunk('category/fetchCategoryById', async ({ url, header, method }, thunkApi) => {
  try {
    const data = await httpCall(url, header, method)
    return data
  } catch (error) {
    return thunkApi.rejectWithError(error)
  }
})
export const fetchAllAdminUserList = createAsyncThunk('users/fetchAllAdminUserList', async ({ url, header, method }, thunkApi) => {
  try {
    const data = await httpCall(url, header, method)
    return data
  } catch (error) {
    return thunkApi.rejectWithError(error)
  }
})
export const fetchAllUsersList = createAsyncThunk('users/fetchAllUsersList', async ({ url, header, method }, thunkApi) => {
  try {
    const data = await httpCall(url, header, method)
    return data
  } catch (error) {
    return thunkApi.rejectWithError(error)
  }
})
export const fetchUserByEmail = createAsyncThunk('users/fetchUserByEmail', async ({ url, header, method }, thunkApi) => {
  try {
    const data = await httpCall(url, header, method)
    return data
  } catch (error) {
    return thunkApi.rejectWithError(error)
  }
})
export const approveUser = createAsyncThunk('users/approveUser', async ({ url, header, method, payload }, thunkApi) => {
  try {
    const data = await httpCall(url, header, method, payload)
    return data
  } catch (error) {
    return thunkApi.rejectWithError(error)
  }
})
