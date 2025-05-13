import React, { useEffect } from 'react'
import ItemList from '../../Components/ItemList'
import { deleteExamById, fetchAllExams } from '../../utils/reduxThunk/examThunk'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { updateError } from '../../features/commonSlice'
import { constants } from '../../utils/constants'
import { resetExamForm } from '../../features/newExamSlice'

const ExamList = () => {
  const { examList } = useSelector((state) => state.newExam)
  const { userInfo } = useSelector((state) => state.user, shallowEqual)

  const dispatch = useDispatch()
  const fetchAllExamList = async () => {
    dispatch(
      fetchAllExams({
        url: constants.apiEndPoint.EXAM_LIST,
        header: constants.apiHeaders.HEADER,
        method: constants.httpMethod.GET
      })
    )
  }
  const deleteExamListById = async (examId) => {
    try {
      const customHeader = constants.apiHeaders.customHeader(userInfo.token)

      const data = await dispatch(
        deleteExamById({
          url: constants.apiEndPoint.EXAM_LIST + '?exam_id=' + examId,
          header: { ...constants.apiHeaders.HEADER, ...customHeader },
          method: constants.httpMethod.DELETE
        })
      )
      if (data.payload.status === constants.apiResponseStatus.SUCCESS) {
        dispatch(
          updateError({
            errorType: constants.apiResponseStatus.SUCCESS,
            errorMessage: 'Exam deleted successfully!',
            flag: true
          })
        )
        await fetchAllExamList()
      } else {
        // alert("Something went wrong. Please try again!")
        dispatch(
          updateError({
            errorType: constants.apiResponseStatus.ERROR,
            errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
            flag: true
          })
        )
      }
    } catch (err) {
      dispatch(
        updateError({
          errorType: constants.apiResponseStatus.ERROR,
          errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
          flag: true
        })
      )
    }
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
    fetchAllExamList()
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
      />
    </>
  )
}

export default ExamList
