import React from 'react';
import SelectBox from '../../utils/CommonComponents/SelectBox'

export default function UserListTable({ userList,options }) {
   console.log(options)
  return (
    <table class="table">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">User Name</th>
      <th scope="col">User Email</th>
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
                              {user.user_status === 'inactive' ? <SelectBox options={options} /> : <span>{user.user_status }</span>}
 
      </div>
      </td>
                      {user.user_status === 'inactive' ? <td><button className=' btn btn-outline-primary btn btn-danger '>Approve</button> <button className=' btn btn-outline-primary btn btn-success '>Decline</button></td> : ''}
    </tr>
              ))}
    
   
  
  </tbody>
</table>
  )
}
