import {constants} from '../utils/constants';
import React, {useEffect, useState} from 'react';
import InputFieldText from '../utils/CommonComponents/InputFieldText';
import TextArea from '../utils/CommonComponents/TextArea';
import SelectBox from '../utils/CommonComponents/SelectBox';

function valuetext(value) {
	return value;
}

export default function CollegeBasicDetails() {
	const [collegeName, setCollegeName] = useState([]);
	const [value, setValue] = useState([20, 37]);

	const handleDelete = e => {
		const filteredData = collegeName.filter(
			data =>
				data.college_name !==
				e.target.parentElement.parentElement.childNodes[0].innerText,
		);
		setCollegeName(filteredData);
	};
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	useEffect(() => {
		console.log(collegeName);
	}, [collegeName]);
	return (
		<>
			<div
				style={{
					gap: '20px',
					display: 'flex',
					margin: '2.5rem 0px',
					flexWrap: 'wrap',
					justifyContent: 'space-between',
				}}
			>
				<InputFieldText
					inputType="text"
					placeholder="College Name"
					styles={{width: '280px'}}
				/>
				<InputFieldText
					inputType="text"
					placeholder="Location"
					styles={{width: '280px'}}
				/>
				<TextArea
					placeholder={'Affiliate By'}
					noOfROws={6}
					noOfCols={55}
					fieldName={'Affiliate By'}
					styles={{border: 'solid #e83e8c 1px', borderRadius: '1rem'}}
				/>
				<SelectBox
					label={'course_offered'}
					options={constants.collegeBasicDetailsCourseOfferedSelectBox}
					styles={{width: '280px', height: '38px'}}
				/>
				<InputFieldText
					inputType="text"
					placeholder="placements"
					styles={{width: '280px'}}
				/>
				<InputFieldText
					inputType="text"
					placeholder="ratings"
					styles={{width: '280px'}}
				/>
				<SelectBox
					label={'State'}
					options={constants.collegeBasicDetailsStateSelectBox}
					styles={{width: '280px', height: '38px'}}
				/>
				<SelectBox
					label={'City'}
					options={constants.collegeBasicDetailsCitySelectBox}
					styles={{width: '280px', height: '38px'}}
				/>
				<SelectBox
					label={'Type'}
					options={constants.collegeBasicDetailsTypeSelectBox}
					styles={{width: '280px', height: '38px'}}
				/>
			</div>
		</>
	);
}
