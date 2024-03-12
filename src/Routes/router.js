import { createBrowserRouter, RouterProvider, Route} from "react-router-dom";
import App from "../App";
import Main from "../Components/Main";
import AddCollege from "../Components/AddCollege";
import Header from "../Components/Header";
import LeftSidebar from "../Components/LeftSidebar";
import CategoryList from "../Components/category_list/CategoryList";


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
        ],
        errorElement: (<>
            <body class="theme-purple">
                <Header />
           <LeftSidebar />
           <div style={{margin:300}}>Error</div>
             </body>
            
       </>)
    }
])