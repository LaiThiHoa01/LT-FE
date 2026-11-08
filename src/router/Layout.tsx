import {Outlet} from "react-router";
export function Layout() {
    return (
        <div className="auth-page">
            <Outlet/>
        </div>
    );
}