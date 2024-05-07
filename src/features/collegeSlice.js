import {createSlice} from '@reduxjs/toolkit';
import {fetchAgentCollegeList} from '../utils/reduxThunk/collegeThunk';
import {constants} from '../utils/constants';



const initialState = {
	collegeDescriptionsById: {},
	isEdit: false,
	collegeList: [],
	agentCollegeList: [],
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
		builder.addCase(fetchAgentCollegeList.fulfilled, (state, {payload}) => {
			if (payload.status === constants.apiResponseStatus.SUCCESS) {
				state.agentCollegeList = payload.data;
			}
		});
	},
});

// export const {} = collegeSlice.actions;
export default collegeSlice.reducer;
