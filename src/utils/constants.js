export const constants = {
    apiEndPoint: {
        USER_LOGIN: "https://techsaraz.in//admission-cart/api/login/adminlogin/login.php",
        GET_ALL_USERLIST:"https://techsaraz.in//admission-cart/api/login/adminlogin/getAllUsers.php",
        AUTHENTICATE_USER: "https://techsaraz.in//admission-cart/api/login/adminlogin/user-info.php",
        CATEGORY_LIST:"https://techsaraz.in//admission-cart/api/course_category_list.php",
        ADMIN_REGISTER: "https://techsaraz.in//admission-cart/api/login/adminlogin/register.php",
        UPDATE_USER_ROLE: "https://techsaraz.in//admission-cart/api/login/adminlogin/approved.php",
        EXAM_LIST:"https://techsaraz.in//admission-cart/api/exam.php"

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
                    path:"add-new-exam"
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
    }

}