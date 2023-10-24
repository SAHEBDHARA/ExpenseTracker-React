import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { useContext, useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { getFirestore, query, where, getDocs, collection } from 'firebase/firestore';


const Navbar = () => {
  const navigate = useNavigate();
const {currentUser} = useContext(AuthContext)
const [imageUrl, setImageUrl] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("user");

    navigate("/login");
  };

  // useEffect(() => {
  //   if (currentUser) {
  //     // Use Firebase Firestore to fetch user data
  //     const db = getFirestore(); // Initialize Firestore
  //     const userRef = doc(db, 'userInfo', currentUser.uid); // 'users' is the name of the collection
  //     // Fetch user data
  //     console.log(useRef)
  //     getDoc(userRef)
      
  //       .then((docSnapshot) => {
  //         if (docSnapshot.exists()) {
  //           // User data exists, set it in state
  //           setUserData(docSnapshot.data());
            
  //         } else {
  //           console.log('User data not found.');
  //         }
  //       })
  //       .catch((error) => {
  //         console.error('Error fetching user data:', error);
  //       });
  //   }
  // }, [currentUser]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentUser) {
          const db = getFirestore();
          const userInfoCollection = collection(db, 'userInfo');
          
          // Create a query to filter documents where 'uid' is equal to the current user's UID
          const q = query(userInfoCollection, where('uid', '==', currentUser.uid));
  
          // Execute the query
          const querySnapshot = await getDocs(q);
  
          // Loop through querySnapshot to access the data for matching documents
          querySnapshot.forEach((doc) => {
            const userInfoData = doc.data()
            const imageUrl = userInfoData.imageUrl;
            setImageUrl(imageUrl)
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    // Call the fetchData function when the component mounts
    fetchData();
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
              src={imageUrl ? imageUrl : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
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
