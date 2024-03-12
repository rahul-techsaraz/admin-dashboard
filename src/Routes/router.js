import { createBrowserRouter, RouterProvider, Route} from "react-router-dom";
import App from "../App";
import Main from "../Components/Main";
import AddCollege from "../Components/AddCollege";
<<<<<<< Updated upstream
import Header from "../Components/Header";
import LeftSidebar from "../Components/LeftSidebar";
import CategoryList from "../Components/category_list/CategoryList";
=======
import CollegeList from "../Components/CollegeList";
import SignIn from "../Components/SignIn";
import CollegeListImg from "../Components/CollegeListImg";
import CollegeListImg2 from "../Components/CollegeListImg2";
import CollegeDetail from "../Components/CollegeDetail";
>>>>>>> Stashed changes


export const appRouter = createBrowserRouter([
    {
        path:"/",
        element: <App/>,
        children:[
            {
                path: "/",
                element: <Main/>

            },
            {
                path: "/add-college",
                element: <AddCollege/>
<<<<<<< Updated upstream
            },
            {
                path: "/category-list",
                element: <CategoryList/>
            },
            {
                path: "/state-list",
                element: <CategoryList/>
            },
             {
                path: "/course-list",
                element: <CategoryList/>
            },
              {
                path: "/exam-list",
                element: <CategoryList/>
            },
        ],
        errorElement: (<>
            <body class="theme-purple">
                <Header />
           <LeftSidebar />
           <div style={{margin:300}}>Error</div>
             </body>
            
       </>)
=======

            },
            {
                path:"/list-college",
                element: <CollegeList/>

            },
            {
                path:"/sign-in",
                element: <SignIn/>

            },
            {
                path:'/college-list-img',
                element:<CollegeListImg/>
            },
            {
                path:'/college-list-img2',
                element:<CollegeListImg2/>
            },
            {
                path:'/college-detail',
                element:<CollegeDetail/>
            }
        ]
>>>>>>> Stashed changes
    }
])