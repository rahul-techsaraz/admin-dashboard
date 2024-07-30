export const examReducer = (state, action) => {
  switch (action.type) {
    case 'exam_description':
      return { ...state, exam_description: action.exam_description }

    case 'exam_conducting_body_description':
      return { ...state, exam_conducting_body_description: action.exam_conducting_body_description }
    case 'exam_important_dates_description':
      return { ...state, exam_important_dates_description: action.exam_important_dates_description }
    case 'exam_session_description':
      return { ...state, exam_session_description: action.exam_session_description }
    case 'exam_counselling_description':
      return { ...state, exam_counselling_description: action.exam_counselling_description }
    case 'exam_application_form_description':
      return { ...state, exam_application_form_description: action.exam_application_form_description }
    case 'apllication_form_step1_description':
      return { ...state, apllication_form_step1_description: action.apllication_form_step1_description }
    case 'apllication_form_step2_description':
      return { ...state, apllication_form_step2_description: action.apllication_form_step2_description }
    case 'apllication_form_step3_description':
      return { ...state, apllication_form_step3_description: action.apllication_form_step3_description }
    case 'exam_intimation_slip_description':
      return { ...state, exam_intimation_slip_description: action.exam_intimation_slip_description }
    case 'exam_admit_card_description':
      return { ...state, exam_admit_card_description: action.exam_admit_card_description }
    case 'exam_center_description':
      return { ...state, exam_center_description: action.exam_center_description }
    case 'exam_pattern_description':
      return { ...state, exam_pattern_description: action.exam_pattern_description }
    case 'exam_syllabus_description':
      return { ...state, exam_syllabus_description: action.exam_syllabus_description }
    default:
      return state
  }
}
