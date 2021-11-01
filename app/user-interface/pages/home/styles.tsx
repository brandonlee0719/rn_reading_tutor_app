import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../../constants/colors';
import lightTheme from '../../styles/themes/light-theme';

const Device = require('react-native-device-detection');
const screenHeight = Dimensions.get('window').height

export default StyleSheet.create({
    container: {
        flex: 1,

    },
    headerContainer: {
        marginHorizontal: 20,
        flex : 1
    },
    summaryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        
    },
    avatarContainer: {
        width: 50,
        aspectRatio: 1,
        borderRadius: 25,
        marginRight: 12,
        backgroundColor: 'white',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,  
    },
    avatar: {
        height: '100%',
        aspectRatio: 1,
        borderRadius: 25,
        overflow: 'hidden',
    },
    avatarText: {
        fontFamily:'Cadman-Bold',
        fontSize: 20,
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: {width: -0.7, height: 0.7},
        textShadowRadius: 1
    },
    avatarNumberText: {
        fontFamily:'Cadman-Bold',
        fontSize: 24,
        color: colors.orange,
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: {width: -0.7, height: 0.7},
        textShadowRadius: 1
    },
    dailyBadgetsContainer: {
        height: 90
    },
    lessonsContainer: {
        backgroundColor: 'white', 
        paddingTop: 20, 
        marginTop: 20,
        paddingHorizontal : 20,
        borderTopStartRadius: 4,
        borderTopEndRadius: 4
    },
    primarySectionHeader: {
        fontFamily:'Cadman-Bold',
        fontSize: 24,
        backgroundColor: 'white',
        color: lightTheme.titleTextColor,
        height: 40
    }, 
    secondarySectionHeader: {
        fontFamily:'Cadman-Bold',
        fontSize: 20,
        backgroundColor: 'white',
        color: lightTheme.titleTextColor,
        height: 35
    },
    image: {
        height: 40,
        width: 40
    },
})
