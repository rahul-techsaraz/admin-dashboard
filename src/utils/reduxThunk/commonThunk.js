import { createApiThunk } from '../apiThunk'

export const authenticateUsers = createApiThunk('auth/authenticateUser')
export const loginUsers = createApiThunk('login/loginUsers')
export const addNewCategory = createApiThunk('category/addNewCategory')
export const deleteCategory = createApiThunk('category/deleteCategory')
export const fetchCategory = createApiThunk('category/fetchCategory')
export const fetchCategoryById = createApiThunk('category/fetchCategoryById')
export const fetchAllAdminUserList = createApiThunk('users/fetchAllAdminUserList')
export const fetchAllUsersList = createApiThunk('users/fetchAllUsersList')
export const fetchUserByEmail = createApiThunk('users/fetchUserByEmail')
export const approveUser = createApiThunk('users/approveUser')
