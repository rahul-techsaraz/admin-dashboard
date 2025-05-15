import { createApiThunk } from '../apiThunk'
import { httpCall2 } from '../service2'

export const fetchAllCollegeList = createApiThunk('college/fetchAllCollegeList')

export const fetchAgentCollegeList = createApiThunk('college/fetchAgentCollegeList')
export const fetchStateList = createApiThunk('college/fetchStateList')
export const fetchCityList = createApiThunk('college/fetchCityList')
export const createNewCollege = createApiThunk('newCollege/AddNewCollege', httpCall2)
export const updateCollegeById = createApiThunk('newCollege/updateCollegeById')
export const fetchNewCollegeById = createApiThunk('newCollege/fetchNewCollegeById')
export const deleteNewCollegeById = createApiThunk('newCollege/deleteNewCollegeById')
