import React, { useState } from "react";
import { Link } from "react-router-dom";

const Updateprofile = () => {
  const [fullName, setFullName] = useState("");
  const [image, setImage] = useState(null); // Store the selected image file

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Contact Details</h2>
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
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" // Replace with the path to your dummy image
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
          <button className="w-1/2 py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none">
            Save Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default Updateprofile;
