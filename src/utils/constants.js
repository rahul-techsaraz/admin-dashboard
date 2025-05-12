export const constants = {
  apiEndPoint: {
    USER_LOGIN: 'https://techsaraz.in//admission-cart/api/login/adminlogin/login.php',
    GET_ALL_ADMIN_USERLIST: 'https://techsaraz.in//admission-cart/api/login/adminlogin/getAllUsers.php',
    AUTHENTICATE_USER: 'https://techsaraz.in//admission-cart/api/login/adminlogin/user-info.php',
    CATEGORY_LIST: 'https://techsaraz.in//admission-cart/api/course_category_list.php',
    ADMIN_REGISTER: 'https://techsaraz.in//admission-cart/api/login/adminlogin/register.php',
    UPDATE_USER_ROLE: 'https://techsaraz.in//admission-cart/api/login/adminlogin/approved.php',
    EXAM_LIST: 'https://techsaraz.in//admission-cart/api/newexams.php',
    NEW_EXAM_API: 'https://techsaraz.in//admission-cart/api/newexams.php',
    COURSE_DETAILS: 'https://techsaraz.in/admission-cart/api/newcourses.php',
    COLLEGE_LIST: 'https://techsaraz.in/admission-cart/api/colleges.php',
    STATE_LIST: 'https://api.countrystatecity.in/v1/countries/IN/states',
    CITY_LIST: 'https://api.countrystatecity.in/v1/countries/IN/states/',
    COURSE_DETAILS_COLLEGE: 'https://techsaraz.in/admission-cart/api/courses.php?requestType=getAllCourseDetails',
    UPLOAD_FILE: 'https://techsaraz.in/admission-cart/api/fileupload/upload.php',
    GET_ALL_USERS_USER_DETAILS: 'https://techsaraz.in//admission-cart/api/login/getAllUsers.php',
    FETCH_USER_DETAILS_BY_EMAIL: 'https://techsaraz.in//admission-cart/api/user.php?requestType=getAllUserDetails&email=',
    USER_FEADBACK_RESPONSE: 'https://techsaraz.in//admission-cart/api/user.php?requestType=userFeedbackReport',
    NEW_COLLEGE: 'https://techsaraz.in/admission-cart/api/newcollege.php'
  },
  imageAbsolutePath: 'https://techsaraz.in/admission-cart/api/fileupload/',
  newImageAbsolutePath: 'https://techsaraz.in/admission-cart/api/',
  apiHeaders: {
    HEADER: { 'Content-Type': 'Application/json' },
    HEADER_FORM_DATA: { 'Content-Type': 'multipart/form-data' },
    customHeader: {
      Authorization:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3RcL3BocF9hdXRoX2FwaVwvIiwiYXVkIjoiaHR0cDpcL1wvbG9jYWxob3N0XC9waHBfYXV0aF9hcGlcLyIsImlhdCI6MTc0NzA3NDQ3OSwiZXhwIjoxNzQ3MDc4MDc5LCJkYXRhIjp7InVzZXJfaWQiOjF9fQ.JmSk7akT3kBpoo9Z84Yfy7rN2LynF5ylez-gojJ8De8',
      'Content-Type': 'Application/json'
    }
  },
  httpMethod: {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
  },
  apiResponseStatus: {
    SUCCESS: 'success',
    WARNING: 'warning',
    ERROR: 'error',
    NOT_FOUND: 'NOT FOUND'
  },
  apiResponseMessage: {
    ERROR_MESSAGE: 'Your Request could not be processed at the moment. Please try again!'
  },
  collegeStatus: {
    APPROVED: 'Approved',
    DECLINED: 'Declined',
    REVISION: 'Revision',
    NOTPUBLISHED: 'NOT PUBLISHED'
  },
  sideBarMenu: [
    {
      role: 'admin',
      heading: 'Dashboard',
      isOpen: false,
      list: [
        {
          option_name: 'Category List',
          option_path: '/category-list',
          name: 'Category'
        },
        {
          option_name: 'Course List',
          option_path: '/course-list',
          name: 'Course'
        },
        {
          option_name: 'Exam List',
          option_path: '/exam-list',
          name: 'Exam'
        }
      ]
    },
    {
      role: 'admin',
      heading: 'Admin',
      isOpen: false,
      list: [
        {
          option_name: 'Admin Users',
          option_path: '/admin-dashboard',
          name: 'Admin Users'
        },
        {
          option_name: 'Colleges',
          option_path: '/list-college',
          name: 'Admin Users'
        },
        {
          option_name: 'Users',
          option_path: '/users-list',
          name: 'Users'
        },
        {
          option_name: 'Users Feedback',
          option_path: '/feedback-list',
          name: 'Users Feedback'
        }
      ]
    },
    {
      role: 'admin',
      heading: 'Trending',
      isOpen: false,
      list: [
        {
          option_name: 'Colleges',
          option_path: '/admin-dashboard',
          name: 'Admin Users'
        },
        {
          option_name: 'Courses',
          option_path: '/list-college',
          name: 'Admin Users'
        },
        {
          option_name: 'Exams',
          option_path: '/users-list',
          name: 'Users'
        }
      ]
    },
    {
      role: 'agent',
      heading: 'Agents',
      isOpen: false,
      list: [
        {
          option_name: 'College List',
          option_path: '/list-agent-college',
          name: 'College'
        },
        {
          option_name: 'Add New College',
          option_path: '/add-college',
          name: 'Add Agent'
        }
      ]
    }
  ],
  subHeaderMenu: [
    {
      name: 'Category',
      navMenu: [
        {
          labelName: 'Category List',
          path: 'category-list'
        },
        {
          labelName: 'Add New Category',
          path: 'add-new-category'
        }
      ]
    },
    {
      name: 'Exam',
      navMenu: [
        {
          labelName: 'Exam List',
          path: 'exam-list'
        },
        {
          labelName: 'Add New Exam',
          path: 'add-new-exam'
        }
      ]
    },
    {
      name: 'Course',
      navMenu: [
        {
          labelName: 'Course List',
          path: 'course-list'
        },
        {
          labelName: 'Add New Course',
          path: 'add-new-course'
        }
      ]
    },
    {
      name: 'College',
      navMenu: [
        {
          labelName: 'College List',
          path: 'list-agent-college'
        },
        {
          labelName: 'Add New College',
          path: 'add-college'
        }
      ]
    },
    {
      name: 'Agents',
      navMenu: [
        {
          labelName: 'College List',
          path: 'list-agent-college'
        },
        {
          labelName: 'Add New College',
          path: 'add-college'
        }
      ]
    }
  ],
  examDescriptionInputFieldList: [
    {
      keyName: 'exam_description',
      label: 'Exam Description',
      style: ''
    },
    {
      keyName: 'exam_conducting_body_description',
      label: 'Exam Conducting Body Description',
      style: ''
    },
    {
      keyName: 'exam_important_dates_description',
      label: 'Exam Important Dates Description',
      style: ''
    },
    {
      keyName: 'exam_counselling_description',
      label: 'Exam Counselling Description',
      style: ''
    },
    {
      keyName: 'exam_application_form_description',
      label: 'Exam Application Form Description',
      style: ''
    },
    {
      keyName: 'apllication_form_step1_description',
      label: 'Apllication Form Step1 Description',
      style: ''
    },
    {
      keyName: 'apllication_form_step2_description',
      label: 'Apllication Form Step2 Description',
      style: ''
    },
    {
      keyName: 'apllication_form_step3_description',
      label: 'Apllication Form Step3 Description',
      style: ''
    },
    {
      keyName: 'exam_intimation_slip_description',
      label: 'Exam Intimation Slip Description',
      style: ''
    },
    {
      keyName: 'exam_session_description',
      label: 'Exam Session Description',
      style: ''
    },
    {
      keyName: 'exam_admit_card_description',
      label: 'Exam Admit Card Description',
      style: ''
    },
    {
      keyName: 'exam_center_description',
      label: 'Exam Center Description',
      style: ''
    },
    {
      keyName: 'exam_pattern_description',
      label: 'Exam Pattern Description',
      style: ''
    },
    {
      keyName: 'exam_syllabus_description',
      label: 'Exam Syllabus Description',
      style: ''
    }
  ],
  examHighlightsInputFieldList: [
    {
      keyName: 'conducting_body',
      label: 'Conducting_Body',
      style: ''
    },
    {
      keyName: 'exam_level',
      label: 'Exam Level',
      style: ''
    },
    {
      keyName: 'exam_frequency',
      label: 'Exam Frequency',
      style: ''
    },
    {
      keyName: 'exam_mode',
      label: 'Exam Mode',
      style: ''
    },
    {
      keyName: 'exam_duration',
      label: 'Exam Duration',
      style: ''
    },
    // {
    //   keyName: 'paper_marks',
    //   label: 'Number of Papers and Total Marks',
    //   style: ''
    // },
    {
      keyName: 'marking_scheme',
      label: 'Marking Scheme',
      style: ''
    }
  ],
  examConfigInputFieldList: [
    // {
    //   keyName: 'no_session',
    //   label: 'No Of Session',
    //   type: 'text'
    // },
    {
      keyName: 'session_name',
      label: 'Session Name',
      type: 'text'
    },
    {
      keyName: 'is_counselling_announced',
      label: 'Is Counselling Announced',
      type: 'select',
      options: [
        { label: 'Counselling Announced', value: '' },
        { label: 'Yes', value: 'Yes' },
        { label: 'No', value: 'No' }
      ]
    },
    {
      keyName: 'counselling_date',
      label: 'Counselling Dates',
      type: 'date'
    },
    {
      keyName: 'exam_conducting_address',
      label: 'Exam Conducting Address',
      type: 'text'
    },
    {
      keyName: 'exam_conducting_email',
      label: 'Exam Conducting Email',
      type: 'text'
    }
  ],
  examDescriptionInitialState: {
    initialState: {
      exam_description: '',
      exam_conducting_body_description: '',
      exam_important_dates_description: '',
      exam_session_description: '',
      exam_counselling_description: '',
      exam_application_form_description: '',
      apllication_form_step1_description: '',
      apllication_form_step2_description: '',
      apllication_form_step3_description: '',
      exam_intimation_slip_description: '',
      exam_admit_card_description: '',
      exam_center_description: '',
      exam_pattern_description: '',
      exam_syllabus_description: ''
    }
  },
  examDetailsTab: {
    EXAM_INFO: 'examinfo',
    DESCRIPTION_DETAILS: 'description',
    EXAM_HIGHLIGHTS: 'highlights',
    EXAM_CONFIG: 'config',
    examTab: [
      { label: 'Exam Info', key: 'examinfo', tabValue: 1 },
      { label: 'Exam Descriptions', key: 'description', tabValue: 2 },
      { label: 'Exam Highlights', key: 'highlights', tabValue: 3 },
      { label: 'Exam Config', key: 'config', tabValue: 4 }
    ]
  },
  examInfoSelectBox: [
    { label: 'Exam Year', value: '' },
    { label: '2024', value: '2024' },
    { label: '2025', value: '2025' },
    { label: '2026', value: '2026' }
  ],
  addNewCourseTab: [
    { label: 'Course Basic Details', value: '1' },
    { label: 'Course Description Details', value: '2' },
    { label: 'Course Details', value: '3' },
    { label: 'Syllabus Details', value: '4' }
  ],

  courseDescriptionInputFieldList: [
    {
      classKey: 'courseDescriptions',
      key: 'course_overview_description',
      label: 'Course Overview',
      style: ''
    },
    {
      classKey: 'courseDescriptions',
      key: 'course_entrance_exam_description',
      label: 'Course Entrance Exam Description',
      style: ''
    },
    {
      classKey: 'courseDescriptions',
      key: 'course_fee_description',
      label: 'Course Fee Description',
      style: ''
    },
    {
      classKey: 'courseDescriptions',
      key: 'course_placement_description',
      label: 'Course Placement Description',
      style: ''
    },
    {
      classKey: 'courseDescriptions',
      key: 'course_admission_process_description',
      label: 'Course Admission Process Description',
      style: ''
    },
    {
      classKey: 'courseDescriptions',
      key: 'course_eligibility_criteria_description',
      label: 'Course Eligibility Criteria Description',
      style: ''
    }
  ],
  courseDetailsInputFieldList: [
    {
      classKey: 'courseDetails',
      key: 'eligiblity_criteria',
      label: 'Eligiblity Criteria',
      style: ''
    }
  ],
  courseLevelSelectBox: [
    { label: 'Course Level', value: '' },
    { label: 'Undergraduate', value: 'Undergraduate' },
    { label: 'Graduate', value: 'Graduate' },
    { label: 'Postgraduate', value: 'Postgraduate' }
  ],
  courseDurationSelectBox: [
    { label: 'Course Duration', value: '' },
    { label: 'Option 1', value: 'Option 1' },
    { label: 'Option 2', value: 'Option 2' },
    { label: 'Option 3', value: 'Option 3' }
  ],
  courseExamTypeSelectBox: [
    { label: 'Exam Type', value: '' },
    { label: 'Semester', value: 'Semester' },
    { label: 'Yearly', value: 'Yearly' }
  ],
  courseTopCourseCollegesSelectBox: [
    { label: 'Top Course Colleges', value: '' },
    { label: 'Option 1', value: 'Option 1' },
    { label: 'Option 2', value: 'Option 2' },
    { label: 'Option 3', value: 'Option 3' },
    { label: 'Option 4', value: 'Option 4' },
    { label: 'Option 5', value: 'Option 5' },
    { label: 'Option 6', value: 'Option 6' }
  ],
  courseBasicDetailsCourseModeSelectBox: [
    { label: 'Course Mode', value: '' },
    { label: 'Regular', value: 'Regular' },
    { label: 'Distance', value: 'Distance' }
  ],
  courseBasicDetailsExamNameSelectBox: [{ label: 'Exam Name', value: '' }],
  courseSyllabusDetailsYearSelectBox: [
    { label: 'Year', value: '' },
    { label: '2024', value: '2024' },
    { label: '2025', value: '2025' },
    { label: '2026', value: '2026' }
  ],
  courseSyllabusDetailsSemesterSelectBox: [
    { label: 'Semester', value: '' },
    { label: 'Semester 1', value: 'Semester 1' },
    { label: 'Semester 2', value: 'Semester 2' },
    { label: 'Semester 3', value: 'Semester 3' },
    { label: 'Semester 4', value: 'Semester 4' },
    { label: 'Semester 5', value: 'Semester 5' },
    { label: 'Semester 6', value: 'Semester 6' },
    { label: 'Semester 7', value: 'Semester 7' },
    { label: 'Semester 8', value: 'Semester 8' }
  ],
  courseIsPublished: {
    notPublished: 0,
    published: 1
  },
  SyllabusDetailsUserColumns: [
    {
      field: 'year_name',
      headerName: 'Year',
      width: 100
    },
    {
      field: 'semester_name',
      headerName: 'Semester Name',
      width: 150
    },
    {
      field: 'list_of_subject',
      headerName: 'List of Subject',
      width: 150
    }
  ],
  courseListUserColumns: [
    {
      field: 'course_name',
      headerName: 'Course Name',
      width: 200
    },
    {
      field: 'course_mode',
      headerName: 'Course Mode',
      width: 200
    },
    {
      field: 'course_duration',
      headerName: 'Course Duration',
      width: 200
    }
  ],
  allUsersList: [
    {
      field: 'email',
      headerName: 'Email',
      width: 300
    },
    {
      field: 'phone',
      headerName: 'Phone',
      width: 150
    },
    {
      field: 'full_name',
      headerName: 'Full Name',
      width: 300
    }
  ],
  allUserFeedbackList: [
    {
      field: 'user_name',
      headerName: 'Full Name',
      width: 200
    },
    {
      field: 'email',
      headerName: 'E-mail',
      width: 150
    },
    {
      field: 'phone_number',
      headerName: 'Phone',
      width: 150
    },
    {
      field: 'feedback',
      headerName: 'Feedback',
      width: 200
    }
  ],
  collegeListUserColumns: [
    {
      field: 'college_name',
      headerName: 'College Name',
      width: 200
    },
    {
      field: 'is_publish',
      headerName: 'status',
      width: 200
    },
    {
      field: 'message',
      headerName: 'Comment',
      width: 200
    }
  ],
  addNewCollegeTab: [
    { label: 'College Basic Details', value: '1' },
    { label: 'Course Offered', value: '2' },
    { label: 'College Description', value: '3' },
    { label: 'College Highlight', value: '4' },
    { label: 'Common', value: '5' },
    { label: 'Gallary', value: '6' },
    { label: 'Placements', value: '7' },
    { label: 'News', value: '8' }
  ],
  collegeType: [
    { label: 'Private', value: 'Private' },
    { label: 'Government', value: 'Government' },
    { label: 'Autonomous', value: 'Autonomous' }
  ],
  ratings: [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 }
  ],
  collegeDescriptionInputFieldList: [
    {
      classKey: 'collegeDescriptions',
      key: 'college_description',
      label: 'College Description',
      style: ''
    },
    {
      classKey: 'collegeDescriptions',
      key: 'college_course_description',
      label: 'College Course Description',
      style: ''
    },
    {
      classKey: 'collegeDescriptions',
      key: 'college_highlights_description',
      label: 'College Highlights Description',
      style: ''
    },
    {
      classKey: 'collegeDescriptions',
      key: 'college_campus_description',
      label: 'College Campus Description',
      style: ''
    },
    {
      classKey: 'collegeDescriptions',
      key: 'college_admission_description',
      label: 'College Admission Description',
      style: ''
    }
  ],
  highlightsUserColumns: [
    {
      field: 'course_name',
      headerName: 'Course Name',
      width: 150
    },
    {
      field: 'fees_annually',
      headerName: 'Fees Annually',
      width: 150
    },
    {
      field: 'eligibility_criteria',
      headerName: 'Eligibility Criteria',
      width: 150
    },
    {
      field: 'course_duration',
      headerName: 'Course Duration',
      width: 100
    }
  ],
  courseOfferedUserColumns: [
    {
      field: 'course_name',
      headerName: 'Course Name',
      width: 150
    },
    {
      field: 'sub_course_fee',
      headerName: 'Sub Course Fee',
      width: 100
    },
    {
      field: 'course_accepting_exam',
      headerName: 'Course Accepting Exam',
      width: 200
    },
    {
      field: 'sub_course_duration',
      headerName: 'Course Duration',
      width: 100
    },
    {
      field: 'eligibility_criteria',
      headerName: 'Eligibility',
      width: 150
    }
  ],
  placementsUserColumns: [
    {
      field: 'year',
      headerName: 'Year',
      width: 150
    },
    {
      field: 'total_students',
      headerName: 'Total Students',
      width: 150
    },
    {
      field: 'students_placed',
      headerName: 'Students Placed',
      width: 150
    },
    {
      field: 'highest_package',
      headerName: 'Highest Package',
      width: 150
    },
    {
      field: 'average_package',
      headerName: 'Average Package',
      width: 150
    },
    {
      field: 'top_recruiters',
      headerName: 'Top Recruiters',
      width: 150
    }
  ],
  newsUserColumns: [
    {
      field: 'title',
      headerName: 'Title',
      width: 150
    },
    {
      field: 'content',
      headerName: 'Content',
      width: 300
    }
  ],
  collegeStepsLabel: [
    { label: 'College Basic Details', isValitadeError: 'collegeBasicDetails' },
    { label: 'Course Offered', isValitadeError: 'courseOffered' },
    { label: 'College Description', isValitadeError: 'collegeDescriptions' },
    { label: 'Placements', isValitadeError: 'placements' },
    { label: 'News', isValitadeError: 'news' },
    { label: 'Faculty & Facilities', isValitadeError: 'facilities' },
    { label: 'Gallery', isValitadeError: 'gallary' }
  ]
}
