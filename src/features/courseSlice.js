import { createSlice } from "@reduxjs/toolkit"
import { fetchCourseDetails } from "../utils/reduxThunk/courseThunk"
import { constants } from "../utils/constants"

const initialState ={
    allCourseDetails : [],
}
const courseSlice = createSlice({
    name:"course",
    initialState,
    reducers:{

    },
    extraReducers: (builder)=>{
        builder.addCase(fetchCourseDetails.fulfilled, (state, {payload})=>{
            if(payload.status === constants.apiResponseStatus.SUCCESS){
                const modifyCourseDetails = payload.data.map((data)=>{
                    return {...data, course_fee: data.course_fee_min + " - " + data.course_fee_max}
                })
                state.allCourseDetails = modifyCourseDetails
            }
        })
    }
})
export default courseSlice.reducer