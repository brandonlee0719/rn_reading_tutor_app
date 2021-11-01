import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../../constants/colors';
import font from '../../../constants/font';
import lightTheme from '../../styles/themes/light-theme';

const Device = require('react-native-device-detection');
const screenHeight = Dimensions.get('window').height

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingHorizontal: 16
    },
    headerContainer: {
        marginHorizontal: 20
    },
    headerTitle: {
        fontFamily: font.fontBold,
        fontSize: 22,
        // flex : 1,
        // backgroundColor : 'red',
        color: colors.darkBlueGrey,

        textAlign: 'center'
    },
    subTitle: {
        fontFamily: font.fontRegular,
        flex: 1,
        color: colors.navigationtitle,
        marginTop: 13,
        textAlign: 'center'
    }

})
