import React from 'react'
import ExamInfo from '../../Components/Exams/ExamInfo'
import ExamDescription from '../../Components/Exams/ExamDescription'
import ExamHighlights from '../../Components/Exams/ExamHighlights'
import ExamConfig from '../../Components/Exams/ExamConfig'
import { shallowEqual } from 'react-redux'
import { EXAM_FIELDS } from '../../Constants/redux/courseFieldName'
import CustomStepper from '../../Components/CustomStepper'

const Exams = () => {
    const exams = useSelector((state) => state.newExam, shallowEqual)
    const isCompleteEnable =
        !exams.examInfo[EXAM_FIELDS.IS_VALIDATION_ERROR] &&
        !exams.examDescriptionOptions[EXAM_FIELDS.IS_VALIDATION_ERROR] &&
        !exams.examHighlights[EXAM_FIELDS.IS_VALIDATION_ERROR] &&
        !exams.examConfig[EXAM_FIELDS.IS_VALIDATION_ERROR]
    const steps = [
        {
            label: 'Basic Info',
            component: ExamInfo,
            isNextDisabled: exams.examInfo[EXAM_FIELDS.IS_VALIDATION_ERROR]
        },
        {
            label: 'Descriptions',
            component: ExamDescription,
            isNextDisabled: exams.examDescriptionOptions[EXAM_FIELDS.IS_VALIDATION_ERROR]
        },
        {
            label: 'Highlights Info',
            component: ExamHighlights,
            isNextDisabled: exams.examHighlights[EXAM_FIELDS.IS_VALIDATION_ERROR]
        },
        {
            label: 'Additional Info',
            component: ExamConfig,
            isNextDisabled: exams.examConfig[EXAM_FIELDS.IS_VALIDATION_ERROR]
        }
    ]
    return <CustomStepper steps={steps} onComplete={handleFinish} formName={'Add New Exam'} isCompleteEnable={isCompleteEnable} />
}

export default Exams