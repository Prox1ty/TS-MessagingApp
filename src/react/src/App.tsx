import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import RoomPage from "./pages/RoomPage"
import ChatRoom from "./pages/ChatRoom"
import Layout from "./layout/Layout"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"

function App() {
    return (<>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route element={<RoomPage />} index></Route>
              <Route element={<ChatRoom />} path="room/:roomId"></Route>
              <Route path="/register" element={<SignUpPage />}></Route>
              <Route path="/login" element={<SignInPage />}></Route>
            </Route>
            
          </Routes>
          
        </Router>
      </>
    );
}

export default App
