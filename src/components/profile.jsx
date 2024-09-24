import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; // Use navigate from react-router-dom
import { IoMdHome } from "react-icons/io";
import { IoPersonCircleSharp } from "react-icons/io5";


const Profile = ({ isAdmin }) => {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        } else {
          console.log("User is not logged in");
        }
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      navigate("/login"); // Use navigate for redirection
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#ECF1F4] p-4">
      {/* Button to go back to Home */}
      <button 
        className="absolute top-4 left-4 text-[#FD6B3C]  py-2 px-4 rounded-lg  text-2xl hover:text-[#d65429]"
        onClick={() => navigate("/")} // Navigate back to home page
      >
        <IoMdHome />
      </button>
      {userDetails ? (
        <>
          <div className="flex justify-center mb-4">
            {/* {userDetails.photo ? (
              <img
              src={userDetails.photo}
              className="w-10 h-10 rounded-full object-cover"
              alt="icon"
              />
            ):
            (
              <div className="text-3xl text-[#FD6B3C] ">
                <IoPersonCircleSharp />
              </div>
            )} */}
            <div className="text-3xl text-[#FD6B3C] ">
              <IoPersonCircleSharp />
            </div>
            
          </div>
          <h3 className="text-3xl font-semibold text-[#332D30] mb-4">
            Welcome {userDetails.firstName}
          </h3>
          <div className="bg-white rounded-lg p-6 mb-4 w-full max-w-md border border-[#FD6B3C]">
            <p className="mb-4 text-[#332D30]">
              <span className="font-medium">Email:</span> {userDetails.email}
            </p>
            <p className="mb-4 text-[#332D30]">
              <span className="font-medium">First Name:</span> {userDetails.firstName}
            </p>
            <div className="flex flex-col items-center">
              {isAdmin && (
                <div className="mb-6 w-full">
                  <button 
                    className="bg-[#FD6B3C] flex w-full justify-center text-white py-2 px-4 rounded-lg shadow hover:bg-[#d65429]"
                    onClick={() => navigate('/admin')} // Redirect to admin portal
                  >
                    Go to Admin Portal
                  </button>
                </div>
              )}
              <button 
                className="bg-[#332D30] flex w-full justify-center text-white py-2 px-4 rounded-lg shadow hover:bg-black"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
          
        </>
      ) : (
        <p className="text-lg text-[#332D30]">Loading...</p>
      )}
    </div>
  );
};

export default Profile;
