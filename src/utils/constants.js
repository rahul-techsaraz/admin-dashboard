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
        
    ]

}