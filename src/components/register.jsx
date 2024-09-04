import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import TermsAndConditionModal from "./TermsAndConditionModal";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
          photo: "",
          blacklisted: true, // default to blacklisted
          termsAndConditions: termsAccepted, // store the terms acceptance status
        });
      }
      toast.success("User Registered Successfully!!", { position: "top-center" });
      
      // Clear form fields
      setEmail("");
      setPassword("");
      setFname("");
      setLname("");

      // Redirect to login page
      navigate("/login");
    } catch (error) {
      toast.error(error.message, { position: "bottom-center" });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h3 className="text-2xl font-bold text-center text-gray-700">Sign Up</h3>
        <form onSubmit={handleRegister} className="space-y-6">
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-600">First name</label>
            <input
              type="text"
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-[#FD6B3C] focus:border-[#FD6B3C]"
              placeholder="First name"
              onChange={(e) => setFname(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-600">Last name</label>
            <input
              type="text"
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-[#FD6B3C] focus:border-[#FD6B3C]"
              placeholder="Last name"
              onChange={(e) => setLname(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-600">Email address</label>
            <input
              type="email"
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-[#FD6B3C] focus:border-[#FD6B3C]"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-[#FD6B3C] focus:border-[#FD6B3C]"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Terms and Conditions Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              className="w-4 h-4 text-[#FD6B3C] border-gray-300 rounded focus:ring-[#FD6B3C]"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              required
            />
            <label className="ml-2 text-sm text-gray-600">
              I accept the{" "}
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="font-medium text-[#FD6B3C] hover:underline"
              >
                Terms and Conditions
              </button>
            </label>
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-[#FD6B3C] rounded-md hover:bg-[#d65429] focus:outline-none focus:ring focus:ring-[#FD6B3C]"
            >
              Sign Up
            </button>
          </div>
          <p className="text-sm text-center text-gray-600">
            Already registered?{" "}
            <a href="/login" className="font-medium text-[#FD6B3C] hover:underline">
              Login
            </a>
          </p>
        </form>
      </div>

      {/* Modal for Terms and Conditions */}
      {showModal && <TermsAndConditionModal setShowModal={setShowModal}/>}
    </div>
  );
}

export default Register;
