import React, { useEffect, useReducer, useState } from 'react'
import TextArea from '../../utils/CommonComponents/TextArea'
import { constants } from '../../utils/constants';
import {  handleExamDescriptionValidation, handleExamInfoValidation, updateDescriptionsOptions } from '../../features/examSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function ExamDescriptionForm() {
    
    const reduxDispatch = useDispatch();

    const { examDescriptionInputFieldList } = constants;

    const { examDescriptionOptions } = useSelector(state => state.exam);    

 function checkProperties(obj) {
        const getValues = Object.values(obj);
        const isEmptyValue = getValues.filter(value => value === '')
        return isEmptyValue.length > 0 ? true : false;
    }   
     const handleChange = (key,value) => {
          reduxDispatch(updateDescriptionsOptions({key,value}))
    }

    useEffect(() => {
        reduxDispatch(handleExamDescriptionValidation({flag:checkProperties(examDescriptionOptions)}))
    }, [examDescriptionOptions]);
    
   
    
  return (
  <div style={{ display: " flex", flexWrap: "wrap", gap: '3rem', margin: 'auto', padding: 'auto' }}>
                  {examDescriptionInputFieldList.map(description => (
                      <TextArea
                          key={description.keyName}
                  inputValue={examDescriptionOptions[description.keyName]}
                  placeholder={description.label}
                  onChange={(e) => handleChange(description.keyName,e.target.value)}
                  noOfROws={6}
                  noOfCols={60}
                  fieldName={description.label}
                  styles={{border:'solid #e83e8c 1px',borderRadius:"1rem"}}
              /> 
                  ))}
                 
              </div> 
  )
}
