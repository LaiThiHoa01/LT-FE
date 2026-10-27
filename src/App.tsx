import './App.css'
import SignIn from "./auth/signIn/SignIn.tsx";
import Sidebar from "./components/Sidebar.tsx";

function App() {
  return (
    <>
      <SignIn/>
      <Sidebar/>
    </>
  )
}

export default App
