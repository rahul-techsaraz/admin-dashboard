import { createBrowserRouter, RouterProvider, Route} from "react-router-dom";
import App from "../App";
import Main from "../Components/Main";
import AddCollege from "../Components/AddCollege";
import Header from "../Components/Header";
import LeftSidebar from "../Components/LeftSidebar";
import CategoryList from "../Components/category_list/CategoryList";
import CollegeList from "../Components/CollegeList";
import SignIn from "../Components/SignIn";
import CollegeListImg from "../Components/CollegeListImg";
import CollegeListImg2 from "../Components/CollegeListImg2";
import CollegeDetail from "../Components/CollegeDetail";
import Agent from "../Components/Agent";
import AddAgent from "../Components/AddAgent";
import AgentProfile from "../Components/AgentProfile";
import AdminRequest from "../Components/AdminRequest";



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
               {
                path:"/list-college",
                element: <CollegeList/>

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
            },
           {
            path:'/agent',
            element:<Agent/>
           },
           {
            path:'/add-agent',
            element:<AddAgent/>
           },
           {
            path:'/agent-profile',
            element:<AgentProfile/>
           },
           {
            path:'/admin-dashboard',
            element:<AdminRequest/>
           }
        ],
        errorElement: (<>
            <body class="theme-purple">
                <Header />
           <LeftSidebar />
           <div style={{margin:300}}>Error</div>
             </body>
            
       </>)

    },
    {
                path:"/sign-in",
                element: <SignIn/>

            },
           
        
    
])