import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useContext } from 'react'
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import Button from '../components/UI/Button';
import { ExpensesContext } from '../store/expenses-context'

const ManageExpense = ({route, navigation}) => {
  const expensesCtx = useContext(ExpensesContext)

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  useLayoutEffect( () => {
  //estas configuraciones deben ir dentro de un useLayoutEffect por temas de optimizacion
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    })
  }, [navigation, isEditing]);

  function deleteExpenseHandler() {
    expensesCtx.deleteExpense(editedExpenseId)
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler() {
    if (isEditing) {
      expensesCtx.updateExpense(
      editedExpenseId,
      {
        description: 'Test!!!',
        amount: 29.99,
        date: new Date('2024-07-23'),
      });
      console.log('Update')
    } else {
      expensesCtx.addExpense({
        description: 'Test',
        amount: 19.99,
        date: new Date('2022-02-19'),
      });
      console.log('Add')
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button style={styles.button} mode='flat' onPress={cancelHandler} title='Cancel'/>
        <Button style={styles.button} title={isEditing ? 'Update' : 'Add'} onPress={confirmHandler}/>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton 
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  )
}

export default ManageExpense

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,

  },

  button: {
    minWidth: 120,
    marginHorizontal: 8
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  deleteContainer: {
    marginTop: 16, 
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center'
  },
})