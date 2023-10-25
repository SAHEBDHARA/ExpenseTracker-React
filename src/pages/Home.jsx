import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import ExpenseForm from '../components/ExpenseForm/Expenseform'
import ExpenseList from '../components/ExpenseList/ExpenseList'
import { useState, useEffect } from 'react'

const Home = () => {
  const [isExpenseAdded, setIsExpenseAdded] = useState(false);
  const handleExpenseAdded = () => {
    setIsExpenseAdded(true);
    console.log('called')
  };
  useEffect(() => {
    // When isExpenseAdded changes, you can refresh the ExpenseList
    if (isExpenseAdded) {
      setIsExpenseAdded(false); // Reset the flag
    }
  }, [isExpenseAdded]);
  return (
    <>
    <Navbar/>
    <ExpenseForm onExpenseAdded={handleExpenseAdded} />
    <ExpenseList/>
    </>
  )
}

export default Home