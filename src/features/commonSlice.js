import { createSlice } from '@reduxjs/toolkit'
import {
  addExamConfig,
  addExamHighlights,
  addNewExam,
  deleteExam,
  fetchExamConfigById,
  fetchExamDescriptionById,
  fetchExamHighlightsById,
  fetchExamInfoById,
  fetchExamList,
  updateExamDescription
} from '../utils/reduxThunk/examThunk'
import {
  fetchCourseBasicDetailsById,
  fetchCourseDescriptionById,
  fetchCourseDetails,
  fetchCourseDetailsById,
  fetchSyllabusDetailsById
} from '../utils/reduxThunk/courseThunk'
import {
  addNewCategory,
  approveUser,
  deleteCategory,
  fetchAllUserList,
  fetchCategory,
  fetchCategoryById,
  loginUsers
} from '../utils/reduxThunk/commonThunk'
import {
  addCollegeBasicDetails,
  addCollegeCourseOffered,
  addCollegeDescription,
  addCollegeFacilities,
  addCollegeGallary,
  addCollegeHighlight,
  deleteCollegeBasicDetails,
  fetchAgentCollegeList,
  fetchCityList,
  fetchCollegeById,
  fetchCollegeCommonById,
  fetchCollegeDiscriptionById,
  fetchCollegeGallaryById,
  fetchCollegeHighlightsById,
  fetchCourseList,
  fetchCourseOfferedById,
  fetchStateList,
  fileUpload,
  fileUploadGallary,
  fileUploadThumbnail,
  fileUploadlogo
} from '../utils/reduxThunk/collegeThunk'

const initialState = {
  isLoading: false,
  isError: false,
  errorMessage: '',
  errorType: ''
}

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    updateLoader: (state, { payload }) => {
      state.isLoading = payload.flag
    },
    updateError: (state, { payload }) => {
      state.errorType = payload.errorType
      state.errorMessage = payload.errorMessage
      state.isError = payload.flag
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchExamDescriptionById.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(fetchExamDescriptionById.fulfilled, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(fetchExamDescriptionById.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(updateExamDescription.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(updateExamDescription.fulfilled, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(updateExamDescription.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(fetchExamList.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(fetchExamList.fulfilled, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(fetchExamList.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(fetchExamInfoById.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(fetchExamInfoById.fulfilled, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(fetchExamInfoById.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(fetchExamHighlightsById.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(fetchExamHighlightsById.fulfilled, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(fetchExamHighlightsById.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(fetchExamConfigById.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(fetchExamConfigById.fulfilled, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(fetchExamConfigById.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(addNewExam.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(addNewExam.fulfilled, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(addNewExam.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(addExamHighlights.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(addExamHighlights.fulfilled, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(addExamHighlights.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(addExamConfig.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(addExamConfig.fulfilled, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(addExamConfig.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(deleteExam.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(deleteExam.fulfilled, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(deleteExam.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(fetchCourseDetails.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(fetchCourseDetails.fulfilled, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(fetchCourseDetails.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(fetchCourseDetailsById.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(fetchCourseDetailsById.fulfilled, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(fetchCourseDetailsById.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(fetchCourseDescriptionById.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(fetchCourseDescriptionById.fulfilled, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(fetchCourseDescriptionById.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(fetchCourseBasicDetailsById.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(fetchCourseBasicDetailsById.fulfilled, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(fetchCourseBasicDetailsById.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(fetchSyllabusDetailsById.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(fetchSyllabusDetailsById.fulfilled, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(fetchSyllabusDetailsById.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(loginUsers.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(loginUsers.fulfilled, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(loginUsers.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(fetchAllUserList.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(fetchAllUserList.fulfilled, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(fetchAllUserList.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(approveUser.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(approveUser.fulfilled, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(approveUser.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(fetchCategory.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(fetchCategory.fulfilled, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(fetchCategory.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(fetchCategoryById.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(fetchCategoryById.fulfilled, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(fetchCategoryById.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(deleteCategory.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(deleteCategory.fulfilled, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(deleteCategory.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(addNewCategory.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(addNewCategory.fulfilled, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(addNewCategory.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(fetchAgentCollegeList.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(fetchAgentCollegeList.fulfilled, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(fetchAgentCollegeList.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(fetchStateList.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(fetchStateList.fulfilled, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(fetchStateList.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(fetchCityList.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(fetchCityList.fulfilled, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(fetchCityList.rejected, (state, { payload }) => {
      state.isLoading = false
    })

    builder.addCase(fetchCourseList.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(fetchCourseList.fulfilled, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(fetchCourseList.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(addCollegeBasicDetails.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(addCollegeBasicDetails.fulfilled, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(addCollegeBasicDetails.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(fileUploadlogo.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(fileUploadlogo.fulfilled, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(fileUploadlogo.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(fileUploadThumbnail.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(fileUploadThumbnail.fulfilled, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(fileUploadThumbnail.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(fileUploadGallary.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(fileUploadGallary.fulfilled, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(fileUploadGallary.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(deleteCollegeBasicDetails.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(deleteCollegeBasicDetails.fulfilled, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(deleteCollegeBasicDetails.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(addCollegeDescription.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(addCollegeDescription.fulfilled, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(addCollegeDescription.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(addCollegeHighlight.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(addCollegeHighlight.fulfilled, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(addCollegeHighlight.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(addCollegeFacilities.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(addCollegeFacilities.fulfilled, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(addCollegeFacilities.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(addCollegeCourseOffered.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(addCollegeCourseOffered.fulfilled, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(addCollegeCourseOffered.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(addCollegeGallary.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(addCollegeGallary.fulfilled, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(addCollegeGallary.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(fetchCollegeById.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(fetchCollegeById.fulfilled, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(fetchCollegeById.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(fetchCourseOfferedById.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(fetchCourseOfferedById.fulfilled, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(fetchCourseOfferedById.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(fetchCollegeDiscriptionById.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(fetchCollegeDiscriptionById.fulfilled, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(fetchCollegeDiscriptionById.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(fetchCollegeHighlightsById.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(fetchCollegeHighlightsById.fulfilled, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(fetchCollegeHighlightsById.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(fetchCollegeCommonById.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(fetchCollegeCommonById.fulfilled, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(fetchCollegeCommonById.rejected, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(fetchCollegeGallaryById.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(fetchCollegeGallaryById.fulfilled, (state, { payload }) => {
      state.isLoading = false
    })
    builder.addCase(fetchCollegeGallaryById.rejected, (state, { payload }) => {
      state.isLoading = false
    })
  }
})
export const { updateLoader, updateError } = commonSlice.actions
export default commonSlice.reducer
