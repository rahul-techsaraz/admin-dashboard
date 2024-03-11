import { createBrowserRouter, RouterProvider, Route} from "react-router-dom";
import App from "../App";
import Main from "../Components/Main";
import ProfilePage from "../Components/AddCollege";
import AddCollege from "../Components/AddCollege";


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
                path: "/addCollege",
                element: <AddCollege/>

            }
        ]
    }
])