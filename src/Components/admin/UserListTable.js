import React, { useState } from 'react';
import SelectBox from '../../utils/CommonComponents/SelectBox'
import { toast } from 'react-toastify';

export default function UserListTable({ userList,options,onClick }) {
  const [selectRole, setSelectRole] = useState({id:'',value:''});
  const [userStatus, setUserStatus] = useState({id:'',value:''});
  const handleApproved = (userId,userEMail,requestType) =>  {
    if (userId === selectRole.id && userId === userStatus.id && selectRole.value !== '' && userStatus.value !== '') {
      const payloadData = { email: userEMail, user_status:userStatus , approvedBy: JSON.parse(localStorage.getItem("userData")), user_role: selectRole }
      onClick(payloadData,requestType)
    } else {
      alert("Please select the the user role and user status")
    }
  }
  
 
 
 
  const roleOption = [
    { label: 'superAdmin', value: 'superAdmin' },
   {label:'admin',value:'admin'},
   {label:'agent',value:'agent'},
    
 ]
   console.log(roleOption)
  return (
    <table class="table">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">User Name</th>
      <th scope="col">User Email</th>
      <th scope="col">User status</th>
      <th scope="col">User Role</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
          <tbody>
              {userList.map((user,index) => (
                  <tr key={index}>
                      <th scope="row">{index+1 }</th>
      <td>{user.first_name+" "+ user.last_name}</td>
      <td>{user.email}</td>
      <td>
      <div class="btn-group">
                              {user.user_status.toLowerCase() === 'inactive' ? <SelectBox options={options} onChange={(event)=>setUserStatus({id:index,value:event.target.value})} /> : <span>{user.user_status }</span>}
 
      </div>
      </td>
      <td>
      <div class="btn-group">
                              {user.user_status.toLowerCase() === 'inactive' ? <SelectBox onChange={(event)=>setSelectRole({id:index,value:event.target.value})} options={roleOption} /> : <span>{user.user_role }</span>}
 
      </div>
      </td>
                  {user.user_status.toLowerCase() === 'inactive' ? <td><button onClick={() => handleApproved(index, user.email, "approved")} className=' btn btn-outline-primary btn btn-danger '>Approve</button> <button className=' btn btn-outline-primary btn btn-success ' onClick={() => handleApproved(index, user.email, "Decline")}>Decline</button></td> : ''}
    </tr>
              ))}
    
   
  
  </tbody>
</table>
  )
}
