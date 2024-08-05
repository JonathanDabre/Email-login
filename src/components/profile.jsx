import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; // Use navigate from react-router-dom

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
      {userDetails ? (
        <>
          <div className="flex justify-center mb-4">
            {/* <img
              src={userDetails.photo}
              className="w-40 h-40 rounded-full object-cover"
              alt="profile-icon"
            /> */}
          </div>
          <h3 className="text-2xl font-semibold mb-2">Welcome {userDetails.firstName} </h3>
          <div className="bg-white shadow-lg rounded-lg p-6 mb-4 w-full max-w-md">
            <p className="mb-2"><span className="font-medium">Email:</span> {userDetails.email}</p>
            <p className="mb-2"><span className="font-medium">First Name:</span> {userDetails.firstName}</p>
            {/* <p><span className="font-medium">Last Name:</span> {userDetails.lastName}</p> */}
          </div>
          {isAdmin && (
            <div className="mb-4">
              <button 
                className="bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600"
                onClick={() => navigate('/admin')} // Redirect to admin portal
              >
                Go to Admin Portal
              </button>
            </div>
          )}
          <button 
            className="bg-red-500 text-white py-2 px-4 rounded shadow hover:bg-red-600"
            onClick={handleLogout}
          >
            Logout
          </button>
        </>
      ) : (
        <p className="text-lg">Loading...</p>
      )}
    </div>
  );
};

export default Profile;
