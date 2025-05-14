export const FIELDS = {
  // Basic Details
  COURSE_NAME: 'courseName',
  SUB_COURSE_NAME: 'subCourseName',
  COURSE_MODE: 'courseMode',
  COURSE_FEE_MIN: 'courseFeeMin',
  COURSE_FEE_MAX: 'courseFeeMax',
  COURSE_DURATION: 'courseDuration',
  CATEGORY: 'category',
  COURSE_ACCEPTING_EXAM: 'courseAcceptingExam',

  // Description
  COURSE_PLACEMENT_DESCRIPTION: 'coursePlacementDescription',
  COURSE_ADMISSION_PROCESS_DESCRIPTION: 'courseAdmissionProcessDescription',
  COURSE_ELIGIBILITY_CRITERIA_DESCRIPTION: 'courseEligibilityCriteriaDescription',
  COURSE_DESCRIPTION: 'courseDescription',

  // Other Info
  COURSE_CATEGORY_LEVEL: 'courseCategoryLevel',
  EXAM_TYPE: 'examType',
  ELIGIBILITY_CRITERIA: 'eligibilityCriteria',

  // Syllabus Details
  SYLLABUS: 'syllabus',
  YEAR: 'year',
  SUBJECTS: 'subjects',
  TYPE: 'type',

  // Validation Errors
  IS_VALIDATION_ERROR: 'isValidationError'
}

export const EXAM_FIELDS = {
  // Basic Exam Details
  EXAM_NAME: 'exam_name',
  EXAM_SLUG: 'exam_slug',
  EXAM_YEAR: 'exam_year',
  EXAM_CATEGORY: 'exam_category',
  EXAM_LEVEL: 'exam_level',
  EXAM_FREQUENCY: 'exam_frequency',
  EXAM_CONDUCTING_BY: 'exam_conducting_by',
  EXAM_MODE: 'exam_mode',
  EXAM_DURATION: 'exam_duration',
  EXAM_LANGUAGE: 'exam_language_options',

  // Exam Important Dates
  EXAM_APPLICATION_START_DATE: 'application_start_date',
  EXAM_APPLICATION_END_DATE: 'application_end_date',
  EXAM_ADMIT_CARD_RELEASE_DATE: 'admit_card_release_date',
  EXAM_START_DATE: 'exam_start_date',
  EXAM_END_DATE: 'exam_end_date',
  EXAM_RESULT_DECLARATION_DATE: 'result_declaration_date',
  EXAM_COUNSELLING_DATE: 'counselling_date',

  // Eligibility & Fees

  EXAM_ELIGIBILITY_CRITERIA: 'eligibility_criteria',
  EXAM_FEE_STRUCTURE: 'exam_fee_structure',
  EXAM_FEE_ROW: {
    CATEGORY: 'category',
    MODE: 'mode',
    APPLICATION_FEE: 'application_fee',
    CURRENCY: 'currency',
    NOTE: 'note'
  },

  // Syllabus & Marking Pattern

  EXAM_SYLLABUS: 'exam_syllabus',
  EXAM_PAPERS_AND_MARKS: 'exam_papers_and_marks',
  EXAM_MARKING_SCHEME: 'marking_scheme',

  //  Instructions & Descriptions
  EXAM_DESCRIPTION: {
    EXAM_OVERVIEW: 'exam_overview',
    EXAM_IMPORTANT_NOTES: 'exam_important_notes',
    EXAM_IMPORTANT_DATES: 'exam_important_dates',
    EXAM_APPLICATION_FORM: 'exam_application_form',
    EXAM_ADMIT_CARD: 'exam_admit_card',
    EXAM_PATTERN: 'exam_pattern',
    EXAM_CONDUCTING_BODY: 'exam_conducting_body',
    EXAM_COUNSELLING: 'exam_counselling',
    EXAM_APPLICATION_FORM_STEP1: 'exam_application_form_step1',
    EXAM_APPLICATION_FORM_STEP2: 'exam_application_form_step2',
    EXAM_APPLICATION_FORM_STEP3: 'exam_application_form_step3',
    EXAM_INTIMATION_SLIP: 'exam_intimation_slip',
    EXAM_SESSION: 'exam_session',
    EXAM_CENTER: 'exam_center',
    EXAM_SYLLABUS: 'exam_syllabus'
  },

  // Contact Info & Website

  EXAM_CONDUCTING_ADDRESS: 'exam_conducting_address',
  EXAM_SUPPORT_CONTACTS: 'exam_support_contact',
  EXAM_WEBSITE: 'exam_website',
  EXAM_CONDUCTED_BY: 'exam_conducted_by',

  // Mock & Previous Year Papers
  EXAM_MOCK_TEST_PAPERS: 'mock_test_papers_data',
  EXAM_PREVIOUS_TEST_PAPERS: 'previous_test_papers_data',

  IS_VALIDATION_ERROR: 'isValidationError'
}
