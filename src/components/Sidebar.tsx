import ListUser from "./ListUser.tsx";
import "./Sidebar.css"
export default function Sidebar() {
    return (
        <>
            <div className="list-contact">
                <div className="search-contact">
                    <form action="/search" method="get">
                        <input type="text" className="search-input" placeholder=""/>
                        <button className="search" type="submit"><i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </form>
                </div>
                <ListUser/>
            </div>
        </>
    )
}