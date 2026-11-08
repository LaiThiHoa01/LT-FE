import {createBrowserRouter} from "react-router";
import SignIn from "../components/auth/signIn/SignIn.tsx";
import {ChatLayout} from "./ChatLayout.tsx";
import {ErrorPage} from "./ErrorPage.tsx";
import SignUp from "../components/auth/signUp/SignUp.tsx";
import Forget from "../components/auth/forget/Forget.tsx";
import Profile from "../components/profile/Profile.tsx";
import OTP from "../components/auth/forget/Otp.tsx";
import Reset from "../components/auth/forget/Reset.tsx";
import ResetPass from "../components/profile/ResetPass.tsx";
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
            {
                path: "forget",
                element: <Forget/>
            },
            {
                path: "profile",
                element: <Profile/>
            },
            {
                path: "otp",
                element: <OTP/>
            },
            {
                path: "reset",
                element: <Reset/>
            },
            {
                path: "resetPass",
                element: <ResetPass/>
            },
        ]
    },
    {
        path: "chat",
        element: <ChatLayout/>
    }
])