import React, { useEffect, useState } from 'react'
import TextArea from '../../utils/CommonComponents/TextArea'
import { useDispatch, useSelector } from 'react-redux'
import { resetCourse, updateCourseInfo } from '../../features/courseSlice'
import CustomButton from '../../utils/CommonComponents/CustomButton'
import ItemList from '../ItemList'
import SelectBox from '../../utils/CommonComponents/SelectBox'
import { constants } from '../../utils/constants'
import { v4 as uuid } from 'uuid'
import { updateError } from '../../features/commonSlice'
import { addSyllabusDetails, fetchSyllabusDetailsById } from '../../utils/reduxThunk/courseThunk'
import DataToDisplay from './DataToDisplay'
import CustomDialogPopup from '../../utils/CommonComponents/CustomDialogPopup'

export default function SyllabusDetails({courseId}) {
    const [isEditSyllabusDetails, setIsEditSyllabusDetails] = useState(false);
    const [selectedSemester, setSelectedSemester] = useState('');
    const [filteredSelectedData, setFilteredSelectedData] = useState([])
    useEffect(() => {
    console.log(filteredSelectedData)
})

    const id = uuid();
    const dispatch = useDispatch()
    const {
        isValidationError,
        course_id,
        year_name,
        semester_name,
        list_of_subject,
        accumulated_data,
    } = useSelector(state=>state.course.syllabusDetails)
    const {isEdit, isEditSyllabus} = useSelector(state=>state.course)
    
    const addNewColumns = [
        {
            label:'Delete',
            handleDeleteItem: (rowData) => {
                deleteSyllabus(rowData.id)
            },
            classname:'deleteButton'
        },
        {
            label:'Edit',
            handleDeleteItem: (rowData) => {
                setSelectedSemester(rowData.semester_name);
                setIsEditSyllabusDetails(true);

            },
            classname:'deleteButton'
        },
    ]
    useEffect(() => {
               const filterData = accumulated_data.filter(syllabus => syllabus.semester_name === selectedSemester);
                setFilteredSelectedData(filterData)
    },[selectedSemester])
    const deleteSyllabus = (id)=>{
        const filteredData = accumulated_data.filter(data=>data.id !== id)
        dispatch(updateCourseInfo({classKey : "syllabusDetails", key : 'accumulated_data', value : filteredData}))
    }
    
    const addSylabusDetails = ()=>{
        if(year_name !== '' && semester_name !== '' && list_of_subject !== ''){
            dispatch(updateCourseInfo({classKey : 'syllabusDetails', key : 'accumulated_data', value : [...accumulated_data, {id, year_name, semester_name, list_of_subject}]}))
            dispatch(updateCourseInfo({classKey : "isEditSyllabus", value : false}))
        }
    }
    const updateCourse = async()=>{
        try {
            if (courseId) {
                const syllabusDetailsPayload = await{
                id : filteredSelectedData[0].id,
                course_id : courseId,
                year_name : filteredSelectedData[0].year_name,
                semester_name : filteredSelectedData[0].semester_name,
                list_of_subject : filteredSelectedData[0].list_of_subject,
            }
            const response = await dispatch(addSyllabusDetails({
                url : constants.apiEndPoint.COURSE_DETAILS+'?requestType=basicSyllabusDetails',
                header : constants.apiHeaders.HEADER,
                method : constants.httpMethod.PUT,
                payload : syllabusDetailsPayload
            }))
            if(response.payload.status === constants.apiResponseStatus.SUCCESS){
                const response = await dispatch(fetchSyllabusDetailsById({
                    url : constants.apiEndPoint.COURSE_DETAILS+"?requestType=basicSyllabusDetails&course_id="+courseId,
                    header : constants.apiHeaders.HEADER,
                    method : constants.httpMethod.GET,
                  }))
                if(response.payload.status === constants.apiResponseStatus.SUCCESS){
                    dispatch(updateError({
                        errorType : constants.apiResponseStatus.ERROR,
                        errorMessage : "Syllabus Details Updated Sucessfully",
                        flag : true
                    }))
                    dispatch(updateCourseInfo({ classKey: 'isEdit', value: false }))
                    setIsEditSyllabusDetails(false);
                    setSelectedSemester('');
                    setFilteredSelectedData({})
                }
                else{
                    dispatch(updateError({
                        errorType : constants.apiResponseStatus.ERROR,
                        errorMessage : constants.apiResponseMessage.ERROR_MESSAGE,
                        flag : true
                    }))
                }
            }else{
                dispatch(updateError({
                    errorType : constants.apiResponseStatus.ERROR,
                    errorMessage : constants.apiResponseMessage.ERROR_MESSAGE,
                    flag : true
                }))
            } 
            } else {
                const updateAccuData = accumulated_data.map(data => {
                    return data.semester_name === selectedSemester ? {...data,list_of_subject:filteredSelectedData[0].list_of_subject}: {...data}
                })
                dispatch(updateCourseInfo({ classKey: 'syllabusDetails', key: 'accumulated_data', value: updateAccuData }));
                setIsEditSyllabusDetails(false);
                    setSelectedSemester('');
                    setFilteredSelectedData({})

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
        if(year_name !== '' && semester_name !== '' && list_of_subject !== ''){
            dispatch(updateCourseInfo({classKey : 'syllabusDetails', key : 'isValidationError', value : false}))
        }else{
            dispatch(updateCourseInfo({classKey : 'syllabusDetails', key : 'isValidationError', value : true}))
        }
    },[year_name, semester_name, list_of_subject])
    
    const syllabusDetailsData = accumulated_data.map(data =>{ 
            return  [{ lable : 'Year Name', value : data.year_name },
                    { lable : 'Semester Name', value : data.semester_name },
                    { lable : 'List of Subjects', value : data.list_of_subject}]
        })
  return (
      <>
          {isEditSyllabusDetails && (
              <CustomDialogPopup
                  open={isEditSyllabusDetails}
                  handleClose={() => setIsEditSyllabusDetails(false)}
                  label={'Update Syllabus Details'}
                  handleSubmit={() => console.log('handleSubmit')}
                  buttonLabel={'Update'}
              >
                  <div style={{ gap: "20px", display: 'flex', margin: "2.5rem 0px", flexWrap: "wrap", alignItems: "center" }}>
                     
                      <TextArea
                          placeholder="List of Subjects"
                          noOfROws={6}
                          noOfCols={55}
                          fieldName="List of Subjects"
                          styles={{ border: 'solid #e83e8c 1px', borderRadius: "1rem" }}
                          onChange={(e) => {
                              const updateFilteredData = filteredSelectedData.map(data => {
                                 return {...data,list_of_subject:e.target.value}
                              }) 
                              setFilteredSelectedData(updateFilteredData)
                              
                          }}
                          inputValue={filteredSelectedData.length > 0 ? filteredSelectedData[0].list_of_subject : ''}
                      />
                      <CustomButton
                          isDisabled={filteredSelectedData[0]?.list_of_subject === ''}
                          lable={'Update'}
                          onClick={() => updateCourse()}
                          styles={{ margin: "0px !important", }}
                      />
                       <CustomButton
                          lable={'Cancel'}
                          onClick={() => setIsEditSyllabusDetails(false)}
                          styles={{ margin: "0px !important", }}
                      />
                  </div>
              </CustomDialogPopup>
          )}
          {!isEdit && courseId ? <DataToDisplay dataToDisplay={syllabusDetailsData} />
              : (!isEdit && !courseId) ?
              (<>
                  <div style={{ gap: "20px", display: 'flex', margin: "2.5rem 0px", flexWrap: "wrap", alignItems: "center" }}>
                      <SelectBox
                          label={'Year'}
                          options={constants.courseSyllabusDetailsYearSelectBox}
                          onChange={(e) => dispatch(updateCourseInfo({ classKey: 'syllabusDetails', key: 'year_name', value: e.target.value }))}
                          styles={{ width: '280px', height: '38px' }}
                          inputValue={year_name}
                      />
                      <SelectBox
                          label={'Semester'}
                          options={constants.courseSyllabusDetailsSemesterSelectBox}
                          onChange={(e) => dispatch(updateCourseInfo({ classKey: 'syllabusDetails', key: 'semester_name', value: e.target.value }))}
                          styles={{ width: '280px', height: '38px' }}
                          inputValue={semester_name}
                      />
                      <TextArea
                          placeholder="List of Subjects"
                          noOfROws={6}
                          noOfCols={55}
                          fieldName="List of Subjects"
                          styles={{ border: 'solid #e83e8c 1px', borderRadius: "1rem" }}
                          onChange={(e) => dispatch(updateCourseInfo({ classKey: 'syllabusDetails', key: 'list_of_subject', value: e.target.value }))}
                          inputValue={list_of_subject}
                      />
                      <CustomButton
                          isDisabled={isValidationError}
                          lable={'Save'}
                          onClick={() => addSylabusDetails()}
                          styles={{ margin: "0px !important", }}
                      />
                      </div>
                      {accumulated_data.length > 0 && (
                           <div>
                      <ItemList
                          userColumns={constants.SyllabusDetailsUserColumns}
                          categoryData={accumulated_data}
                          addNewColumns={addNewColumns}
                          labe={'Syllabus Listing'}
                          path={'/add-new-course/'}
                          id={'course_id'}
                          isVewdetails={false}
                      />
                  </div>
                      )}
                 
                  </>)
                  :  (
                      <ItemList
                          userColumns={constants.SyllabusDetailsUserColumns}
                          categoryData={accumulated_data}
                          addNewColumns={addNewColumns}
                          labe={'Syllabus Listing'}
                          path={'/add-new-course/'}
                          id={'course_id'}
                          isVewdetails={false}
                      /> 
                  )
              }
         
         
    </>
  )
}
