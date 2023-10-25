import React, { useState, useContext, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { AuthContext } from '../../context/authContext';
import { getFirestore } from 'firebase/firestore';

const ExpenseList = () => {
  const [userInfoData, setUserInfoData] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentUser) {
          const db = getFirestore();
          const userInfoCollection = collection(db, 'expences');
          
          const q = query(userInfoCollection, where('uid', '==', currentUser.uid));
          const querySnapshot = await getDocs(q);

          const userData = [];
          querySnapshot.forEach((doc) => {
            userData.push(doc.data());
          });

          setUserInfoData(userData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentUser]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Expense List</h2>

      <div className="max-h-96 overflow-y-auto custom-scrollbar grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {userInfoData.map((expense) => (
          <div key={expense.description} className="bg-white p-4 rounded-lg shadow-md">
            <div className="text-xl font-semibold">{expense.moneyspent} USD</div>
            <p className="text-gray-600">{expense.description}</p>
            <p className="text-gray-600">{expense.catagory}</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => deleteExpense(expense.id)}
                className="mr-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                Delete
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
