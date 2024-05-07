import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { constants } from '../../utils/constants'
import { updateError } from '../../features/commonSlice'
import ItemList from '../ItemList'
import { fetchAgentCollegeList } from '../../utils/reduxThunk/collegeThunk'

export default function College_list() {
    const dispatch = useDispatch()
    const {userInfo}  = useSelector(state=> state.user)
    const {agentCollegeList} = useSelector(state=>state.college)
    const addNewColumns = [
        {
            label:'Delete',
            handleDeleteItem: (rowData) => {
            //   deleteCourseListById(rowData.course_id)
            },
            classname:'deleteButton'
        }
    ]
    const fetchCollegeList = async()=>{
        try{
            const response = await dispatch(fetchAgentCollegeList({
                url : constants.apiEndPoint.COLLEGE_LIST,
                header : constants.apiHeaders.HEADER,
                method : constants.httpMethod.GET,
            }))
            console.log(response)
            if(response.payload.status === constants.apiResponseStatus.SUCCESS){
                dispatch(updateError({
                    errorType : constants.apiResponseStatus.SUCCESS,
                    errorMessage : 'College List Fetched Successfully',
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
    // const firteredAgentCollegeList = (userInfo)=>{
    //     const filteredData = agentCollegeList.filter(data=>data.author === )
    // }
    useEffect(()=>{
        fetchCollegeList()
    },[])
  return (
    <>
        <div>College List</div>
        <ItemList
            userColumns={constants.collegeListUserColumns}
            categoryData={agentCollegeList}
            addNewColumns={addNewColumns}
            labe={'College Details'}
            path={'/add-college/'}
            id={'course_id'}
            isVewdetails={true}
        />
    </>
  )
}
