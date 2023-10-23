import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { useContext, useState, useEffect } from 'react';
import { getFirestore } from 'firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';

const Navbar = () => {
  const navigate = useNavigate();
const {currentUser} = useContext(AuthContext)
const [userData, setUserData] = useState(null);

  const handleLogout = () => {
    // Remove user data from local storage
    localStorage.removeItem("user");

    // Redirect to the login page
    navigate("/login");
  };

  useEffect(() => {
    if (currentUser) {
      // Use Firebase Firestore to fetch user data
      const db = getFirestore(); // Initialize Firestore
      const userRef = doc(db, 'userInfo', currentUser.uid); // 'users' is the name of the collection
      // Fetch user data
      console.log(getDoc(userRef));
      getDoc(userRef)
      
        .then((docSnapshot) => {
          if (docSnapshot.exists()) {
            // User data exists, set it in state
            setUserData(docSnapshot.data());
          } else {
            console.log('User data not found.');
          }
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [currentUser]);


  return (
    <nav className="bg-gradient-to-r from-blue-400 to-purple-500 p-4 flex items-center justify-between">
      <div className="flex items-center">
        <div className="text-white text-2xl font-bold">Expense Tracker</div>
      </div>
      <div className="flex items-center">
        <div className="mr-4 cursor-pointer">
          <Link to="/update">
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" // Replace with the path to your profile icon image
              alt="Profile Icon"
              className="w-8 h-8 rounded-full"
            />
          </Link>
        </div>
        <button
          onClick={handleLogout}
          className="text-white cursor-pointer"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};


export default Navbar; 
