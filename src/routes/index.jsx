import { createBrowserRouter } from "react-router";
//public-pages
import SignupPage from '../pages/SignupPage';
import SignInPage from '../pages/SignInPage';
import LandingPage from "../pages/LandingPage";
//private-pages
import AppHomePage from "../pages/AppHomePage";
import ShowPage from '../pages/ShowPage';
import BrowsePage from '../pages/BrowsePage';
import AccountPage from '../pages/AccountPage'
//layouts
import PublicLayout from "../layouts/PublicLayout";
import ProtectedLayout from "../layouts/ProtectedLayout";

const appRouter = createBrowserRouter([
    {
        path: '/',
        element : <PublicLayout/>,
        children:[
            {
                index:true,
                element: <LandingPage/>
            },
            {
                path:'signin',
                element: <SignInPage/>
            },
            {
                path:'signup',
                element: <SignupPage/>
                
            },
        ]
    },
    {
        path:'/app',
        element : <ProtectedLayout/>,
        children: [
            {
                index:true,
                element:<AppHomePage/>
            },
            {
                path:'show/:showId',
                element:<ShowPage/>
            },
            {
                path:'account',
                element:<AccountPage/>
            },
            {
                path:'browse',
                element:<BrowsePage/>
            }
        ]
    }
])

export default appRouter