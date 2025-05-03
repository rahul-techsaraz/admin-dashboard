import React, { memo, useEffect, useState } from 'react'
import InputFieldText from '../../../utils/CommonComponents/InputFieldText'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import SearchSelectBox from '../../../utils/CommonComponents/SearchSelectBox'
import { updateError } from '../../../features/commonSlice'
import { constants } from '../../../utils/constants'
import { fetchCityList, fetchStateList } from '../../../utils/reduxThunk/collegeThunk'
import { updateCollegeInfo } from '../../../features/newCollegeSlice'
import MultySelect from '../../../utils/CommonComponents/MultySelect'

const CollegeBasicDetails = ({ collegeId }) => {
    const [searchSelectDisabled, setSearchSelectDisabled] = useState(true)
    const dispatch = useDispatch()
    const { stateList, cityList, isEdit } = useSelector((state) => state.newCollege)
    const { college_name, location, affiliate_by, ratings, state, city, college_type, category_name, fee_starting, avg_first_year_fee } =
        useSelector((state) => state.newCollege.collegeBasicDetails, shallowEqual)
    const { categoryData } = useSelector(state => state.category)

    const fetchState = async () => {
        try {
            const response = await dispatch(fetchStateList({
                url: constants.apiEndPoint.STATE_LIST,
                header: { "X-CSCAPI-KEY": "YW5VbnUwYURRYXhhU242R3VqMTVZZ1lHM0k0Wmo1TjY2ZUlVTTBQbA==" },
                method: constants.httpMethod.GET,
            })
            )
            if (response.payload.length === 0) {
                console.log("from state fetch")
                dispatch(updateError({
                    errorType: constants.apiResponseStatus.ERROR,
                    errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
                    flag: true
                })
                )
            }
        } catch (error) {
            dispatch(updateError({
                errorType: constants.apiResponseStatus.ERROR,
                errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
                flag: true
            })
            )
        }
    }

    const stateIso = (state) => {
        return stateList.filter((data) => data.name === state)[0].iso2
    }

    const fetchCity = async () => {
        try {
            const response = await dispatch(fetchCityList({
                url: `${constants.apiEndPoint.CITY_LIST}${stateIso(state)}/cities`,
                header: { "X-CSCAPI-KEY": "YW5VbnUwYURRYXhhU242R3VqMTVZZ1lHM0k0Wmo1TjY2ZUlVTTBQbA==" },
                method: constants.httpMethod.GET,
            })
            )
            if (response.payload.length === 0) {
                dispatch(updateError({
                    errorType: constants.apiResponseStatus.ERROR,
                    errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
                    flag: true
                })
                )
                setSearchSelectDisabled(true)
            } else {
                setSearchSelectDisabled(false)
            }
        } catch (error) {
            dispatch(updateError({
                errorType: constants.apiResponseStatus.ERROR,
                errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
                flag: true
            })
            )
        }
    }

    const handleFormData = (value, classKey, key) => {
        if (collegeId) {
            dispatch(updateCollegeInfo({ classKey: classKey, key: key, value: value }))
        } else {
            let formData = {}
            if (localStorage.getItem('formData')) {
                formData = JSON.parse(localStorage.getItem('formData'))
            }
            const data = {
                ...formData[classKey], [key]: value
            }
            const updatedFormData = {
                ...formData,
                [classKey]: data
            };
            localStorage.setItem('formData', JSON.stringify(updatedFormData))
            dispatch(updateCollegeInfo({ classKey: classKey, key: key, value: value }))
        }
    }

    const ifNoCity = () => {
        dispatch(updateCollegeInfo({ classKey: 'cityList', value: [] }))
        let formData = {}
        if (localStorage.getItem('formData')) {
            formData = JSON.parse(localStorage.getItem('formData'))
        }
        delete formData?.collegeBasicDetails?.city
        localStorage.setItem('formData', JSON.stringify(formData))
        setSearchSelectDisabled(true)
    }

    useEffect(() => {
        fetchState()
        if (state !== '' && state !== undefined && state !== null) {
            fetchCity()
        } else {
            dispatch(updateCollegeInfo({ classKey: 'cityList', value: [] }))
            handleFormData('', 'collegeBasicDetails', 'city')
            setSearchSelectDisabled(true)
        }
    }, [])

    useEffect(() => {
        if (state !== '' && state !== undefined && state !== null) {
            fetchCity()
        } else {
            ifNoCity()
        }
    }, [state])

    useEffect(() => {
        if (
            college_name !== '' &&
            category_name.length > 0 &&
            location !== '' &&
            affiliate_by !== '' &&
            ratings !== '' &&
            state !== '' &&
            city !== '' &&
            college_type !== '' &&
            fee_starting !== '' &&
            avg_first_year_fee !== ''
        ) {
            dispatch(updateCollegeInfo({ classKey: 'collegeBasicDetails', key: 'isValitadeError', value: false }))
        } else {
            dispatch(updateCollegeInfo({ classKey: 'collegeBasicDetails', key: 'isValitadeError', value: true }))
        }
    }, [college_name, category_name, location, affiliate_by, ratings, state, city, college_type, fee_starting, avg_first_year_fee])

    return (
        <>
            <div style={{ gap: '20px', display: 'flex', margin: '2.5rem 0px', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%' }}>
                <InputFieldText
                    placeholder='College Name'
                    inputValue={college_name}
                    inputType='text'
                    onChange={(e) => handleFormData(e.target.value, 'collegeBasicDetails', 'college_name')}
                    styles={{ width: '300px' }}
                    disabled={collegeId && !isEdit ? true : false}
                />
                <MultySelect
                    label='Category'
                    options={categoryData.length > 0 ? categoryData.map(data => (data.category_name)) : []}
                    onChange={(e, value) => handleFormData(value, 'collegeBasicDetails', 'category_name')}
                    value={category_name}
                    disabled={collegeId && !isEdit ? true : false}
                />
                <SearchSelectBox
                    label='College Type'
                    options={constants.collegeType.map((data) => data.label)}
                    onChange={(e, value) => value ? handleFormData(value, 'collegeBasicDetails', 'college_type') : handleFormData('', 'collegeBasicDetails', 'college_type')}
                    value={college_type}
                    disabled={collegeId && !isEdit ? true : false}
                />
                <InputFieldText
                    placeholder='Affiliate By'
                    inputValue={affiliate_by}
                    inputType='text'
                    onChange={(e) => handleFormData(e.target.value, 'collegeBasicDetails', 'affiliate_by')}
                    styles={{ width: '300px' }}
                    disabled={collegeId && !isEdit ? true : false}
                />
                <SearchSelectBox
                    label='State'
                    options={stateList.length > 0 ? stateList.map((data) => data.name) : []}
                    onChange={(e, value) => value ? handleFormData(value, 'collegeBasicDetails', 'state') : handleFormData('', 'collegeBasicDetails', 'state')}
                    value={state}
                    disabled={collegeId && !isEdit ? true : false}
                />
                <SearchSelectBox
                    label='City'
                    options={cityList.length > 0 ? cityList.map((data) => data.name) : []}
                    onChange={(e, value) => value ? handleFormData(value, 'collegeBasicDetails', 'city') : handleFormData('', 'collegeBasicDetails', 'city')}
                    value={city}
                    disabled={searchSelectDisabled || (collegeId && !isEdit ? true : false)}
                />
                <InputFieldText
                    placeholder='College Location'
                    inputValue={location}
                    inputType='text'
                    onChange={(e) => handleFormData(e.target.value, 'collegeBasicDetails', 'location')}
                    styles={{ width: '300px' }}
                    disabled={collegeId && !isEdit ? true : false}
                />
                <SearchSelectBox
                    label='Ratings'
                    options={constants.ratings.map((data) => data.label)}
                    onChange={(e, value) => value ? handleFormData(value, 'collegeBasicDetails', 'ratings') : handleFormData('', 'collegeBasicDetails', 'ratings')}
                    value={ratings}
                    disabled={collegeId && !isEdit ? true : false}
                />
                <InputFieldText
                    placeholder='Fee Starting'
                    inputValue={fee_starting}
                    inputType='text'
                    onChange={(e) => handleFormData(e.target.value, 'collegeBasicDetails', 'fee_starting')}
                    styles={{ width: '300px' }}
                    disabled={collegeId && !isEdit ? true : false}
                />
                <InputFieldText
                    placeholder='Average First Year Fee'
                    inputValue={avg_first_year_fee}
                    inputType='text'
                    onChange={(e) => handleFormData(e.target.value, 'collegeBasicDetails', 'avg_first_year_fee')}
                    styles={{ width: '300px' }}
                    disabled={collegeId && !isEdit ? true : false}
                />
            </div>
        </>
    )
}

export default memo(CollegeBasicDetails)