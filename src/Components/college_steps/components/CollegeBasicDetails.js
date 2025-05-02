import React, { memo, useContext, useEffect, useState } from 'react'
import InputFieldText from '../../../utils/CommonComponents/InputFieldText'
import UploadFile from '../../../utils/CommonComponents/UploadFile'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import SearchSelectBox from '../../../utils/CommonComponents/SearchSelectBox'
// import { resetCollege, updateCollegeInfo } from '../../../features/collegeSlice'
import { updateError } from '../../../features/commonSlice'
import { constants } from '../../../utils/constants'
import { addCollegeBasicDetails, deleteCollegeBasicDetails, fetchCityList, fetchCollegeById, fetchStateList, fileUploadBrochure, fileUploadlogo, fileUploadThumbnail } from '../../../utils/reduxThunk/collegeThunk'
import { FileUpload } from '../../../utils/FileUpload'
import DataToDisplay from '../../course_list/DataToDisplay'
import CustomButton from '../../../utils/CommonComponents/CustomButton'
import { fileTouploadPayload } from '../../../utils/fileUploadService'
import { v4 as uuid } from 'uuid'
import { useNavigate } from 'react-router-dom'
import { resetCollege, updateCollegeInfo } from '../../../features/newCollegeSlice'
import MultySelect from '../../../utils/CommonComponents/MultySelect'

