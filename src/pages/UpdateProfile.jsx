import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore"; 
import {storage, db} from '../Firebse' 
import { AuthContext } from "../context/authContext";
import { getDatabase } from 'firebase/database';
import { Navigate } from "react-router-dom";



const Updateprofile = () => {
  const [fullName, setFullName] = useState("");
  const [image, setImage] = useState(null); // Store the selected image file
  const [per, setPerc] = useState(null); 
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
 

  const Navigate = useNavigate()

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };
// getting current userId 

  // Uploading the image to the databaase 


  const handleImageChange = async (e) => {
    const file = e.target.files[0];
   setImage(file);
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    setUploading(true);
  
    uploadTask.on("state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        setPerc(progress)
        if (progress === 100) {
            setUploading(false);
          }
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default: 
            break;
        }
      },
      (error) => {
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            console.log("File available at", downloadURL);
            setImageUrl(downloadURL);
          })
          .catch((error) => {
          });
      }
    );
  };

  // Uploading info in database 

  const saveDataToRealtimeDatabase = async () => {
    try {
      // Replace 'products' with the name of your Firestore collection
      const res = await addDoc(collection(db, 'userInfo' ), {
        name: fullName,
        imageUrl: imageUrl,
        uid: currentUser.uid
      });
      console.log('Document added to Firestore collection.' , res.id);
      Navigate('/')
    } catch (error) {
      console.error('Error adding document: ', error);
    }
    
  }
  
  

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 ml-16 ">Contact Details</h2>
        {image ? ( 
          <div className="mb-4 flex justify-center">
            <img
              src={URL.createObjectURL(image)}
              alt="Profile Image"
              className="w-32 h-32 rounded-full"
            />
          </div>
        ) : (
          <div className="mb-4 flex justify-center">
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" 
              alt="Profile Image"
              className="w-32 h-32 rounded-full"
            />
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium">Full Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded border-gray-300 focus:outline-none focus:border-indigo-500"
            placeholder="Enter full name"
            value={fullName}
            onChange={handleFullNameChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-medium">
            Profile Image
          </label>
          <input
            type="file"
            accept=".jpg, .jpeg, .png"
            className="w-full p-2 border rounded border-gray-300 focus:outline-none focus:border-indigo-500"
            onChange={handleImageChange}
          />
        </div>

        <div className="flex justify-between">
          <Link to="/">
            <button className="w-auto py-2 px-4 bg-gray-400 text-white rounded hover:bg-gray-500 focus:outline-none">
              Cancel
            </button>
          </Link>
          <button
            className={`w-1/2 py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none ${
              uploading ? 'cursor-not-allowed bg-indigo-400' : '' // Make the button non-clickable during upload
            }`}
            onClick={saveDataToRealtimeDatabase}
          >
            {uploading ? `Uploading: ` : 'Save Contact'} {/* Display progress or button text */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Updateprofile;
