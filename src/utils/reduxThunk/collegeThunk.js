import {createAsyncThunk} from '@reduxjs/toolkit';
import {httpCall} from '../service';

export const fetchCollegeDetails = createAsyncThunk(
	'college/fetchCollegeDetails',
	async ({url, header, method}, thunkApi) => {
		try {
			const data = await httpCall(url, header, method);
			console.log(data);
			return data;
		} catch (error) {
			return thunkApi.rejectWithError(error);
		}
	},
);
export const deleteCollege = createAsyncThunk(
	'college/deleteCollege',
	async ({url, header, method, payload}, thunkApi) => {
		try {
			const data = await httpCall(url, header, method, payload);
			return data;
		} catch (error) {
			console.log(error);
		}
	},
);
