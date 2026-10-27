import './App.css'
import Conservation from "./components/Conservation.tsx";
import Sidebar from "./components/Sidebar.tsx";

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
}

export default App
