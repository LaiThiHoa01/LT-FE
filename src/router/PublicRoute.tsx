import {useAppSelector} from "../store/store.ts";
import {Navigate, Outlet} from "react-router";

export function PublicRoute(){
    const isAuth = useAppSelector(
        (state)=>state.auth.isAuth
    );
    if(isAuth){
        return <Navigate to="/chat" replace/>
    }
    return <Outlet/>
}