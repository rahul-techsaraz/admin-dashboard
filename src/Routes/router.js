import { createBrowserRouter} from "react-router-dom";
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
import SignUp from "../Components/SignUp";
import ProtectedRoute from "../utils/ProtectedRoute";
import AddNewCategory from "../Components/category_list/AddNewCategory";
import AdminRequest from '../Components/admin/AdminRequest'
import ExamList from "../Components/exam/ExamList";
import ViewExamDetails from "../Components/exam/ViewExamDetails";
import AddNewExamDetails from "../Components/exam/AddNewExamDetails";
import CourseList from "../Components/course_list/CourseList";
import AddNewCourse from "../Components/course_list/AddNewCourse";
import ViewCourseDetails from "../Components/course_list/ViewCourseDetails";
import College_list from "../Components/agent_college/College_list";



export const appRouter = createBrowserRouter([
    {
        path:"/",
        element: <ProtectedRoute><App/></ProtectedRoute>,
        children:[
            {
                path: "/",
                element: <Main/>

            },
            {
                path: "/category-list",
                element: <CategoryList/>
            },
            {
                path: "/add-new-category",
                element: <AddNewCategory />
            },
            {
                path: "/add-new-category/:categoryId",
                element: <AddNewCategory />
            },
            {
                path: "/state-list",
                element: <CategoryList/>
            },
             {
                path: "/course-list",
                element: <CourseList/>
            },
            {
                path: "/add-new-course",
                element: <AddNewCourse/>
            },
            {
                path: "/add-new-course/:courseId",
                element: <ViewCourseDetails />,
            },
            
              {
                path: "/exam-list",
                element: <ExamList/>
            },
            {
                path: "/add-new-exam",
                element: <AddNewExamDetails />
            },
            {
                path: "/add-exam-description/:examId",
                element: <ViewExamDetails/>
            },
            {
                path:"/list-college",
                element: <AdminRequest/>
            },
            {
                path:"/list-agent-college",
                element: <College_list/>
            },
            {
                path: "/add-college",
                element: <AddCollege/>
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
    {
        path:"/sign-up",
        element: <SignUp/>
    },
           
        
    
], {
    basename:"/admin"
})