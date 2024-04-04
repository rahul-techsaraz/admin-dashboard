import React, { useEffect, useState } from 'react'
import AddNewCategory from './AddNewCategory'
import { httpCall } from '../../utils/service'
import { constants } from '../../utils/constants'
import CustomTableData from '../../utils/CommonComponents/CustomTableData'
import ItemList from '../ItemList'

export default function CategoryList() {
    const [categoryData,setCategoryData]= useState([])
    const fetchCatgeoryData = async () => {
        const data = await httpCall(
            constants.apiEndPoint.CATEGORY_LIST,
            constants.apiHeaders.HEADER,
            constants.httpMethod.GET
        )
        setCategoryData(data.data)
    }
    const deleteCatgeoryData = async (categoryId) => {
        const payload = await {
             course_category_id:categoryId
         }
        const data = await httpCall(
            constants.apiEndPoint.CATEGORY_LIST,
            constants.apiHeaders.HEADER,
            constants.httpMethod.DELETE,
            payload
        )

        if (data.status === "success") {
            await fetchCatgeoryData();

        } else {
            alert("Something went wrong. Please try again!")
        }
    }
    useEffect(() => {
fetchCatgeoryData()
    },[])
    const addNewColumns = [
 
  {
      label:'Delete',
            handleDeleteItem: (rowData) => {
                deleteCatgeoryData(rowData.course_category_id)
        },
      classname:'deleteButton'

  },
    ]
    const userColumns = [
    { field: "id", headerName: "ID", width: 70 },
    
    
  
    {
      field: "course_category_id",
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
       
          {categoryData.length > 0 ? (
              <ItemList
                  userColumns={userColumns }
                  categoryData={categoryData }
                  addNewColumns={ addNewColumns}
                  labe={'Category Listing'}
              />
          ) : <div>Loading...</div>}
      </>
  )
}
