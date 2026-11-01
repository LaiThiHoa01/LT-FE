import './App.css'
import { BrowserRouter,Routes, Route} from 'react-router';
import SignIn from "./auth/signIn/SignIn.tsx";
import SignUp from "./auth/signUp/SignUp.tsx";
import Forget from "./auth/forget/Forget.tsx";
import Profile from "./profile/Profile.tsx";
import Sidebar from "./components/Sidebar.tsx";
import Conservation from "./components/Conservation.tsx";
import OTP from "./auth/forget/Otp.tsx";
import Reset from "./auth/forget/Reset.tsx";
import ResetPass from "./profile/ResetPass.tsx";

function ChatLayout() {

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
function App(){
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<SignIn />} />
                <Route path="index" element={<SignIn />} />
                <Route path="signUp" element={<SignUp />} />
                <Route path="login" element={<ChatLayout />} />
                <Route path="forget" element={<Forget />} />
                <Route path="logout" element={<Profile />} />
                <Route path="profile" element={<Profile />} />
                <Route path="convervation" element={<Conservation />} />
                <Route path="sideBar" element={<Sidebar />} />
                <Route path="profile" element={<Profile />} />
                <Route path="otp" element={<OTP />} />
                <Route path="reset" element={<Reset />} />
                <Route path="resetPass" element={<ResetPass />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
