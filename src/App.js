import React, { useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./components/login";
import SignUp from "./components/register";
import './index.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./components/profile";
import { useState } from "react";
import { auth, db } from "./components/firebase";
// ... other imports
import { getDoc, doc } from "firebase/firestore";
import AdminPortal from './components/AdminPortal';

function App() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        const docRef = doc(db, 'Users', user.uid);
        const docSnap = await getDoc(docRef);
        console.log(docSnap.data().admin);
        if (docSnap.exists()) {
          setIsAdmin(docSnap.data().admin === true);
        }
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, []);
  
  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper bg-[#ECF1F4]">
          <div className="auth-inner">
            <Routes>
              <Route
                path="/"
                element={user ? <Navigate to="/profile" /> : <Login />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/profile" element={<Profile isAdmin={isAdmin} />} />
              {isAdmin && <Route path="/admin" element={<AdminPortal />} />}
            </Routes>
            <ToastContainer />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
