import React, { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid';
import InputFieldText from '../../utils/CommonComponents/InputFieldText'
import { useDispatch, useSelector } from 'react-redux'
import { resetCategory, updateACategoryInputValue, updateIsValidateError } from '../../features/categorySlice';
import CustomButton from '../../utils/CommonComponents/CustomButton';
import { constants } from '../../utils/constants';
import AddItemForm from '../AddItemForm';
import { updateError } from '../../features/commonSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { addNewCategory, fetchCategory, fetchCategoryById } from '../../utils/reduxThunk/commonThunk';


export default function AddNewCategory() {
  const {categoryInputValue, isValidateError} = useSelector(state => state.category)
  const dispatch = useDispatch();
  const {categoryId} = useParams()
  const navigate = useNavigate()

  const handleClick = async () => {
    try{
      const payload = await {
      "course_category_id":uuid(),
      "category_name":categoryInputValue
      }
      const response = await dispatch(addNewCategory({
        url : constants.apiEndPoint.CATEGORY_LIST,
        header : constants.apiHeaders.HEADER,
        method : constants.httpMethod.POST,
        payload : payload
      }))
      if (response.payload.status === constants.apiResponseStatus.SUCCESS) {
        const fetchResponse = await dispatch(fetchCategory({
          url : constants.apiEndPoint.CATEGORY_LIST,
          header : constants.apiHeaders.HEADER,
          method : constants.httpMethod.GET,
        }))
        if(fetchResponse.payload.status === constants.apiResponseStatus.SUCCESS){
          dispatch(updateError({
            errorType : constants.apiResponseStatus.SUCCESS,
            errorMessage : response.payload.data.message,
            flag : true
          }))
          dispatch(resetCategory())
          navigate('/category-list')
        }
        else{
          dispatch(updateError({
              errorType : constants.apiResponseStatus.ERROR,
              errorMessage : constants.apiResponseMessage.ERROR_MESSAGE,
              flag : true
            }))
        }
      } 
      else if(response.payload.data.toLowerCase().includes('duplicate')){
        dispatch(updateError({
          errorType : constants.apiResponseStatus.ERROR,
          errorMessage : 'Duplicate Category Not Allowed',
          flag : true
        }))
      }
      else{
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
  const handleUpdate = async ()=>{
    try{
      const payload = await {
        course_category_id : categoryId,
        category_name : categoryInputValue,
      }
      const response = await dispatch(addNewCategory({
        url : constants.apiEndPoint.CATEGORY_LIST,
        header : constants.apiHeaders.HEADER,
        method : constants.httpMethod.PUT,
        payload : payload
      }))
      if(response.payload.status === constants.apiResponseStatus.SUCCESS){
        const fetchResponse = await dispatch(fetchCategory({
          url : constants.apiEndPoint.CATEGORY_LIST,
          header : constants.apiHeaders.HEADER,
          method : constants.httpMethod.GET,
        }))
        if(fetchResponse.payload.status === constants.apiResponseStatus.SUCCESS){
          dispatch(updateError({
            errorType : constants.apiResponseStatus.SUCCESS,
            errorMessage : "Category Updated Successfully",
            flag : true
          }))
          dispatch(resetCategory())
          navigate('/category-list')
        }
        else{
          dispatch(updateError({
            errorType : constants.apiResponseStatus.ERROR,
            errorMessage : constants.apiResponseMessage.ERROR_MESSAGE,
            flag : true
          }))
        }
      }
      else{
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
  const fetchDataById = async (categoryId) =>{
    try{
      const response = await dispatch(fetchCategoryById({
        url : constants.apiEndPoint.CATEGORY_LIST+"?course_category_id="+categoryId,
        header : constants.apiHeaders.HEADER,
        method : constants.httpMethod.GET,
      }))
      if(response.payload.status === constants.apiResponseStatus.SUCCESS){
        dispatch(updateACategoryInputValue({data : response.payload.data[0].category_name}))
      }
      else{
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
    
    
    useEffect(()=>{
      if(categoryInputValue === ''){
        dispatch(updateIsValidateError({data : true}))
      }else{
        dispatch(updateIsValidateError({data : false}))
      }
    },[categoryInputValue])
    useEffect(()=>{
      if(categoryId){
        fetchDataById(categoryId)
      }
    },[])
    
  return (
    <>
    <AddItemForm>
      <div className = 'd-flex align-items-center'>
        {categoryId === '' || categoryId === undefined ?
        <>
          <InputFieldText inputValue={categoryInputValue} placeholder={'Category Name'} inputType={'text'} onChange={(e) => dispatch(updateACategoryInputValue({ data: e.target.value }))} />
          <CustomButton lable={'Add New Category'} isDisabled={isValidateError} onClick={() => handleClick()} />
        </>
        :
        <>
          <InputFieldText inputValue={categoryInputValue} placeholder={'Category Name'} inputType={'text'} onChange={(e) => dispatch(updateACategoryInputValue({ data: e.target.value }))} />
          <CustomButton lable={'Update Category'} isDisabled={isValidateError} onClick={() => handleUpdate()} />
        </>  
      }
        
        
      </div>
    </AddItemForm>
    </>   
  )
}
