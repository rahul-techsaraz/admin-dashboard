import { createAsyncThunk } from "@reduxjs/toolkit"
import { httpCall } from "../service"

export const fetchAllFeedbackList = createAsyncThunk("feedback/fetchAllFeedbackList", async ({ url, header, method }, thunkApi) => {
    try {
        const data = await httpCall(url, header, method)
        return data
    } catch (error) {
        return thunkApi.rejectWithError(error)
    }
})

export const fetchFeedbackByEmail = createAsyncThunk("feedback/fetchFeedbackByEmail", async ({ url, header, method }, thunkApi) => {
    try {
        const data = await httpCall(url, header, method)
        return data
    } catch (error) {
        return thunkApi.rejectWithError(error)
    }
})

export const deleteFeedbackByEmail = createAsyncThunk("feedback/deleteFeedbackByEmail", async ({ url, header, method, body }, thunkApi) => {
    try {
        const data = await httpCall(url, header, method, body)
        return data
    } catch (error) {
        return thunkApi.rejectWithError(error)
    }
})