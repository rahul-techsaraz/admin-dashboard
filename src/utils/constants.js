export const constants = {
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
                    option_name: "State List",
                    option_path: '/state-list',
                    name:"State",
                    
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
                    option_path:'/add-college'
                },
            ]

        },
        {
            heading: "Types",
            isOpen:false,
            list: [
                {
                    option_name: "Apartment",
                    option_path: '/add-college',
                    name:"Apartment",
                },
                 {
                    option_name: "Office",
                     option_path: '/add-college',
                    name:"Office",
                    
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
            name: "State",
            navMenu: [
                {
                    labelName: "State List",
                    path:"state-list"
                },
                {
                    labelName: "Add New State",
                    path:"add-new-state"
                },
            ]
        }
    ]

}