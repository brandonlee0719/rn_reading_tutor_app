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
    backgroundVideo: {
        backgroundColor: colors.lightGreen,
        // marginTop: 20,
        position: 'absolute',
        // top: 0,
        // left: 0,
        // bottom: 0,
        // right: 0,
        margin : 20
      },
    
})
