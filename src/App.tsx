import './App.css'
import Conservation from "./components/Conservation.tsx";
import Sidebar from "./components/Sidebar.tsx";
// import Profile from "./profile/Profile.tsx";
// import ResetPass from "./profile/ResetPass.tsx";

function App() {

  return (
    <>
        <div className="app-layout">
            <aside className="sidebar-container">
                <Sidebar />
            </aside>
            <div className="main-content">
                <Conservation/>
            </div>
        </div>
    </>
  )
  //   return (
  //       <>
  //           <ResetPass/>
  //       </>
  //   )
}

export default App
