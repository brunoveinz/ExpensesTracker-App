import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ExpenseItem from './ExpenseItem'


function renderExpenseItem(expense) {
  return (
    <ExpenseItem id={expense.item.id} description={expense.item.description} amount={expense.item.amount} date={expense.item.date} />
  )
}

const ExpensesList = ({expenses}) => {
  return (
    <FlatList 
      data={expenses} 
      renderItem={renderExpenseItem}
      keyExtractor={ (expense) => expense.id  }
    />
  )
}

export default ExpensesList

const styles = StyleSheet.create({})