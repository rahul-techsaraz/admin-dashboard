import React, { useEffect, useState } from 'react'
import AddNewCategory from './AddNewCategory'
import { httpCall } from '../../utils/service'
import { constants } from '../../utils/constants'

export default function CategoryList() {
    const [categoryData,setCategoryData]= useState([])
    const fetchCatgeoryData = async () => {
        const data = await httpCall(
            constants.apiEndPoint.CATEGORY_LIST,
            constants.apiHeaders.HEADER,constants.httpMethod.GET
        )
        setCategoryData(data.data)
    }
    useEffect(() => {
fetchCatgeoryData()
    },[])
    
  return (
      <>
       
         {categoryData.length > 0 ? (<div class="container-fluid">
              <div class="row clearfix">
                  <div class="col-lg-12">
                      <div class="card">
                          <div class="body">
                              <div class="table-responsive">
                                  <table class="table td_2 table-striped table-hover js-basic-example dataTable">
                                      <thead>
                                          <tr>
                                             
                                              <th>Category Id</th>
                                              <th>Category Name</th>
                                             
                                          </tr>
                                      </thead>
                                      <tbody>
                                      {categoryData.map(category => (
                                           <tr key={category.course_category_id }>
                                              <td>{category.course_category_id }</td>
                                              <td>{ category.category_name}</td>
                                             
                                          </tr>
                                      ))}
                                     
                                          
                                      </tbody>
                                  </table>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>) : <div>Loading...</div>}
      </>
  )
}
