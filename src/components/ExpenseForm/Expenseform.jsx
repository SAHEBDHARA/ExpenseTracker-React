import React, { useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { useContext } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { storage, db } from '../../Firebse';


function ExpenseForm({onExpenseAdded }) {
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    category: 'Food', // Default category
  });
  const { currentUser } = useContext(AuthContext); 
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here, you can handle the form submission, e.g., send the data to the server or save it to a state.
    try {
      // Replace 'products' with the name of your Firestore collection
      const res = await addDoc(collection(db, 'expences' ), {
        moneyspent: formData.amount,
        description: formData.description,
        catagory: formData.category,
        uid: currentUser.uid
      });
      console.log('Document added to Firestore collection.' , res.id);
      setFormData({
        amount: '', // Reset to an empty string
        description: '', // Reset to an empty string
        category: 'Food', // Reset to the initial category if needed
      });
      onExpenseAdded();
    } catch (error) {
      console.error('Error adding document: ', error);
    }
    console.log(formData);
  };

  return (
    <div className="max-w-md mx-auto mt-4 bg-opacity-50 backdrop-blur-lg">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 flex flex-wrap">
        <div className="mb-4 w-full md:w-1/3 pr-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
            Money Spent
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter the amount spent"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4 w-full md:w-1/3 pl-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter a description"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4 w-full md:w-1/3 pl-2 h-1">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-indigo-500"
          >
            <option value="Food">Food</option>
            <option value="Petrol">Petrol</option>
            <option value="Salary">Salary</option>
            {/* Add more categories as needed */}
          </select>
        </div>
        <div className="w-full text-center">
          <button
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default ExpenseForm;
