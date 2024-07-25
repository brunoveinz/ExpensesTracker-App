import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GlobalStyles } from '../../constants/styles'

const Button = ({title, onPress, mode, style}) => {
  return (
    <View style={style}>
      <Pressable onPress={onPress} style={ ({pressed}) => pressed && styles.pressed  }>
        <View style={[styles.button, mode === 'flat' && styles.flat]}>
            <Text style={[styles.buttonText, mode === 'flat' && styles.flatText]}>
                {title}
            </Text>
        </View>
      </Pressable>
    </View>
  )
}

export default Button;

const styles = StyleSheet.create({
    button: {
        borderRadius: 4,
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary500
    },
    flat: {
        backgroundColor: 'transparent'
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
    },
    flatText: {
        color: GlobalStyles.colors.primary200
    },
    pressed: {
        opacity: 0.7,
        backgroundColor: GlobalStyles.colors.primary100,
        borderRadius: 4
    }
});