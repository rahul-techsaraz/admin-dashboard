import React, { useEffect, useState } from 'react'
import { Box, Button } from '@mui/material'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { resetExamForm } from '../../features/newExamSlice'
import { EXAM_FIELDS } from '../../Constants/redux/courseFieldName'
import AddItemForm from '../../Components/AddItemForm'
import ExamBasicDetails from '../../Components/Exams/ExamBasicDetails'
import ExamImportantDate from '../../Components/Exams/ExamImportantDate'
import ExamEligibility from '../../Components/Exams/ExamEligibility'
import ExamSyllabus from '../../Components/Exams/ExamSyllabus'
import ExamDescriptions from '../../Components/Exams/ExamDescriptions'
import CollapsibleSection from '../../Components/CollapsibleSection'
import ExamContactInfo from '../../Components/Exams/ExamContactInfo'
import ExamPapers from '../../Components/Exams/ExamPapers'
import useExamData from '../../hooks/useExamData'

const ExamDetailsContainer = () => {
  const [viewMode, setViewMode] = useState(true)
  const exams = useSelector((state) => state.newExam, shallowEqual)

  const { examId } = useParams()
  const dispatch = useDispatch()
  const { editExamData, getExamById } = useExamData()

  const handleEditToggle = () => {
    setViewMode((prev) => !prev)
  }

  useEffect(() => {
    getExamById(examId)
    // Cleanup function to reset state on unmount
    return () => {
      dispatch(resetExamForm())
    }
  }, [dispatch, examId])

  const handleUpdate = () => {
    // prepare payload
    const payload = {
      exam_id: examId,
      exam_name: exams.examBasicDetails[EXAM_FIELDS.EXAM_NAME],
      exam_slug: `${exams.examBasicDetails[EXAM_FIELDS.EXAM_NAME]}_${exams.examBasicDetails[EXAM_FIELDS.EXAM_YEAR]}`,
      exam_year: exams.examBasicDetails[EXAM_FIELDS.EXAM_YEAR],
      exam_duration: exams.examBasicDetails[EXAM_FIELDS.EXAM_DURATION],
      exam_frequency: exams.examBasicDetails[EXAM_FIELDS.EXAM_FREQUENCY],
      exam_mode: exams.examBasicDetails[EXAM_FIELDS.EXAM_MODE],
      exam_category: exams.examBasicDetails[EXAM_FIELDS.EXAM_CATEGORY],

      application_start_date: exams.examImportantDates[EXAM_FIELDS.EXAM_APPLICATION_START_DATE],
      application_end_date: exams.examImportantDates[EXAM_FIELDS.EXAM_APPLICATION_END_DATE],
      admit_card_release_date: exams.examImportantDates[EXAM_FIELDS.EXAM_ADMIT_CARD_RELEASE_DATE],
      exam_start_date: exams.examImportantDates[EXAM_FIELDS.EXAM_START_DATE],
      exam_end_date: exams.examImportantDates[EXAM_FIELDS.EXAM_END_DATE],
      result_declaration_date: exams.examImportantDates[EXAM_FIELDS.EXAM_RESULT_DECLARATION_DATE],
      counselling_date: exams.examImportantDates[EXAM_FIELDS.EXAM_COUNSELLING_DATE],

      exam_fee_structure: exams.examEligibilityAndFees[EXAM_FIELDS.EXAM_FEE_STRUCTURE],
      eligibility_criteria: exams.examEligibilityAndFees[EXAM_FIELDS.EXAM_ELIGIBILITY_CRITERIA],

      exam_conducting_address: exams.examContactInfo[EXAM_FIELDS.EXAM_CONDUCTING_ADDRESS],
      exam_support_contact: exams.examContactInfo[EXAM_FIELDS.EXAM_SUPPORT_CONTACTS],
      exam_website: exams.examContactInfo[EXAM_FIELDS.EXAM_WEBSITE],
      exam_conducting_by: exams.examContactInfo[EXAM_FIELDS.EXAM_CONDUCTED_BY],

      exam_descriptions: exams.examDescriptions,

      exam_syllabus: exams.examSyllabusAndMarks[EXAM_FIELDS.EXAM_SYLLABUS],
      exam_papers_and_marks: exams.examSyllabusAndMarks[EXAM_FIELDS.EXAM_PAPERS_AND_MARKS],
      marking_scheme: exams.examSyllabusAndMarks[EXAM_FIELDS.EXAM_MARKING_SCHEME],

      mock_test_papers_data: exams.examPapers[EXAM_FIELDS.EXAM_MOCK_TEST_PAPERS],
      previous_test_papers_data: exams.examPapers[EXAM_FIELDS.EXAM_PREVIOUS_TEST_PAPERS]
    }
    editExamData(payload)
    setViewMode(true)
  }

  return (
    <AddItemForm label={'Exam View'} style={{ flexDirection: 'column' }}>
      <Box display='flex' justifyContent='flex-end' gap={2} mb={2}>
        {viewMode ? (
          <Button variant='contained' onClick={handleEditToggle}>
            Switch to Edit Mode
          </Button>
        ) : (
          <>
            <Button variant='outlined' color='secondary' onClick={() => setViewMode(true)}>
              Cancel
            </Button>
            <Button variant='contained' color='primary' onClick={handleUpdate}>
              Update
            </Button>
          </>
        )}
      </Box>

      <Box display='flex' flexDirection='column' gap={2}>
        <CollapsibleSection title='Basic Details' defaultExpand={true}>
          <ExamBasicDetails isEdit={viewMode} />
        </CollapsibleSection>

        <CollapsibleSection title='Important Dates' defaultExpand={false}>
          <ExamImportantDate isEdit={viewMode} />
        </CollapsibleSection>

        <CollapsibleSection title='Eligibility & Fees' defaultExpand={false}>
          <ExamEligibility isEdit={viewMode} />
        </CollapsibleSection>

        <CollapsibleSection title='Syllabus' defaultExpand={false}>
          <ExamSyllabus isEdit={viewMode} />
        </CollapsibleSection>
        <CollapsibleSection title='Descriptions' defaultExpand={false}>
          <ExamDescriptions isEdit={viewMode} />
        </CollapsibleSection>
        <CollapsibleSection title='Contact Info' defaultExpand={false}>
          <ExamContactInfo isEdit={viewMode} />
        </CollapsibleSection>
        <CollapsibleSection title='Papers' defaultExpand={false}>
          <ExamPapers isEdit={viewMode} />
        </CollapsibleSection>
      </Box>
    </AddItemForm>
  )
}

export default ExamDetailsContainer
