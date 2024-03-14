import React from 'react'

export default function AdminRequest() {
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
          <div className='d-flex justify-end'><button className=' btn btn-outline-primary btn btn-primary '>PENDING</button> <button className=' btn btn-outline-primary btn btn-success '>APPROVED</button>       <button className=' btn btn-outline-primary btn btn-danger '>DECLINED</button> <button className=' btn btn-outline-primary btn btn-info '>USERLIST</button></div>
          

          </div>
       
        </div>
        <div className="body">
        {/* <h2 className='admin-h text-right'>Pending Request</h2> */}
         <div className='row'>
         <table class="table">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">User Name</th>
      <th scope="col">User Email</th>
      <th scope="col">Assign Role</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>
      <div class="btn-group">
  <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Assign User Role
  </button>
  <div class="dropdown-menu">
    <a class="dropdown-item" href="#">Action</a>
    <a class="dropdown-item" href="#">Another action</a>
    <a class="dropdown-item" href="#">Something else here</a>
    <div class="dropdown-divider"></div>
    <a class="dropdown-item" href="#">Separated link</a>
  </div>
      </div>
      </td>
      <td><button className=' btn btn-outline-primary btn btn-danger '>Action</button> <button className=' btn btn-outline-primary btn btn-success '>Decline</button></td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>
      <div class="btn-group">
  <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Assign User Role
  </button>
  <div class="dropdown-menu">
    <a class="dropdown-item" href="#">Action</a>
    <a class="dropdown-item" href="#">Another action</a>
    <a class="dropdown-item" href="#">Something else here</a>
    <div class="dropdown-divider"></div>
    <a class="dropdown-item" href="#">Separated link</a>
  </div>
      </div>
      </td>
      <td><button className=' btn btn-outline-primary btn btn-danger '>Action</button> <button className=' btn btn-outline-primary btn btn-success '>Decline</button></td>
    </tr>
   
  
  </tbody>
</table>

         </div>
         
         
        </div>
      </div>
    </div>
          </div>
        </div>
    </>
  )
}

