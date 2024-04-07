import React, { useEffect, useState } from 'react'
import { httpCall } from '../../utils/service';
import { constants } from '../../utils/constants';
import ItemList from '../ItemList';
import Loader from '../Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux'
import { reset } from '../../features/examSlice';
import { fetchExamList } from '../../utils/reduxThunk/examThunk';



export default function ExamList() {
 // const [examList, setExamList] = useState([]);
  const dispatch = useDispatch();

  const {examList} = useSelector(state => state.exam)
    //Fetch all exam basic details data
  const fetchAllExamList = async () => {
    try {
      dispatch(reset());
    dispatch(fetchExamList({
            url: constants.apiEndPoint.EXAM_LIST+"?requestType=basicExamDetails",
            header: constants.apiHeaders.HEADER,
            method:constants.httpMethod.GET
    }))
    }
    catch(err) {
       toast.error("Something Went wrong . Please try again !");   
    }
    
    }
    const deleteExamListById = async (examId) => {
      try {
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
            await fetchAllExamList();

        } else {
            // alert("Something went wrong. Please try again!")
            toast.error("Something Went wrong . Please try again !");
        }
      } catch (err) {
            toast.error("Something Went wrong . Please try again !");
}
       
    }
     const addNewColumns = [

  {
      label:'Delete',
             handleDeleteItem: (rowData) => {
              // alert("Are you sure want to delete")
              toast.error("Deleted Items Successfully !");
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
      fetchAllExamList();
       return () => {
         // cleanup when component unmounts
         console.log('Leaving');
         dispatch(reset());
    }
    }, [])
  return (
      <>
       <ToastContainer />
           <ItemList
                  userColumns={userColumns }
                  categoryData={examList }
                  addNewColumns={ addNewColumns}
                  labe={'Exam Listing'}
              />
      </>
  )
}
