import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import SignInwithGoogle from "./signInWIthGoogle";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sign in with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user data from Firestore
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();

        if (userData.blacklisted) {
          // User is blacklisted
          toast.error("User exists but is not allowed to log in", {
            position: "bottom-center",
          });
        } else {
          // User is not blacklisted
          console.log("User logged in Successfully");
          window.location.href = "/profile";
          toast.success("User logged in Successfully", {
            position: "top-center",
          });
        }
      } else {
        // User document does not exist
        toast.error("User does not exist", {
          position: "bottom-center",
        });
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[400px] max-w-sm p-8 bg-white shadow-md rounded-xl">
        <h3 className="text-2xl font-semibold mb-6 text-center">Login</h3>
        <form onSubmit={handleSubmit} className="w-[100%]">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Email address</label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FD6B3C]"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FD6B3C]"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <button type="submit" className="w-full bg-[#FD6B3C] text-white p-3 rounded-md hover:bg-[#d65429] focus:outline-none focus:ring-2 focus:ring-[#FD6B3C]">
              Submit
            </button>
          </div>

          <p className="text-sm text-gray-600 text-center">
            New user? <a href="/register" className="text-[#FD6B3C] hover:underline">Register Here</a>
          </p>
          <div className="mt-4 text-center">
            <SignInwithGoogle />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
