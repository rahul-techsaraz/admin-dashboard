import React, { useEffect, useState } from 'react'
import SearchSelectBox from '../../utils/CommonComponents/SearchSelectBox'
import { useDispatch, useSelector } from 'react-redux'
import { updateCollegeInfo } from '../../features/collegeSlice'
import InputFieldText from '../../utils/CommonComponents/InputFieldText'
import useCourseDetails from '../../hooks/useCourseDetails'
import CustomButton from '../../utils/CommonComponents/CustomButton'
import { constants } from '../../utils/constants'
import ItemList from '../ItemList'
import { v4 as uuid } from 'uuid'
import DataToDisplay from '../course_list/DataToDisplay'
import { updateError } from '../../features/commonSlice'
import { addCollegeHighlight, deleteCollegeHighlight, fetchCollegeHighlightsById } from '../../utils/reduxThunk/collegeThunk'

export default function CollegeHighlights({ collegeId }) {
  useCourseDetails()
  const dispatch = useDispatch()
  const { allCourseDetails, courseOfferedList, collegeHighlights, highlightList, isEdit } = useSelector((state) => state.college)
  const { isValitadeError, course_name, course_id, fees_annually, eligibility_criteria, course_duration } = useSelector(
    (state) => state.college.collegeHighlights
  )
  const [isDisabled, setisDisabled] = useState(true)
  const [componentCourse, setComponentCourse] = useState('')
  const id = uuid()

  const setDetails = (e, value) => {
    if (value !== '' && value !== undefined && value !== null) {
      const index = allCourseDetails.findIndex((i) => i.course_id === value.course_id)
      dispatch(updateCollegeInfo({ classKey: 'collegeHighlights', key: 'course_name', value: value.label }))
      dispatch(updateCollegeInfo({ classKey: 'collegeHighlights', key: 'course_id', value: value.course_id }))
      dispatch(
        updateCollegeInfo({
          classKey: 'collegeHighlights',
          key: 'fees_annually',
          value: allCourseDetails[index].course_fee_min + ' - ' + allCourseDetails[index].course_fee_max
        })
      )
      dispatch(
        updateCollegeInfo({
          classKey: 'collegeHighlights',
          key: 'eligibility_criteria',
          value: allCourseDetails[index].eligiblity_criteria
        })
      )
      dispatch(updateCollegeInfo({ classKey: 'collegeHighlights', key: 'course_duration', value: allCourseDetails[index].course_duration }))
    } else {
      dispatch(updateCollegeInfo({ classKey: 'collegeHighlights', key: 'course_name', value: '' }))
      dispatch(updateCollegeInfo({ classKey: 'collegeHighlights', key: 'course_id', value: '' }))
      dispatch(updateCollegeInfo({ classKey: 'collegeHighlights', key: 'fees_annually', value: '' }))
      dispatch(updateCollegeInfo({ classKey: 'collegeHighlights', key: 'eligibility_criteria', value: '' }))
      dispatch(updateCollegeInfo({ classKey: 'collegeHighlights', key: 'course_duration', value: '' }))
    }
  }

  const createHighlightsList = async () => {
    if (!isEdit) {
      if (!JSON.stringify(highlightList).includes(course_name)) {
        dispatch(
          updateCollegeInfo({
            classKey: 'highlightList',
            value: [...highlightList, { course_name, course_id, fees_annually, eligibility_criteria, course_duration }]
          })
        )
      } else {
        dispatch(updateError({
          errorType: constants.apiResponseStatus.ERROR,
          errorMessage: 'Highlight already added',
          flag: true
        }))
      }
    } else {
      if (!JSON.stringify(highlightList).includes(course_name)) {
        const singleHighlightPayload = {
          college_id: collegeId,
          course_id: course_id,
          course_name: course_name,
          fees_annually: fees_annually,
          course_duration: course_duration,
          eligibility_criteria: eligibility_criteria
        }
        const response = await dispatch(addCollegeHighlight({
          url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=collegeHighlightsDetails&addSingleCollege=yes',
          header: constants.apiHeaders.HEADER,
          method: constants.httpMethod.POST,
          payload: singleHighlightPayload
        }))
        if (response.payload.status === constants.apiResponseStatus.SUCCESS) {
          dispatch(updateError({
            errorType: constants.apiResponseStatus.SUCCESS,
            errorMessage: 'College Highlight added Successfully',
            flag: true
          }))
          dispatch(
            fetchCollegeHighlightsById({
              url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=collegeHighlightsDetails&college_id=' + collegeId,
              header: constants.apiHeaders.HEADER,
              method: constants.httpMethod.GET
            })
          )
        } else {
          dispatch(updateError({
            errorType: constants.apiResponseStatus.ERROR,
            errorMessage: 'College Highlight cannot be added... Please try again',
            flag: true
          }))
        }
      } else {
        dispatch(updateError({
          errorType: constants.apiResponseStatus.ERROR,
          errorMessage: 'Highlight already added',
          flag: true
        }))
      }
    }
  }

  const addNewColumns = [
    {
      label: 'Delete',
      handleDeleteItem: (rowData) => {
        deleteHighlight(rowData)
      },
      classname: 'deleteButton'
    }
  ]

  const deleteHighlight = async (rowData) => {
    if (!isEdit) {
      const filteredData = highlightList.filter((data) => data.id !== rowData.id)
      dispatch(updateCollegeInfo({ classKey: 'highlightList', value: filteredData }))
    } else {
      const deleteHighlightPayload = {
        college_id: rowData.college_id,
        course_id: rowData.course_id,
      }
      const response = await dispatch(
        deleteCollegeHighlight({
          url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=collegeHighlightsDetails',
          header: constants.apiHeaders.HEADER,
          method: constants.httpMethod.DELETE,
          payload: deleteHighlightPayload
        })
      )
      if (response?.payload?.status === constants.apiResponseStatus.SUCCESS) {
        dispatch(
          fetchCollegeHighlightsById({
            url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=collegeHighlightsDetails&college_id=' + collegeId,
            header: constants.apiHeaders.HEADER,
            method: constants.httpMethod.GET
          })
        )
        dispatch(updateError({
          errorType: constants.apiResponseStatus.SUCCESS,
          errorMessage: 'College Highlight deleted Successfully',
          flag: true
        }))
      } else {
        dispatch(updateError({
          errorType: constants.apiResponseStatus.ERROR,
          errorMessage: 'College Highlight deletion unsuccessful... Please try again',
          flag: true
        }))
      }
    }

  }

  const handleCancle = async () => {
    try {
      const response = await dispatch(
        fetchCollegeHighlightsById({
          url: constants.apiEndPoint.COLLEGE_LIST + '?requestType=collegeHighlightsDetails&college_id=' + collegeId,
          header: constants.apiHeaders.HEADER,
          method: constants.httpMethod.GET
        })
      )
      if (response.payload.status === constants.apiResponseStatus.SUCCESS) {
        dispatch(updateCollegeInfo({ classKey: 'isEdit', value: false }))
      } else {
        dispatch(
          updateError({
            errorType: constants.apiResponseStatus.ERROR,
            errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
            flag: true
          })
        )
      }
    } catch (error) {
      dispatch(
        updateError({
          errorType: constants.apiResponseStatus.ERROR,
          errorMessage: constants.apiResponseMessage.ERROR_MESSAGE,
          flag: true
        })
      )
    }
  }

  useEffect(() => {
    if (
      collegeHighlights.course_name !== '' &&
      collegeHighlights.fees_annually !== '' &&
      collegeHighlights.eligibility_criteria !== '' &&
      collegeHighlights.course_duration !== ''
    ) {
      setisDisabled(false)
    } else {
      setisDisabled(true)
    }
  }, [
    collegeHighlights.course_name,
    collegeHighlights.fees_annually,
    collegeHighlights.eligibility_criteria,
    collegeHighlights.course_duration
  ])

  useEffect(() => {
    if (highlightList.length > 0) {
      dispatch(updateCollegeInfo({ classKey: 'collegeHighlights', key: 'isValitadeError', value: false }))
    } else {
      dispatch(updateCollegeInfo({ classKey: 'collegeHighlights', key: 'isValitadeError', value: true }))
    }
  }, [highlightList])

  const collegeInfoData = highlightList.map((data) => Object.keys(data).filter((key) => key.toLowerCase() !== 'college_id' && key.toLowerCase() !== 'course_id').map((lable) => { return { 'lable': lable.split('_').map((str) => { return str.charAt(0).toUpperCase() + str.slice(1) }).join(' '), 'value': data[lable] } }))

  return (
    <>
      {!isEdit && collegeId ? (
        <DataToDisplay dataToDisplay={collegeInfoData} type={'college'} switchClass={true} />
      ) : (
        <>
          <div style={{ display: ' flex', flexWrap: 'wrap', alignItems: 'center', gap: '3rem', margin: 'auto', padding: 'auto' }}>
            <SearchSelectBox
              label='Course Name'
              options={courseOfferedList.map((course) => {
                return { label: course.course_name, course_id: course.course_id }
              })}
              onChange={(e, value) => setDetails(e, value)}
              onInputChange={(e, value) => setComponentCourse(value)}
              inputValue={componentCourse ? componentCourse : collegeHighlights.course_name}
            />
            <InputFieldText
              placeholder='Course Duration'
              inputValue={collegeHighlights.course_duration}
              inputType='text'
              styles={{ width: '280px' }}
              disabled={true}
            />
            <InputFieldText
              placeholder='Fees Annually'
              inputValue={collegeHighlights.fees_annually}
              inputType='text'
              styles={{ width: '280px' }}
              disabled={true}
            />
            <InputFieldText
              placeholder='Eligibility Criteria'
              inputValue={collegeHighlights.eligibility_criteria}
              inputType='text'
              styles={{ width: '280px' }}
              disabled={true}
            />
            <CustomButton
              isDisabled={isDisabled}
              lable={'Add to Highlights'}
              onClick={() => createHighlightsList()}
              styles={{ margin: '0px 30px', padding: '0px 20px', width: '300px', height: '40px' }}
            />
          </div>
          {highlightList.length > 0 && (
            <div>
              <ItemList
                userColumns={constants.highlightsUserColumns}
                categoryData={highlightList.map((data) => { return { ...data, id: data.course_id } })}
                addNewColumns={addNewColumns}
                labe={'Highlights Listing'}
                // path={'/add-new-course/'}
                id={'course_id'}
                isVewdetails={false}
              />
            </div>
          )}
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {isEdit && collegeId && (
              <>
                {/* <CustomButton isDisabled={isValitadeError} lable={'Update'} onClick={() => updateCollege()} /> */}
                <CustomButton lable={'Cancle'} onClick={() => handleCancle()} />
              </>
            )}
          </div>
        </>
      )}
    </>
  )
}
