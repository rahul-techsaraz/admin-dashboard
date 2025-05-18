import React, { useEffect } from 'react'
import ItemList from '../../Components/ItemList'
import { useDispatch, useSelector } from 'react-redux'
import { resetExamForm } from '../../features/newExamSlice'
import useExamData from '../../hooks/useExamData'

const ExamList = () => {
  const { examList } = useSelector((state) => state.newExam)
  const { userInfo } = useSelector((state) => state.user)

  const { getAllExam, removeExam, modifyExamTrending } = useExamData()
  const dispatch = useDispatch()

  const deleteExamListById = async (examId) => {
    removeExam(examId)
  }
  const addNewColumns = [
    {
      label: 'Delete',
      handleDeleteItem: (rowData) => {
        // alert("Are you sure want to delete")
        deleteExamListById(rowData.exam_id)
      },
      classname: 'deleteButton'
    }
  ]
  const userColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'exam_name',
      headerName: 'Exam Name',
      width: 200
    },
    {
      field: 'exam_start_date',
      headerName: 'Exam Start Date',
      width: 150
    },
    {
      field: 'exam_end_date',
      headerName: 'Exam End Date',
      width: 150
    }
  ]
  useEffect(() => {
    getAllExam()
    return () => {
      // cleanup when component unmounts
      dispatch(resetExamForm())
    }
  }, [])
  return (
    <>
      <ItemList
        userColumns={userColumns}
        categoryData={examList}
        addNewColumns={addNewColumns}
        labe={'Exam Listing'}
        path={'/add-exam-description/'}
        id={'exam_id'}
        isVewdetails={true}
        dataType={['super_admin', 'admin'].includes(userInfo.user_role) ? 'exam' : ''}
        onToggleTrending={(examId, isTrending) => modifyExamTrending(examId, isTrending)}
      />
    </>
  )
}

export default ExamList
