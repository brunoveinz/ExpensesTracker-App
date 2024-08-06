import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState} from 'react'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { ExpensesContext } from '../store/expenses-context'
import { getDateMinusDays } from '../util/date'
import { fecthExpenses } from '../util/http'
import LoadingOverlay from '../components/UI/LoadingOverlay'

const RecentExpenses = () => {

  const [isFetching, setIsFetching] = useState(true);
  const expensesCtx = useContext(ExpensesContext);

  useEffect( () => {
    async function getExpenses(){
       setIsFetching(true)
       const expenses = await fecthExpenses();
       setIsFetching(false)
       expensesCtx.setExpenses(expenses);
    }
    getExpenses();
  }, [])

  if (isFetching) {
    return <LoadingOverlay/>
  }

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput 
      expenses={recentExpenses} 
      expensesPeriod="Last 7 days" 
      fallbackText="No expenses registered for the last 7 days"
    />  
  )
}

export default RecentExpenses

const styles = StyleSheet.create({})