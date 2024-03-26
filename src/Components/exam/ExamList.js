import React, { useEffect, useState } from 'react'
import { httpCall } from '../../utils/service';
import { constants } from '../../utils/constants';
import ItemList from '../ItemList';
import Loader from '../Loader/Loader';

export default function ExamList() {
    const [isLoading, setLoading] = useState(true);
    const [examList, setExamList] = useState([])
    //Fetch all exam basic details data
    const fetchExamList = async () => {
        setLoading(true)
        const data = await httpCall(
            constants.apiEndPoint.EXAM_LIST+"?requestType=basicExamDetails",
            constants.apiHeaders.HEADER,
            constants.httpMethod.GET
        );
        setExamList(data.data);
        setLoading(false)
    }
    const deleteExamListById = async (examId) => {
            setLoading(true)

        const payload = await {
             exam_id:examId
         }
        const data = await httpCall(
            constants.apiEndPoint.EXAM_LIST+"?requestType=basicExamDetails",
            constants.apiHeaders.HEADER,
            constants.httpMethod.DELETE,
            payload

        );
        if (data.status === "success") {
            await fetchExamList();
            setLoading(false)

        } else {
            setLoading(false)
            alert("Something went wrong. Please try again!")
        }
    }
     const addNewColumns = [

  {
      label:'Delete',
             handleDeleteItem: (rowData) => {
         deleteExamListById(rowData.exam_id)
        },
      classname:'deleteButton'

  },
    ]
    const userColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "exam_name",
      headerName: "Exam Name",
      width: 200,
      
        },
     {
      field: "application_start_date",
      headerName: "Application Start Date",
      width: 150,
      
        },
      {
      field: "application_end_date",
      headerName: "Application End Date",
      width: 150,
      
        },
      {
      field: "exam_start_date",
      headerName: "Exam Start Date",
      width: 150,
      
        },
        {
      field: "exam_end_date",
      headerName: "Exam End Date",
      width: 150,
      
    }
    
    ];
    useEffect(() => {
        fetchExamList()
    },[])
  return (
      <>
           {!isLoading ? (
              <ItemList
                  userColumns={userColumns }
                  categoryData={examList }
                  addNewColumns={ addNewColumns}
                  labe={'Exam Listing'}
              />
          ) : <Loader />
          }
      </>
  )
}
