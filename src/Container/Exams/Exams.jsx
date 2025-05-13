import React from 'react'
import ExamBasicDetails from '../../Components/Exams/ExamBasicDetails'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { EXAM_FIELDS } from '../../Constants/redux/courseFieldName'
import CustomStepper from '../../Components/CustomStepper'
import ExamImportantDate from '../../Components/Exams/ExamImportantDate'
import ExamEligibility from '../../Components/Exams/ExamEligibility'
import ExamSyllabus from '../../Components/Exams/ExamSyllabus'
import ExamDescriptions from '../../Components/Exams/ExamDescriptions'
import ExamContactInfo from '../../Components/Exams/ExamContactInfo'
import ExamPapers from '../../Components/Exams/ExamPapers'
import { v4 as uuid } from 'uuid'
import { addNewExams } from '../../utils/reduxThunk/examThunk'
import { constants } from '../../utils/constants'
import { useNavigate } from 'react-router-dom'
import { resetExamForm } from '../../features/newExamSlice'
import { updateError } from '../../features/commonSlice'

const ExamContainer = () => {
  const exams = useSelector((state) => state.newExam, shallowEqual)
  const { userInfo } = useSelector((state) => state.user, shallowEqual)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isCompleteEnable =
    !exams.examBasicDetails[EXAM_FIELDS.IS_VALIDATION_ERROR] &&
    !exams.examImportantDates[EXAM_FIELDS.IS_VALIDATION_ERROR] &&
    !exams.examEligibilityAndFees[EXAM_FIELDS.IS_VALIDATION_ERROR] &&
    !exams.examSyllabusAndMarks[EXAM_FIELDS.IS_VALIDATION_ERROR] &&
    !exams.examDescriptions[EXAM_FIELDS.IS_VALIDATION_ERROR] &&
    !exams.examContactInfo[EXAM_FIELDS.IS_VALIDATION_ERROR] &&
    !exams.examPapers[EXAM_FIELDS.IS_VALIDATION_ERROR]

  const steps = [
    {
      label: 'Basic Details',
      component: ExamBasicDetails,
      isNextDisabled: exams.examBasicDetails[EXAM_FIELDS.IS_VALIDATION_ERROR]
    },
    {
      label: 'Important Dates',
      component: ExamImportantDate,
      isNextDisabled: exams.examImportantDates[EXAM_FIELDS.IS_VALIDATION_ERROR]
    },
    {
      label: 'Eligibility & Fees',
      component: ExamEligibility,
      isNextDisabled: exams.examEligibilityAndFees[EXAM_FIELDS.IS_VALIDATION_ERROR]
    },
    {
      label: 'Syllabus',
      component: ExamSyllabus,
      isNextDisabled: exams.examSyllabusAndMarks[EXAM_FIELDS.IS_VALIDATION_ERROR]
    },
    {
      label: 'Descriptions',
      component: ExamDescriptions,
      isNextDisabled: exams.examDescriptions[EXAM_FIELDS.IS_VALIDATION_ERROR]
    },
    {
      label: 'Contact Info',
      component: ExamContactInfo,
      isNextDisabled: exams.examContactInfo[EXAM_FIELDS.IS_VALIDATION_ERROR]
    },
    {
      label: 'Papers',
      component: ExamPapers,
      isNextDisabled: exams.examPapers[EXAM_FIELDS.IS_VALIDATION_ERROR]
    }
  ]

  const handleFinish = () => {
    const payload = {
      exam_id: uuid(),
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
    const customHeader = constants.apiHeaders.customHeader(userInfo.token)

    dispatch(
      addNewExams({
        url: constants.apiEndPoint.NEW_EXAM_API,
        header: { ...constants.apiHeaders.HEADER, ...customHeader },
        method: constants.httpMethod.POST,
        payload
      })
    )
      .then((res) => {
        dispatch(
          updateError({
            errorType: res?.payload?.status,
            errorMessage: res?.payload?.message,
            flag: true
          })
        )
        navigate('/exam-list')
        localStorage.removeItem('examsData')
        dispatch(resetExamForm())
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return <CustomStepper steps={steps} onComplete={handleFinish} formName={'examsData'} isCompleteEnable={isCompleteEnable} />
}

export default ExamContainer
