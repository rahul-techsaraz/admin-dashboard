import React, { useEffect, useState } from 'react'
import CustomButton from '../../utils/CommonComponents/CustomButton'
import TextArea from '../../utils/CommonComponents/TextArea'
import { constants } from '../../utils/constants';
import { fetchExamDescriptionById, updateExamTab } from '../../features/examSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function ExamDescriptionForm({ examDesc, handleChange, postDescriptionDetails,examId }) {
const [isDisabled, setDisabled] = useState(true)
    const callDispatch = useDispatch()
    const { examDescriptionInputFieldList } = constants;
    const { examDescriptionsById } = useSelector(state => state.exam)   
 function checkProperties(obj) {
        const getValues = Object.values(obj);
        const isEmptyValue = getValues.filter(value => value === '')
        console.log(isEmptyValue)
        return isEmptyValue.length > 0 ? true : false;
}    
    useEffect(() => {
        setDisabled(checkProperties(examDesc))
        console.log({examDesc})

    }, [examDesc]) 
     useEffect(() => {
        const requestPayload = {
            url: constants.apiEndPoint.EXAM_LIST + "?requestType=examDescriptionsDetails&exam_id=" + examId,
            header: constants.apiHeaders.HEADER,
            method:constants.httpMethod.GET
        }
        callDispatch(fetchExamDescriptionById(requestPayload))
    },[])
  return (
  <div style={{ display: " flex", flexWrap: "wrap", gap: '3rem', margin: 'auto', padding: 'auto' }}>
                  {examDescriptionInputFieldList.map(description => (
                      <TextArea
                          key={description.keyName}
                  inputValue={examDesc[description.keyName]}
                  placeholder={description.label}
                  onChange={(e) => handleChange(description.keyName,e.target.value)}
                  noOfROws={6}
                  noOfCols={60}
                  fieldName={description.label}
                  styles={{border:'solid #e83e8c 1px',borderRadius:"1rem"}}
              /> 
                  ))}
                  <div>
                       <CustomButton
                      lable={"Prev"}
                      isDisabled={true}
                      onClick={() => { }} />
              {examDescriptionsById && <CustomButton
                  lable={"Update"}
                  isDisabled={isDisabled}
                  onClick={() => {
                      postDescriptionDetails(constants.httpMethod.PUT)}
                  }
              />}
              {!examDescriptionsById && <CustomButton
                  lable={"Save"}
                  isDisabled={isDisabled}
                  onClick={() => postDescriptionDetails(constants.httpMethod.POST)} />}
                   <CustomButton
                      lable={"Next"}
                      isDisabled={false}
                      onClick={() => callDispatch(updateExamTab({data:"highlights"}))} />
                  </div>
              </div> 
  )
}
