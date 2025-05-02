import React, { memo, useEffect, useState } from 'react'
import InputFieldText from '../../../utils/CommonComponents/InputFieldText'
import CustomButton from '../../../utils/CommonComponents/CustomButton'
import { Chip, Stack } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { updateCollegeInfo } from '../../../features/newCollegeSlice'
import { updateError } from '../../../features/commonSlice'
import { constants } from '../../../utils/constants'
import ItemList from '../../ItemList'

const Placements = ({ collegeId, admin }) => {
    const [placementData, setPlacementData] = useState(
        {
            year: '',
            total_students: '',
            students_placed: '',
            highest_package: '',
            average_package: '',
            top_recruiters: [],
        }
    )
    const [topRecruiters, setTopRecruiters] = useState('')
    const [isDisabled, setIsDisabled] = useState(true)
    const { placements, isEdit } = useSelector((state) => state.newCollege)
    const { isValitadeError } = useSelector((state) => state.newCollege.placements)
    const dispatch = useDispatch()

    const createRecruitersList = () => {
        const data = [...placementData.top_recruiters, topRecruiters]
        setPlacementData({ ...placementData, top_recruiters: data })
        setTopRecruiters('')
    }

    const handleDelete = (value) => {
        const filteredData = placementData?.top_recruiters.filter((data) => data !== value)
        setPlacementData({ ...placementData, top_recruiters: filteredData })
    }

    const handleFormData = () => {
        if (collegeId) {
            return
        } else {
            let formData = {}
            if (localStorage.getItem('formData')) {
                formData = JSON.parse(localStorage.getItem('formData'))
            }
            localStorage.setItem('formData', JSON.stringify({ ...formData, placements: placements?.placement_data }))
        }
    }

    const createPlacementsList = () => {
        if (!JSON.stringify(placements?.placement_data).includes(placementData?.year)) {
            dispatch(updateCollegeInfo({
                classKey: 'placements',
                key: 'placement_data',
                value: [...placements?.placement_data, placementData]
            })
            )
            setPlacementData({
                year: '',
                total_students: '',
                students_placed: '',
                highest_package: '',
                average_package: '',
                top_recruiters: [],
            })
            setTopRecruiters('')
        } else {
            dispatch(updateError({
                errorType: constants.apiResponseStatus.ERROR,
                errorMessage: 'Data for this Year already exist',
                flag: true
            }))
        }
    }

    const addNewColumns = [
        {
            label: 'Delete',
            handleDeleteItem: (rowData) => {
                deletePlacements(rowData)
            },
            classname: 'deleteButton'
        }
    ]

    const deletePlacements = (rowData) => {
        const filteredData = placements?.placement_data.filter((data) => data.year !== rowData.year)
        dispatch(updateCollegeInfo({ classKey: 'placements', key: 'placement_data', value: filteredData }))
    }

    useEffect(() => {
        if (
            placementData.year !== '' &&
            placementData.total_students !== '' &&
            placementData.students_placed !== '' &&
            placementData.highest_package !== '' &&
            placementData.average_package !== '' &&
            placementData.top_recruiters.length > 0
        ) {
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    }, [
        placementData.year,
        placementData.total_students,
        placementData.students_placed,
        placementData.highest_package,
        placementData.average_package,
        placementData.top_recruiters.length
    ])

    useEffect(() => {
        if (placements.placement_data.length > 0) {
            dispatch(updateCollegeInfo({ classKey: 'placements', key: 'isValitadeError', value: false }))
            handleFormData()
        } else {
            dispatch(updateCollegeInfo({ classKey: 'placements', key: 'isValitadeError', value: true }))
            handleFormData()
        }
    }, [placements.placement_data.length])
    return (
        <>
            <div style={collegeId && !isEdit ? { display: 'none' } : { gap: '20px', display: 'flex', margin: '2.5rem 0px', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%' }}>
                <InputFieldText
                    placeholder='Year'
                    inputValue={placementData?.year}
                    inputType='text'
                    onChange={(e) => setPlacementData({ ...placementData, year: e.target.value })}
                    styles={{ width: '300px' }}
                    disabled={collegeId && !isEdit ? true : false}
                />
                <InputFieldText
                    placeholder='Total Students'
                    inputValue={placementData?.total_students}
                    inputType='text'
                    onChange={(e) => setPlacementData({ ...placementData, total_students: e.target.value })}
                    styles={{ width: '300px' }}
                    disabled={collegeId && !isEdit ? true : false}
                />
                <InputFieldText
                    placeholder='Students Placed'
                    inputValue={placementData?.students_placed}
                    inputType='text'
                    onChange={(e) => setPlacementData({ ...placementData, students_placed: e.target.value })}
                    styles={{ width: '300px' }}
                    disabled={collegeId && !isEdit ? true : false}
                />
                <InputFieldText
                    placeholder='Highest Package'
                    inputValue={placementData?.highest_package}
                    inputType='text'
                    onChange={(e) => setPlacementData({ ...placementData, highest_package: e.target.value })}
                    styles={{ width: '300px' }}
                    disabled={collegeId && !isEdit ? true : false}
                />
                <InputFieldText
                    placeholder='Average Package'
                    inputValue={placementData?.average_package}
                    inputType='text'
                    onChange={(e) => setPlacementData({ ...placementData, average_package: e.target.value })}
                    styles={{ width: '300px' }}
                    disabled={collegeId && !isEdit ? true : false}
                />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <InputFieldText
                            placeholder='Top Recruiters'
                            inputValue={topRecruiters}
                            inputType='text'
                            onChange={(e) => setTopRecruiters(e.target.value)}
                            styles={{ width: '300px' }}
                            disabled={collegeId && !isEdit ? true : false}
                        />
                        <CustomButton
                            isDisabled={topRecruiters ? false : true}
                            lable={'Add Rectuiters'}
                            onClick={() => createRecruitersList()}
                            styles={{ margin: '0px 30px', padding: '0px 20px', width: '300px', height: '40px' }}
                        />
                    </div>
                    {placementData?.top_recruiters.length > 0 &&
                        <div className='form-group' style={
                            {
                                border: 'solid #e83e8c 1px',
                                borderRadius: '1rem',
                                display: 'flex',
                                justifyContent: 'space-between',
                                flexWrap: 'wrap',
                                maxWidth: '400px',
                                padding: '7px'
                            }
                        }
                        >
                            <Stack spacing={0}>
                                {placementData?.top_recruiters.map((value, index) => (
                                    <Chip key={index} label={value} variant='outlined' onDelete={(e) => handleDelete(value)} />
                                ))}
                            </Stack>
                        </div>}
                </div>
                <CustomButton
                    isDisabled={isDisabled}
                    lable={'Add to Placements'}
                    onClick={() => createPlacementsList()}
                    styles={{ margin: '0px 30px', padding: '0px 20px', width: '300px', height: '40px' }}
                />
            </div>
            {placements?.placement_data.length > 0 && (
                <div>
                    <ItemList
                        userColumns={constants.placementsUserColumns}
                        categoryData={placements?.placement_data.map((data) => { return { ...data, id: data.year } })}
                        addNewColumns={(collegeId && !isEdit) ? [] : addNewColumns}
                        labe={'Placements Listing'}
                        id={'year'}
                        isVewdetails={false}
                    />
                </div>
            )}
        </>
    )
}

export default memo(Placements)