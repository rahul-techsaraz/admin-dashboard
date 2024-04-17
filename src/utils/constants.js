export const constants = {
    apiEndPoint: {
        USER_LOGIN: "https://techsaraz.in//admission-cart/api/login/adminlogin/login.php",
        GET_ALL_USERLIST:"https://techsaraz.in//admission-cart/api/login/adminlogin/getAllUsers.php",
        AUTHENTICATE_USER: "https://techsaraz.in//admission-cart/api/login/adminlogin/user-info.php",
        CATEGORY_LIST:"https://techsaraz.in//admission-cart/api/course_category_list.php",
        ADMIN_REGISTER: "https://techsaraz.in//admission-cart/api/login/adminlogin/register.php",
        UPDATE_USER_ROLE: "https://techsaraz.in//admission-cart/api/login/adminlogin/approved.php",
        EXAM_LIST:"https://techsaraz.in//admission-cart/api/exam.php",
        COURSE_DETAILS: "https://techsaraz.in//admission-cart/api/courses.php"

    },
    apiHeaders: {
        HEADER:{"Content-Type":"Application/json"}
    },
    httpMethod: {
        GET: "GET",
        POST: "POST",
        PUT: "PUT",
        DELETE:"DELETE"
    },
    apiResponseStatus: {
        SUCCESS: "success",
        WARNING: "warning",
        ERROR: "error",
        NOT_FOUND:"NOT FOUND" 
    },
    apiResponseMessage: {
        ERROR_MESSAGE:"Your Request could not be processed at the moment. Please try again!"
    },
    sideBarMenu: [
     {
            heading: "Dashboard",
            isOpen:false,
            list: [
                {
                    option_name: "Category List",
                    option_path: '/category-list',
                    name:"Category",
                },
               
                {
                    option_name: "Course List",
                    option_path: '/course-list',
                    name:"Course",
                    
                },
                {
                    option_name: "Exam List",
                    option_path: '/exam-list',
                    name:"Exam",
                    
                }
            ]

        },
        {
            heading: "Colleges",
            isOpen:false,
            list: [
                {
                    option_name: "College List",
                    option_path:'/add-college'
                },
                 
                 {
                    option_name: "Add New College",
                    option_path:'/add-college'
                },
                  {
                    option_name: "College Detail",
                    option_path:'/college-detail'
                },
            ]

        },
        {
            heading: "Admin Dashboard",
            isOpen:false,
            list: [
                {
                    option_name: "Admin Dashboard",
                    option_path: '/admin-dashboard',
                    name:"Admin Dashboard",
                },
                
                           
            ]

        },
        {
            heading: "Agents",
            isOpen:false,
            list: [
                {
                    option_name: "Agent",
                    option_path: '/agent',
                    name:"Agent",
                },
                 {
                    option_name: "Add Agent",
                     option_path: '/add-agent',
                    name:"Add Agent",
                    
                },
                {
                    option_name: "Agent Profile",
                     option_path: '/agent-profile',
                    name:"Agent Profile",
                    
                },
                 {
                    option_name: "Shop",
                     option_path: '/add-college',
                    name:"Shop"
                },
                 {
                    option_name: "Villa",
                    option_path:'/add-college'
                },
                  {
                    option_name: "Property Detail",
                    option_path:'/add-college'
                },
            ]

        },
       
    ],
    subHeaderMenu: [
    
        {
            name: "Category",
            navMenu: [
                {
                    labelName: "Category List",
                    path:"category-list"
                },
                {
                    labelName: "Add New Category",
                    path:"add-new-category"
                },
            ]
        },
        {
            name: "Exam",
            navMenu: [
                {
                    labelName: "Exam List",
                    path:"exam-list"
                },
                {
                    labelName: "Add New Exam",
                    path: "add-new-exam",
                },
            ]
        },
        {
            name: "Course",
            navMenu: [
                {
                    labelName: "Course List",
                    path:"course-list"
                },
                {
                    labelName: "Add New Course",
                    path: "add-new-course",
                },
            ]
        },
        
    ],
    examDescriptionInputFieldList:[
        {
            keyName: "exam_description",
            label: "Exam Description",
            style:""
        },
        {
            keyName: "exam_conducting_body_description",
            label: "Exam Conducting Body Description",
            style:""
        },
        {
            keyName: "exam_important_dates_description",
            label: "Exam Important Dates Description",
            style:""
        },
        {
            keyName: "exam_counselling_description",
            label: "Exam Counselling Description",
            style:""
        },
        {
            keyName: "exam_application_form_description",
            label: "Exam Application Form Description",
            style:""
        },
        {
            keyName: "apllication_form_step1_description",
            label: "Apllication Form Step1 Description",
            style:""
        },
        {
            keyName: "apllication_form_step2_description",
            label: "Apllication Form Step2 Description",
            style:""
        },
        {
            keyName: "apllication_form_step3_description",
            label: "Apllication Form Step3 Description",
            style:""
        },
        {
            keyName: "exam_intimation_slip_description",
            label: "Exam Intimation Slip Description",
            style:""
        },
        {
            keyName: "exam_session_description",
            label: "Exam Session Description",
            style:""
        },
        {
            keyName: "exam_admit_card_description",
            label: "Exam Admit Card Description",
            style:""
        },
        {
            keyName: "exam_center_description",
            label: "Exam Center Description",
            style:""
        },
         {
            keyName: "exam_pattern_description",
            label: "Exam Pattern Description",
            style:""
        },
         {
            keyName: "exam_syllabus_description",
            label: "Exam Syllabus Description",
            style:""
        },
    ],
    examHighlightsInputFieldList:[
        {
            keyName: "conducting_body",
            label: "Conducting_Body",
            style:""
        },
        {
            keyName: "exam_level",
            label: "Exam Level",
            style:""
        },
        {
            keyName: "exam_frequency",
            label: "Exam Frequency",
            style:""
        },
        {
            keyName: "exam_mode",
            label: "Exam Mode",
            style:""
        },
        {
            keyName: "exam_duration",
            label: "Exam Duration",
            style:""
        },
        {
            keyName: "paper_marks",
            label: "Number of Papers and Total Marks",
            style:""
        },
        {
            keyName: "marking_scheme",
            label: "Marking Scheme",
            style:""
        }
    ],
    examConfigInputFieldList:[
        {
            keyName: "no_session",
            label: "No Of Session",
            type:"text"
        },
        {
            keyName: "session_name",
            label: "Session Name",
            type:"text"
        },
        {
            keyName: "is_counselling_announced",
            label: "Is Counselling Announced",
            type: "select",
            options:[{label:"Counselling Announced",value:""},{label:"Yes",value:"Yes"},{label:"No",value:"No"}]
        },
        {
            keyName: "counselling_date",
            label: "Counselling Dates",
            type:"date"
        },
        {
            keyName: "exam_conducting_address",
            label: "Exam Conducting Address",
            type:"text"
        },
        {
            keyName: "exam_conducting_email",
            label: "Exam Conducting Email",
            type:"text"
        },
       
    ],
    examDescriptionInitialState: {
        initialState:{
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
        exam_syllabus_description: '',
    }
    },
    examDetailsTab: {
        EXAM_INFO:'examinfo',
        DESCRIPTION_DETAILS: 'description',
        EXAM_HIGHLIGHTS: 'highlights',
        EXAM_CONFIG: "config",
        examTab: [
            { label: "Exam Info", key: 'examinfo' },
            {label:"Exam Descriptions",key:'description'},
            {label:"Exam Highlights",key:'highlights'},
            {label:"Exam Config",key:'config'},
            
        ]
    },
    examInfoSelectBox:[{"label":"Exam Year","value":""},{"label":"2024","value":"2024"},{"label":"2025","value":"2025"},{"label":"2026","value":"2026"}],
    addNewCourseTab: [
        {label:"Course Basic Details", value: '1' },
        {label:"Course Description Details", value:'2'},
        {label:"Course Details", value:'3'},
        {label:"Sallabus Details", value:'4'},
    ],
    
    courseDescriptionInputFieldList:[
        {
            label: "Course Overview",
            style:""
        },
        {
            label: "Course Entrance Exam Description",
            style:""
        },
        {
            label: "Course Fee Description",
            style:""
        },
        {
            label: "Course Placement Description",
            style:""
        },
        {
            label: "Course Pdmission Process Description",
            style:""
        },
        {
            label: "Course Eligibility Criteria Description",
            style:""
        },
    ],
    courseDetailsInputFieldList:[
        {
            label: "Eligiblity Criteria",
            style:""
        },
        {
            label: "Career Options",
            style:""
        },
    ],
    courseLevelSelectBox:[
        {"label":"Course Level","value":""},
        {"label":"Option 1","value":"Option 1"},
        {"label":"Option 2","value":"Option 2"},
        {"label":"Option 3","value":"Option 3"},
    ],
    courseDurationSelectBox:[
        {"label":"Course Duration","value":""},
        {"label":"Option 1","value":"Option 1"},
        {"label":"Option 2","value":"Option 2"},
        {"label":"Option 3","value":"Option 3"},
    ],
    courseExamTypeSelectBox:[
        {"label":"Exam Type","value":""},
        {"label":"Option 1","value":"Option 1"},
        {"label":"Option 2","value":"Option 2"},
        {"label":"Option 3","value":"Option 3"},
    ],
    courseTopCourseCollegesSelectBox:[
        {"label":"Top Course Colleges","value":""},
        {"label":"Option 1","value":"College 1"},
        {"label":"Option 2","value":"College 2"},
        {"label":"Option 3","value":"College 3"},
    ],
    courseBasicDetailsCourseModeSelectBox:[
        {"label":"Course Mode", "value":""},
        {"label":"Regular", "value":"Regular"},
        {"label":"Distance", "value":"Distance"},
    ],
    courseBasicDetailsExamNameSelectBox:[
        {"label":"Exam Name", "value":""},
        {"label":"Exam 1", "value":"Exam 1"},
        {"label":"Exam 2", "value":"Exam 2"},
        {"label":"Exam 3", "value":"Exam 3"},
        {"label":"Exam 4", "value":"Exam 4"},
        {"label":"Exam 5", "value":"Exam 5"},
    ]
}