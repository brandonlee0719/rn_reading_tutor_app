import { StyleSheet, Dimensions } from 'react-native';
import Device from 'react-native-device-detection';
import lightTheme from '../../styles/themes/light-theme';

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
    forgotPasswordText: {
        fontFamily:'Cadman-Bold',
        fontSize: 30, 
        textAlign: 'center'
    },
    descriptionText: {
        fontFamily: Device.isIos ? 'Cadman' : 'Cadman-Regular',
        fontSize: 16, 
        textAlign: 'center',
        marginTop: 8,
        color: lightTheme.descriptionTextColor
    },
    emailTextField: {
        marginTop: 40,
        marginBottom: 25
    }
})
