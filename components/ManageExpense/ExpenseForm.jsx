import { StyleSheet, Text, View, Alert } from 'react-native'
import React from 'react'
import Input from './Input'
import { useState } from 'react'
import Button from '../UI/Button'
import { getFormattedDate } from '../../util/date'

const ExpenseForm = ({submitButtonLabel, onCancel, onSubmit, selectedExpense }) => {
    
    const [inputValues, setInputValues] = useState({
        amount: selectedExpense ? selectedExpense.amount.toString() : '',
        date: selectedExpense ? getFormattedDate(selectedExpense.date) : '',
        description: selectedExpense ? selectedExpense.description : '',
    });
  
    function inputChangeHandler(inputIdentifier, enteredValue) {
        setInputValues( (curInputValues) => {return {...curInputValues, [inputIdentifier]:enteredValue }
        })
    }

    function submitHandler() {
        const expenseData = {
            amount: +inputValues.amount,
            date: new Date(inputValues.date),
            description: inputValues.description
        }

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid   = expenseData.date.toString() !== 'invalid date';
        const descriptionIsValid = expenseData.description.trim().length > 0;  

        if( !amountIsValid || !dateIsValid || !descriptionIsValid ){
            Alert.alert('Invalid input', 'Please check your input values')
        } else {
            onSubmit(expenseData);
        }        
    }

    return (
    <View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
        <View style={styles.inputsRow}>
            <Input 
                style={styles.rowInput}
                label="Amount" 
                textInputConfig={{
                   keyboardType: 'decimal-pad',
                   onChangeText: inputChangeHandler.bind(this, 'amount'),
                   value: inputValues.amount,
                }}
            />
            <Input
                style={styles.rowInput}
                label="Date" 
                textInputConfig={{
                    placeholder: 'YYYY-MM-DD',
                    maxLength: 10,
                    onChangeText: inputChangeHandler.bind(this, 'date'),
                    value: inputValues.date,
                }}
            />
        </View>
      <Input label="Description" textInputConfig={{
        multiline: true,
        onChangeText: inputChangeHandler.bind(this, 'description'),
        value: inputValues.description,
        //autoCapitalize: 'none',
        //autoCorrect: false, // default is true 
      }}/>

      <View style={styles.buttons}>
        <Button style={styles.button} mode='flat' onPress={onCancel} title='Cancel'/>
        <Button style={styles.button} title={submitButtonLabel} onPress={submitHandler}/>
      </View>
    </View>
  )
}

export default ExpenseForm

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
        textAlign: 'center'
    },
    form: {
        marginTop: 80
    },
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    rowInput: {
        flex: 1
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
})