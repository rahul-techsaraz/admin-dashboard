import { createSlice } from '@reduxjs/toolkit'
import {
    createNewCollege,
    fetchAgentCollegeList,
    fetchAllCollegeList,
    fetchCityList,
    fetchCollegeById,
    fetchCollegeCommonById,
    fetchCollegeDiscriptionById,
    fetchCollegeGallaryById,
    fetchCollegeHighlightsById,
    fetchCourseList,
    fetchCourseOfferedById,
    fetchNewCollegeById,
    fetchStateList,
    fileUploadBrochure,
    fileUploadGallary,
    fileUploadThumbnail,
    fileUploadlogo
} from '../utils/reduxThunk/collegeThunk'
import { constants } from '../utils/constants'
import { deepParseTypedJSON } from '../utils/reduxThunk/JsonDeepConverter';

const formData = localStorage.getItem('formData') ? JSON.parse(localStorage.getItem('formData')) : {};

const initialState = {
    activeStep: 0,
    allCollegeList: [],
    filteredCollegeList: [],
    agentCollegeList: [],
    allCourseDetails: [],
    isDisabled: true,
    isEdit: false,
    courseList: [],
    stateList: [],
    cityList: [],
    facultyList: [],
    highlightList: [],
    courseOfferedList: formData?.courseOffered ? JSON.parse(localStorage.getItem('formData')).courseOffered : [],
    isValitadeError: true,
    collegeBasicDetails: {
        isValitadeError: true,
        college_id: '',
        college_name: formData?.collegeBasicDetails?.college_name ? formData?.collegeBasicDetails?.college_name : '',
        location: formData?.collegeBasicDetails?.location ? formData?.collegeBasicDetails?.location : '',
        affiliate_by: formData?.collegeBasicDetails?.affiliate_by ? formData?.collegeBasicDetails?.affiliate_by : '',
        ratings: formData?.collegeBasicDetails?.ratings ? formData?.collegeBasicDetails?.ratings : '',
        state: formData?.collegeBasicDetails?.state ? formData?.collegeBasicDetails?.state : '',
        city: formData?.collegeBasicDetails?.city ? formData?.collegeBasicDetails?.city : '',
        category_name: formData?.collegeBasicDetails?.category_name ? formData?.collegeBasicDetails?.category_name : [],
        college_type: formData?.collegeBasicDetails?.college_type ? formData?.collegeBasicDetails?.college_type : '',
        college_logo: formData?.collegeBasicDetails?.college_logo ? formData?.collegeBasicDetails?.college_logo : '',
        college_thumbnail: formData?.collegeBasicDetails?.college_thumbnail ? formData?.collegeBasicDetails?.college_thumbnail : '',
        college_download_brochure_path: formData?.collegeBasicDetails?.college_download_brochure_path ? formData?.collegeBasicDetails?.college_download_brochure_path : '',
        fee_starting: formData?.collegeBasicDetails?.fee_starting ? formData?.collegeBasicDetails?.fee_starting : '',
        avg_first_year_fee: formData?.collegeBasicDetails?.avg_first_year_fee ? formData?.collegeBasicDetails?.avg_first_year_fee : '',
        message: '',
        account_name: '',
        is_publish: '',
    },
    courseOffered: {
        isValitadeError: true,
        courses_offered: formData?.courseOffered ? formData?.courseOffered : []
    },
    collegeDescriptions: {
        isValitadeError: true,
        college_description: formData?.collegeDescriptions?.college_description ? formData?.collegeDescriptions?.college_description : '',
        college_course_description: formData?.collegeDescriptions?.college_course_description ? formData?.collegeDescriptions?.college_course_description : '',
        college_highlights_description: formData?.collegeDescriptions?.college_highlights_description ? formData?.collegeDescriptions?.college_highlights_description : '',
        college_campus_description: formData?.collegeDescriptions?.college_campus_description ? formData?.collegeDescriptions?.college_campus_description : '',
        college_admission_description: formData?.collegeDescriptions?.college_admission_description ? formData?.collegeDescriptions?.college_admission_description : '',
    },
    facilities: {
        isValitadeError: true,
        facilities: formData?.facilities?.facilities ? formData?.facilities?.facilities : [],
        faculty_data: formData?.facilities?.faculty_data ? formData?.facilities?.faculty_data : [],
    },
    gallary: {
        isValitadeError: true,
        image_path: [],
        video_path: []
    },
    placements: {
        isValitadeError: true,
        placement_data: formData?.placements ? formData?.placements : []
    },
    news: {
        isValitadeError: true,
        news_data: formData?.news ? formData?.news : []
    }

}
const newCollegeSlice = createSlice({
    name: 'newCollege',
    initialState,
    reducers: {
        updateCollegeInfo: (state, { payload }) => {
            if (payload.key !== undefined) {
                state[payload.classKey][payload.key] = payload.value
            } else {
                state[payload.classKey] = payload.value
            }
        },
        updateAgentCollegeList: (state, { payload }) => {
            state.agentCollegeList = payload.data
        },
        resetCollege: () => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllCollegeList.fulfilled, (state, { payload }) => {
            if (payload.status === constants.apiResponseStatus.SUCCESS) {
                state.allCollegeList = payload.data
            }
        })
        builder.addCase(fetchAgentCollegeList.fulfilled, (state, { payload }) => {
            if (payload.status === constants.apiResponseStatus.SUCCESS) {
                const parsedJason = payload.data.map((items) => deepParseTypedJSON(items))
                const userAccountName = JSON.parse(localStorage.getItem('userData'))
                state.agentCollegeList = parsedJason.filter((data) => data.account_name === userAccountName.account_name)
            }
        })
        builder.addCase(fetchStateList.fulfilled, (state, { payload }) => {
            if (payload.length > 0) {
                state.stateList = payload
            }
        })
        builder.addCase(fetchCityList.fulfilled, (state, { payload }) => {
            if (payload.length > 0) {
                state.cityList = payload
            }
        })
        builder.addCase(fetchCourseList.fulfilled, (state, { payload }) => {
            if (payload.status === constants.apiResponseStatus.SUCCESS) {
                state.allCourseDetails = payload.data.result
            }
        })
        builder.addCase(fileUploadlogo.fulfilled, (state, { payload }) => {
            if (payload[0].status === constants.apiResponseStatus.SUCCESS) {
                state.collegeBasicDetails.college_logo = payload[0].fileName
            }
        })
        builder.addCase(fileUploadThumbnail.fulfilled, (state, { payload }) => {
            if (payload[0].status === constants.apiResponseStatus.SUCCESS) {
                state.collegeBasicDetails.college_thumbnail = payload[0].fileName
            }
        })
        builder.addCase(fileUploadBrochure.fulfilled, (state, { payload }) => {
            if (payload[0].status === constants.apiResponseStatus.SUCCESS) {
                state.collegeBasicDetails.college_download_brochure_path = payload[0].fileName
            }
        })
        builder.addCase(fileUploadGallary.fulfilled, (state, { payload }) => {
            if (payload.status === 200) {
                state.gallary.image_path = payload.data.map((filePath) => filePath.fileName).join(',')
                // state.gallary.image_path !== '' ?
                //   state.gallary.image_path + ',' + payload.data.map((filePath) => filePath.fileName).join(',') :
                //   payload.data.map((filePath) => filePath.fileName).join(',')
            }
        })
        builder.addCase(fetchCollegeById.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.collegeBasicDetails.college_id = payload.data.college_id
                state.collegeBasicDetails.college_name = payload.data.college_name
                state.collegeBasicDetails.college_type = payload.data.college_type
                state.collegeBasicDetails.affiliate_by = payload.data.affiliate_by
                state.collegeBasicDetails.state = payload.data.state
                state.collegeBasicDetails.city = payload.data.city
                state.collegeBasicDetails.location = payload.data.location
                state.collegeBasicDetails.ratings = payload.data.ratings
                state.collegeBasicDetails.college_logo = payload.data.college_logo
                state.collegeBasicDetails.college_thumbnail = payload.data.college_thumbnail
                state.collegeBasicDetails.college_download_brochure_path = payload.data.college_download_brochure_path
                state.collegeBasicDetails.message = payload.data.message
                state.collegeBasicDetails.account_name = payload.data.account_name
                state.collegeBasicDetails.is_publish = payload.data.is_publish
                state.collegeBasicDetails.category_name = payload.data.category_name
            }
        })
        builder.addCase(fetchCollegeCommonById.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.common = { ...state.common, ...payload.data }
                state.facultyList = payload.data.faculty_name.split(',')
            }
        })
        builder.addCase(fetchCollegeDiscriptionById.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.collegeDescriptions.college_id = payload.data.college_id
                state.collegeDescriptions.college_description = payload.data.college_description
                state.collegeDescriptions.college_course_description = payload.data.college_course_description
                state.collegeDescriptions.college_highlights_description = payload.data.college_highlights_description
                state.collegeDescriptions.college_campus_description = payload.data.college_campus_description
                state.collegeDescriptions.college_admission_description = payload.data.college_admission_description
            }
        })
        builder.addCase(fetchCourseOfferedById.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.courseOfferedList = payload.data
            }
        })
        builder.addCase(fetchCollegeHighlightsById.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.highlightList = payload.data
            }
        })
        builder.addCase(fetchCollegeGallaryById.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.gallary = { ...state.gallary, ...payload.data }
            }
        })
        builder.addCase(fetchNewCollegeById.fulfilled, (state, { payload }) => {
            if (payload.status === constants.apiResponseStatus.SUCCESS) {
                const parsedJason = deepParseTypedJSON(payload.data)
                state.collegeBasicDetails.account_name = parsedJason.account_name
                state.collegeBasicDetails.affiliate_by = parsedJason.affiliate_by
                state.collegeBasicDetails.avg_first_year_fee = parsedJason.avg_first_year_fee
                state.collegeBasicDetails.category_name = parsedJason.category_name
                state.collegeBasicDetails.city = parsedJason.city
                state.collegeBasicDetails.college_download_brochure_path = parsedJason.college_download_brochure_path
                state.collegeBasicDetails.college_id = parsedJason.college_id
                state.collegeBasicDetails.college_logo = parsedJason.college_logo
                state.collegeBasicDetails.college_name = parsedJason.college_name
                state.collegeBasicDetails.college_thumbnail = parsedJason.college_thumbnail
                state.collegeBasicDetails.college_type = parsedJason.college_type
                state.collegeBasicDetails.fee_starting = parsedJason.fee_starting
                state.collegeBasicDetails.is_publish = parsedJason.is_publish
                state.collegeBasicDetails.location = parsedJason.location
                state.collegeBasicDetails.message = parsedJason.message
                state.collegeBasicDetails.ratings = parsedJason.ratings
                state.collegeBasicDetails.state = parsedJason.state
                state.courseOffered.courses_offered = parsedJason.courses_offered
                state.collegeDescriptions.college_admission_description = parsedJason.description.college_admission_description
                state.collegeDescriptions.college_campus_description = parsedJason.description.college_campus_description
                state.collegeDescriptions.college_course_description = parsedJason.description.college_course_description
                state.collegeDescriptions.college_description = parsedJason.description.college_description
                state.collegeDescriptions.college_highlights_description = parsedJason.description.college_highlights_description
                state.facilities.facilities = parsedJason.facilities
                state.facilities.faculty_data = parsedJason.faculty_data
                state.gallary.image_path = parsedJason.gallary
                state.placements.placement_data = parsedJason.placement_data
                state.news.news_data = parsedJason.news_data
            }
        })
    }
})

export const { updateAgentCollegeList, updateCollegeInfo, resetCollege } = newCollegeSlice.actions
export default newCollegeSlice.reducer
