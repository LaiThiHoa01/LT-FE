import {createBrowserRouter} from "react-router";
import SignIn from "../components/auth/signIn/SignIn.tsx";
import {ChatLayout} from "./ChatLayout.tsx";
import {ErrorPage} from "./ErrorPage.tsx";
import SignUp from "../components/auth/signUp/SignUp.tsx";
import {Layout} from "./Layout.tsx";

export const router= createBrowserRouter([
    {
        path:"/",
        element: <Layout/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                index: true,
                element: <SignIn/>,
            },
            {
                path: "login" ,
                element: <SignIn/>,
            },
            {
                path: "signUp",
                element: <SignUp/>
            },
        ]
    },
    {
        path: "chat",
        element: <ChatLayout/>
    }
])