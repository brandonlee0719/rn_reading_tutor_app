import { StyleSheet, Dimensions } from 'react-native';
import lightTheme from '../../styles/themes/light-theme';

const Device = require('react-native-device-detection');
const screenHeight = Dimensions.get('window').height

export default StyleSheet.create({
    safeArea: {        
        flex: 1,
        backgroundColor: lightTheme.screenBackgroundColor
    },
    scrollView: {
        flex: 1,
        backgroundColor: lightTheme.screenBackgroundColor,
        overflow:'visible'
    },
    contentView: {
        margin: 30
    },
    image: {
        width: screenHeight * 0.3,
        height: screenHeight * 0.3,
        maxHeight: 256,
        maxWidth: 256,
        marginBottom: 20,
        alignSelf: 'center'
    },
    welcomeText: {
        fontFamily:'Cadman-Bold',
        fontSize: 40, 
        textAlign: 'center'
    },
    emailTextField: {
        marginTop: 30
    },
    passwordTextField: {
        marginTop: 16,
        marginBottom: 25
    },
    forgotPasswordButton: {
        marginTop: 8
    }
})
