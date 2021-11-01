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
        padding: 16
    },
    headerContainer: {
        marginHorizontal: 20
    },
    headerTitle: {
        fontFamily: font.fontBold,
        fontSize: 24,
        color: colors.darkBlueGrey,
        marginTop : 16,
        textAlign : 'center'
    },
    subTitle: {
        fontFamily: font.fontRegular,
        fontSize: 16,
        color: colors.navigationtitle,
        marginTop : 16,
        textAlign : 'left'
    }

})
