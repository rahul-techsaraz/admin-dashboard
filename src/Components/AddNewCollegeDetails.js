import React, {useState} from 'react';
import AddItemForm from './AddItemForm';
import AddCollege from './AddCollege';
import CustomButton from '../utils/CommonComponents/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {v4 as uuid} from 'uuid';

export default function AddNewCollegeDetails() {
	const dispatch = useDispatch();
	const [isDisabled, setDisabled] = useState(true);

	const {collegeInfo} = useSelector(state => state.college);
	const createNewCollege = async () => {
		try {
			const collegeId = await uuid();
			const collegeInfoPayload = await {
				college_id: collegeId,
				college_name: collegeInfo.collegeName,
				location: collegeInfo.location,
				affiliate_by: collegeInfo.affiliate_By,
				course_offered: collegeInfo.courseOffered,
				placements: collegeInfo.placements,
				ratings: collegeInfo.ratings,
				state: collegeInfo.state,
				city: collegeInfo.city,
				type: collegeInfo.type,
			};
			const collegeInfoResponse = await dispatch();
		} catch (err) {}
	};
	return (
		<>
			<AddItemForm label={' Add New College '}>
				<div style={{display: 'flex', flexDirection: 'column'}}>
					<AddCollege />
				</div>
				<div style={{display: 'flex'}}>
					<CustomButton
						isDisabled={isDisabled}
						label={'Submit'}
						onClick={() => createNewCollege()}
					/>
				</div>
			</AddItemForm>
		</>
	);
}
