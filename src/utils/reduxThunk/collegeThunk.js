import { createAsyncThunk } from "@reduxjs/toolkit";
import { httpCall } from "../service";
import { httpCall2 } from "../service2";

export const fetchAgentCollegeList = createAsyncThunk(
    'college/fetchAgentCollegeList',
    async({url, header, method}, thunkApi)=>{
        try{
            const data = await httpCall(url, header, method);
            return data;
        }
        catch(error){
            return thunkApi.rejectWithError(error);
        }
    }
)
export const fetchStateList = createAsyncThunk(
    'college/fetchStateList',
    async({url, header, method, payload}, thunkApi)=>{
        try{
            const data = await httpCall(url, header, method, payload);
            return data;
        }
        catch(error){
            return thunkApi.rejectWithError(error);
        }
    }
)
export const fetchCityList = createAsyncThunk(
    'college/fetchCityList',
    async({url, header, method, payload}, thunkApi)=>{
        try{
            const data = await httpCall(url, header, method, payload);
            return data;
        }
        catch(error){
            return thunkApi.rejectWithError(error);
        }
    }
)
export const fetchCourseList = createAsyncThunk(
    'college/fetchCourseListList',
    async({url, header, method}, thunkApi)=>{
        try{
            const data = await httpCall(url, header, method);
            return data;
        }
        catch(error){
            return thunkApi.rejectWithError(error);
        }
    }
)
export const addCollegeBasicDetails = createAsyncThunk(
    'college/addCollegeBasicDetails',
    async({url, header, method, payload}, thunkApi)=>{
        try{
            const data = await httpCall(url, header, method, payload);
            return data;
        }
        catch(error){
            return thunkApi.rejectWithError(error);
        }
    }
)
export const fileUploadlogo = createAsyncThunk(
    'college/fileUploadlogo',
    async({url, payload}, thunkApi)=>{
        try{
            const data = await httpCall2(url, payload);
            return data;
        }
        catch(error){
            return thunkApi.rejectWithError(error);
        }
    }
);
export const fileUploadThumbnail = createAsyncThunk(
    'college/fileUploadThumbnail',
    async({url, payload}, thunkApi)=>{
        try{
            const data = await httpCall2(url, payload);
            return data;
        }
        catch(error){
            return thunkApi.rejectWithError(error);
        }
    }
);
export const fileUploadGallary = createAsyncThunk(
    'college/fileUploadGallary',
    async({url, payload}, thunkApi)=>{
        try{
            const data = await httpCall2(url, payload);
            return data;
        }
        catch(error){
            return thunkApi.rejectWithError(error);
        }
    }
);
export const deleteCollegeBasicDetails = createAsyncThunk(
    "course/deleteCollegeBasicDetails",
    async({url, header, method, payload}, thunkApi)=>{
        try{
            const data = await httpCall(url, header, method, payload);
            return data;
        }
        catch(error){
            return thunkApi.rejectWithError(error)
        }
    }
);
export const addCollegeDescription = createAsyncThunk(
    "course/addCollegeDescription",
    async({url, header, method, payload}, thunkApi)=>{
        try{
            const data = await httpCall(url, header, method, payload);
            return data;
        }
        catch(error){
            return thunkApi.rejectWithError(error)
        }
    }
);
export const addCollegeHighlight = createAsyncThunk(
    "course/addCollegeHighlight",
    async({url, header, method, payload}, thunkApi)=>{
        try{
            const data = await httpCall(url, header, method, payload);
            return data;
        }
        catch(error){
            return thunkApi.rejectWithError(error)
        }
    }
);
export const addCollegeFacilities = createAsyncThunk(
    "course/addCollegeFacilities",
    async({url, header, method, payload}, thunkApi)=>{
        try{
            const data = await httpCall(url, header, method, payload);
            return data;
        }
        catch(error){
            return thunkApi.rejectWithError(error)
        }
    }
);
export const addCollegeCourseOffered = createAsyncThunk(
    "course/addCollegeCourseOffered",
    async({url, header, method, payload}, thunkApi)=>{
        try{
            const data = await httpCall(url, header, method, payload);
            return data;
        }
        catch(error){
            return thunkApi.rejectWithError(error)
        }
    }
);
export const addCollegeGallary = createAsyncThunk(
    "course/addCollegeGallary",
    async({url, header, method, payload}, thunkApi)=>{
        try{
            const data = await httpCall(url, header, method, payload);
            return data;
        }
        catch(error){
            return thunkApi.rejectWithError(error)
        }
    }
);