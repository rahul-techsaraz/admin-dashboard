import React, { useEffect, useState } from 'react'
import { httpCall } from '../../utils/service';
import { constants } from '../../utils/constants';
import UserListTable from './UserListTable';

export default function AdminRequest() {
  const [userList, setUserList] = useState([]);
  const [filteredUserList,setFilteredUserList] = useState([])
  const [activeLable, setActiveLable] = useState('Pending Request');
  const options = [
    { label: 'active', value: 'active' },
   {label:'inactive',value:'inactive'},
   {label:'decline',value:'decline'},
    
 ]

  const fetchUserList = async () => {
    const userData = await httpCall(
      constants.apiEndPoint.GET_ALL_USERLIST,
      constants.apiHeaders.HEADER,
      constants.httpMethod.GET
    );
    if (userData.status === 200) {
      await setUserList(userData.userlist) 
      const filteredUser = userList.filter(user => user.user_status.toLowerCase() === 'inactive')
      setFilteredUserList(filteredUser)
    }
    

  }
  const filterUserList = (filterBy) => {
    if (filterBy === 'all') {
        setFilteredUserList(userList)
      return;
    }
    const filterUser = userList.filter(user => filterBy.toLowerCase() === user.user_status.toLowerCase())
        setFilteredUserList(filterUser)
    
  }
  useEffect(() => {
fetchUserList()
  }, [])
  
  const handleApprovedApi = async (userData, requestType) => {
    const payloadData = await {
    "email":userData.email,
    "user_status": requestType.toLowerCase() === 'approved' ? userData.user_status.value: 'decline',
    "approvedBy":userData.approvedBy.first_name+" "+userData.approvedBy.last_name,
    "user_role": userData.user_role.value 

    }
    const data = await httpCall(constants.apiEndPoint.UPDATE_USER_ROLE, constants.apiHeaders.HEADER, constants.httpMethod.PUT, payloadData);
    if (data.success === 1) {
      fetchUserList()
    } else {
      alert('Something went wrong , Please try again')
    }


  }

  return (
    <>
          <div className="container-fluid">
          <div className="row clearfix">
    <div className="col-lg-12">
      <div className="card">
        <div className="header">
          {/* <h2><strong>Basic</strong> Information <small>Description text here...</small> </h2> */}
          <div className='row align-items-center justify-content-between'>
          
          <h2 className='admin-h '>Pending Request</h2>
                  <div className='d-flex justify-end'>
                    <button className=' btn btn-outline-primary btn btn-primary 'onClick={() => filterUserList('inactive')}>PENDING</button>
                    <button className=' btn btn-outline-primary btn btn-success ' onClick={() => filterUserList('active')}>APPROVED</button>
                    <button className=' btn btn-outline-primary btn btn-danger ' onClick={() => filterUserList('decline')}>DECLINED</button>
                    <button className=' btn btn-outline-primary btn btn-info ' onClick={() => filterUserList('all')}>USERLIST</button></div>
          </div>
       
        </div>
        <div className="body">
        {/* <h2 className='admin-h text-right'>Pending Request</h2> */}
                <div className='row'>
                  {filteredUserList.length > 0 ? <UserListTable userList={filteredUserList} onClick={(data,requestType)=>handleApprovedApi(data,requestType)} options={options} /> : <div>No Record Found</div>}
        

         </div>
         
         
        </div>
      </div>
    </div>
          </div>
        </div>
    </>
  )
}