const CollegeBasicDetails = ({ collegeId, admin }) => {
    const { collegeLogo, collegeThumbnail, collegeBrochure, setCollegeBrochure, setCollegeBrochureUrl, setCollegeLogo, setCollegeThumbnail, setCollegeLogoUrl, setCollegeThumbnailUrl } = useContext(FileUpload)
    const [searchSelectDisabled, setSearchSelectDisabled] = useState(true)
    // const [promiseResponse, setPromiseResponse] = useState({
    //     college_id: '',
    //     p_response: false,
    // })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { stateList, cityList, isEdit } = useSelector((state) => state.newCollege)
    const { isValitadeError, college_id, college_name, location, affiliate_by, ratings, state, city, college_type, college_logo, college_thumbnail, college_download_brochure_path, message, account_name, category_name, fee_starting, avg_first_year_fee } =
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
    // const updateCollege = async () => {
    //     try {
    //         const collegeInfoPayload = await {
    //             college_id: collegeId,
    //             college_name: college_name,
    //             location: location,
    //             affiliate_by: affiliate_by,
    //             ratings: ratings,
    //             college_logo: college_logo,
    //             college_thumbnail: college_thumbnail,
    //             state: state,
    //             city: city,
    //             college_type: college_type,
    //             category_name: category_name,
    //             account_name: account_name,
    //             is_publish: constants.courseIsPublished.notPublished,
    //             message: message
    //         }
    //         const response = await dispatch(
    //             addCollegeBasicDetails({
    //                 url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=basicCollegeListing',
    //                 header: constants.apiHeaders.HEADER,
    //                 method: constants.httpMethod.PUT,
    //                 payload: collegeInfoPayload
    //             })
    //         )
    //         if (response.payload.status === constants.apiResponseStatus.SUCCESS) {
    //             dispatch(
    //                 updateError({
    //                     errorType: constants.apiResponseStatus.SUCCESS,
    //                     errorMessage: 'College Basic Details Updated Sucessfully',
    //                     flag: true
    //                 })
    //             )
    //             dispatch(updateCollegeInfo({ classKey: 'isEdit', value: false }))
    //         } else {
    //             dispatch(
    //                 updateError({
    //                     errorType: constants.apiResponseStatus.ERROR,
    //                     errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
    //                     flag: true
    //                 })
    //             )
    //         }
    //     } catch (error) {
    //         dispatch(
    //             updateError({
    //                 errorType: constants.apiResponseStatus.ERROR,
    //                 errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
    //                 flag: true
    //             })
    //         )
    //     }
    // }
    // const handleCancle = async () => {
    //     try {
    //         const response = await dispatch(
    //             fetchCollegeById({
    //                 url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=basicCollegeListing&college_id=' + collegeId,
    //                 header: constants.apiHeaders.HEADER,
    //                 method: constants.httpMethod.GET
    //             })
    //         )
    //         if (response.payload.status === constants.apiResponseStatus.SUCCESS) {
    //             dispatch(updateCollegeInfo({ classKey: 'isEdit', value: false }))
    //             setCollegeLogo([])
    //             setCollegeThumbnail([])
    //             setCollegeBrochure([])
    //             setCollegeLogoUrl([])
    //             setCollegeThumbnailUrl([])
    //             setCollegeBrochureUrl([])
    //         } else {
    //             dispatch(
    //                 updateError({
    //                     errorType: constants.apiResponseStatus.ERROR,
    //                     errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
    //                     flag: true
    //                 })
    //             )
    //         }
    //     } catch (error) {
    //         dispatch(
    //             updateError({
    //                 errorType: constants.apiResponseStatus.ERROR,
    //                 errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
    //                 flag: true
    //             })
    //         )
    //     }
    // }
    // const removeCollegeLogo = () => {
    //     dispatch(updateCollegeInfo({ classKey: 'collegeBasicDetails', key: 'college_logo', value: '' }))
    // }
    // const removeCollegeThumbnail = () => {
    //     dispatch(updateCollegeInfo({ classKey: 'collegeBasicDetails', key: 'college_thumbnail', value: '' }))
    // }
    // const removeCollegeBrochure = () => {
    //     dispatch(updateCollegeInfo({ classKey: 'collegeBasicDetails', key: 'college_download_brochure_path', value: '' }))
    // }
    // const uploadLogo = async () => {
    //     try {
    //         const logoPayload = await fileTouploadPayload(collegeLogo)
    //         const resolved = await
    //             dispatch(
    //                 fileUploadlogo({
    //                     url: constants.apiEndPoint.UPLOAD_FILE + '?dir=colleges',
    //                     payload: logoPayload
    //                 })
    //             )
    //         if (resolved.payload[0].status !== constants.apiResponseStatus.SUCCESS && resolved.payload[0].error === true) {
    //             dispatch(updateError({
    //                 errorType: constants.apiResponseStatus.ERROR,
    //                 errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
    //                 flag: true
    //             }))
    //         } else {
    //             setCollegeLogoUrl('')
    //             dispatch(updateError({
    //                 errorType: constants.apiResponseStatus.SUCCESS,
    //                 errorMessage: "Logo Uploaded Successfully",
    //                 flag: true
    //             }))
    //         }
    //     }
    //     catch (error) {
    //         dispatch(
    //             updateError({
    //                 errorType: constants.apiResponseStatus.ERROR,
    //                 errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
    //                 flag: true
    //             })
    //         )
    //     }
    // }
    // const uploadThumbnail = async () => {
    //     try {
    //         const thumbnailPayload = await fileTouploadPayload(collegeThumbnail)
    //         const resolved = await
    //             dispatch(
    //                 fileUploadThumbnail({
    //                     url: constants.apiEndPoint.UPLOAD_FILE + '?dir=colleges',
    //                     payload: thumbnailPayload
    //                 })
    //             )
    //         if (resolved.payload[0].status !== constants.apiResponseStatus.SUCCESS && resolved.payload[0].error === true) {
    //             dispatch(updateError({
    //                 errorType: constants.apiResponseStatus.ERROR,
    //                 errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
    //                 flag: true
    //             }))
    //         } else {
    //             setCollegeThumbnailUrl('')
    //             dispatch(updateError({
    //                 errorType: constants.apiResponseStatus.SUCCESS,
    //                 errorMessage: "Thumbnail Uploaded Successfully",
    //                 flag: true
    //             }))
    //         }
    //     }
    //     catch (error) {
    //         dispatch(
    //             updateError({
    //                 errorType: constants.apiResponseStatus.ERROR,
    //                 errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
    //                 flag: true
    //             })
    //         )
    //     }
    // }
    // const uploadBrochure = async () => {
    //     try {
    //         const brochurePayload = await fileTouploadPayload(collegeBrochure)
    //         const resolved = await
    //             dispatch(
    //                 fileUploadBrochure({
    //                     url: constants.apiEndPoint.UPLOAD_FILE + '?dir=colleges',
    //                     payload: brochurePayload
    //                 })
    //             )
    //         if (resolved.payload[0].status !== constants.apiResponseStatus.SUCCESS && resolved.payload[0].error === true) {
    //             dispatch(updateError({
    //                 errorType: constants.apiResponseStatus.ERROR,
    //                 errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
    //                 flag: true
    //             }))
    //         } else {
    //             setCollegeBrochureUrl('')
    //             dispatch(updateError({
    //                 errorType: constants.apiResponseStatus.SUCCESS,
    //                 errorMessage: "Brochure Uploaded Successfully",
    //                 flag: true
    //             }))
    //         }
    //     }
    //     catch (error) {
    //         dispatch(
    //             updateError({
    //                 errorType: constants.apiResponseStatus.ERROR,
    //                 errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
    //                 flag: true
    //             })
    //         )
    //     }
    // }
    // const updateDraft = async () => {
    //     const collegeInfoUpdatedPayload = {
    //         college_id: promiseResponse.college_id,
    //         college_name: college_name,
    //         location: location,
    //         affiliate_by: affiliate_by,
    //         ratings: ratings,
    //         college_logo: college_logo,
    //         college_thumbnail: college_thumbnail,
    //         college_download_brochure_path: college_download_brochure_path,
    //         state: state,
    //         city: city,
    //         college_type: college_type,
    //         category_name: category_name,
    //         account_name: JSON.parse(localStorage.getItem('userData')).account_name,
    //         is_publish: constants.courseIsPublished.draft,
    //         message: message,
    //     }
    //     const collegeDeletePayload = {
    //         college_id: promiseResponse.college_id
    //     }
    //     const response = await dispatch(addCollegeBasicDetails({
    //         url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=basicCollegeListing',
    //         header: constants.apiHeaders.HEADER,
    //         method: constants.httpMethod.PUT,
    //         payload: collegeInfoUpdatedPayload
    //     })
    //     )
    //     if (response.payload.status !== constants.apiResponseStatus.SUCCESS) {
    //         dispatch(
    //             updateError({
    //                 errorType: constants.apiResponseStatus.ERROR,
    //                 errorMessage: 'Something went Wrong',
    //                 flag: true
    //             })
    //         )
    //         dispatch(
    //             deleteCollegeBasicDetails({
    //                 url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=basicCollegeListing',
    //                 header: constants.apiHeaders.HEADER,
    //                 method: constants.httpMethod.DELETE,
    //                 payload: collegeDeletePayload
    //             })
    //         )
    //         dispatch(resetCollege())
    //         setCollegeLogo([])
    //         setCollegeThumbnail([])
    //         setCollegeBrochure([])
    //         setCollegeLogoUrl([])
    //         setCollegeThumbnailUrl([])
    //         setCollegeBrochureUrl([])
    //         return
    //     } else {
    //         dispatch(updateError({
    //             errorType: constants.apiResponseStatus.SUCCESS,
    //             errorMessage: 'Draft Saved Successfully',
    //             flag: true
    //         })
    //         )
    //         dispatch(resetCollege())
    //         setCollegeLogo([])
    //         setCollegeThumbnail([])
    //         setCollegeBrochure([])
    //         setCollegeLogoUrl([])
    //         setCollegeThumbnailUrl([])
    //         setCollegeBrochureUrl([])
    //         navigate('/list-agent-college')
    //     }
    // }
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