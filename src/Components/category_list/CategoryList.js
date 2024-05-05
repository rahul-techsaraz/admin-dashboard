import React, { useEffect, useState } from 'react'
import AddNewCategory from './AddNewCategory'
import { httpCall } from '../../utils/service'
import { constants } from '../../utils/constants'
import CustomTableData from '../../utils/CommonComponents/CustomTableData'
import ItemList from '../ItemList'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux'
import { deleteCategory, fetchCategory } from '../../utils/reduxThunk/commonThunk'
import { updateError } from '../../features/commonSlice'

export default function CategoryList() {
    // const [categoryData,setCategoryData]= useState([])
    const dispatch = useDispatch()
    const {categoryData} = useSelector(state=>state.category)
    const fetchCatgeoryData = async () => {
        try{
            const response = await dispatch(fetchCategory({
                url : constants.apiEndPoint.CATEGORY_LIST,
                header : constants.apiHeaders.HEADER,
                method : constants.httpMethod.GET,
            }))
            if(response.payload.status === constants.apiResponseStatus.SUCCESS){
                // dispatch(updateError({
                //     errorType : constants.apiResponseStatus.SUCCESS,
                //     errorMessage : 'Category List Fetched Successfully',
                //     flag : true
                //   }))
            }else{
                dispatch(updateError({
                    errorType : constants.apiResponseStatus.ERROR,
                    errorMessage : constants.apiResponseMessage.ERROR_MESSAGE,
                    flag : true
                  }))
            }
        }
        catch(error){
            dispatch(updateError({
                errorType : constants.apiResponseStatus.ERROR,
                errorMessage : constants.apiResponseMessage.ERROR_MESSAGE,
                flag : true
              }))
        }
    }
    const deleteCatgeoryData = async (categoryId) => {
        const payload = await {
            course_category_id:categoryId,            
        }
        const response = await dispatch(deleteCategory({
            url : constants.apiEndPoint.CATEGORY_LIST,
            header : constants.apiHeaders.HEADER,
            method : constants.httpMethod.DELETE,
            payload : payload,
        }))
        if (response.payload.status === constants.apiResponseStatus.SUCCESS) {
            await dispatch(updateError({
                errorType : constants.apiResponseStatus.SUCCESS,
                errorMessage : response.payload.data.message,
                flag : true
              }))
            await fetchCatgeoryData();
        } else {
            dispatch(updateError({
                errorType : constants.apiResponseStatus.ERRORUCCESS,
                errorMessage : constants.apiResponseMessage.ERROR_MESSAGE,
                flag : true
              }))
        }
    }
    useEffect(() => {
fetchCatgeoryData()
    },[])
    const addNewColumns = [
 
  {
      label:'Delete',
            handleDeleteItem: (rowData) => {
                deleteCatgeoryData(rowData.course_category_id)
        },
      classname:'deleteButton'

  },
    ]
    const userColumns = [
    {
      field: "category_name",
      headerName: "Category Name",
      width: 370,
      
    }
    
  ];
  return (
      <>
       
          {categoryData.length > 0 ? (
              <ItemList
                  userColumns={userColumns }
                  categoryData={categoryData }
                  addNewColumns={ addNewColumns}
                  labe={'Category Listing'}
                  path={'/add-new-category/'}
                  id={'course_category_id'}
              />
          ) : <div>Loading...</div>}
          
        <ToastContainer />

      </>
  )
}
