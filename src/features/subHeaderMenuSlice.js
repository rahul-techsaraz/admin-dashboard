import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  activeSubHeader: ''
}

const subHeaderMenuSlice = createSlice({
  name: 'subheadermenu',
  initialState,
  reducers: {
    updateActiveSubHeader: (state, { payload }) => {
      state.activeSubHeader = payload.subHeaderArr
    }
  }
})

export const { updateActiveSubHeader } = subHeaderMenuSlice.actions

export default subHeaderMenuSlice.reducer
