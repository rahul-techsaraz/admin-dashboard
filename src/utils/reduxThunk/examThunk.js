import { createAsyncThunk } from "@reduxjs/toolkit";
import { httpCall } from "../service";

export const fetchExamInfoById = createAsyncThunk(
  "exam/fetchExamInfoById",
   async ({ url, header, method }, thunkApi) => {
    try {
      const data = await httpCall(url, header, method);
      return data;

    } catch (error) {
      return thunkApi.rejectWithError(error);
    }
  }
);
export const fetchExamDescriptionById = createAsyncThunk(
  "exam/fetchExamDescriptionById",
   async ({ url, header, method }, thunkApi) => {
    try {
      const data = await httpCall(url, header, method);
      return data;

    } catch (error) {
      return thunkApi.rejectWithError(error);
    }
  }
);
export const fetchExamHighlightsById = createAsyncThunk(
  "exam/fetchExamHighlightsById",
   async ({ url, header, method }, thunkApi) => {
    try {
      const data = await httpCall(url, header, method);
      return data;

    } catch (error) {
      return thunkApi.rejectWithError(error);
    }
  }
);
export const fetchExamConfigById = createAsyncThunk(
  "exam/fetchExamConfigById",
   async ({ url, header, method }, thunkApi) => {
    try {
      const data = await httpCall(url, header, method);
      return data;

    } catch (error) {
      return thunkApi.rejectWithError(error);
    }
  }
);
export const fetchExamList = createAsyncThunk(
  "exam/fetchExamList",
   async ({ url, header, method }, thunkApi) => {
    try {
      const data = await httpCall(url, header, method);
      return data;

    } catch (error) {
      return thunkApi.rejectWithError(error);
    }
  }
);
 export const updateExamDescription = createAsyncThunk(
  "exam/updateExamDescription",
   async ({ url, header, method, payload }, thunkApi) => {
    try {
      const data = await httpCall(url, header, method, payload);
      return data;

    } catch (error) {
     console.log(error)
    }
  }
);
 export const addNewExam = createAsyncThunk(
  "exam/addNewExam",
   async ({ url, header, method, payload }, thunkApi) => {
    try {
      const data = await httpCall(url, header, method, payload);
      return data;

    } catch (error) {
     console.log(error)
    }
  }
);
 export const addExamHighlights = createAsyncThunk(
  "exam/addExamHighlights",
   async ({ url, header, method, payload }, thunkApi) => {
    try {
      const data = await httpCall(url, header, method, payload);
      return data;

    } catch (error) {
     console.log(error)
    }
  }
);
 export const addExamConfig = createAsyncThunk(
  "exam/addExamConfig",
   async ({ url, header, method, payload }, thunkApi) => {
    try {
      const data = await httpCall(url, header, method, payload);
      return data;

    } catch (error) {
     console.log(error)
    }
  }
);
export const deleteExam = createAsyncThunk(
  "exam/deleteExam",
   async ({ url, header, method, payload }, thunkApi) => {
    try {
      const data = await httpCall(url, header, method, payload);
      return data;

    } catch (error) {
     console.log(error)
    }
  }
);