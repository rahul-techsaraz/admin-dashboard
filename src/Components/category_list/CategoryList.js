import React, { useEffect, useState } from 'react'
import AddNewCategory from './AddNewCategory'
import { httpCall } from '../../utils/service'
import { constants } from '../../utils/constants'
import CustomTableData from '../../utils/CommonComponents/CustomTableData'

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
    const addNewColumns = [
  {
      label:'View Details',
      handleActionItem: (params) => {
          // dispatch(updateDetailsView({flag:true,propertyId:params.row.property_id}))
          console.log(params)
      },
      classname:'viewButton'
  },
  {
      label:'Delete',
      handleApprovedItem: (params) => {
        },
      classname:'deleteButton'

  },
    ]
    const userColumns = [
    { field: "id", headerName: "ID", width: 70 },
    // {
    //   field: "property_name",
    //   headerName: "Property Name",
    //   width: 150,
    //   renderCell: (params) => {
    //     return (
    //       <div className="cellWithImg">
    //         {/* <img className="cellImg" src={params.row.img} alt="avatar" /> */}
    //         {params.row.property_name}
    //       </div>
    //     );
    //   },
    // },
    
  
    {
      field: "category_id",
      headerName: "Category Id",
      width: 200,
      
    },
    {
      field: "category_name",
      headerName: "Category Name",
      width: 370,
      
    }
    
  ];
  return (
      <>
       
         {categoryData.length > 0 ? (<div class="container-fluid">
              <div class="row clearfix">
                  <div class="col-lg-12">
                      <div class="card">
                          <div class="body">
                              <div class="table-responsive">
                                  <CustomTableData 
          userColumns={userColumns} 
          userRows={categoryData} 
          actionItem={addNewColumns} 
          label={'Category Listing'} />
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>) : <div>Loading...</div>}
      </>
  )
}
