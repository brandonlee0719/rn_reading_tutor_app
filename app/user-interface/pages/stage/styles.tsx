import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../../constants/colors';
import font from '../../../constants/font';
import lightTheme from '../../styles/themes/light-theme';

const Device = require('react-native-device-detection');
const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

export default StyleSheet.create({
    container: {
        flex: 1
    },
    headerContainer: {
        marginHorizontal: 20
    },
    viewContainer: {
        flex: 1,
        marginTop: 8,
        alignItems : 'center',
        paddingHorizontal : 16,
        backgroundColor: lightTheme.viewWhiteBackground,
        borderTopEndRadius: 8,
        borderTopStartRadius: 8,
        width: screenWidth,
        
    },
    primarySectionHeader: {
        fontFamily:font.fontBold,
        fontSize: 20,
        marginTop : 8,
        color: lightTheme.titleTextColor,
        flex : 1,
    },
    primaryNumber : {
        fontFamily: font.fontBold,
        fontSize: 24,
        textAlign: 'right',
        color: colors.orange,
        marginEnd: 8
    },
    levelFont : {
        fontFamily: font.fontBold,
        fontSize: 16,
        color: lightTheme.titleTextColor
    },
    letterSoundFont : {
        fontFamily: font.fontRegular,
        fontSize: 14,
        color: lightTheme.titleTextColor
    },
    levelFontBlur : {
        fontFamily: font.fontBold,
        fontSize: 16,
        color: colors.superLightBlueGrey
    },
    letterSoundBlur : {
        fontFamily: font.fontRegular,
        fontSize: 14,
        color: colors.superLightBlueGrey
    },
    lblUnlock : {
        fontFamily: font.fontRegular,
        fontSize: 16,
        color: colors.blueGrey,
        marginEnd: 16
    },
    image: {
        height: 40,
        width: 40
    },
    imageBig: {
        height: 343,
        
    },
})
