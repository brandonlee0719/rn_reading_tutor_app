import React from 'react';
import { StyleProp, StyleSheet, Text, TextInputProps, View, ViewStyle } from 'react-native';
import lightTheme from '../styles/themes/light-theme';
import { TextInput } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import LightenDarkenColor from '../../utils/lighten-darker-color';

interface Props extends TextInputProps {
    title?: string
    error?: string
    placeholder?: string
    containerStyle?: StyleProp<ViewStyle>
    onChangeText: (text: string) => void
}

const TextField = (props: Props) => {
    return (
        <View style={props.containerStyle}>
            <Text style={styles.textFieldTitle}>{props.title}</Text>
            <LinearGradient 
              colors={[LightenDarkenColor('#ffffff', -50), 'white']} 
              style={{height: 54, borderRadius: 10}}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 0.15 }}
            >
                <TextInput          
                    placeholder={props.placeholder}        
                    underlineColorAndroid='transparent'  
                    keyboardType={props.keyboardType}
                    autoCompleteType={props.autoCompleteType}
                    secureTextEntry={props.secureTextEntry}
                    autoCapitalize={props.autoCapitalize}
                    autoCorrect={props.autoCorrect}    
                    selectionColor={lightTheme.textFieldSelectionColor}
                    style={styles.textFieldContainer}
                    onChangeText={props.onChangeText}
                />
            </LinearGradient>
            <Text style={styles.textFieldError}>{props.error}</Text>
        </View>
    )
}

const Device = require('react-native-device-detection')
const styles = StyleSheet.create({
    textFieldTitle: {
        fontFamily:'Cadman-Bold',
        fontSize: 16,
        color: lightTheme.textFieldTitleColor,
        marginBottom: 6,
        marginLeft: 2
    },
    textFieldContainer: {
        fontFamily: Device.isIos ? 'Cadman' : 'Cadman-Regular',
        fontSize: 16,
        padding: 16,
        height: 54,
        borderWidth: 0.1,
        borderColor: '#ccc',
        borderRadius: 10 ,
        backgroundColor : 'transparent',
        color: lightTheme.textFieldValueColor
    },
    textFieldError: {
        fontFamily: Device.isIos ? 'Cadman' : 'Cadman-Regular',
        fontSize: 14,
        marginTop: 1,
        marginLeft: 8,
        color: lightTheme.textFieldErrorColor
    }
})


export default TextField;