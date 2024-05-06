import React from 'react'
import CustomTableData from '../utils/CommonComponents/CustomTableData'

export default function ItemList({userColumns,categoryData,addNewColumns,label,path,id,isVewdetails}) {
    
  return (
     <div class="container-fluid">
              <div class="row clearfix">
                  <div class="col-lg-12">
                      <div class="card">
                          <div class="body">
                              <div class="table-responsive">
                                  <CustomTableData 
          userColumns={userColumns} 
          userRows={categoryData} 
          actionItem={addNewColumns} 
          label={label}
          path={path}
          id={id}
          isVewdetails={isVewdetails}/>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              </div>
  )
}
