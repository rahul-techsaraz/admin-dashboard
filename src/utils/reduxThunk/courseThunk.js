import { createAsyncThunk } from "@reduxjs/toolkit";
import { httpCall } from "../service";

export const fetchCourseDetails = createAsyncThunk(
    "coures/fetchCourseDetails",
    async({url, header, method}, thunkApi) => {
        try{
            const data = await httpCall(url, header, method);
            return data;
        }
        catch(error){
            return thunkApi.rejectWithError(error);
        }
    }
);
