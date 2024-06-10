import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { constants } from '../../utils/constants'
import { updateError } from '../../features/commonSlice'
import ItemList from '../ItemList'
import { deleteCollegeBasicDetails, fetchAgentCollegeList } from '../../utils/reduxThunk/collegeThunk'
import { updateAgentCollegeList } from '../../features/collegeSlice'

export default function College_list() {
    const dispatch = useDispatch()
    const {userInfo}  = useSelector(state=> state.user)
    const {agentCollegeList} = useSelector(state=>state.college)
    const addNewColumns = [
        {
            label:'Delete',
            handleDeleteItem: (rowData) => {
              deleteCollegeListById(rowData.college_id)
            },
            classname:'deleteButton'
        }
    ]
    const deleteCollegeListById = async (collegeId)=>{
        try{
            const payload = { college_id : collegeId}
            const data = await dispatch(deleteCollegeBasicDetails({
                url : constants.apiEndPoint.COLLEGE_LIST+"?requestType=basicCollegeListing",
                header : constants.apiHeaders.HEADER,
                method : constants.httpMethod.DELETE,
                payload
            }))
            if(data.payload.status === constants.apiResponseStatus.SUCCESS){
                dispatch(updateError({
                    errorType: constants.apiResponseStatus.SUCCESS,
                    errorMessage: "College deleted successfully!",
                    flag:true
                }))
                await fetchCollegeList()
            }
            else{
                dispatch(updateError({
                    errorType : constants.apiResponseStatus.WARNING,
                    errorMessage : constants.apiResponseMessage.ERROR_MESSAGE,
                    flag : true,
                }))
            }
        }
        catch(error){
            dispatch(updateError({
                errorType : constants.apiResponseStatus.WARNING,
                errorMessage : constants.apiResponseMessage.ERROR_MESSAGE,
                flag : true,
            }))
        }
    }
    const fetchCollegeList = async()=>{
        try{
            const response = await dispatch(fetchAgentCollegeList({
                url : constants.apiEndPoint.COLLEGE_LIST+'?requestType=basicCollegeListing',
                header : constants.apiHeaders.HEADER,
                method : constants.httpMethod.GET,
            }))
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
            id={'college_id'}
            isVewdetails={true}
        />
    </>
  )
}
