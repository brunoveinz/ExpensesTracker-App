import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { GlobalStyles } from '../../constants/styles'

const ErrorOverlay = ({ message }) => {
  return (
    <View style={styles.container}>
        <Text style={[styles.text, styles.title]}>An error ocurred!</Text>
        <Text style={styles.text}>{message}</Text>
    </View>
  )
}

export default ErrorOverlay

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700
    },

    text: {
        color: 'white',
        textAlign: 'center',
        marginBottom: 8
    },

    title: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    }

})