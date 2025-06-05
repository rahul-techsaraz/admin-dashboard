import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Header from '../Components/Header'
import LeftSidebar from '../Components/LeftSidebar'
import CategoryList from '../Components/category_list/CategoryList'
import SignIn from '../Components/SignIn'
import CollegeListImg from '../Components/CollegeListImg'
import CollegeListImg2 from '../Components/CollegeListImg2'
import CollegeDetail from '../Components/CollegeDetail'
import Partner from '../Components/Partner'
import AddAgent from '../Components/AddAgent'
import AgentProfile from '../Components/AgentProfile'
import SignUp from '../Components/SignUp'
import ProtectedRoute from '../utils/ProtectedRoute'
import AddNewCategory from '../Components/category_list/AddNewCategory'
import AdminRequest from '../Components/admin/AdminRequest'
import UsersList from '../Components/users-list/UsersList'
import ViewUserDetails from '../Components/users-list/ViewUserDetails'
import CollegeRequest from '../Components/admin/CollegeRequest'
import FeedbackList from '../Components/feedback/FeedbackList'
import FeedbackDetails from '../Components/feedback/FeedbackDetails'
import CollegeList from '../Components/college_steps/components/CollegeList'
import ParentWrapper from '../Components/college_steps/components/ParentWrapper'
import CourseList from '../Container/Courses/CourseList'
import Courses from '../Container/Courses/Courses'
import CourseDetailsContainer from '../Container/Courses/CourseDetailsContainer'
import ExamList from '../Container/Exams/ExamList'
import ExamDetails from '../Container/Exams/ExamDetails'
import ExamContainer from '../Container/Exams/Exams'
import DashboardContainer from '../Components/AnalyticsDashBoard/DashboardContainer'
import CreateNewAdmin from '../Components/super_admin/CreateNewAdmin'
import CallbackRequest from '../Components/callback-request/CallbackRequest'
import CallBackRequestDetails from '../Components/callback-request/CallbackRequestDetails'
import ErrorBoundary from '../Components/ErrorBoundary/ErrorBoundary'

export const appRouter = createBrowserRouter(
  [
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <App />
        </ProtectedRoute>
      ),
      children: [
        {
          path: '',
          element: <DashboardContainer />
        },
        {
          path: '/category-list',
          element: <CategoryList />
        },
        {
          path: '/add-new-category',
          element: <AddNewCategory />
        },
        {
          path: '/add-new-category/:categoryId',
          element: <AddNewCategory />
        },
        {
          path: '/state-list',
          element: <CategoryList />
        },
        {
          path: '/course-list',
          element: <CourseList />
        },
        {
          path: '/users-list',
          element: <UsersList />
        },
        {
          path: '/users-list/:email',
          element: <ViewUserDetails />
        },
        {
          path: '/feedback-list',
          element: <FeedbackList />
        },
        {
          path: '/users-callback-request-list',
          element: <CallbackRequest />
        },
        {
          path: '/users-callback-request-list/:email',
          element: <CallBackRequestDetails />
        },
        {
          path: '/feedback-list/:email',
          element: <FeedbackDetails />
        },
        {
          path: '/add-new-course',
          element: <Courses />
        },
        {
          path: '/add-new-course/:courseId',
          element: <CourseDetailsContainer />
        },

        {
          path: '/exam-list',
          element: <ExamList />
        },
        {
          path: '/add-new-exam',
          element: <ExamContainer />
        },
        {
          path: '/add-exam-description/:examId',
          element: <ExamDetails />
        },
        {
          path: '/list-college',
          element: <CollegeRequest />
        },
        {
          path: '/list-agent-college',
          element: <CollegeList />
        },
        {
          path: '/add-college',
          element: <ParentWrapper />
        },
        {
          path: '/add-college/:collegeId/:admin',
          element: <ParentWrapper />
        },
        {
          path: '/add-college/:collegeId',
          element: <ParentWrapper />
        },
        {
          path: '/college-list-img',
          element: <CollegeListImg />
        },
        {
          path: '/college-list-img2',
          element: <CollegeListImg2 />
        },
        {
          path: '/college-detail',
          element: <CollegeDetail />
        },
        {
          path: '/agent',
          element: <Partner />
        },
        {
          path: '/add-agent',
          element: <AddAgent />
        },
        {
          path: '/agent-profile',
          element: <AgentProfile />
        },
        {
          path: '/admin-dashboard',
          element: <AdminRequest />
        },
        {
          path: '/admin-user-list',
          element: <AdminRequest />
        },
        {
          path: '/add-new-admin-user',
          element: <CreateNewAdmin />
        }
      ],
      errorElement: (
        <>
          <body className='theme-purple'>
            <Header />
            <LeftSidebar />
            <ErrorBoundary />
          </body>
        </>
      )
    },
    {
      path: '/sign-in',
      element: <SignIn />
    },
    {
      path: '/sign-up',
      element: <SignUp />
    }
  ],
  {
    basename: '/admin'
  }
)
