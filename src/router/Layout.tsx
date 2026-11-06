import {Outlet} from "react-router";
export function Layout() {
    return (
        <div style={{border: '1px solid #1f2028', padding: '50px'}}>
            <Outlet/>
        </div>
    );
}