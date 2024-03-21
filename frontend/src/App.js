import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/login/loginform";
import RegisterForm from "./components/login/registerForm";

import Regverify from "./components/verifyOtp/RegVerify";
import { ToastContainer } from 'react-toastify';
import PrivateRouter from "./utils/PrivateRouter";
import { AuthProvider } from "./Context/AuthContext";

import HomePage from "./Pages/HomePage/HomePage";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route element={<PrivateRouter />} >
              <Route path="/" element={<HomePage />} />
            </Route>
            <Route path="/sign-in" element={<LoginForm />} />
            <Route path="/sign-up" element={<RegisterForm />} />
            <Route path="/register_verify" element={<Regverify />} />
          </Routes>
          <ToastContainer />
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;


