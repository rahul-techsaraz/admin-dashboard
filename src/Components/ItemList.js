import React from 'react'
import CustomTableData from '../utils/CommonComponents/CustomTableData'

export default function ItemList({userColumns,categoryData,addNewColumns,label}) {
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
          label={label} />
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              </div>
  )
}
