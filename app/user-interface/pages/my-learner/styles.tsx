import { StyleSheet, Dimensions } from 'react-native';
import lightTheme from '../../styles/themes/light-theme';
import colors from '../../../constants/colors';

const Device = require('react-native-device-detection');
const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

export default StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: lightTheme.screenBackgroundColor
    },
    scrollView: {
        flex: 1,
        backgroundColor: lightTheme.screenBackgroundColor,
        overflow: 'visible'
    },
    contentView: {
        // flex: 1,
        margin: 30,
        // backgroundColor: lightTheme.cancelButtonColor
    },
    textContentView: {
        flexDirection: "row",
        marginTop: 5,
        marginBottom: 5,
    },
    centeredContent: {
        marginTop: screenHeight * 0.2,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center'
    },
    centeredButton: {
        marginTop: screenHeight * 0.2,
        // marginBottom: 100,
        // backgroundColor: lightTheme.cancelButtonTextColor,
    },
    logo: {
        width: screenWidth - 60,
        height: 100,
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
        fontFamily: 'Cadman-Bold',
        fontSize: 25,
        textAlign: "left",
        // margin: 20,
    },
    lessonsContainer: {
        // backgroundColor: 'white', 
        // paddingTop: 20, 
        marginTop: 20,
        // paddingHorizontal : 20,
        borderTopStartRadius: 4,
        borderTopEndRadius: 4
    },
    primarySectionHeader: {
        fontFamily:'Cadman-Bold',
        fontSize: 24,
        // backgroundColor: 'white',
        color: lightTheme.titleTextColor,
        height: 40
    },
    subText: {
        fontFamily: 'Cadman-Bold',
        fontSize: 18,
        textAlign: "left",
        // margin: 20,
    },
    normalText: {
        fontFamily: 'Cadman',
        fontSize: 15,
        textAlign: "left",
        // margin: 20,
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
