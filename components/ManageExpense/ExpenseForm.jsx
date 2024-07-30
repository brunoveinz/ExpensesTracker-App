import { StyleSheet, Text, View, Alert } from 'react-native'
import React from 'react'
import Input from './Input'
import { useState } from 'react'
import Button from '../UI/Button'
import { getFormattedDate } from '../../util/date'
import { GlobalStyles } from '../../constants/styles'

const ExpenseForm = ({submitButtonLabel, onCancel, onSubmit, selectedExpense }) => {
    
    const [inputs, setInputs] = useState({
        amount: { 
            value: selectedExpense ? selectedExpense.amount.toString() : '',
            isValid: true
        },
        date: { 
            value: selectedExpense ? getFormattedDate(selectedExpense.date) : '',
            isValid: true
        },
        description: { 
            value: selectedExpense ? selectedExpense.description : '',
            isValid: true
        },
    });
  
    function inputChangeHandler(inputIdentifier, enteredValue) {
        setInputs((curInputs) => {return {...curInputs, [inputIdentifier]: {value: enteredValue, isValid: true } }
        })
    }

    function submitHandler() {
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value
        }

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid   = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;  

        if( !amountIsValid || !dateIsValid || !descriptionIsValid ){
            setInputs( (curInputs)=>{
                return {
                    amount: {value: curInputs.amount.value, isValid: amountIsValid},
                    date: {value: curInputs.date.value, isValid: dateIsValid},
                    description: {value: curInputs.description.value, isValid: descriptionIsValid},
                }
            })
        } else {
            onSubmit(expenseData);
        }        
    }

    const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;

    return (
    <View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
        <View style={styles.inputsRow}>
            <Input 
                style={styles.rowInput}
                label="Amount" 
                invalid={!inputs.amount.isValid}
                textInputConfig={{
                   keyboardType: 'decimal-pad',
                   onChangeText: inputChangeHandler.bind(this, 'amount'),
                   value: inputs.amount.value,
                }}
            />
            <Input
                style={styles.rowInput}
                label="Date" 
                invalid={!inputs.date.isValid}
                textInputConfig={{
                    placeholder: 'YYYY-MM-DD',
                    maxLength: 10,
                    onChangeText: inputChangeHandler.bind(this, 'date'),
                    value: inputs.date.value,
                }}
            />
        </View>
      <Input 
        label="Description" 
        invalid={!inputs.description.isValid}
        textInputConfig={{
            multiline: true,
            onChangeText: inputChangeHandler.bind(this, 'description'),
            value: inputs.description.value,
            //autoCapitalize: 'none',
            //autoCorrect: false, // default is true 
        }}
      />
      
      {formIsInvalid && ( 
        <Text style={styles.errorText}>Invalid input values - please check your entered data</Text> 
      )}

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

    errorText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8,
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