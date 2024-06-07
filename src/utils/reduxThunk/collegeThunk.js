import { createAsyncThunk } from "@reduxjs/toolkit";
import { httpCall } from "../service";

export const fetchAgentCollegeList = createAsyncThunk(
    'college/fetchAgentCollegeList',
    async({url, header, method}, thunkApi)=>{
        try{
            const data = await httpCall(url, header, method);
            console.log(data)
            return data;
        }
        catch(error){
            return thunkApi.rejectWithError(error);
        }
    }
)