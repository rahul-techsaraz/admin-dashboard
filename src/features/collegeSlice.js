import {createSlice} from '@reduxjs/toolkit';
import {fetchCollegeDetails} from '../utils/reduxThunk/collegeThunk';
import {constants} from '../utils/constants';

const initialState = {
	collegeDescriptionsById: {},
	isEdit: false,
	collegeList: [],
	isValidationError: true,
	collegeInfo: {
		collegeName: '',
		location: '',
		affiliateBy: '',
		courseOffered: '',
		placements: '',
		ratings: '',
		state: '',
		city: '',
		type: '',
	},
};
const collegeSlice = createSlice({
	name: 'college',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(fetchCollegeDetails.fulfilled, (state, {payload}) => {
			if (payload.status === constants.apiResponseStatus.SUCCESS) {
				state.isEdit = false;
				state.collegeList = payload.data;
			}
		});
	},
});

// export const {} = collegeSlice.actions;
export default collegeSlice.reducer;
