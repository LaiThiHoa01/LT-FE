import {Navigate} from "react-router";
import {ChatLayout} from "./ChatLayout.tsx";
import {useAppSelector} from "../store/store.ts";

export function PrivateRoute(){
    const isAuth = useAppSelector(
        (state)=>state.auth.isAuth
    );
    if(!isAuth){
        return <Navigate to="/login" replace/>;
    }
    return <ChatLayout/>
}