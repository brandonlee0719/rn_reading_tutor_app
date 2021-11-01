import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../../constants/colors';
import lightTheme from '../../styles/themes/light-theme';

const Device = require('react-native-device-detection');
const screenHeight = Dimensions.get('window').height

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor : colors.imgGrayBackGround,
        padding : 16
    },
    headerContainer: {
        marginHorizontal: 20
    },
    
})
