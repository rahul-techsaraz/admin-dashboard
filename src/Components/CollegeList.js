import React, {useEffect} from 'react';
import ItemList from './ItemList';
import {useDispatch, useSelector} from 'react-redux';
import {constants} from '../utils/constants';
import {toast} from 'react-toastify';
import {deleteCollege, fetchCollegeDetails} from '../utils/reduxThunk/collegeThunk';
import {updateError} from '../features/commonSlice';

export default function CollegeList() {
	const dispatch = useDispatch();
	const {collegeList} = useSelector(state => state.college);
	const userColumns = [
		{
			field: 'college_name',
			headerName: 'College Name',
			width: 200,
		},
		{
			field: 'location',
			headerName: 'Location',
			width: 200,
		},
		{
			field: 'affiliate_by',
			headerName: 'Affiliate_by',
			width: 200,
		},
		{
			field: 'course_offered',
			headerName: 'Course_offered',
			width: 200,
		},
		{
			field: 'placements',
			headerName: 'Placements',
			width: 200,
		},
		{
			field: 'ratings',
			headerName: 'Ratings',
			width: 200,
		},
		{
			field: 'state',
			headerName: 'State',
			width: 200,
		},
		{
			field: 'city',
			headerName: 'City',
			width: 200,
		},
		{
			field: 'type',
			headerName: 'Type',
			width: 200,
		},
	];

	const addNewColumns = [
		{
			label: 'Delete',
			handleDeleteItem: rowData => {
				// alert("Are you sure want to delete")
				deleteCollegeListById(rowData.college_id);
			},
			classname: 'deleteButton',
		},
	];

	const fetchCollegeList = async () => {
		try {
			dispatch(
				fetchCollegeDetails({
					url: constants.apiEndPoint.COLLEGE_DETAILS,
					header: constants.apiHeaders.HEADER,
					method: constants.httpMethod.GET,
				}),
			);
		} catch (error) {
			toast.error('Something Went wrong . Please try again !');
		}
	};
	const deleteCollegeListById = async collegeId => {
		try {
			const payload = await {
				college_id: collegeId,
			};
			const data = await dispatch(
				deleteCollege({
					url: constants.apiEndPoint.COLLEGE_DETAILS,
					header: constants.apiHeaders.HEADER,
					method: constants.httpMethod.DELETE,
					payload,
				}),
			);
			if (data.payload.status === constants.apiResponseStatus.SUCCESS) {
				dispatch(
					updateError({
						errorType: constants.apiResponseStatus.SUCCESS,
						errorMessage: 'College deleted successfully!',
						flag: true,
					}),
				);
				await fetchCollegeList();
			} else {
				dispatch(
					updateError({
						errorType: constants.apiResponseStatus.ERROR,
						errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
						flag: true,
					}),
				);
			}
		} catch (err) {
			dispatch(
				updateError({
					errorType: constants.apiResponseStatus.ERROR,
					errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
					flag: true,
				}),
			);
		}
	};

	useEffect(() => {
		fetchCollegeList();
	}, []);

	
	return (
		<>
			<ItemList
				userColumns={userColumns}
				categoryData={collegeList}
				addNewColumns={addNewColumns}
				label={'college List'}
			/>
		</>
	);
}
