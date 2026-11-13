import {Navigate} from "react-router";
import {ChatLayout} from "./ChatLayout.tsx";

export function PrivateRoute(){
    const username = localStorage.getItem('username');
    const code = localStorage.getItem('RE_LOGIN_CODE');
    if(!username || !code){
        return <Navigate to="/login" replace/>;
    }
    return <ChatLayout/>
}