import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Main from '../Components/Main'
import Header from '../Components/Header'
import LeftSidebar from '../Components/LeftSidebar'
import CategoryList from '../Components/category_list/CategoryList'
import SignIn from '../Components/SignIn'
import CollegeListImg from '../Components/CollegeListImg'
import CollegeListImg2 from '../Components/CollegeListImg2'
import CollegeDetail from '../Components/CollegeDetail'
import Agent from '../Components/Agent'
import AddAgent from '../Components/AddAgent'
import AgentProfile from '../Components/AgentProfile'
import SignUp from '../Components/SignUp'
import ProtectedRoute from '../utils/ProtectedRoute'
import AddNewCategory from '../Components/category_list/AddNewCategory'
import AdminRequest from '../Components/admin/AdminRequest'
import ExamList from '../Components/exam/ExamList'
import ViewExamDetails from '../Components/exam/ViewExamDetails'
import AddNewExamDetails from '../Components/exam/AddNewExamDetails'
import College_list from '../Components/agent_college/College_list'
import ParentWrapper from '../Components/agent_college/ParentWrapper'
import UsersList from '../Components/users-list/UsersList'
import ViewUserDetails from '../Components/users-list/ViewUserDetails'
import CollegeRequest from '../Components/admin/CollegeRequest'
import FeedbackList from '../Components/feedback/FeedbackList'
import FeedbackDetails from '../Components/feedback/FeedbackDetails'
import Courses from '../Container/Courses/Courses'
import CourseDetailsContainer from '../Container/Courses/CourseDetailsContainer'
import CourseList from '../Container/Courses/CourseList'

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
          path: '/',
          element: <Main />
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
          element: <AddNewExamDetails />
        },
        {
          path: '/add-exam-description/:examId',
          element: <ViewExamDetails />
        },
        {
          path: '/list-college',
          element: <CollegeRequest />
        },
        {
          path: '/list-agent-college',
          element: <College_list />
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
          element: <Agent />
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
        }
      ],
      errorElement: (
        <>
          <body className='theme-purple'>
            <Header />
            <LeftSidebar />
            <div style={{ margin: 300 }}>Error</div>
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
